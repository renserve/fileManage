<template>
    <div class="fileWrapper">
        <div class="left">
            <a-card>
                <template #title>
                    <a-button size="small" class="mr_btn" type="primary" @click="rowAdd()">新增</a-button>
                    <a-button size="small" class="mr_btn" type="primary" @click="rowAdd(true)">添加</a-button>
                    <a-button size="small" class="mr_btn" type="primary" @click="rowEdit()">编辑</a-button>
                    <a-button size="small" type="danger" @click="rowDelete()">删除</a-button>
                </template>
                <a-directory-tree
                    :treeData="loadTreeData"
                    class="treeGroup"
                    ref="directoryTree"
                    :replaceFields="{
                        children:'children',
                        title:'name'
                    }"
                    :loadData="fakeLoadData()"
                    :loadedKeys="expandedKeys"
                    :selectedKeys="selectKey"
                    :expandedKeys="expandedKeys"
                    @select="onSelect">
                </a-directory-tree>
            </a-card>
        </div>
        <div class="right">
            <slot v-if="leafData"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect,ref,computed,nextTick} from "vue";
import {useMessage} from "/@/hooks/web/useMessage";
import {recursionTree,recursionId} from "/@/utils/tree"
import {concat} from 'lodash-es'
import {difference} from 'lodash-es'
const {createInfoModal,createWarningModal} = useMessage();
export default defineComponent({
    name: "FileTree",
    props: ['treeData','leafData'],
    setup(props) {
        const loadTreeData=ref(null)
        const expandedKeys=ref(null)
        const selectKey=ref([])
        watchEffect(() => {
            const treeData=props.treeData && props.treeData.map(item => {
                item.children = []
                item.key=String(item.id)
                return item
            }) || []
            if(treeData.length && props.leafData){
                const parentTree=treeData.filter(i=>!i.parent_id)
                const childrenTree=treeData.filter(i=>i.parent_id)
                loadTreeData.value =  recursionTree(parentTree,concat(childrenTree,props.leafData))
                let currentKey=selectKey.value[0]
                if(currentKey){
                    currentKey=/file/.test(currentKey)?props.leafData.find(i => i.key === currentKey).parent_id:currentKey
                    //永远为当前展开的ID
                    const hasParent=currentKey && treeData.find(i=>String(i.id)===String(currentKey))
                    if(hasParent){
                        expandedKeys.value=recursionId(String(currentKey),treeData)
                    }else {
                        expandedKeys.value=[String(currentKey)]
                    }
                }else {
                    expandedKeys.value=treeData.map(i=>String(i.id))
                }
            }else {
                loadTreeData.value=[]
            }
        });
        return {
            loadTreeData,
            expandedKeys,
            selectKey
        }
    },
    methods: {
        fakeLoadData(){
            return ()=>Promise.resolve(this.loadTreeData)
        },
        rowAdd(isAdd) {
            if(isAdd){
                const classId=Number(this.selectKey[0])
                const parent_id=this.treeData.find(i => i.id === classId).id
                this.$emit('rowAdd',{parent_id})
            }else {
                this.selectKey=[]
                this.$emit('rowAdd')
            }
        },
        rowDelete() {
            const classId=Number(this.selectKey[0])
            if (!classId) {
                if(this.selectKey[0]){
                    createWarningModal({content:'当前选择是文件而不是分类,请选择分类'})
                }else {
                    createInfoModal({content:'请选择分类'})
                }
            } else {
                this.$emit('rowDelete', classId)
            }
        },
        rowEdit() {
            const classId=Number(this.selectKey[0])
            if (!classId) {
                if(this.selectKey[0]){
                    createWarningModal({content:'当前选择是文件而不是分类,请选择分类'})
                }else {
                    createInfoModal({content:'请选择分类'})
                }            } else {
                this.$emit('rowEdit', this.treeData.find(i => i.id === classId))
            }
        },
        onSelect(keys) {
            let key=keys[0],record={id:Number(key)};
            if(/file/.test(key)){
                record=this.leafData.find(i => i.key === key)
            }
            console.log(record)
            this.selectKey =keys
            this.$emit('currentClass',record)
        }
    },
})
</script>
<style scoped lang="less">
.fileWrapper {
    display: flex;

    .left {
        .ant-card {
            max-width: 270px;
        }
        .treeGroup {
            width: 100%;
        }
        :deep(span.ant-tree-title) {
            width: 80px;
            overflow: hidden;
            direction: rtl;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
        }
    }

    .right {
        flex: 1;
    }
}
</style>