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
        data
    })
}
export function getBannerList(data) {
    return request({
        url: '/home/slide/index',
        method: 'get',
        params:data
    })
}
export function getTagList(data) {
    return request({
        url: '/home/tag/index',
        method: 'get',
        params:data
    })
}
export function getArticleList(data) {
    return request({
        url: '/home/article/index',
        method: 'get',
        params:data
    })
}















