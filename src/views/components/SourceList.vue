<template>
    <div class="fileWrapper">
        <template v-for="(item,index) in showFileList">
            <div v-if="!((index-gapGroup) % gapGroup) || !index" class="quickSelect">
                <a-checkbox
                    :key="item.id"
                    v-model:checked="checkList[Math.ceil((index+1)/gapGroup)-1]"
                    :indeterminate="indeterminate[Math.ceil((index+1)/gapGroup)-1]"
                    @change="e=>onCheckAllChange(e,index)"
                >
                    一键勾选
                </a-checkbox>
            </div>
            <div class="fileListGroup">
                <a-checkbox :key="item.id" :checked="fileIds.includes(item.id)" @change="e=>onChange(e,index,item.id)">
                    <div class="fileItem">
                        <img :src="fileType[type].img || item.path" :alt="item.path">
                    </div>
                    <div class="name">
                        <a-input v-model:value="item.title">
                            <template #addonAfter>
                                <div @click.prevent="handleSave(item.id,item.title)">
                                    <span style="margin-right: 8px;">{{item.path.substring(item.path.lastIndexOf('.'))}}</span>
                                    <CheckOutlined />
                                </div>
                            </template>
                        </a-input>
                    </div>
                </a-checkbox>
                <a-button @click="fileType[type].fun(index)" size="small">
                    {{filePath===item.path?'暂停':fileType[type].text}}
                </a-button>
            </div>
        </template>
        <BasicModal :width="700" @cancel="handleCancel" :canFullscreen="false" v-if="type==='video'" @register="register" :footer="null" v-bind="$attrs" :title="fileType.video.title">
            <video v-if="filePath" id="videoWrapper" class="video-js vjs-big-play-centered" controls data-setup="{}">
                <source :src="filePath">
            </video>
        </BasicModal>
        <audio v-if="type==='audio'" :src="filePath" ref="music" loop="loop" hidden></audio>
    </div>
</template>


<script>
import {
    CheckOutlined
} from '@ant-design/icons-vue';
import {BasicModal, useModal} from '/@/components/Modal';
import {
    updateTitle
} from '/@/api/file/upload';
import { createImgPreview } from '/@/components/Preview/index';
import txtPng from '/@/assets/images/KHCFDC_TXT.png'
import videoPng from '/@/assets/images/video.png'
import audioPng from '/@/assets/images/audio.png'
export default {
    name: "FileList",
    props: ['showFileList','gapGroup','type'],
    data(){
        return {
            filePath:'',
            fileType:{
                'txt':{
                    img:txtPng,
                    text:'下载',
                    fun:(index)=>{
                        window.location.href=this.showFileList[index].path
                    }
                },
                'img':{
                    text:'预览',
                    fun:(index)=>{
                        return this.handlePreview(index)
                    }
                },
                'video':{
                    title:'视频播放',
                    img:videoPng,
                    text:'播放',
                    fun:(index)=>{
                        this.openModal()
                        this.fileType.video.title=this.showFileList[index].title
                        this.filePath=this.showFileList[index].path
                        this.$nextTick(()=>{
                            videojs("videoWrapper");
                        })
                    }
                },
                'audio':{
                    img:audioPng,
                    text:'播放',
                    fun:(index)=>{
                        if(this.filePath){
                            this.filePath=''
                            this.$nextTick(()=>{
                                this.$refs.music.pause()
                            })
                        }else {
                            this.filePath=this.showFileList[index].path
                            this.$nextTick(()=>{
                                this.$refs.music.play()
                            })
                        }
                    }
                }
            },
            checkList:[],
            indeterminate:[],
            fileIds:[]
        }
    },
    components:{
        CheckOutlined,BasicModal
    },
    setup(){
        const [register, { openModal}] = useModal();
        return {
            register,
            openModal
        }
    },
    methods:{
        handleCancel(){
            console.log('取消')
            this.filePath=''
        },
        handleSave(id,title){
            updateTitle({id,title,type:this.type})
        },
        handlePreview(index) {
            //定位到某一张
            createImgPreview({ imageList: this.showFileList.map(i=>i.path),index });
        },
        getSelect(){
            return this.fileIds.filter(i=>i)
        },
        resetSelect(){
            this.checkList=this.checkList.map(i=>false)
            this.indeterminate=this.indeterminate.map(i=>false)
            this.fileIds=[]
        },
        onCheckAllChange(e,index){
            const ids=this.showFileList.map(i=>i.id).slice(index,index+this.gapGroup)
            this.checkList[index]=e.target.checked
            this.indeterminate[index]=false
            if(e.target.checked){
                this.fileIds.splice(index,this.gapGroup,...ids)
            }else {
                this.fileIds.splice(index,this.gapGroup,...Array(this.gapGroup))
            }
            console.log(this.fileIds,'this.fileIds')
        },
        onChange(e,index,id){
            if(e.target.checked){
                this.fileIds[index]=id
            }else {
                this.fileIds[index]=null
            }
            const _sub=Math.ceil((index+1)/this.gapGroup)-1
            const length=this.fileIds.slice(_sub,_sub+this.gapGroup).filter(i=>i).length
            if(length===this.gapGroup){
                this.indeterminate[_sub]=false
                this.checkList[_sub]=true
            }else {
                this.indeterminate[_sub]=!!length
                this.checkList[_sub]=false
            }
        },
    }
}
</script>

<style scoped lang="less">
.video-js {
    width: 100%;
    height: 400px;
}
.fileWrapper {
    .quickSelect{
        padding: 10px;
        border-bottom: 1px solid #E9E9E9;
    }
    .fileListGroup {
        display: inline-block;
        margin: 10px;
        width: 180px;
        height: 180px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        position:relative;
        button {
            position: absolute;
            right: 0px;
            top: 0px;
        }
        /*&:hover button{
            display: block;
        }*/
        :deep(.ant-input){
            padding: 0!important;
        }
        :deep(.ant-checkbox-wrapper) {
            vertical-align: top;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .ant-checkbox {
                width: 0;
                flex: 0;
            }
            >span:last-child {
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: space-around;
                .fileItem {
                    height: 100px;
                    text-align: center;
                    line-height: 100px;
                    img {
                        vertical-align: middle!important;
                        max-width: 100%;
                        max-height: 100%;
                        overflow: hidden;
                    }
                }
                .ant-input-group-addon {
                    padding: 0!important;
                }
                .name {
                    overflow: hidden;
                    //direction: rtl;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>