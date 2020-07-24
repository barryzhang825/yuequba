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
export function forgetPassword(data) {
    return request({
        url: '/home/login/passwordReset',
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
export function getArticleDetail(data) {
    return request({
        url: '/home/article/detail',
        method: 'get',
        params:data
    })
}
export function getCommentList(data) {
    return request({
        url: '/home/postcomment/getPostCommentList',
        method: 'get',
        params:data
    })
}
export function likeArticle(data) {
    return request({
        url: '/home/article/doLike',
        method: 'post',
        data
    })
}

export function getVipList(data) {
    return request({
        url: '/home/viprule/index',
        method: 'get',
        params:data
    })
}
export function doComment(data) {
    return request({
        url: '/home/postcomment/addComment',
        method: 'post',
        data
    })
}











