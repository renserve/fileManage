import { appStore } from './app';
import {
    LoginParams,
    GetUserInfoByUserIdModel,
} from '/@/api/super/model/userModel';


import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { CacheTypeEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

import { useMessage } from '/@/hooks/web/useMessage';

import router from '/@/router';

import {loginApi, getUserInfoById} from '/@/api/super/user';

import { setLocal, getLocal, getSession, setSession } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { useI18n } from '/@/hooks/web/useI18n';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;

const NAME = 'user';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
    const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
    return fn(key) as T;
}

function setCache(USER_INFO_KEY: string, info: any) {
    if (!info) return;
    // const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
    setLocal(USER_INFO_KEY, info, true);
    // TODO
    setSession(USER_INFO_KEY, info, true);
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
    // user info
    private userInfoState: UserInfo | null = null;
    
    // token
    private tokenState = [];
    
    // roleList
    private roleListState: RoleEnum[] = [];
    
    get getUserInfoState(): UserInfo {
        return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
    }

    get getTokenState(): string[] {
        return this.tokenState.length?this.tokenState:getLocal(TOKEN_KEY) as string[];
    }
    get getRoleListState(): RoleEnum[] {
        return this.roleListState.length > 0 ? this.roleListState : getCache<RoleEnum[]>(ROLES_KEY);
    }
    
    @Mutation
    commitResetState(): void {
        this.userInfoState = null;
        this.tokenState = [];
        this.roleListState = [];
    }
    
    @Mutation
    commitUserInfoState(info: UserInfo): void {
        this.userInfoState = info;
        if (info) {
            setLocal(USER_INFO_KEY, info, true);
        }
    }
    
    @Mutation
    commitRoleListState(roleList: RoleEnum[]): void {
        this.roleListState = roleList;
        setCache(ROLES_KEY, roleList);
    }
    @Mutation
    resetState(): void {
        this.userInfoState = null;
        this.tokenState = [];
        this.roleListState = [];
    }
    @Mutation
    commitTokenState(info: string[]): void {
        this.tokenState = info as [];
        setLocal(TOKEN_KEY, info, true);
    }
    
    /**
     * @description: login
     */
    @Action
    async login(params: LoginParams, goHome = true): Promise<GetUserInfoByUserIdModel | null> {
        try {
            const data = await loginApi(params);
            const {access_token, refresh_token} = data;
            // get user info
            this.commitTokenState([`Bearer ${access_token}`, `Bearer ${refresh_token}`]);
            const userInfo = await this.getUserInfoAction();
            goHome && (await router.push(PageEnum.BASE_HOME).then(() => {
                setTimeout(() => {
                    appStore.commitPageLoadingState(false);
                }, 30);
            }));
            return userInfo;
        } catch (error) {
            return null;
        }
    }
    
    @Action
    async getUserInfoAction() {
        const userInfo = await getUserInfoById();
        this.commitUserInfoState(userInfo);
        /*const {role} = userInfo;
        const roleList = [role.value] as RoleEnum[];
        this.commitRoleListState(roleList);*/
        return userInfo;
    }
    
    /**
     * @description: login out
     */
    @Action
    async loginOut(goLogin = false) {
        goLogin && router.push(PageEnum.BASE_LOGIN);
    }
    
    /**
     * @description: Confirm before logging out
     */
    @Action
    async confirmLoginOut() {
        const { createConfirm } = useMessage();
        const { t } = useI18n('sys.app');
        createConfirm({
            iconType: 'warning',
            title: t('loginOutTip'),
            content: t('loginOutMessage'),
            onOk: async () => {
                await this.loginOut(true);
            },
        });
    }
}
export const userStore = getModule<User>(User);
