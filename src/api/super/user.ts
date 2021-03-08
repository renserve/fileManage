import {defHttp} from '/@/utils/http/axios';
import {
    LoginParams,
    LoginResultModel,
    UpdateUserModel,
    ChanegUserModel,
    GetUserInfoByUserIdModel,
    DispatchPermissionModel,
} from './model/userModel';
enum Api {
    Login = '/cms/user/login',
    GetUserInfoById = '/cms/user/information',
    GetUserList = '/cms/admin/users',
    SaveUser = '/cms/user/register',
    DelAndEditUser = '/cms/admin/',
    ChangeUser = '/cms/admin/user/update',
    //分组
    GetGroupAll = '/cms/admin/group/all',
    DelAndEditGroup = '/cms/admin/group/',
    SaveGroup = '/cms/admin/group',
    GetPermission='/cms/admin/authority',
    GetPermissionId='/cms/admin/group/',
    DispatchPermission='/cms/admin/dispatch/patch',
    DispatchRemoveList='/cms/admin/remove/patch',
}
//分组

export function DispatchRemoveList(params: DispatchPermissionModel) {
    return defHttp.request({
            url: Api.DispatchRemoveList,
            method: 'POST',
            params,
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function DispatchPermission(params: DispatchPermissionModel) {
    return defHttp.request({
            url: Api.DispatchPermission,
            method: 'POST',
            params,
        }
    );
}
export function GetPermission() {
    return defHttp.request({
            url: Api.GetPermission,
            method: 'GET',
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function GetPermissionId(id) {
    return defHttp.request({
            url: Api.GetPermissionId+id,
            method: 'GET',
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function getGroupAll() {
    return defHttp.request({
            url: Api.GetGroupAll,
            method: 'GET',
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function updateGroup(params: UpdateUserModel) {
    return defHttp.request(
        {
            url: Api.DelAndEditGroup+ params.id,
            method: 'put',
            params,
        }
    );
}
export function saveGroup(params) {
    return defHttp.request(
        {
            url: Api.SaveGroup,
            method: 'post',
            params
        }
    );
}
export function delGroup(id: number) {
    return defHttp.request(
        {
            url: Api.DelAndEditGroup + id,
            method: 'delete',
        }
    );
}
//用户
export function chanegUser(params: ChanegUserModel) {
    return defHttp.request(
        {
            url: Api.ChangeUser,
            method: 'put',
            params,
        }
    );
}
export function updateUser(params: UpdateUserModel) {
    return defHttp.request(
        {
            url: Api.DelAndEditUser+ params.id,
            method: 'put',
            params,
        }
    );
}
export function delUser(id: number) {
    return defHttp.request(
        {
            url: Api.DelAndEditUser + id,
            method: 'delete',
        }
    );
}

export function saveUser(params) {
    return defHttp.request(
        {
            url: Api.SaveUser,
            method: 'POST',
            params,
        }
    );
}

export function loginApi(params: LoginParams) {
    return defHttp.request<LoginResultModel>(
        {
            url: Api.Login,
            method: 'POST',
            params,
        },
        {
            isTransformRequestResult: false
        }
    );
}

export function getUserInfoById() {
    return defHttp.request<GetUserInfoByUserIdModel>({
            url: Api.GetUserInfoById,
            method: 'GET',
        },
        {
            isTransformRequestResult: false
        }
    );
}

export function getUserList(params) {
    return defHttp.request({
            url: Api.GetUserList,
            method: 'GET',
            params
        },
        {
            isTransformRequestResult: false
        }
    );
}

