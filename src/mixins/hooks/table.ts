import {ModalProps} from "/@/components/Modal";
import {FetchParams, TableActionType} from "/@/components/Table";
import type { FormActionType } from '/@/components/Form/src/types/form';
import {BasicTableProps} from '/@/components/Table/src/types/table'
export interface ModalMethods {
    setModalProps: (props: Partial<ModalProps>) => void;
}
// crud集合
export interface CrudFn {
    rowDelete: (id:number,msg?:string) => void;
    rowSave: (params:any) => void;
    rowEdit: (that:FormActionType,params:any,title?:string) => void;
    rowAdd: (that:FormActionType,params:any,title?:string) => void;
}
export interface ApiFnAndTableProps extends BasicTableProps{
    rowDeleteApi?: (params?: any) => Promise<any>;
    rowSaveApi?: (params?: any) => Promise<any>;
    rowEditApi?:(params?: any) => Promise<any>;
    rowAddApi?: (title?:string) => Promise<any>;
    relyObject:any;
}
export interface TableFn {
    isInit:() => boolean;
    getDataSource:<T = any>() => T[];
    registerTable: (instance: TableActionType) => void;
    reload: (opt?: FetchParams) => Promise<void>;
}

export interface DialogFn {
    registerDialog:(modalMethods: ModalMethods, uuid?: string) => void;
    openModal: (props?: boolean) => void;
    transferModalData: (data: any) => void;
    closeModal: () => void;
}
export type UseMixinReturnType = [TableFn, DialogFn,CrudFn];