<template>
    <div class="page">
        <div class="center">
            <div class="left">
                <img src="../../../public/images/logo.png" alt="">
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
                <div class="link"><a href="/login">登录</a> | <a href="/register">注册</a></div>
            </div>
        </div>
        <van-overlay :show="searchShow" >
            <div class="wrapper" @click.stop>
                <div class="close" @click="searchShow = false;searchWord=''">
                    <img src="../../../public/images/close2.png" alt="">
                </div>
                <div class="input">
                        <el-input v-model="searchWord" placeholder="请输入内容"></el-input>
                        <img src="../../../public/images/search.png" alt="" @click="toSearch">
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
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
                searchShow:false,
                searchWord:""
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

                        break;
                    }
                    case 3: {

                        break;
                    }
                    case 4: {

                        break;
                    }
                    case 5: {

                        break;
                    }
                    case 6: {

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
                console.log(this.searchWord)
                this.searchShow=false
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
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
                width: 200px;
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
                    color: $theme-color;

                    a {
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: 400;
                        color: $theme-color;
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