<template>
    <div class="page">
        <Header :menu="6"></Header>
        <div class="container">
            <div class="user-info" v-if="user_info">
                <div class="img" :style="'background-image: url('+baseUrl+user_info.avatar+')'"></div>
                <span>{{user_info.user_nickname}}，请选择VIP会员服务</span>
            </div>
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
            <div class="select-box">
                <div class="item" :class="selectedIndex==index?'selected':''" @click="selectVip(index)"
                     v-for="(item,index) in vipList">
                    <div class="line1">{{item.name}}</div>
                    <div class="line2">
                        <span>{{item.money}}</span>RMB/{{item.mony==1?'月':item.mony==2?'季度':item.mony==3?'半年':item.mony==4?'年':''}}
                        <br>
                        (约{{item.taibi}}台币)
                        <!--                        <br>-->
                        <!--                        <a style="text-decoration: line-through;font-size: 14px" v-if="item.pre_money>0">原价{{item.pre_money}}RMB</a>-->
                    </div>
                    <div class="line3">{{item.idt_name}}</div>
                    <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="item.mony==4">包年精选福利</div>
                    <!--                    <div class="all-year" v-if="item.mony==4">-->
                    <!--                        <img src="../../../public/images/bbb.png" alt="">-->
                    <!--                        <div class="text">包年精选福利</div>-->
                    <!--                    </div>-->
                </div>

            </div>
            <div class="button-box">
                <el-button type="primary" @click="buyVip">立即购买</el-button>
            </div>

            <div class="paypal-box">
                <div class="center" v-show="!showPayPal" v-loading="showPayPalLoading" @click="paypalClick">
                    用<img src="../../../public/images/paypal.png" alt="">付款
                </div>
                <PayPal
                        v-show="showPayPal"
                        :amount="payAmount"
                        currency="TWD"
                        :client="credentials"
                        env="sandbox"
                        :button-style="buttonStyle"
                        :notify-url="notifyUrl"
                        @payment-authorized="paymentAuthorized"
                        @payment-completed="paymentCompleted"
                        @payment-cancelled="paymentCancelled">
                </PayPal>
            </div>

        </div>
        <Contact></Contact>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import {buyVip, fetchLogo, getVipList} from "../../api/pc/api";
    import {saveOneDecimal, saveTwoDecimal} from "../../utils/utils";
    import PayPal from 'vue-paypal-checkout'

    export default {
        name: "Purchase",
        components: {
            Header: Header,
            Footer: Footer,
            PayPal
        },
        data() {
            return {
                baseUrl: this.$baseUrl,
                imgUrl: require('../../../public/images/avatar.gif'),
                selectedIndex: 0,
                vipList: [],
                token:'',
                user_info: '',
                siteInfo: null,
                leftTime: 0,

                notifyUrl:this.hookBaseUrl,
                hookBaseUrl:'http://yuequba.zhengshangwl.com/home/pay/paypalreturnurl',
                payAmount:'0',
                showPayPal:localStorage.getItem('token')?true:false,
                showPayPalLoading:false,
                credentials: {
                    sandbox: 'AWbB35er5_gd3sVwwFfXh4ma_J4vwXgfOQUxYJIpXGDki-DyLhenlA17gUIXH_qIJXF6APtCOgsvMC0B',
                    production: 'AS4bSmYH4MLmnuF6ObGKYMtu0T_XeeZa67fMoQ4ivhEnZ66RoH76--MX0AWoGgdKhVQlUpFY_EfqI15v'
                },
                buttonStyle: {
                    label: 'pay',
                    size: 'large',
                    shape: 'rect',
                    color: 'silver'
                },
            }
        },
        methods: {

            fetchData() {
                let that = this
                getVipList().then(res => {
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
                    this.notifyUrl=this.hookBaseUrl+'?goodsid='+this.vipList[this.selectedIndex].id+'&token='+this.token
                    this.payAmount=this.vipList[this.selectedIndex].taibi
                })
                fetchLogo().then(res => {
                    that.siteInfo = res.data
                    localStorage.setItem('siteInfo', JSON.stringify(res.data))
                    let leftTime = Date.parse(res.data.site_vipendtime) - Date.now()
                    that.leftTime = leftTime
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
                    //console.log(that.vipList[that.selectedIndex])
                    buyVip({
                        token: localStorage.getItem('token'),
                        id: that.vipList[that.selectedIndex].id
                    }).then(res => {
                        window.open(that.vipList[that.selectedIndex].ext_link)
                    })
                }
            },
            selectVip(index){
                this.selectedIndex=index
                this.notifyUrl=this.hookBaseUrl+'?goodsid='+this.vipList[index].id+'&token='+this.token
                this.payAmount=this.vipList[this.selectedIndex].taibi
                //console.log( this.notifyUrl)
            },

            paypalClick(){
                let that = this
                that.showPayPalLoading=true
                setTimeout(()=>{
                    let token = localStorage.getItem('token')
                    if (!token) {
                        this.$confirm('请先去登录').then(_ => {
                            that.$router.push({
                                path: '/login'
                            })
                        }).catch(_ => {

                        });
                    } else {
                        that.showPayPal=true
                    }
                    that.showPayPalLoading=false
                },500)
            },

            paymentAuthorized(data) {
                // 授权完成的回调，可以拿到订单id
                //console.log(data,'授权完成的回调');
            },

            paymentCompleted(data) {
                // 用户支付完成的回调，可以拿到订单id
                //console.log(data,'用户支付完成的回调');
                this.$message({
                    message:'支付成功！',
                    type:'success'
                })
            },

            paymentCancelled(data) {
                // 用户取消交易的回调
                //console.log(data,'用户取消交易的回调');
            }
        },
        mounted() {
            this.fetchData()
            if (localStorage.getItem('user_info')) {
                this.user_info = JSON.parse(localStorage.getItem('user_info'))
            }
            if(localStorage.getItem('token')){
                this.token=localStorage.getItem('token')
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
            text-align: center;

            .limit-time {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                .time-num-box {
                    margin-top: 35px;
                    margin-bottom: 10px;

                    .time-num {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .text {
                            font-size: 24px;
                            font-weight: 400;
                            color: #000000;
                        }

                        .num {
                            margin: 0 3px;
                            min-width: 36px;
                            min-height: 36px;
                            background: #FF3158;
                            border-radius: 6px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 24px;
                            font-weight: 400;
                            color: #ffffff;
                        }
                    }
                }
            }

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
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                        padding-top: 10px;
                        padding-bottom: 30px;
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
                        /*background: rgba(255, 49, 88, 1);*/
                        border-radius: 20px 0px 20px 0px;
                        position: absolute;
                        top: -10px;
                        left: 0;
                        background-image: linear-gradient(to right, #FF9600, #FF3158);

                        font-size: 18px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .all-year {
                        width: 162px;
                        height: 43px;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 15px;
                        box-sizing: border-box;
                        text-align: center;

                        img {
                            width: 162px;
                            height: 43px;
                            position: absolute;
                        }

                        .text {
                            z-index: 1;
                            font-size: 15px;
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

                            .van-count-down {
                                line-height: unset;
                            }

                            .block {
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

            .paypal-box{
                display: flex;
                flex-direction: column;
                align-items: center;
                .center{
                    cursor: pointer;
                    width: 120px;
                    background-color: #eeeeee;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 8px 0;
                    font-size: 13px;
                    img{
                        width: 50px;
                        margin: 0 5px;
                    }
                }
            }
        }
    }

</style>