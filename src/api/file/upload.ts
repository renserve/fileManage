import {defHttp} from '/@/utils/http/axios';
import {UploadFileParams} from "/@/utils/http/axios/types";
// import {} from './model/uploadModel';
enum Api {
    uploadImg='/cms/file',
    uploadBigImg='/cms/bigfile',
    FileGroup='/cms/file_group',
    FileGroupOperate='/cms/file_group/file',
    RecoverFileGroupOperate='/cms/file_group/recover/file',
}
export function getFileGroupType(type,params) {
    return defHttp.request({
            url: Api.FileGroupOperate,
            method: 'GET',
            params:{type,...params}
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function addFileGroup(type,params) {
    return defHttp.request({
            url: Api.FileGroupOperate,
            method: 'POST',
            params:{type,...params}
        }
    );
}
export function recoverFileGroup(type,params) {
    return defHttp.request({
            url: Api.RecoverFileGroupOperate,
            method: 'PUT',
            params:{type,...params}
        }
    );
}
export function deleteFileGroup(type,params) {
    return defHttp.request({
            url: Api.FileGroupOperate,
            method: 'DELETE',
            params:{type,...params}
        }
    );
}
export function updateTitle(params) {
    return defHttp.request(
        {
            url: Api.FileGroupOperate,
            method: 'PUT',
            params
        }
    );
}
//
export function getFileGroup(params) {
    return defHttp.request({
            url: Api.FileGroup,
            method: 'GET',
            params
        },
        {
            isTransformRequestResult: false
        }
    );
}
export function saveFileGroup(params) {
    return defHttp.request({
            url: Api.FileGroup,
            method: 'POST',
            params
        }
    );
}
export function updateFileGroup(params) {
    return defHttp.request({
            url: Api.FileGroup+ '/'+params.id,
            method: 'PUT',
            params
        }
    );
}
export function delFileGroup(id,type) {
    return defHttp.request(
        {
            url: Api.FileGroup + '/'+id,
            method: 'delete'
        }
    );
}


export function bigUploadApi(
    params: UploadFileParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
) {
    return defHttp.uploadFile(
        {
            url: Api.uploadBigImg,
            onUploadProgress,
        },
        params
    );
}
export function uploadApi(
    params: UploadFileParams,
    onUploadProgress: (progressEvent: ProgressEvent) => void
) {
    return defHttp.uploadFile(
        {
            url: Api.uploadImg,
            onUploadProgress,
        },
        params
    );
}
