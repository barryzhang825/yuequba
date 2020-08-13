import request from '@/utils/request'

export function LoginWithBaidu(data) {
    return request({
        url: '/home/Baidulogin/index',
        method: 'get',
        params:data
    })
}
export function userLogin(data) {
    return request({
        url: '/home/login/doLogin',
        method: 'post',
        data
    })
}
export function userLoginOut(data) {
    return request({
        url: '/home/login/logout',
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
export function updatePassword(data) {
    return request({
        url: '/home/login/upPass',
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
export function getUserinfo(data) {
    return request({
        url: '/home/user/index',
        method: 'get',
        params:data
    })
}
export function getUserVip(data) {
    return request({
        url: '/home/user/getMyBuyVipList',
        method: 'get',
        params:data
    })
}
export function getDownloadList(data) {
    return request({
        url: '/home/user/getMyDownLog',
        method: 'get',
        params:data
    })
}
export function getRecommentList(data) {
    return request({
        url: '/home/user/getMyPopularizeUser',
        method: 'get',
        params:data
    })
}
export function getRecommentVip(data) {
    return request({
        url: '/home/user/getMyPopularizeVipList',
        method: 'get',
        params:data
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
export function getArticleResource(data) {
    return request({
        url: '/home/article/getArticleResource',
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

export function updateUserinfo(data) {
    return request({
        url: '/home/user/postUser',
        method: 'post',
        data
    })
}
export function buyVip(data) {
    return request({
        url: '/home/pay/addVipOrder',
        method: 'post',
        data
    })
}
export function sendEmail(data) {
    return request({
        url: '/home/login/sendEmailCode',
        method: 'post',
        data
    })
}









