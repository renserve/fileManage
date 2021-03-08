import {BasicColumn} from '/@/components/Table/src/types/table';

const userColumns:BasicColumn[]= [
    {
        label: '账号',
        field: 'username',
        width: 120,
    },
    {
        label: '昵称',
        field: 'nickname',
        width: 120,
    },
    {
        label: '分组',
        field: 'group_name'
    },
    {
        label: '分组',
        hide:true,
        field: 'group_id',
        component: 'RadioGroup',
        componentProps: {
            options: [],
        },
        order:1
    },
    {
        label: '邮箱',
        field: 'email',
    },
    {
        label: '密码',
        field: 'password',
        hide:true
    },
    {
        label: '确认密码',
        field: 'confirm_password',
        hide:true
    },
    {
        label: '创建时间',
        slots: { customRender: 'create_time' },
        display:false
    },
    {
        label: '操作',
        slots: { customRender: 'operate' },
        display:false
    }
]
const groupColumns:BasicColumn[]=[
    {
        label: '分组名称',
        field: 'name',
    },
    {
        label: '描述',
        field: 'info',
    },
    {
        label: '操作',
        slots: { customRender: 'operate' },
        display:false
    }
];
export {groupColumns,userColumns}

