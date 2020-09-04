<template>
    <div class="page">
        <MobileHeader></MobileHeader>
        <div class="container">
            <div class="info" @click="$router.push('/mobile/user/user-info')" :style="'background-image: url('+backImg+')'">
                <div class="left">
                    <div class="avatar"  :style="'background-image: url('+baseUrl+userInfo.avatar+')'"></div>
                    <div class="user-info">
                        <div class="line1">{{userInfo.user_nickname}}</div>
                        <div class="line2">ID：{{userInfo.popularize}}</div>
                    </div>
                </div>
                <div class="right">
                    <img src="../../../public/images/more1.png" alt="">
                </div>
            </div>
            <div class="items">
                <div class="item" @click="$router.push('/mobile/user/user-vip')">
                    <div class="left">
                        <img class="img1"  src="../../../public/images/n1.png" alt="">
                        <span>我的VIP</span>
                    </div>
                    <div class="right">
                        <img src="../../../public/images/more2.png" alt="">
                    </div>
                </div>
                <div class="item" @click="$router.push('/mobile/user/user-download')">
                    <div class="left">
                        <img class="img2"  src="../../../public/images/n2.png" alt="">
                        <span>下载清单</span>
                    </div>
                    <div class="right">
                        <img src="../../../public/images/more2.png" alt="">
                    </div>
                </div>
<!--                <div class="item" @click="$router.push('/mobile/user/recommend-register')">-->
<!--                    <div class="left">-->
<!--                        <img class="img3"  src="../../../public/images/n3.png" alt="">-->
<!--                        <span>推广注册</span>-->
<!--                    </div>-->
<!--                    <div class="right">-->
<!--                        <img src="../../../public/images/more2.png" alt="">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="item" @click="$router.push('/mobile/user/recommend-vip')">-->
<!--                    <div class="left">-->
<!--                        <img class="img4"  src="../../../public/images/n4.png" alt="">-->
<!--                        <span>推广VIP</span>-->
<!--                    </div>-->
<!--                    <div class="right">-->
<!--                        <img src="../../../public/images/more2.png" alt="">-->
<!--                    </div>-->
<!--                </div>-->
                <div class="item" @click="$router.push('/mobile/user/user-password')">
                    <div class="left">
                        <img class="img5"  src="../../../public/images/n5.png" alt="">
                        <span>修改密码</span>
                    </div>
                    <div class="right">
                        <img src="../../../public/images/more2.png" alt="">
                    </div>
                </div>
            </div>
            <div class="button">
                <el-button type="primary" @click="loginOut">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import MobileHeader from '@/components/mobile/Header'
    import {userLoginOut} from "../../api/pc/api";
    export default {
        name: "MobileUser",
        components:{
            MobileHeader
        },
        data(){
            return{
                baseUrl: this.$baseUrl,
                baseHost: this.$baseHost+'/home/upload/index',
                backImg:require('../../../public/images/user-back.png'),
                avatar:require('../../../public/images/avatar.gif'),
                userInfo:{
                    user_email:'',
                    create_time:'',
                    more:'',
                    user_url:'',
                    user_nickname:'',
                    avatar:''
                },
                Formtoken:{
                    token:localStorage.getItem('token')
                }
            }
        },
        methods:{
            loginOut(){
                let that = this
                userLoginOut({
                    token:localStorage.getItem('token')
                }).then(res=>{
                    localStorage.clear()
                    that.$router.push({
                        path:'/mobile/login'
                    })
                })
            }

        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';

            let that = this
            let user_info=''
            if(localStorage.getItem('user_info')){
                user_info = JSON.parse(localStorage.getItem('user_info'))
            }
            let token = localStorage.getItem('token')
            if (user_info && token) {
                that.userInfo=user_info
            } else {
                Dialog.confirm({
                    title: '提示',
                    message: '请先去登录',
                    cancelButtonText:'返回首页',
                    confirmButtonText:'去登录'
                })
                    .then(() => {
                        that.$router.push({
                            path: '/login'
                        })
                    })
                    .catch(() => {
                        that.$router.push({
                            path: '/home'
                        })
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .page{
@include max-width;
        @include full-page;
        background-color: rgba(246,246,246,1);
        box-sizing: border-box;
        overflow: scroll;
        .container{
            width: 100%;
            padding: 0.133rem 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .info{
                padding: 0.267rem 0.4rem;
                box-sizing: border-box;
                margin-top: 0.133rem;
                width: 100%;
                height:2.667rem;
                border-radius:0.267rem;
                @include back-img-center;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .left{
                    width: calc(100% - 0.227rem );
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    .avatar{
                        width:1.067rem;
                        height:1.067rem;
                        border-radius:50%;
                        @include back-img-center;
                    }
                    .user-info{
                        padding-left: 0.267rem;
                        box-sizing: border-box;
                        width: calc(100% - 1.067rem);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .line1{
                            font-size:0.32rem;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            margin-bottom: 0.133rem;
                        }
                        .line2{
                            font-size:0.24rem;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
                .right{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    img{
                        width:0.227rem;
                        height:0.387rem;
                    }
                }
            }
            .items{
                margin-top: 0.267rem;
                width: 100%;
                background:rgba(255,255,255,1);
                border-radius:0.267rem;
                display: flex;
                flex-direction: column;

                .item:last-child{
                    border-bottom: none;
                }
                .item{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.4rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(230,230,230,1);
                    .left{
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .img1{
                            width:0.52rem;
                            height:0.44rem;
                        }
                        .img2{
                            width:0.533rem;
                            height:0.533rem;
                        }
                        .img3{
                            width:0.52rem;
                            height:0.533rem;
                        }
                        .img4{
                            width:0.507rem;
                            height:0.48rem;
                        }
                        .img5{
                            width:0.533rem;
                            height:0.533rem;
                        }
                        span{
                            margin-left: 0.3rem;
                            font-size:0.32rem;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                        }
                    }
                    .right{
                        height: 100%;
                        display: flex;
                        align-items: center;
                        img{
                            width:0.227rem;
                            height:0.387rem;
                        }
                    }
                }
            }
            .button {
                margin-top: 0.5rem;
                width: 100%;
                display: flex;
                justify-content: center;

                .el-button {
                    background:rgba(255,218,68,1);
                    border: none;
                    width:3.2rem;
                    height:1.067rem;
                    font-size:0.32rem;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                }
            }
        }
    }

</style>