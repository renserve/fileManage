import {useMessage} from '/@/hooks/web/useMessage';
import {useTable} from "/@/components/Table";
import {useModal} from "/@/components/Modal";
import {UseMixinReturnType,ApiFnAndTableProps} from "./table";
const {createConfirm} = useMessage();
import {BasicColumn} from '/@/components/Table/src/types/table';
import {sortBy} from "lodash-es";

export function getTableColumn(columns:BasicColumn[]):BasicColumn[] {
    return columns.filter(i=>!i.hide)
}
export function getFormColumn(columns:BasicColumn[]):BasicColumn[] {
    return sortBy(columns.filter(i=>i.display!==false).map(i=>{
        !i.component && (i.component='Input')
        !i.order && (i.order=0)
        return i
    }),'order')
}
export function useTableMixin(props?: ApiFnAndTableProps): UseMixinReturnType{
    const [registerTable,{reload,getDataSource,isInit}]=useTable(props)
    const [registerDialog, { openModal, transferModalData ,closeModal}] = useModal();
    function showConfim(msg?:string){
        return new Promise(resolve => {
            createConfirm({
                iconType:'warning',
                title: msg || `确认执行？`,
                onOk() {
                    resolve(true)
                }
            });
        })
    }
    function rowDelete(id,msg){
        showConfim(msg).then(res=>{
            props.rowDeleteApi(id).then(res=>{
                reload({page:1})
            })
        })
    }
    function rowSave(form){
        if(props.relyObject.id){
            form.id=props.relyObject.id
            // console.log(props.rowEditApi,'form.id')
            props.rowEditApi(form).then(res=>{
                closeModal();
                reload({page:1})
            })
        }else {
            props.rowSaveApi(form).then(res=>{
                closeModal();
                reload({page:1})
            })
        }
    }
    function rowEdit(that,form,title) {
        props.relyObject.id=form.id
        // console.log(props.relyObject,'props.relyObject')
        props.relyObject.title=title || '编辑'+(props.relyObject.append || '')
        openModal();
        setTimeout(()=>{
            that.resetFields()
            //todo 触发watchEffect
            form=Object.assign({},form)
            transferModalData(form);
        },0)
    }
    function rowAdd(that,form={},title) {
        props.relyObject.id=null
        props.relyObject.title=title || '新增'+(props.relyObject.append || '')
        openModal();
        setTimeout(()=>{
            that.resetFields()
            const addForm= {...(props.relyObject.initForm || {}),...form}
            props.relyObject.initForm && transferModalData(Object.assign({},addForm));
        },0)
    }
    return [
        {registerTable,reload,getDataSource,isInit},
        {registerDialog,openModal,transferModalData,closeModal},
        {rowDelete,rowSave,rowEdit,rowAdd}
    ]
}