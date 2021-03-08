import type {AppRouteModule} from '/@/router/types';

import {PAGE_LAYOUT_COMPONENT} from '/@/router/constant';

export default {
    layout: {
        path: '/file',
        name: 'File',
        component: PAGE_LAYOUT_COMPONENT,
        redirect: '/file/img',
        meta: {
            icon: 'iconfont icon-wenjian',
            title: '文件管理',
        },
    },
    routes: [
        {
            path: '/img',
            name: 'PageImg',
            component: () => import('/@/views/file/img.vue'),
            meta: {
                title: '图片管理',
            },
        },
        {
            path: '/txt',
            name: 'PageTxt',
            component: () => import('/@/views/file/txt.vue'),
            meta: {
                title: '文本管理',
            },
        },
        {
            path: '/video',
            name: 'PageVideo',
            component: () => import('/@/views/file/video.vue'),
            meta: {
                title: '视频管理',
            },
        },
        {
            path: '/audio',
            name: 'PageAudio',
            component: () => import('/@/views/file/audio.vue'),
            meta: {
                title: '音频管理',
            },
        },
    ],
} as AppRouteModule;
