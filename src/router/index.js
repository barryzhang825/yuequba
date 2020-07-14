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
        path: '/login',
        name: 'Login',
        component: () => import( '../views/pc/login')
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
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
