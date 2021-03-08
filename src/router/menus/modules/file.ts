import type {MenuModule} from '/@/router/types.d';

const fileMenu: MenuModule = {
    orderNo: 20,
    menu: {
        name: '文件管理',
        path: '/file',
        children: [
            {
                path: '/img',
                name: '图片管理',
            },
            {
                path: '/txt',
                name: '文本管理',
            },
            {
                path: '/audio',
                name: '音频管理',
            },
            {
                path: '/video',
                name: '视频管理'
            },
        ],
    },
};
export default fileMenu;
