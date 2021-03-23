<template>
    <div class="imgWrapper">
        <CollapseContainer :title="title+'上传'">
            <a-tooltip placement="top">
                <template #title>
                    <span>类型扩展</span>
                </template>
                <a-switch checked-children="开" un-checked-children="关" v-model:checked="fileExpand" />
            </a-tooltip>
            <BasicForm @register="register" @submit="handleSubmit"/>
            <div>
                <a-button v-if="isRecycle" class="mr_btn" type="primary" @click="batchRecover()">批量恢复</a-button>
                <a-button class="mr_btn" type="danger" @click="batchSubmit()">批量{{isRecycle ? '清空' : '删除'}}</a-button>
                <a-button :type="isRecycle?'primary':'default'" @click="getDeleteData()">
                    <div v-if="isRecycle">
                        <RollbackOutlined/>
                        返回
                    </div>
                    <div v-else>
                        <DeleteOutlined/>
                        回收站
                    </div>
                </a-button>
            </div>
        </CollapseContainer>
        <FileTree
            :leafData="leafData"
            :treeData="treeData"
            @currentClass="getCurrentList"
            @rowDelete="rowDelete"
            @rowAdd="record=>rowAdd($refs.Dialog,record)"
            @rowEdit="record=>rowEdit($refs.Dialog,Object.assign(relyObject.initForm,record))">
            <template v-if="leafData">
                <a-alert v-if="isRecycle" message="当前展示内容为回收站内容" banner/>
                <SourceList :type="type" ref="SourceList" :gapGroup="isRecycle?showFileList.length:6"
                          :showFileList="showFileList"></SourceList>
                <div class="loadMoreWrap" v-show="totalPage > sendData.page+1">
                    <a-button :loading="loading" size="large" block @click="loadMore()">加载更多...</a-button>
                </div>
            </template>
        </FileTree>
        <Dialog ref="Dialog"
                @rowSave="rowSave" :title="relyObject.title"
                @register="registerDialog"/>
        <BasicTable :isFake="true" @register="registerTable"></BasicTable>
    </div>
</template>
<script lang="ts">
import {DeleteOutlined, RollbackOutlined} from '@ant-design/icons-vue';
import {computed, defineComponent, provide, reactive, ref, getCurrentInstance} from 'vue';
import {CollapseContainer} from '/@/components/Container/index';
import {useMessage} from '/@/hooks/web/useMessage';
import {BasicForm, FormSchema, useForm} from '/@/components/Form/index';
import FileTree from '/@/views/components/FileTree.vue';
import Dialog from "/@/views/components/Dialog.vue";
import SourceList from "/@/views/components/SourceList.vue";
import {
    uploadApi, getFileGroup, updateFileGroup, delFileGroup, saveFileGroup,
    getFileGroupType, addFileGroup, deleteFileGroup, recoverFileGroup
} from '/@/api/file/upload';
import {useTableMixin, getFormColumn} from '/@/mixins/hooks/useTable'
import {BasicTable} from "/@/components/Table";
import {concat} from "lodash-es";

