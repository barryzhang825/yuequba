<template>
    <div class="page">
        <Header :menu="6"></Header>
        <div class="container">
            <div class="user-info">
                <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                <span>踢出个未来，请选择VIP会员服务</span>
            </div>
            <div class="select-box">
                <div class="item" :class="selectedIndex==index?'selected':''" @click="selectedIndex=index" v-for="(item,index) in vipList">
                    <div class="line1">{{item.name}}</div>
                    <div class="line2">
                        <span>￥{{item.money}}</span>/月
                    </div>
                    <div class="line3">全站资源无限下载</div>
                    <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="index==3">包年精选福利</div>
                </div>

            </div>
            <div class="button-box">
                <el-button type="primary">立即购买</el-button>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import {getVipList} from "../../api/pc/api";
    export default {
        name: "Purchase",
        components: {
            Header: Header,
            Footer: Footer,
        },
        data(){
            return{
                imgUrl: require('../../../public/images/avatar.gif'),
                selectedIndex:0,
                vipList:[]
            }
        },
        methods:{
            fetchData(){
                getVipList().then(res=>{
                    console.log(res)
                    this.vipList=res.data.reverse()
                })
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .page{
        min-width:1200px;
        background-color: $page-back-color;
        .container{
            width: 1200px;
            margin: 30px auto;
            padding: 30px;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow:0px 0px 10px 0px rgba(204,204,204,0.5);
            border-radius:10px;

            .user-info{
                width: 100%;
                display: flex;
                align-items: center;
                .img{
                    width:80px;
                    height:80px;
                    border-radius:50%;
                    @include back-img-center;
                    margin-right: 20px;
                }
                .user-info{
                    font-size:16px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .select-box{
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin: 30px 0;
                padding: 0 150px;
                box-sizing: border-box;
                justify-content: space-between;
                .item{
                    margin-bottom: 50px;
                    cursor: pointer;
                    width:360px;
                    height:240px;
                    border:1px solid rgba(230,230,230,1);
                    border-radius:15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 10px 30px;
                    box-sizing: border-box;
                    position: relative;
                    .line1{
                        font-size:24px;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        text-align: center;
                    }
                    .line2{
                        font-size:16px;
                        font-weight:400;
                        color: #333333;
                        text-align: center;
                        span{
                            color:rgba(255,49,88,1);
                            font-size:48px;
                        }
                    }
                    .line3{
                        border-top: 1px solid rgba(232,232,232,1);
                        font-size:18px;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        text-align: center;
                        padding-top: 20px;
                        box-sizing: border-box;
                    }
                    .check{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }
                    .tag{
                        padding: 0 15px;
                        height:42px;
                        background:rgba(255,49,88,1);
                        border-radius:20px 0px 20px 0px;
                        position: absolute;
                        top: -10px;
                        left: 0;

                        font-size:18px;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .selected{
                    width:360px;
                    height:240px;
                    border:2px solid rgba(255,49,88,1);
                    border-radius:15px;

                }
            }
            .button-box{
                display: flex;
                justify-content: center;
                margin-bottom: 50px;

                .el-button{
                    width:240px;
                    height:72px;
                    background:rgba(255,194,49,1);
                    border-radius:10px;

                    font-size:18px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
            }
        }
    }

</style>