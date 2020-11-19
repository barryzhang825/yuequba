<template>
    <div class="mobile-header-page">
        <div class="top">
            <img v-if="!ifShow" class="menu" src="../../../public/images/menu.png" @click="ifShow=true" alt="">
            <img v-if="ifShow" class="close" src="../../../public/images/close.png" @click="ifShow=false" alt="">
            <img class="logo" :src="siteInfo.site_logo" alt="">
            <img class="search" src="../../../public/images/search.png" @click="ifSearch=true">
        </div>

        <van-overlay :show="ifShow" @click="ifShow = false" >
            <div class="top">
                <img v-if="!ifShow" class="menu" src="../../../public/images/menu.png" @click="ifShow=true" alt="">
                <img v-if="ifShow" class="close" src="../../../public/images/close.png" @click="ifShow=false" alt="">
                <img class="logo" :src="siteInfo.site_logo" alt="">
                <img class="search" src="../../../public/images/search.png" alt="">
            </div>
            <div class="top-menu-box" @click.stop>
                <div class="top-menu-item" @click="goTo(1)">首页</div>
                <div class="top-menu-item" @click="goTo(2)">{{siteInfo.categorys[0].name}}</div>
                <div class="top-menu-item" @click="goTo(3)">{{siteInfo.categorys[1].name}}</div>
                <div class="top-menu-item" @click="goTo(4)">{{siteInfo.categorys[2].name}}</div>
                <div class="top-menu-item" @click="goTo(5)">{{siteInfo.categorys[3].name}}</div>
                <div class="top-menu-item" @click="goTo(6)">购买专区</div>
                <div class="top-menu-item" @click="goTo(7)">用户中心</div>
            </div>
        </van-overlay>

        <van-overlay class-name="van-overlay-search" :show="ifSearch" @click="ifSearch = false" >
            <div class="wrapper" @click.stop>
                <div class="close" @click="ifSearch = false;searchWord=''">
                    <img src="../../../public/images/close.png" alt="">
                </div>
                <div class="input">
                    <el-input v-model="searchWord" placeholder="请输入关键字搜索"  @keyup.enter.native="toSearch"></el-input>
                    <img src="../../../public/images/search.png" alt="" @click="toSearch">
                </div>
            </div>
        </van-overlay>


    </div>
</template>

<script>
    import {fetchLogo} from "../../api/pc/api";

    export default {
        name: "MobileHeader",
        props: {

        },
        data(){
            return{
                siteInfo:{categorys:[{name:''},{name:''},{name:''},{name:''}]},
                ifShow:false,
                ifSearch:false,
                searchWord:''
            }
        },
        methods: {
            goTo(num) {
                let path = ''
                switch (num) {
                    case 1: {
                        path = '/mobile/home'
                        break;
                    }
                    case 2: {
                        path = '/mobile/category?type=1'
                        break;
                    }
                    case 3: {
                        path = '/mobile/category?type=2'
                        break;
                    }
                    case 4: {
                        path = '/mobile/category?type=3'
                        break;
                    }
                    case 5: {
                        path = '/mobile/category?type=4'
                        break;
                    }
                    case 6: {
                        path = '/mobile/purchase'
                        break;
                    }
                    case 7: {
                        path = '/mobile/user'
                        break;
                    }
                }
                this.ifShow=false
                this.$router.push({
                    path: path
                })
            },
            toSearch(){
                this.ifSearch=false
                console.log(this.searchWord)

                if(this.searchWord!=''){
                    this.ifSearch=false
                    this.$router.push({
                        path:'/result?keyword='+this.searchWord
                    })
                    this.searchWord=''
                }
            },
            fetchLogo(){
                let that = this
                let siteInfo=JSON.parse(localStorage.getItem('siteInfo'))
                if(siteInfo){
                    that.siteInfo=siteInfo
                }else {
                    fetchLogo().then(res=>{
                        console.log(res)
                        that.siteInfo=res.data
                        localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    })
                }
            }

        },
        mounted() {
            this.fetchLogo()
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
        }
    }
</script>

<style scoped lang="scss">
    .mobile-header-page{
        width: 100%;
        .top{
            width: 100%;
            height: 1.333rem;
            background-color: #ffffff !important;
            box-shadow:0px 2px 4px 0px rgba(204,204,204,0.7);
            padding: 0 0.267rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .close{
                width:0.4rem;
                height:0.4rem;
            }
            .logo{
                width:2.053rem;
                height:0.68rem;
            }
            .menu{
                width:0.4rem;
                height:0.4rem;
            }
            .search{
                width:0.44rem;
                height:0.44rem;
            }
        }
        .van-overlay{
            z-index: 999;
            .top-menu-box{
                width: 100%;
                display: flex;
                flex-direction: column;
                .top-menu-item{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 1.067rem;
                    font-size:0.32rem;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    background-color: rgba(247,245,246,1);
                    border-bottom: 1px solid #fff9ea;
                }
            }
        }
        .van-overlay-search{
            background-color: rgba(255,255,255,1);

            .wrapper{
                width: 100%;
                margin: 1.333rem auto;
                .close{
                    width: 100%;
                    text-align: right;
                    margin: 0.4rem 0;
                    img{
                        margin-right: 1rem;
                        width: 0.45rem;
                        height: 0.5rem;
                    }
                }
                .input{
                    margin: 0 auto;
                    width: 60%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    img{
                        width: 0.427rem;
                        height: 0.427rem;
                        position: relative;
                        left: -0.6rem;
                        cursor: pointer;
                    }
                    /deep/ .el-input__inner{
                        padding-right: 0.667rem;
                    }
                }
            }
        }

    }
</style>