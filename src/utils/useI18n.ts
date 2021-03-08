import { useI18n } from '/@/hooks/web/useI18n';
export default function (){
    return {
        t(str){
            const reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            const { t } = useI18n();
            return reg.test(str)?str:t(str)
        }
    }
}