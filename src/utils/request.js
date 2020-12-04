import Vue from 'vue'
import axios from 'axios'
import {getToken, hasToken} from "./auth";
import {Message, MessageBox} from 'element-ui'
import qs from 'qs'
import router from '../router/index'
import {Dialog, Notify} from 'vant';

//axios全局配置
const instance = axios.create({
    // baseURL: "http://ds-z.com",
    baseURL: "http://yuequba.zhengshangwl.com",
    timeout: 5000,
    headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
instance.interceptors.request.use(config => {

    config.params = {
        token: hasToken() ? getToken() : '',
        ...config.params
    }
    config.data = qs.stringify(config.data)
    return config;

}, error => {
    //console.log(error)
});

instance.interceptors.response.use(
    response => {
        let that = this
        if (response.data.code == 200) {
            return response.data
        }else if (response.data.code == 201||response.data.code == 202) {
            const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            let text=''
            if(response.data.code==201){
                text='请开通Vip后重试'
            }else if(response.data.code==202){
                text='开通包年Vip可下载包年精选资源'
            }
            if(isMobile){
                Dialog.confirm({
                    title: '提示',
                    message: text,
                    confirmButtonText:'去开通',
                    cancelButtonText:'取消',
                })
                    .then(() => {
                        router.push({
                            path: '/mobile/purchase'
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
            }else {
                MessageBox.confirm('', {
                    message: text,
                    title: '提示',
                    confirmButtonText: '去开通',
                    cancelButtonText: '取消'
                }).then(action => {
                    router.push({
                        path: '/purchase'
                    })
                }).catch(err => {

                });
            }
            return response.data
        } else if (response.data.code == 2) {
            const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            if(isMobile){
                Dialog.confirm({
                    title: '提示',
                    message: '请先去登录',
                })
                    .then(() => {
                        router.push({
                            path: '/mobile/login'
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
            }else {
                MessageBox.confirm('', {
                    message: '请先去登录',
                    title: '提示',
                    confirmButtonText: '登录',
                    cancelButtonText: '取消'
                }).then(action => {
                    router.push({
                        path: '/login'
                    })
                }).catch(err => {

                });
            }

            return
        } else {
            const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            if(isMobile){
                Notify({ type: 'danger', message:  response.data.msg});
            }else {
                Message({
                    message: response.data.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }

            return Promise.reject(new Error(response.data.msg || 'Error'))
        }
    },
    error => {  //响应错误处理
        console.log('响应错误处理')
        console.log('err' + error) // for debug
        Message({
            message: error.data.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);
//将axios挂载到Vue的原型上
// Vue.prototype.$http = instance
export default instance
