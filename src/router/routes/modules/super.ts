import type {AppRouteModule} from '/@/router/types';

import {PAGE_LAYOUT_COMPONENT} from '/@/router/constant';

export default {
    layout: {
        path: '/super',
        name: 'Super',
        component: PAGE_LAYOUT_COMPONENT,
        redirect: '/super/user',
        meta: {
            icon: 'iconfont icon-quanxian',
            title: '权限管理',
        },
    },
    routes: [
        {
            path: '/user',
            name: 'PageUser',
            component: () => import('/@/views/super/user.vue'),
            meta: {
                title: '用户管理',
            },
        },
        {
            path: '/group',
            name: 'PageGroup',
            component: () => import('/@/views/super/group.vue'),
            meta: {
                title: '分组管理',
            },
        },
    ],
} as AppRouteModule;
