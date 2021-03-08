import {ExtractPropTypes} from "vue";

export declare const ExpandColumnProps: {
    display: import("vue-types").VueTypeDef<boolean>;
    order: import("vue-types").VueTypeDef<number>;
    hide: import("vue-types").VueTypeDef<boolean>;
}
export declare type ExpandProps = Partial<ExtractPropTypes<typeof ExpandColumnProps>>;