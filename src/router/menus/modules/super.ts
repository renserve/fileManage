import type {MenuModule} from '/@/router/types.d';

const superMenu: MenuModule = {
    orderNo: 20,
    menu: {
        name: '权限管理',
        path: '/super',
        children: [
            {
                path: '/user',
                name: '用户管理',
            },
            {
                path: '/group',
                name: '分组管理',
            }
        ],
    },
};
export default superMenu;
