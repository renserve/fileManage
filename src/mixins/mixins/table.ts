import {useMessage} from '/@/hooks/web/useMessage';
import {BasicTable,useTable} from "/@/components/Table";
import {useModal} from "/@/components/Modal";
import Dialog from "/@/views/components/Dialog.vue";
const {createConfirm} = useMessage();
export default {
    created() {
        //初始化表格
        const [baseTableOptions,{reload}]=useTable(this.tableConfig)
        this.getTableList=reload;
        this.baseTableOptions=baseTableOptions;
        const [register, { openModal, transferModalData ,closeModal}] = useModal();
        this.dialogConfigOptions={
            register,
            openModal,
            closeModal,
            transferModalData
        }
    },
    data() {
        return{
            baseTableOptions:null,
            dialogConfigOptions:null,
            getTableList:null,
        }
    },
    computed:{

    },
    components:{
        BasicTable,
        Dialog
    },
    mounted(){

    },
    methods: {
        showConfim(msg){
            return new Promise(resolve => {
                createConfirm({
                    iconType:'warning',
                    title: msg || `确认执行？`,
                    onOk() {
                        resolve(true)
                    }
                });
            })
        },
        rowDelete(id:number,msg){
            this.showConfim(msg).then(res=>{
                this.rowDeleteApi(id).then(res=>{
                    this.getTableList({page:1})
                })
            })
        },
        rowSave(form={} as any){
            if(this.dialogConfig.id){
                form.id=this.dialogConfig.id
                this.rowEditApi(form).then(res=>{
                    this.dialogConfigOptions.closeModal();
                    this.getTableList({page:1})
                })
            }else {
                this.rowSaveApi(form).then(res=>{
                    this.dialogConfigOptions.closeModal();
                    this.getTableList({page:1})
                })
            }
        },
        rowEdit(form,title) {
            this.dialogConfig.id=form.id
            this.dialogConfig.title=title || '编辑'+this.dialogConfig.append
            this.dialogConfigOptions.openModal();
            this.$nextTick(async ()=>{
                this.$refs.Dialog.resetFields()
                //todo 触发watchEffect
                form=Object.assign({},form)
                this.dialogConfigOptions.transferModalData(form);
            })
        },
        rowAdd(title) {
            this.dialogConfig.id=null
            this.dialogConfig.title=title || '新增'+this.dialogConfig.append
            this.dialogConfigOptions.openModal();
            this.$nextTick(()=>{
                this.$refs.Dialog.resetFields()
            })
        }
    }
}
