<template>
    <div class="page">
        <Header :menu="6" ref="pageHeader"></Header>
        <div class="container">
            <div class="user-info" v-show="user_info">
                <div class="img" :style="'background-image: url('+baseUrl+user_info.avatar+')'"></div>
                <span>{{user_info.user_nickname}}，请选择VIP会员服务</span>
            </div>
            <div class="vip-list" v-show="!toPay">
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
                        </div>
                        <div class="line3">{{item.idt_name}}</div>
                        <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                        <div class="tag" v-if="item.mony==4"><span>独享包年精选区福利</span></div>
                    </div>
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="checkLogin">立即购买</el-button>
                </div>
                <div class="button-box charge-box">
                    <el-button type="primary" @click="chargeBalance">
                        <span>
                            台币充值支付宝与QQ币
                        </span>
                    </el-button>
                </div>
            </div>
            <div class="payment-list" v-if="toPay">
                <div class="line1" v-if="siteInfo.site_pay_status_one==1">
                    <el-radio v-model="paymentIndex" label="1">
                        <div class="select-item">
                            <van-image
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="require('../../../public/images/fk1.png')"
                            />
                        </div>
                    </el-radio>
                    <div class="text">
                        支付宝或QQ币会员充值<br/>(购买后，<a @click="chargeVIP">点击这里</a>卡密充值)
                    </div>
                </div>
                <div class="line2" v-if="siteInfo.site_pay_status_two==1">
                    <el-radio v-model="paymentIndex" label="2">
                        <div class="select-item">
                            <van-image
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="require('../../../public/images/paypal1.png')"
                            />
                        </div>
                    </el-radio>
                    <div class="text">PayPal支付<br>（不需要PayPal账号 ,直接点击下方“使用信用卡或银联卡付款"，付款后会自动<span style="color: red">线上开通</span>会员）</div>
                </div>
                <div class="line3" v-if="siteInfo.site_pay_status_three==1">
                    <el-radio v-model="paymentIndex" label="3">
                        <div class="select-item">
                            <van-image
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="require('../../../public/images/kf1.png')"
                            />
                        </div>
                    </el-radio>
                    <div class="text">联系人工支付开通</div>
                </div>
                <div class="button-box" v-show="!showPayPal">
                    <el-button type="primary" @click="buyVip">立即购买</el-button>
                </div>
                <PayPal
                        class="paypal-box"
                        v-show="showPayPal"
                        :amount="payAmount"
                        currency="TWD"
                        :client="credentials"
                        :button-style="buttonStyle"
                        :notify-url="notifyUrl"
                        @payment-authorized="paymentAuthorized"
                        @payment-completed="paymentCompleted"
                        @payment-cancelled="paymentCancelled">
                </PayPal>

                <div class="button-box charge-box">
                    <el-button type="primary" @click="chargeBalance">
                        <span>
                            台币充值支付宝与QQ币
                        </span>
                    </el-button>
                </div>
            </div>
        </div>
        <el-dialog
                class="dialog-box"
                title="账号充值"
                :visible.sync="dialogVisible"
                width="700px">
            <el-row class="row-line" >
                <div class="label">账号:</div>
                {{user_info.user_email}}
            </el-row>
            <el-row class="row-line" >
                <div class="label" > 套餐类型:</div>
                <span>
                    {{vipList[selectedIndex].name}}
                </span>
            </el-row>
            <el-form :model="formData" :rules="rules" ref="ruleForm">
                <el-form-item label="请输入卡号" :label-width="'120px'" prop="card_name">
                    <el-input v-model="formData.card_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        <Contact ref="contact"></Contact>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import {
        buyVip,
        chargeVIP,
        checkVipCardNumber,
        fetchLogo,
        getUserinfo,
        getVipList,
        updateUserinfo
    } from "../../api/pc/api";
    import {formatTime, saveOneDecimal, saveTwoDecimal} from "../../utils/utils";
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
                vipList: [{name: ''}],
                token: '',
                user_info: '',
                siteInfo: null,
                leftTime: 0,

                notifyUrl: this.hookBaseUrl,
                hookBaseUrl: 'http://yuequba.zhengshangwl.com/home/pay/paypalreturnurl',
                payAmount: '0',
                showPayPalLoading: false,
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
                toPay: false,
                paymentIndex: '1',
                showEWM: false,
                showPayPal: false,
                dialogVisible: false,
                formData: {
                    card_name: ''
                },
                rules: {
                    card_name: [
                        {required: true, message: '请输入卡号', trigger: 'blur'},
                        {min: 14, max: 14, message: '请输入正确的14位卡号', trigger: 'blur'}
                    ],
                }
            }
        },
        watch: {
            paymentIndex(val) {
                if (val == 2) {
                    this.showPayPal = true
                } else {
                    this.showPayPal = false
                }
            }
        },
        methods: {
            fetchUserInfo() {
                this.$refs.pageHeader.refreshUserInfo()
            },
            chargeVIP() {
                this.dialogVisible = true
            },
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        checkVipCardNumber({
                            card_name: that.formData.card_name,
                            vipid: this.vipList[this.selectedIndex].id
                        }).then(res => {
                            if (res.code == 200) {
                                that.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                                that.fetchUserInfo()
                            }
                        })
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
                this.dialogVisible = false
                this.formData.card_name = ''
            },
            chargeBalance() {
                window.open('https://www.ibuy711.com/g7.html', '_blank')
            },
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
                    this.notifyUrl = this.hookBaseUrl + '?goodsid=' + this.vipList[this.selectedIndex].id + '&token=' + this.token
                    this.payAmount = this.vipList[this.selectedIndex].taibi
                })
                fetchLogo().then(res => {
                    that.siteInfo = res.data
                    if (that.siteInfo.site_pay_status_one == 1) {
                        that.paymentIndex = '1'
                    } else if (that.siteInfo.site_pay_status_two == 1) {
                        that.paymentIndex = '2'
                    } else {
                        that.paymentIndex = '3'
                    }
                    localStorage.setItem('siteInfo', JSON.stringify(res.data))
                    let leftTime = Date.parse(res.data.site_vipendtime) - Date.now()
                    that.leftTime = leftTime
                })

            },
            checkLogin() {
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
                    this.toPay = true
                }
            },
            buyVip() {
                let that = this
                if (that.paymentIndex == '1') {
                    // buyVip({
                    //     token: localStorage.getItem('token'),
                    //     id: that.vipList[that.selectedIndex].id
                    // }).then(res => {
                    //     window.open(that.vipList[that.selectedIndex].ext_link)
                    // })
                    window.open(that.vipList[that.selectedIndex].ext_link)
                    this.chargeVIP()
                } else if (that.paymentIndex == '2') {
                    if (that.showPayPal == true) {
                        that.$message.info('请点击下方PayPal按钮,以使用PayPal支付')
                    }
                    this.showPayPal = true
                } else {
                    that.$refs.contact.contactUs()
                }
            },
            selectVip(index) {
                this.selectedIndex = index
                this.notifyUrl = this.hookBaseUrl + '?goodsid=' + this.vipList[index].id + '&token=' + this.token
                this.payAmount = this.vipList[this.selectedIndex].taibi
            },

            paypalClick() {
                let that = this
                that.showPayPalLoading = true
                setTimeout(() => {
                    let token = localStorage.getItem('token')
                    if (!token) {
                        this.$confirm('请先去登录').then(_ => {
                            that.$router.push({
                                path: '/login'
                            })
                        }).catch(_ => {

                        });
                    } else {
                        that.showPayPal = true
                    }
                    that.showPayPalLoading = false
                }, 500)
            },

            paymentAuthorized(data) {
                // 授权完成的回调，可以拿到订单id
                //console.log(data,'授权完成的回调');
            },

            paymentCompleted(data) {
                // 用户支付完成的回调，可以拿到订单id
                //console.log(data,'用户支付完成的回调');
                this.$message({
                    message: '支付成功！请重新登录查看VIP开通状态',
                    type: 'success'
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
            if (localStorage.getItem('token')) {
                this.token = localStorage.getItem('token')
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
            min-height: 1000px;
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

            .vip-list {
                width: 100%;

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
                            padding: 0 20px;
                            height: 42px;
                            border-radius: 20px 0px 20px 0px;
                            position: absolute;
                            top: -20px;
                            left: 0;
                            background-image: linear-gradient(to right, #FF9600, #FF3158);
                            font-size: 18px;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            span {
                                font-weight: 600;
                                color: #d2e737;
                                background-image: -webkit-linear-gradient(180deg, #d2e737, #00e7e7);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                -webkit-animation: change 2s infinite linear;
                                @-webkit-keyframes change {
                                    from {
                                        -webkit-filter: hue-rotate(0deg);
                                    }
                                    to {
                                        -webkit-filter: hue-rotate(-360deg);
                                    }
                                }
                            }

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

                .charge-box {
                    .el-button {
                        background: none !important;
                        border: 2px solid rgba(8, 122, 247, 0.58);

                        span {
                            color: #53d2e7;
                            background-image: -webkit-linear-gradient(180deg, #53d2e7, #f41392);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            -webkit-animation: change 2s infinite linear;
                            @-webkit-keyframes change {
                                from {
                                    -webkit-filter: hue-rotate(0deg);
                                }
                                to {
                                    -webkit-filter: hue-rotate(-360deg);
                                }
                            }
                        }
                    }

                }

                .paypal-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .center {
                        cursor: pointer;
                        width: 120px;
                        background-color: #eeeeee;
                        border-radius: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 8px 0;
                        font-size: 13px;

                        img {
                            width: 50px;
                            margin: 0 5px;
                        }
                    }
                }
            }

            .payment-list {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 30%;
                padding-top: 50px;
                box-sizing: border-box;

                .line1, .line2, .line3 {
                    margin: 20px 0;
                    display: flex;
                    align-items: center;
                    text-align:left;

                    ::v-deep .el-radio {
                        display: flex;
                        align-items: center;

                        .el-radio__inner {
                            width: 20px;
                            height: 20px;
                        }

                        .el-radio__inner:after {
                            width: 5px;
                            height: 5px;
                        }
                    }

                    .is-checked {
                        .select-item {
                            border: 1px solid #ffc231;
                        }
                    }

                    .select-item {
                        width: 291px;
                        height: 110px;
                        border: solid 1px #e5e5e5;
                        padding: 20px;
                        box-sizing: border-box;
                    }

                    .text {
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                }

                .line1 {
                    .text {
                        text-align: left;
                        line-height: 2;

                        a {
                            cursor: pointer;
                            color: #fd8106;
                            text-decoration: underline;
                        }
                    }

                }

                .button-box {
                    margin-top: 30px;
                    margin-left: 60px;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;

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


                .paypal-box {
                    margin-top: 30px;
                }

                .charge-box {
                    .el-button {
                        background: none !important;
                        border: 2px solid rgba(8, 122, 247, 0.58);

                        span {
                            color: #53d2e7;
                            background-image: -webkit-linear-gradient(180deg, #53d2e7, #f41392);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            -webkit-animation: change 2s infinite linear;
                            @-webkit-keyframes change {
                                from {
                                    -webkit-filter: hue-rotate(0deg);
                                }
                                to {
                                    -webkit-filter: hue-rotate(-360deg);
                                }
                            }
                        }
                    }

                }
            }

        }

        .dialog-box {
            ::v-deep .el-dialog{
                margin-top: 30vh !important;
                .el-dialog__body{
                    padding: 50px 20px;
                    .row-line {
                        margin-bottom: 40px !important;
                        font-size: 16px;
                        display: flex;align-items: center;
                        .label {
                            width: 120px;
                            text-align: left;
                            padding-right: 10px;
                            box-sizing: border-box;
                            padding-left: 27px
                        }
                        span{
                            font-weight: bold;
                            color: #53d2e7;
                            background-image: -webkit-linear-gradient(180deg, #53d2e7, #f41392);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            -webkit-animation: change 2s infinite linear;
                            @-webkit-keyframes change {
                                from {
                                    -webkit-filter: hue-rotate(0deg);
                                }
                                to {
                                    -webkit-filter: hue-rotate(-360deg);
                                }
                            }
                        }
                    }

                    .el-form-item__label {
                        font-size: 16px;
                    }
                }

            }

        }
    }

</style>








