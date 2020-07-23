import Vue from 'vue'
import VueRouter from 'vue-router'
import {hasToken} from "../utils/auth";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect:'/home'
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
        children:[{
            path:'info',
            component:() => import( '../views/pc/user-info'),
        },{
            path:'user-vip',
            component:() => import( '../views/pc/user-vip'),
        },{
            path:'download',
            component:() => import( '../views/pc/user-download'),
        },{
            path:'recommend-vip',
            component:() => import( '../views/pc/user-recommend-vip'),
        },{
            path:'update-password',
            component:() => import( '../views/pc/user-update-password'),
        },{
            path:'recommend',
            component:() => import( '../views/pc/user-recommend'),
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
        path: '/mobile/user-info',
        name: 'MobileUserInfo',
        component: () => import( '../views/mobile/user-info')
    },
    {
        path: '/mobile/user-vip',
        name: 'UserVip',
        component: () => import( '../views/mobile/user-vip')
    },
    {
        path: '/mobile/user-download',
        name: 'UserDownload',
        component: () => import( '../views/mobile/user-download')
    },
    {
        path: '/mobile/user-password',
        name: 'UserPassword',
        component: () => import( '../views/mobile/user-password')
    },
    {
        path: '/mobile/recommend-vip',
        name: 'MobileUserRecommendVip',
        component: () => import( '../views/mobile/user-recommend-vip')
    },
    {
        path: '/mobile/recommend-register',
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

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


/**
 * start
 * 导航守卫配置
 * **/
const whiteList = ['/login', '/register', '/forget'] // 路由白名单
router.beforeEach(function(to,from,next){
    let isMobile=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if(hasToken()){
            next()
        }else {
            next('/login')
        }
    }


    //跳转失败页面
    //next({ path: '/error', replace: true, query: { noGoBack: true }})
})
/**
 * end
**/
export default router
