<template>
    <div>
        <a-button type="primary" @click="rowAdd($refs.Dialog)">新增{{relyObject.append}}</a-button>
        <BasicTable @register="registerTable">
            <template #create_time="{record}">
                {{record.create_time}}
            </template>
            <template #operate="{ record }">
                <a-button class="mr_btn" size="small" shape="round" type="primary" @click="dispatchModal(record.id)">
                    权限
                </a-button>
                <a-button class="mr_btn" size="small" shape="round" type="primary"
                          @click="rowEdit($refs.Dialog,record)">编辑
                </a-button>
                <a-button size="small" :disabled="record.id===1" shape="round" type="danger" @click="rowDelete(record.id)">删除</a-button>
            </template>
        </BasicTable>
        <BasicModal
            v-bind="$attrs"
            @register="register"
            @ok="dispatchBatch()"
            class="wrapper"
            width="50vw"
            title="权限分配"
        >
            <div class="item" v-for="i in permissionGroup">
                <div class="title">
                    <a-checkbox
                        v-model:checked="checkAll[i.value]"
                        :indeterminate="indeterminate[i.value]"
                        @change="e=>onCheckAllChange(e,i.value)"
                    >
                        {{i.label}}
                    </a-checkbox>
                </div>
                <a-checkbox-group v-model:value="checkedList[i.value]" :options="i.children" @change="e=>onChange(e,i.value)"/>
            </div>
        </BasicModal>
        <Dialog ref="Dialog"
                @rowSave="rowSave" :title="relyObject.title"
                @register="registerDialog"/>
    </div>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {
    getGroupAll,
    saveGroup,
    updateGroup,
    delGroup,
    DispatchPermission,
    DispatchRemoveList,
    GetPermission,
    GetPermissionId
} from '/@/api/super/user'
import {groupColumns} from './tableData';
import {useModalInner, BasicModal} from '/@/components/Modal';
import {useTableMixin, getFormColumn, getTableColumn} from '/@/mixins/hooks/useTable'
import {provide,ref} from 'vue';
import {BasicTable} from "/@/components/Table";
import Dialog from "/@/views/components/Dialog.vue";
import {flatten,difference} from 'lodash-es'
export default defineComponent({
    components: {
        BasicModal,
        BasicTable,
        Dialog
    },
    data() {
        return {
            group_id:null,
            hadCheckedList:[],
            checkedList: [[],[],[]],
            indeterminate: [false,false,false],
            checkAll: [false,false,false],
        };
    },
    methods: {
        onChange(e,index) {
            const options=this.permissionGroup[index].children
            this.checkAll[index] = e.length === options.length;
            this.indeterminate[index] = !!e.length && e.length < options.length;
        },
        onCheckAllChange(e,index) {
            this.checkedList[index]=e.target.checked ? this.permissionGroup[index].children : []
            this.indeterminate[index]=false
        },
        async dispatchBatch(){
            const select=flatten(this.checkedList)
            const addList=difference(select,this.hadCheckedList)
            const removeList=difference(this.hadCheckedList,select)
            removeList.length && await DispatchRemoveList({group_id:this.group_id,auths:removeList})
            addList.length && await DispatchPermission({group_id:this.group_id,auths:addList})
            this.closeModal()
        },
        dispatchModal(id) {
            this.group_id=id
            GetPermissionId(id).then(res => {
                const auths=res.auths.map(i=>Object.values(i)[0]).map(i=>i.map(v=>v.auth))
                this.hadCheckedList=flatten(auths)
                const authsKey=flatten(res.auths.map(i=>Object.keys(i)[0]))
                this.permissionGroup.map((i,index)=>{
                    const authIndex=authsKey.findIndex(v=>i.label===v)
                    if(authIndex>-1){
                        const len=auths[authIndex].length
                        this.indeterminate[index]=!!len && i.children.length !== len
                        this.checkAll[index] = i.children.length === len;
                        this.checkedList[index]=auths[authIndex]
                    }else {
                        this.checkAll[index]=false
                        this.indeterminate[index]=false
                        this.checkedList[index]=[]
                    }
                })
            })
            this.openModal()
        }
    },
    setup(props, context) {
        //todo 升序排列
        provide('schemas', getFormColumn(groupColumns))
        const tableConfig = {
            fetchSetting: {
                listField: null,
            },
            pagination: false,
            api: getGroupAll,
            title: "分组",
            columns: getTableColumn(groupColumns)
        }
        const relyObject = reactive({
            id: null,
            append: '分组',
            title: '新增分组'
        })
        const methodsApi = {
            rowSaveApi: saveGroup,
            rowEditApi: updateGroup,
            rowDeleteApi: delGroup,
        }
        let permissionGroup=ref([]);
        GetPermission().then(res => {
            permissionGroup.value = Object.keys(res).map((k, index) => {
                return  {
                    label: k,
                    value: index,
                    children: Object.keys(res[k])
                }
            })
        })
        const [register, {openModal, closeModal}] = useModalInner();
        const [{registerTable}, {registerDialog}, {rowDelete, rowSave, rowEdit, rowAdd}] = useTableMixin({
            ...tableConfig,
            ...methodsApi,
            relyObject,
        })
        return {
            register,
            closeModal,
            openModal,
            permissionGroup,

            registerTable,
            registerDialog,
            rowDelete, rowSave, rowEdit, rowAdd,
            relyObject
        };
    },
});
</script>
<style lang="less">
    .wrapper {
        .item {
            padding: 20px;
            border-bottom: 1px solid #E9E9E9;
            &:last-child{
                border: none;
            }
            .title {
                padding-bottom: 20px;
            }
        }
    }
</style>
