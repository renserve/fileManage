<template>
    <BasicModal @ok="dialogOk" v-bind="$attrs" @register="register" :title="title">
        <BasicForm @register="registerForm"/>
    </BasicModal>
</template>
<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form/index';
import {inject} from 'vue';
export default defineComponent({
    props:['title'],
    components: {BasicModal, BasicForm},
    setup(props, {emit}) {
        const schemas = inject("schemas");
        const [registerForm,{setFieldsValue,getFieldsValue,resetFields}] = useForm({
            labelWidth: 100,
            schemas,
            showActionButtonGroup: false,
            actionColOptions: {
                span: 24,
            },
        });
        const [register] = useModalInner(form=> {
            nextTick(() => {
                setFieldsValue(form);
            });
        });
        function dialogOk(){
            const sendFormData=getFieldsValue()
            emit('rowSave',sendFormData)
        }
        return {register,dialogOk, registerForm,resetFields};
    },
});
</script>
