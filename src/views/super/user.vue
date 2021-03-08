<template>
    <div>
        <a-button type="primary" @click="rowAdd($refs.Dialog)">新增{{relyObject.append}}</a-button>
        <BasicTable @register="registerTable">
            <template #create_time="{record}">
                {{record.create_time}}
            </template>
            <template #operate="{ record }">
                <a-button class="mr_btn" size="small" shape="round" type="primary" @click="rowEdit($refs.Dialog,record)">编辑</a-button>
                <a-button :disabled="record.group_id===1" size="small" shape="round" type="danger" @click="rowDelete(record.id)">删除</a-button>
            </template>
        </BasicTable>
        <Dialog ref="Dialog"
                @rowSave="rowSave" :title="relyObject.title"
                @register="registerDialog" />
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive} from 'vue';
import {
    getUserList,
    saveUser,
    delUser,
    chanegUser, getGroupAll
} from '/@/api/super/user'
import {groupColumns, userColumns} from './tableData';
import {provide} from 'vue';
import {getFormColumn, getTableColumn, useTableMixin} from "/@/mixins/hooks/useTable";
import {BasicTable} from "/@/components/Table";
import Dialog from "/@/views/components/Dialog.vue";
export default defineComponent({
    components:{
        BasicTable,
        Dialog
    },
    setup(props,context) {
        const schemas=reactive(getFormColumn(userColumns))
        getGroupAll().then(res=>{
            schemas.find(i=>i.field==='group_id').componentProps.options=res.map(i=>{
                return {label:i.name,value:i.id}
            })
        })
        provide('schemas',schemas)
        const tableConfig={
            api:getUserList,
            title:"用户",
            columns: getTableColumn(userColumns)
        }
        const methodsApi={
            rowSaveApi:saveUser,
            rowEditApi:chanegUser,
            rowDeleteApi:delUser,
        }
        const relyObject=reactive({
            id:null,
            append:'用户',
            title:'新增用户'
        })
        const [{registerTable},{registerDialog},{rowDelete,rowSave,rowEdit,rowAdd}]=useTableMixin({
            ...tableConfig,
            ...methodsApi,
            relyObject,
        })
        return {
            registerTable,
            registerDialog,
            rowDelete,rowSave,rowEdit,rowAdd,
            relyObject
        };
    },
});
</script>
