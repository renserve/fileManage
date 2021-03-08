<template>
    <div>
        <FileCrud type="txt" title="文本" :max-size="100" :accept="['txt','doc','ppt','xls','pptx','xlsx','docx']"></FileCrud>
    </div>
</template>
<script lang="ts">
import FileCrud from "/@/views/components/FileCrud.vue";
import {defineComponent} from "vue";

export default defineComponent({
    components:{FileCrud}
})
</script>