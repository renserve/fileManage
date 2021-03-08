<template>
    <div>
        <FileCrud type="img" title="图片" :max-size="10" :accept="['gif','jpg','jpeg','png','webp','tiff','swf']"></FileCrud>
    </div>
</template>
<script lang="ts">
import FileCrud from "/@/views/components/FileCrud.vue";
import {defineComponent} from "vue";

export default defineComponent({
    components:{FileCrud}
})
</script>