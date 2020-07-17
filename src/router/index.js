import Vue from 'vue'
import VueRouter from 'vue-router'

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
            path:'vip',
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
    const hasToken = '123'
    console.log("进入守卫");
    console.log(to.path);

    let isMobile=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)



    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if(hasToken){
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