const {createWarningModal, createConfirm} = useMessage();
export default defineComponent({
    props: ['type', 'title','maxSize','accept'],
    components: {
        BasicForm,
        CollapseContainer,
        FileTree,
        Dialog,
        BasicTable,
        RollbackOutlined,
        DeleteOutlined,
        SourceList
    },
    data() {
        return {
            isRecycle: 0
        }
    },
    methods: {
        loadMore(){
            if(this.sendData.page+1<this.totalPage){
                this.sendData.page++
            }
            this.reloadFileList(false)
        },
        batchRecover() {
            const ids = this.$refs.SourceList.getSelect()
            const that = this
            if (!ids.length) {
                createWarningModal({content: `请选择需要恢复的${this.title}`})
            } else {
                createConfirm({
                    iconType: 'warning',
                    title: `确认批量恢复选中的${this.title}？`,
                    onOk() {
                        recoverFileGroup(that.type, {ids}).then(res => {
                            that.reloadFileList()
                        })
                    }
                });
            }
        },
        getDeleteData() {
            this.isRecycle = this.isRecycle ? 0 : 1
            this.sendData.isDelete = this.isRecycle
            this.reloadFileList()
        },
        batchSubmit() {
            const ids = this.$refs.SourceList.getSelect()
            const that = this;
            if (!ids.length) {
                createWarningModal({content: `请选择需要删除的${this.title}`})
            } else {
                createConfirm({
                    iconType: 'warning',
                    title: `确认批量${this.isRecycle ? '清空' : '删除'}选中的${this.title}？`,
                    onOk() {
                        deleteFileGroup(that.type, {ids, isClear: that.isRecycle}).then(res => {
                            that.reloadFileList()
                        })
                    }
                });
            }
        },
        getCurrentList(record) {
            const isFile = /file/.test(record.id)
            const folder_id = isFile ? record.parent_id : record.id
            this.setFieldsValue({
                folder_id
            })
            if (isFile) {
                this.showFileList = [{path: record.path, id: record.realId, name: record.name,title:record.title}]
            } else {
                this.sendData.page = 0
                this.sendData.folder_id = folder_id
                this.reloadFileList()
            }
        },
        handleSubmit(form) {
            console.log(form,'form')
            addFileGroup(this.type, form).then(res => {
                if (!res.error_code) {
                    this.resetFields()
                    this.setFieldsValue({
                        folder_id: this.sendData.folder_id
                    })
                }
                this.reloadFileList()
            })
        }
    },
    setup(props, content) {
        const tableConfig = {
            fetchSetting: {
                listField: null,
            },
            pagination: false,
            api: params => getFileGroup({...params, type: props.type}),
            title: "分组"
        }
        const fileExpand=ref(false)
        provide('schemas', getFormColumn([
            {
                label: '父类ID',
                field: 'parent_id',
                width: 120,
                disabled: true,
                rules: [{required: true, message: '请输入父类ID', type: 'number'}],
            },
            {
                label: '类型',
                field: 'type',
                component: 'RadioGroup',
                componentProps: {
                    options: [
                        {label: '图片', value: 'img'},
                        {label: '文本', value: 'txt'},
                        {label: '音频', value: 'audio'},
                        {label: '视频', value: 'video'},
                    ],
                },
                disabled: true,
                rules: [{required: true, message: '请输入文件类型'}],
            },
            {
                label: '文件夹名称',
                field: 'name',
                rules: [{required: true, message: '请输入文件夹名称'}],
            },
            {
                label: '文件夹描述',
                field: 'description'
            }
        ]))
        const relyObject = reactive({
            id: null,
            initForm: {
                parent_id: 0,
                type: props.type
            },
            title: '新增'
        })
        const methodsApi = {
            rowSaveApi: saveFileGroup,
            rowEditApi: updateFileGroup,
            rowDeleteApi: delFileGroup
        }
        const leafData = ref(null)
        const totalPage = ref(null)
        const showFileList = ref(null)
        const loading= ref(false)
        const sendData = reactive({page: 0, count: 30, folder_id: null, isDelete: 0})
        const instance = getCurrentInstance()
        provide('sendData',sendData)
        function reloadFileList(isReload=true) {
            if(isReload){
                sendData.page = 0;
            }
            loading.value=true;
            const FileListRef = instance.refs.SourceList
            FileListRef && FileListRef.resetSelect()
            getFileGroupType(props.type, sendData).then(res => {
                !sendData.page && (leafData.value = [])
                totalPage.value=res.total_page
                loading.value=false
                leafData.value = concat(leafData.value, res.items.map(item => {
                    return {
                        parent_id: item.folder_id,
                        name: item.path.split('/').pop(),
                        isLeaf: true,
                        title: item.title,
                        realId: item.id,
                        id: 'file_' + item.id,
                        key: 'file_' + item.id,
                        path: item.path
                    }
                }))
                showFileList.value = leafData.value.map(i => {
                    return {path: i.path, id: i.realId, name: i.name,title: i.title}
                })
            }).catch(()=>{
                loading.value=false
            })
        }

        reloadFileList()
        const [{registerTable, isInit, getDataSource}, {registerDialog}, {rowDelete, rowSave, rowEdit, rowAdd}] = useTableMixin({
            ...tableConfig,
            ...methodsApi,
            relyObject,
        })
        const treeData = computed(() => isInit() && getDataSource())
        const schemas: FormSchema[] = computed(() => {
            const options = isInit() && getDataSource() || []
            return [
                {
                    field: 'paths',
                    component: 'Upload',
                    label: `${props.title}上传`,
                    colProps: {
                        span: 8,
                    },
                    rules: [{required: true, message: `请选择${props.title}文件上传`}],
                    componentProps: {
                        maxSize:props.maxSize,
                        accept:fileExpand.value?[]:props.accept,
                        uploadParams:{data:{type: props.type}},
                        api: uploadApi,
                    },
                },
                {
                    field: 'folder_id',
                    colProps: {
                        span: 8,
                    },
                    rules: [{required: true, message: `请选择${props.title}所属文件分类`, type: 'number'}],
                    component: 'Select',
                    componentProps: {
                        options: options.map(i => {
                            return {label: i.name, value: i.id}
                        }),
                    },
                    disabled: true,
                    label: `${props.title}分类`,
                },
            ]
        });
        const [register, {setFieldsValue, resetFields}] = useForm({
            labelWidth: 130,
            schemas,
            actionColOptions: {
                span: 8,
            },
            // Reset button configuration
            resetButtonOptions: {
                text: '重新上传'
            },
            // Confirm button configuration
            submitButtonOptions: {
                text: '提交文件'
            },
        });
        return {
            sendData,
            leafData,
            loading,
            totalPage,
            fileExpand,
            showFileList,
            reloadFileList,
            register,
            setFieldsValue,

            resetFields,
            registerTable,
            treeData,
            registerDialog,
            rowDelete, rowSave, rowEdit, rowAdd,
            relyObject
        };
    },
});
</script>
<style lang="less" scoped>
.loadMoreWrap {
    margin-bottom: 50px;
}
:deep(.collapse-container__body) {
    display: flex;
    justify-content: space-between;

    form {
        max-width: 880px;
        flex: 1;
        margin-right: 100px;
    }

    button {
        flex: 0;
    }
}
</style>
