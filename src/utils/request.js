import Vue from 'vue'
import axios from 'axios'
import {getToken, hasToken} from "./auth";
import {  Message } from 'element-ui'
import  qs from 'qs'

//axios全局配置
const instance = axios.create({
    baseURL:"http://yuequba.zhengshangwl.com",
    timeout:5000,
    headers: {
        "accept": "application/json",
        'Content-Type': 'application/json',
    }
})
// 在发送请求之前做些什么("请求拦截器")
instance.interceptors.request.use(config => {
    //假设接口需要对接token，可以用store保存token,在拦截器中设置到header中

    // if(hasToken()){
    //     config.headers['X-Token'] = getToken()
    // }
    config.data=qs.stringify(config.data)
    console.log(config)

    return config;
}, error => {
    // 对请求错误做些什么
    //console.log(error)
});

instance.interceptors.response.use(
    response => {  //成功请求到数据
        if(response.data.code==1){
            return response
        }else{
            Message({
                message: response.data.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(response.data.msg|| 'Error'))
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
