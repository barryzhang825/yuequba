import request from '@/utils/request'

export function userLogin(data) {
    return request({
        url: '/home/login/doLogin',
        method: 'post',
        data
    })
}

export function userRegister(data) {
    return request({
        url: '/home/register/doRegister',
        method: 'post',
        data: {
            a:123
        }
    })
}