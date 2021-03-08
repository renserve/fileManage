<template>
    <div>
        <FileCrud type="audio" title="音频" :max-size="1024" :accept="['mp3','wma','mpeg','mpeg4','midi']"></FileCrud>
    </div>
</template>
<script lang="ts">
import FileCrud from "/@/views/components/FileCrud.vue";
    import {defineComponent} from "vue";

    export default defineComponent({
        components:{FileCrud}
    })
</script>