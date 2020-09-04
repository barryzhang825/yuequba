<template>
    <div class="page">
        <MobileTitle title="购买专区"></MobileTitle>
        <div class="container">
            <div class="white">
                <div class="limit-time" v-if="leftTime>0">
                    <img src="../../../public/images/limit.png" alt="">
                    <div class="time-num-box">
                        <van-count-down :time="leftTime">
                            <template v-slot="timeData">
                                <div class="time-num">
                                    <div class="num">{{ timeData.days }}</div>
                                    <div class="text">天</div>
                                    <div class="num">{{ timeData.hours }}</div>
                                    <div class="text">时</div>
                                    <div class="num">{{ timeData.minutes }}</div>
                                    <div class="text">分</div>
                                    <div class="num">{{ timeData.seconds }}</div>
                                    <div class="text">秒</div>
                                </div>
                            </template>
                        </van-count-down>
                    </div>
                </div>
                <div class="item" :class="selectedIndex==index?'selected':''" @click="selectedIndex=index"
                     v-for="(item,index) in vipList">
                    <div class="line1">{{item.name}}</div>
                    <div class="line2">
                        <span>{{item.money}}</span>RMB/{{item.mony==1?'月':item.mony==2?'季度':item.mony==3?'半年':item.mony==4?'年':''}}
                        <br>
                        (约{{item.taibi}}台币)
                        <!--                        <br>-->
                        <!--                        <a style="text-decoration: line-through;font-size: 0.3rem" v-if="item.pre_money>0">原价{{item.pre_money}}RMB</a>-->
                    </div>
                    <div class="line3">{{item.idt_name}}</div>
                    <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="item.mony==4">包年精选福利</div>
                    <!--                    <div class="all-year" v-if="item.mony==4">-->
                    <!--                        <img src="../../../public/images/bbb.png" alt="">-->
                    <!--                        <div class="text">包年精选福利</div>-->
                    <!--                    </div>-->
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="buyVip">立即购买</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import {Notify} from 'vant';
    import {fetchLogo, getVipList} from "../../api/pc/api";
    import {Dialog} from 'vant';
    import {saveTwoDecimal} from "../../utils/utils";

    export default {
        name: "MobilePurchase",
        components: {
            MobileTitle
        },
        data() {
            return {
                selectedIndex: 0,
                vipList: [],
                leftTime:0
            }
        },
        methods: {
            timeFinish() {
                this.fetchData()
            },
            fetchData() {
                let that = this
                getVipList().then(res => {
                    console.log(res)
                    let vipList = res.data.reverse()
                    for (const key in vipList) {
                        vipList[key].money = saveTwoDecimal(vipList[key].money)
                        vipList[key].pre_money = saveTwoDecimal(vipList[key].pre_money)
                        if (vipList[key].type == 1) {
                            vipList[key].cheap = saveTwoDecimal(vipList[key].pre_money - vipList[key].money)
                            vipList[key].pre_end_time_num = 1000 * vipList[key].pre_end_time_num
                        }
                    }
                    this.vipList = vipList
                })
                fetchLogo().then(res=>{
                    that.siteInfo=res.data
                    localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    let leftTime=Date.parse(res.data.site_vipendtime)-Date.now()
                    that.leftTime=leftTime
                })
            },
            buyVip() {
                let that = this
                let token = localStorage.getItem('token')
                if (!token) {
                    Dialog.confirm({
                        title: '标题',
                        message: '请先去登录',
                    })
                        .then(() => {
                            that.$router.push({
                                path: '/login'
                            })
                        })
                        .catch(() => {
                            // on cancel
                        });
                } else {
                    console.log(that.vipList[that.selectedIndex])
                    window.open(that.vipList[that.selectedIndex].ext_link)
                }
            }
        },
        mounted() {
            this.fetchData()
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
        }
    }
</script>

<style scoped lang="scss">
    .page {
        @include max-width;
        @include full-page;
        background-color: rgba(246, 246, 246, 1);

        .container {
            width: 100%;
            padding: 0.267rem;
            box-sizing: border-box;

            .white {
                width: 100%;
                background: rgba(255, 255, 255, 1);
                border-radius: 0.133rem;
                padding: 0.267rem 0;
                display: flex;
                flex-direction: column;
                align-items: center;

                .limit-time {
                    margin-bottom: 0.267rem;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 50%;
                    }

                    .time-num-box {
                        margin-top: 0.467rem;
                        margin-bottom: 0.133rem;

                        .time-num {
                            display: flex;
                            flex-direction: row;
                            align-items: center;

                            .text {
                                font-size: 0.32rem;
                                font-weight: 400;
                                color: #000000;
                            }

                            .num {
                                margin: 0 0.04rem;
                                min-width: 0.48rem;
                                min-height: 0.48rem;
                                background: #FF3158;
                                border-radius: 0.08rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 0.32rem;
                                font-weight: 400;
                                color: #ffffff;
                            }
                        }
                    }
                }

                .item {
                    margin-bottom: 0.3rem;
                    cursor: pointer;
                    width: 7.467rem;
                    height: 3.8rem;
                    border: 1px solid rgba(230, 230, 230, 1);
                    border-radius: 0.25rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0.4rem;
                    box-sizing: border-box;
                    position: relative;

                    .line1 {
                        font-size: 0.32rem;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                        font-weight: bold;
                    }

                    .line2 {
                        white-space: pre-line;
                        font-size: 0.213rem;
                        font-weight: 400;
                        color: #333333;
                        text-align: center;

                        span {
                            color: rgba(255, 49, 88, 1);
                            font-size: 0.64rem;
                        }
                    }

                    .line3 {
                        width: 100%;
                        border-top: 1px solid rgba(232, 232, 232, 1);
                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                        padding-top: 0.267rem;
                        padding-bottom: 0.267rem;
                        box-sizing: border-box;
                    }

                    .check {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 0.669rem;
                    }

                    .tag {
                        padding: 0 0.133rem;
                        height: 0.56rem;
                        background-image: linear-gradient(to right, #FF9600, #FF3158);
                        border-radius: 0.267rem 0rem 0.267rem 0rem;
                        position: absolute;
                        top: -0.133rem;
                        left: 0;

                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .all-year {
                        width: 2.4rem;
                        height: 0.64rem;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0.2rem;
                        box-sizing: border-box;
                        text-align: center;

                        img {
                            width: 2.4rem;
                            height: 0.64rem;
                            position: absolute;
                        }

                        .text {
                            z-index: 1;
                            font-size: 0.25rem;
                            color: #ffffff;
                        }
                    }

                    .cheap-box {
                        width: 7rem;
                        height: .8rem;
                        position: absolute;
                        top: -0.4rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 15px;
                        box-sizing: border-box;
                        text-align: center;

                        img {
                            width: 7rem;
                            height: .8rem;
                            position: absolute;
                        }

                        .text {
                            z-index: 1;
                            font-size: 0.3rem;
                            color: #ffffff;
                            display: flex;
                            align-items: center;

                            .van-count-down {
                                line-height: unset !important;
                            }

                            .block {
                                font-size: 0.25rem;
                                color: #ffffff;
                            }
                        }
                    }
                }

                .selected {
                    border: 2px solid rgba(255, 49, 88, 1);
                }

                .button-box {
                    width: 100%;
                    display: flex;
                    justify-content: center;

                    .el-button {
                        width: 3.2rem;
                        height: 0.96rem;
                        background: rgba(255, 194, 49, 1);
                        border-radius: 0.133rem;

                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }

            }
        }


    }

</style>



