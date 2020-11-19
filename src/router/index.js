import Vue from 'vue'
import VueRouter from 'vue-router'
import {hasToken} from "../utils/auth";
import fa from "element-ui/src/locale/lang/fa";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import( '../views/pc/home'),
    },
    {
        path: '/result',
        name: 'Result',
        component: () => import( '../views/pc/result'),
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import( '../views/pc/category')
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import( '../views/pc/detail')
    },
    {
        path: '/teach-detail',
        name: 'TeachDetail',
        component: () => import( '../views/pc/teach-detail')
    },
    {
        path: '/purchase',
        name: 'Purchase',
        component: () => import( '../views/pc/purchase')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( '../views/pc/login')
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import( '../views/pc/forget')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import( '../views/pc/register')
    },
    {
        path: '/user',
        name: 'User',
        redirect: '/user/info',
        component: () => import( '../views/pc/user'),
        children: [{
            path: 'info',
            component: () => import( '../views/pc/user-info'),
        }, {
            path: 'user-vip',
            component: () => import( '../views/pc/user-vip'),
        }, {
            path: 'download',
            component: () => import( '../views/pc/user-download'),
        }, {
            path: 'recommend-vip',
            component: () => import( '../views/pc/user-recommend-vip'),
        }, {
            path: 'update-password',
            component: () => import( '../views/pc/user-update-password'),
        }, {
            path: 'recommend',
            component: () => import( '../views/pc/user-recommend'),
        }]
    },

    {
        path: '/mobile/register',
        name: 'MobileRegister',
        component: () => import( '../views/mobile/register')
    },
    {
        path: '/mobile/login',
        name: 'MobileLogin',
        component: () => import( '../views/mobile/login')
    },
    {
        path: '/mobile/forget',
        name: 'MobileForget',
        component: () => import( '../views/mobile/forget')
    },
    {
        path: '/mobile/home',
        name: 'MobileHome',
        component: () => import( '../views/mobile/home')
    },

    {
        path: '/mobile/purchase',
        name: 'UserPassword',
        component: () => import( '../views/mobile/purchase')
    },
    {
        path: '/mobile/result',
        name: 'MobileResult',
        component: () => import( '../views/mobile/result')
    },
    {
        path: '/mobile/category',
        name: 'MobileCategory',
        component: () => import( '../views/mobile/category')
    },
    {
        path: '/mobile/user',
        name: 'MobileUser',
        component: () => import( '../views/mobile/user')
    },
    {
        path: '/mobile/user/user-info',
        name: 'MobileUserInfo',
        component: () => import( '../views/mobile/user-info')
    },
    {
        path: '/mobile/user/user-vip',
        name: 'UserVip',
        component: () => import( '../views/mobile/user-vip')
    },
    {
        path: '/mobile/user/user-download',
        name: 'UserDownload',
        component: () => import( '../views/mobile/user-download')
    },
    {
        path: '/mobile/user/user-password',
        name: 'UserPassword',
        component: () => import( '../views/mobile/user-password')
    },
    {
        path: '/mobile/user/recommend-vip',
        name: 'MobileUserRecommendVip',
        component: () => import( '../views/mobile/user-recommend-vip')
    },
    {
        path: '/mobile/user/recommend-register',
        name: 'MobileUserRecommendRegister',
        component: () => import( '../views/mobile/user-recommend-register')
    },
    {
        path: '/mobile/notification',
        name: 'MobileNotification',
        component: () => import( '../views/mobile/notification')
    },
    {
        path: '/mobile/detail',
        name: 'MobileDetail',
        component: () => import( '../views/mobile/detail')
    },
    {
        path: '/mobile/teach-detail',
        name: 'MobileTeachDetail',
        component: () => import( '../views/mobile/teach-detail')
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


/**
 * start
 * 导航守卫配置
 * **/
const whiteList = ['/login', '/register', '/forget','/mobile/login', '/mobile/register', '/mobile/forget',] // 路由白名单
router.beforeEach(function (to, from, next) {
    const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    const hasMobile=to.fullPath.indexOf('/mobile')
    if(isMobile){
        localStorage.setItem('device','mobile')
    }else {
        localStorage.setItem('device','pc')
    }


    //判断是否设置为pc端展示
    const setDevice=localStorage.getItem('setDevice')
    if(setDevice=='pc'&&isMobile){
        if (hasMobile==-1) {
            next()
        }else if (hasMobile>-1) {
            let newPah = to.fullPath.replace(new RegExp("/mobile","g"),"");
            next(newPah)
        }
    }else {
        if (isMobile&&hasMobile==-1) {
            next('/mobile' + to.fullPath)
        }else if(!isMobile && hasMobile>-1){
            let newPah = to.fullPath.replace(new RegExp("/mobile","g"),"");
            next(newPah)
        } else {
            next()
        }
    }




    //跳转失败页面
    //next({ path: '/error', replace: true, query: { noGoBack: true }})
})
/**
 * end
 **/
export default router
