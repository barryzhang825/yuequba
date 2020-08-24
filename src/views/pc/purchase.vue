<template>
    <div class="page">
        <Header :menu="6"></Header>
        <div class="container">
            <div class="user-info" v-if="user_info">
                <div class="img" :style="'background-image: url('+baseUrl+user_info.avatar+')'"></div>
                <span>{{user_info.user_nickname}}，请选择VIP会员服务</span>
            </div>
            <div class="select-box">
                <div class="item" :class="selectedIndex==index?'selected':''" @click="selectedIndex=index"
                     v-for="(item,index) in vipList">
                    <div class="line1">{{item.name}}</div>
                    <div class="line2">
                        <span>{{item.money}}</span>RMB/{{item.mony==1?'月':item.mony==2?'季度':item.mony==3?'半年':item.mony==4?'年':''}}
                        <br>
                        (约{{item.taibi}}台币)
                    </div>
                    <div class="line3">海量资源无限下载</div>
                    <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                    <!--<div class="tag">包年精选福利</div>-->
                    <div class="all-year" v-if="item.mony==4">
                        <img src="../../../public/images/year-all.png" alt="">
                        <div class="text">包年精选福利</div>
                    </div>
                    <div class="cheap-box" v-if="item.type==1">
                        <img src="../../../public/images/cheap.png" alt="">
                        <div class="text">限时立减{{item.cheap}}元，
                            <van-count-down :time="item.pre_end_time_num" @finish="timeFinish">
                                <template v-slot="timeData">
                                    <span class="block">{{ timeData.days }}天</span>
                                    <span class="block">{{ timeData.hours }}时</span>
                                    <span class="block">{{ timeData.minutes }}分</span>
                                    <span class="block">{{ timeData.seconds }}秒</span>
                                </template>
                            </van-count-down>
                        </div>
                    </div>
                </div>

            </div>
            <div class="button-box">
                <el-button type="primary" @click="buyVip">立即购买</el-button>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import {buyVip, getVipList} from "../../api/pc/api";
    import {saveOneDecimal, saveTwoDecimal} from "../../utils/utils";

    export default {
        name: "Purchase",
        components: {
            Header: Header,
            Footer: Footer,
        },
        data() {
            return {
                baseUrl: this.$baseUrl,
                imgUrl: require('../../../public/images/avatar.gif'),
                selectedIndex: 0,
                vipList: [],
                user_info: ''
            }
        },
        methods: {
            timeFinish(){
                this.fetchData()
            },
            fetchData() {
                getVipList().then(res => {
                    let vipList = res.data.reverse()
                    for (const key in vipList) {
                        vipList[key].money = saveTwoDecimal(vipList[key].money)
                        vipList[key].pre_money = saveTwoDecimal(vipList[key].pre_money)
                        if (vipList[key].type == 1) {
                            vipList[key].cheap = saveTwoDecimal(vipList[key].pre_money - vipList[key].money)
                            vipList[key].pre_end_time_num = 1000*vipList[key].pre_end_time_num
                        }
                    }
                    this.vipList = vipList
                })
            },
            buyVip() {
                let that = this
                let token = localStorage.getItem('token')
                if (!token) {
                    this.$confirm('请先去登录').then(_ => {
                        that.$router.push({
                            path: '/login'
                        })
                    }).catch(_ => {

                    });
                } else {
                    console.log(that.vipList[that.selectedIndex])
                    buyVip({
                        token: localStorage.getItem('token'),
                        id: that.vipList[that.selectedIndex].id
                    }).then(res => {
                        window.open(that.vipList[that.selectedIndex].ext_link)
                    })
                }
            }
        },
        mounted() {
            this.fetchData()
            if (localStorage.getItem('user_info')) {
                this.user_info = JSON.parse(localStorage.getItem('user_info'))
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        min-width: 1200px;
        background-color: $page-back-color;

        .container {
            width: 1200px;
            margin: 30px auto;
            padding: 30px;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(204, 204, 204, 0.5);
            border-radius: 10px;

            .user-info {
                width: 100%;
                display: flex;
                align-items: center;

                .img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    @include back-img-center;
                    margin-right: 20px;
                }

                .user-info {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }
            }

            .select-box {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin: 30px 0;
                padding: 0 150px;
                box-sizing: border-box;
                justify-content: space-between;

                .item {
                    margin-bottom: 50px;
                    cursor: pointer;
                    width: 360px;
                    height: 240px;
                    border: 1px solid rgba(230, 230, 230, 1);
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 20px 30px;
                    box-sizing: border-box;
                    position: relative;

                    .line1 {
                        font-size: 24px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                    }

                    .line2 {
                        white-space: pre-line;
                        font-size: 16px;
                        font-weight: 400;
                        color: #333333;
                        text-align: center;

                        span {
                            color: rgba(255, 49, 88, 1);
                            font-size: 48px;
                        }
                    }

                    .line3 {
                        border-top: 1px solid rgba(232, 232, 232, 1);
                        font-size: 18px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                        padding-top: 20px;
                        box-sizing: border-box;
                    }

                    .check {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }

                    .tag {
                        padding: 0 15px;
                        height: 42px;
                        background: rgba(255, 49, 88, 1);
                        border-radius: 20px 0px 20px 0px;
                        position: absolute;
                        top: -10px;
                        left: 0;

                        font-size: 18px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .all-year {
                        width: 84px;
                        height: 86px;
                        position: absolute;
                        left: -22px;
                        bottom: -23px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 15px;
                        box-sizing: border-box;
                        text-align: center;

                        img {
                            width: 84px;
                            height: 86px;
                            position: absolute;
                        }

                        .text {
                            z-index: 1;
                            font-size: 16px;
                            color: #ffffff;
                        }
                    }

                    .cheap-box {
                        width: 316px;
                        height: 62px;
                        position: absolute;
                        top: -35px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 15px;
                        box-sizing: border-box;
                        text-align: center;

                        img {
                            width: 316px;
                            height: 62px;
                            position: absolute;
                        }

                        .text {
                            z-index: 1;
                            font-size: 16px;
                            color: #ffffff;
                            display: flex;
                            align-items: center;
                            .van-count-down{
                                line-height: unset;
                            }
                            .block{
                                font-size: 16px;
                                color: #ffffff;
                            }
                        }

                    }
                }

                .selected {
                    width: 360px;
                    height: 240px;
                    border: 2px solid rgba(255, 49, 88, 1);
                    border-radius: 15px;

                }
            }

            .button-box {
                display: flex;
                justify-content: center;
                margin-bottom: 50px;

                .el-button {
                    width: 240px;
                    height: 72px;
                    background: rgba(255, 194, 49, 1);
                    border-radius: 10px;

                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }

</style>