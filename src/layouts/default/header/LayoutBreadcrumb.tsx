import type { AppRouteRecordRaw } from '/@/router/types';
import type { RouteLocationMatched } from 'vue-router';
import type { PropType } from 'vue';

import { defineComponent, TransitionGroup, unref, watch, ref } from 'vue';
import Icon from '/@/components/Icon';

import { Breadcrumb, BreadcrumbItem } from '/@/components/Breadcrumb';

import { useRouter } from 'vue-router';

import { isBoolean } from '/@/utils/is';
import { compile } from 'path-to-regexp';

import router from '/@/router';

import { PageEnum } from '/@/enums/pageEnum';
import useI18n from '/@/utils/useI18n';

export default defineComponent({
  name: 'BasicBreadcrumb',
  props: {
    showIcon: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const itemList = ref<AppRouteRecordRaw[]>([]);

    const { currentRoute, push } = useRouter();
    const { t } = useI18n();
    watch(
      () => currentRoute.value,
      () => {
        if (unref(currentRoute).name === 'Redirect') return;
        getBreadcrumb();
      },
      { immediate: true }
    );

    function getBreadcrumb() {
      const { matched } = unref(currentRoute);
      const matchedList = matched.filter((item) => item.meta && item.meta.title).slice(1);
      const firstItem = matchedList[0];
      const ret = getHomeRoute(firstItem);
      if (!isBoolean(ret)) {
        matchedList.unshift(ret);
      }
      itemList.value = ((matchedList as any) as AppRouteRecordRaw[]).filter(
        (item) => item.meta && item.meta.title && !item.meta.hideBreadcrumb
      );
    }

    function getHomeRoute(firstItem: RouteLocationMatched) {
      if (!firstItem || !firstItem.name) return false;
      const routes = router.getRoutes();
      const homeRoute = routes.find((item) => item.path === PageEnum.BASE_HOME);
      if (!homeRoute) return false;
      if (homeRoute.name === firstItem.name) return false;
      return homeRoute;
    }

    function pathCompile(path: string) {
      const { params } = unref(currentRoute);
      const toPath = compile(path);
      return toPath(params);
    }

    function handleItemClick(item: AppRouteRecordRaw) {
      const { redirect, path, meta } = item;
      if (meta.disabledRedirect) return;
      if (redirect) {
        push(redirect as string);
        return;
      }
      return push(pathCompile(path));
    }

    function renderItemContent(item: AppRouteRecordRaw) {
      return (
        <>
          {props.showIcon && item.meta.icon && item.meta.icon.trim() !== '' && (
            <Icon
              icon={item.meta.icon}
              class="icon mr-1 "
              style={{
                marginBottom: '2px',
              }}
            />
          )}
          {t(item.meta.title)}
        </>
      );
    }

    function renderBreadcrumbItemList() {
      return unref(itemList).map((item) => {
        const isLink =
          (!!item.redirect && !item.meta.disabledRedirect) ||
          !item.children ||
          item.children.length === 0;

        return (
          <BreadcrumbItem
            key={item.path}
            isLink={isLink}
            onClick={handleItemClick.bind(null, item)}
          >
            {() => renderItemContent(item as AppRouteRecordRaw)}
          </BreadcrumbItem>
        );
      });
    }

    function renderBreadcrumbDefault() {
      return (
        <TransitionGroup name="breadcrumb">{() => renderBreadcrumbItemList()}</TransitionGroup>
      );
    }

    return () => (
      <Breadcrumb class={['layout-breadcrumb', unref(itemList).length === 0 ? 'hidden' : '']}>
        {() => renderBreadcrumbDefault()}
      </Breadcrumb>
    );
  },
});
