/**
 * @description: Login interface parameters
 */
export interface LoginParams {
    username: string;
    password: string;
}
export interface UpdateUserPasswordModel {
    id: number
    new_password: string;
    confirm_password: string;
}

export interface ChanegUserModel extends UpdateUserModel{
    username: string;
    password?: string;
    confirm_password?: string;
}
export interface UpdateUserModel {
    id: number;
    email?: string;
    group_id?: number;
}
export interface RoleInfo {
    admin: number
    active: number
    group_id: number
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
    access_token: string;
    refresh_token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoByUserIdModel extends RoleInfo{
    id: number
    username: string
    nickname?: string
    avatar?: string
    email?: string
}
export interface DispatchPermissionModel {
    auth:any[],
    group_id:number
}
