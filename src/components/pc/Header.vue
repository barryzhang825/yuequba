<template>
    <div class="page">
        <div class="center">
            <div class="left">
                <img :src="siteInfo.site_logo" alt="">
            </div>
            <div class="middle">
                <div class="item" :class="menu===1?'selected':''" @click="goTo(1)">首页</div>
                <div class="item" :class="menu===2?'selected':''" @click="goTo(2)">主播区</div>
                <div class="item" :class="menu===3?'selected':''" @click="goTo(3)">美图区</div>
                <div class="item" :class="menu===4?'selected':''" @click="goTo(4)">视频区</div>
                <div class="item" :class="menu===5?'selected':''" @click="goTo(5)">包年精选区</div>
                <div class="item" :class="menu===6?'selected':''" @click="goTo(6)">购买专区</div>
                <div class="item" :class="menu===7?'selected':''" @click="goTo(7)">用户中心</div>
            </div>
            <div class="right">
                <img class="search" @click="searchShow = true" src="../../../public/images/search.png" alt="">
<!--                <div class="alert-box">-->
<!--                    <el-badge :value="1" class="item">-->
<!--                        <img class="alert" src="../../../public/images/alert.png" alt="">-->
<!--                    </el-badge>-->
<!--                </div>-->
                <div class="link" v-if="!user_nickname"><router-link to="/login">登录</router-link> | <router-link to="/register">注册</router-link></div>
                <div class="userinfo" v-if="user_nickname">
                    <div class="userinfo-left">
                        <router-link to="/user">{{user_nickname}}</router-link>
                        <div class="time-left" v-if="vipEndTime">{{vipEndTime}} VIP到期</div>
                    </div>
                    <div class="userinfo-middle">
                        |
                    </div>
                    <div class="userinfo-right">
                        <a @click="loginOut" style="cursor:pointer;">退出</a>
                    </div>
                </div>
            </div>
        </div>
        <van-overlay :show="searchShow" >
            <div class="wrapper" @click.stop>
                <div class="close" @click="searchShow = false;searchWord=''">
                    <img src="../../../public/images/close2.png" alt="">
                </div>
                <div class="input">
                        <el-input v-model="searchWord" placeholder="请输入内容"  @keyup.enter.native="toSearch"></el-input>
                        <img src="../../../public/images/search.png" alt="" @click="toSearch">
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import {formatTimeThree} from "../../utils/utils";
    import {fetchLogo} from "../../api/pc/api";

    export default {
        name: "Header",
        props: {
            menu: {
                type: Number,
                default: 1
            }
        },
        data(){
            return{
                siteInfo:{},
                vipEndTime:0,
                searchShow:false,
                searchWord:"",
                user_nickname:''
            }
        },
        methods: {
            goTo(num) {
                let path = ''
                switch (num) {
                    case 1: {
                        path = '/home'
                        break;
                    }
                    case 2: {
                        path = '/category?type=1'
                        break;
                    }
                    case 3: {
                        path = '/category?type=2'
                        break;
                    }
                    case 4: {
                        path = '/category?type=3'
                        break;
                    }
                    case 5: {
                        path = '/category?type=4'
                        break;
                    }
                    case 6: {
                        path = '/purchase'
                        break;
                    }
                    case 7: {
                        path = '/user'
                        break;
                    }
                }

                this.$router.push({
                    path: path
                })
            },
            toSearch(){
                if(this.searchWord!=''){
                    this.searchShow=false
                    //console.log(this.searchWord)
                    this.$router.push({
                        path:'/result?keyword='+this.searchWord
                    })
                    this.searchWord=''
                }
            },
            loginOut(){
                localStorage.clear()
                this.$router.push('/login')
            },
            fetchLogo(){
                let that = this
                let siteInfo=JSON.parse(localStorage.getItem('siteInfo'))
                if(siteInfo){
                    that.siteInfo=siteInfo
                }else {
                    fetchLogo().then(res=>{
                        that.siteInfo=res.data
                        localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    })
                }
            }
        },
        mounted() {
            if(localStorage.getItem('user_info')){
                this.user_nickname=JSON.parse(localStorage.getItem('user_info')).user_nickname
                let endTime=JSON.parse(localStorage.getItem('user_info')).vip_end_time
                if(endTime>0){
                    this.vipEndTime=formatTimeThree(endTime)
                }
            }
            this.fetchLogo()
            // console.log(localStorage.getItem('user_login'))
        }
    }
</script>

<style scoped lang="scss">
    .page {min-width:1200px;
        width: 100%;
        height: 100px;
        background-color: rgba(255, 255, 255, 1) !important;
        box-shadow: 0px 4px 8px 0px rgba(230, 230, 230, 0.35);

        .center {
            height: 100%;
            margin: 0 auto;
            width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
                height: 100%;
                display: flex;
                align-items: center;
                img {
                    width: 160px;
                }
            }

            .middle {
                width: 650px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;

                .item {
                    cursor: pointer;
                    height: 40px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #333333;
                    border-bottom: 2px solid #ffffff;
                }

                .selected {
                    color: $theme-color;
                    border-bottom: 2px solid $theme-color;
                }
            }

            .right {

                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .search {
                    cursor: pointer;
                    width: 27px;
                    height: 27px;
                }
                .alert-box {
                    cursor: pointer;
                    width: 24px;
                    height: 28px;
                    position: relative;

                    .alert {
                        width: 24px;
                        height: 28px;
                    }

                    .num {
                        width: 20px;
                        height: 20px;
                        background-color: #FF3158;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        position: absolute;
                        top: -5px;
                        right: -5px;

                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .link {
                    margin-left: 10px;
                    color: $theme-color;

                    a {
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: 400;
                        color: $theme-color;
                    }
                }
                .userinfo{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-left: 10px;
                    .userinfo-left{
                        color: black;
                        text-decoration: none;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        a{
                            font-size: 15px;
                            color: #333333;
                            text-decoration: none;
                        }
                        .time-left{
                            color: #666666;
                            text-decoration: none;
                            font-size: 10px;
                            margin-top: 5px;
                        }
                    }
                    .userinfo-middle{
                        padding: 0 5px;
                    }
                    .userinfo-right{
                        font-size: 15px;
                        a{
                            color: #333333;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
        .van-overlay{
            z-index: 9999;
            .wrapper{
                width: 600px;
                margin: 100px auto;
                .close{
                    width: 100%;
                    text-align: right;
                    margin: 30px 0;
                    img{
                        width: 33px;
                        height: 33px;
                        cursor: pointer;
                    }
                }
                .input{
                    margin: 0 auto;
                    width: 60%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    img{
                        width: 28px;
                        height: 28px;
                        position: relative;
                        left: -40px;
                        cursor: pointer;
                    }
                    /deep/ .el-input__inner{
                        padding-right: 50px;
                    }
                }
            }
        }
    }
</style>