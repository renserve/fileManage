<template>
    <div>
        <FileCrud type="video" title="视频" :max-size="1024*3" :accept="['mp4','mvb','webm','rmvb','flv','ogg','mpeg4']"></FileCrud>
    </div>
</template>
<script lang="ts">

import FileCrud from "/@/views/components/FileCrud.vue";
import {defineComponent} from "vue";
export default defineComponent({
    components:{FileCrud},
    data(){
        return {

        }
    }
})
</script>