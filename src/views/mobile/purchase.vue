<template>
    <div class="page">
        <MobileTitle title="购买专区"></MobileTitle>
        <div class="container">
            <div class="white" v-show="!toPay && !toCharge">
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
                    </div>
                    <div class="line3">{{item.idt_name}}</div>
                    <img class="check" v-if="selectedIndex==index" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="item.mony==4"><span>独享包年精选区福利</span></div>
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="checkLogin">立即购买</el-button>
                </div>
                <div class="button-box charge-box" >
                    <el-button type="primary" @click="chargeBalance">
                        <span>台币充值支付宝与QQ币</span>
                    </el-button>
                </div>

            </div>
            <div class="payment-list" v-if="toPay && !toCharge">
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
                        会员充值(购买后，请点击下方卡密充值，进行VIP充值)
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
                    <div class="text">PayPal支付(付款后可<span style="color: red">自动开通</span>付费会员)不需要PayPal账号,直接点击下方信用卡或银联卡付款即可</div>
                </div>
                <div class="button-box" v-show="!showPayPal  && siteInfo.site_paypal_status==1">
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
                <div class="button-box charge-box" v-show="!showPayPal">
                    <el-button type="primary" @click="toCharge=true">
                        <span>卡密充值</span>
                    </el-button>
                </div>
                <div class="button-box charge-box">
                    <el-button type="primary" @click="chargeBalance">
                        <span>台币充值支付宝与QQ币</span>
                    </el-button>
                </div>
<!--                <div class="charge-balance" @click="chargeBalance">-->
<!--                    台币充值支付宝与QQ币-->
<!--                </div>-->
            </div>
            <div class="charge-vip" v-if="toCharge">

                <div class="label-item">
                    <div class="label">账号:</div>
                    <div class="text"> {{user_info.user_email}}</div>
                </div>
                <div class="label-item">
                    <div class="label">套餐类型:</div>
                    <div class="text">
                        <span :class="vipList[selectedIndex].mony==4?'span':''">{{vipList[selectedIndex].name}}</span>
                    </div>
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                    <el-form-item label="卡号" prop="card_name">
                        <el-input v-model="ruleForm.card_name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="卡密" prop="card_pass">-->
<!--                        <el-input type="password" v-model="ruleForm.card_pass"></el-input>-->
<!--                    </el-form-item>-->
                </el-form>
                <div class="button-box">
                    <el-button type="primary" @click="submitForm('ruleForm')">充值</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import {Notify} from 'vant';
    import {buyVip, chargeVIP, checkVipCardNumber, fetchLogo, getUserinfo, getVipList} from "../../api/pc/api";
    import {Dialog} from 'vant';
    import {formatTimeThree, saveTwoDecimal} from "../../utils/utils";
    import PayPal from 'vue-paypal-checkout'



    export default {
        name: "MobilePurchase",
        components: {
            MobileTitle,
            PayPal
        },
        data() {

            return {
                selectedIndex: 0,
                vipList: [],
                leftTime:0,
                token:'',
                siteInfo:null,
                user_info:{},
                notifyUrl:this.hookBaseUrl,
                hookBaseUrl:'http://yuequba.zhengshangwl.com/home/pay/paypalreturnurl',
                payAmount:'0',
                showPayPalLoading:false,
                credentials: {
                    sandbox: 'AWbB35er5_gd3sVwwFfXh4ma_J4vwXgfOQUxYJIpXGDki-DyLhenlA17gUIXH_qIJXF6APtCOgsvMC0B',
                    production: 'AS4bSmYH4MLmnuF6ObGKYMtu0T_XeeZa67fMoQ4ivhEnZ66RoH76--MX0AWoGgdKhVQlUpFY_EfqI15v'
                },
                buttonStyle: {
                    label: 'pay',
                    size: 'small',
                    shape: 'rect',
                    color: 'silver'
                },

                toPay: false,
                paymentIndex: '1',
                showEWM: false,
                showPayPal:false,
                toCharge:false,
                card_name:'',
                card_pass:'',

                ruleForm: {
                    card_name: '',
                    card_pass: '',
                },
                rules: {
                    card_name: [
                        {required: true, message: '请输入卡号', trigger: 'blur'},
                        {min: 14, max: 14, message: '请输入正确的14位卡号', trigger: 'blur'}
                    ],
                }
            }
        },
        watch:{
            paymentIndex(val) {
                if (val == 2 && this.siteInfo.site_paypal_status==1) {
                    this.showPayPal = true
                } else if(val == 2 && this.siteInfo.site_paypal_status==0) {
                    this.showPayPal = false
                    Dialog({title:'温馨提示', message: 'PAYPAL支付，不支持台湾地区的信用卡，请改为：支付宝或QQ币支付' ,messageAlign:'left'});
                }else{
                    this.showPayPal = false
                }
            }
        },
        methods: {
            fetchUserInfo(){
                let that = this
                getUserinfo({
                    token:localStorage.getItem('token')
                }).then(res=>{
                    localStorage.setItem('user_info',JSON.stringify(res.data))
                    this.user_info=res.data

                })
            },
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        checkVipCardNumber({
                            card_name:that.ruleForm.card_name,
                            vipid:that.vipList[that.selectedIndex].id
                        }).then(res=>{
                            if(res.code == 200){
                                Notify({ type: 'success', message:  res.msg });
                                that.fetchUserInfo()
                                setTimeout(()=>{
                                    that.toCharge=false
                                    that.toPay=false
                                    that.ruleForm.card_name=''
                                    that.ruleForm.card_pass=''
                                },1000)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            chargeBalance(){
                window.open('https://www.ibuy711.com/g7.html','_blank')
            },
            timeFinish() {
                this.fetchData()
            },
            fetchData() {
                let that = this
                getVipList().then(res => {
                    //console.log(res)
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
                fetchLogo().then(res=>{
                    that.siteInfo=res.data
                    // console.log(res.data,'res.data')
                    if(that.siteInfo.site_pay_status_one==1){
                        that.paymentIndex='1'
                    }else if(that.siteInfo.site_pay_status_two==1){
                        that.paymentIndex='2'
                    }else {
                        that.paymentIndex='3'
                    }
                    // console.log(that.paymentIndex)
                    localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    let leftTime=Date.parse(res.data.site_vipendtime)-Date.now()
                    that.leftTime=leftTime
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
                    window.open(that.vipList[that.selectedIndex].ext_link)
                } else if (that.paymentIndex == '2') {
                    if(that.showPayPal==true){
                        that.$message.info('请点击下方PayPal按钮,以使用PayPal支付')
                    }
                    this.showPayPal=true
                } else {
                    that.$refs.contact.contactUs()
                }
            },
            selectVip(index){
                this.selectedIndex=index
                this.notifyUrl=this.hookBaseUrl+'?goodsid='+this.vipList[index].id+'&token='+this.token
                this.payAmount=this.vipList[this.selectedIndex].taibi
            },
            paypalClick(){
                let that = this
                that.showPayPalLoading=true
                setTimeout(()=>{
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
                Notify({ type: 'success', message: '支付成功' });
            },
            paymentCancelled(data) {
                // 用户取消交易的回调
                //console.log(data,'用户取消交易的回调');
            }
        },
        mounted() {
            this.fetchData()
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
            this.fetchUserInfo()
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
                        span{
                            font-weight: 600;
                            color:#d2e737;
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
                        width: 5rem;
                        height: 0.96rem;
                        background: rgba(255, 194, 49, 1);
                        border-radius: 0.133rem;

                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .charge-box{
                    margin-top: 0.267rem;
                    .el-button{
                        width: 5rem !important;
                        background: none !important;
                        border: 2px solid rgba(8,122,247,0.58);
                        span{
                            color: #53d2e7 !important;
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
                .paypal-box{
                    margin-top: 0.4rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .center{
                        cursor: pointer;
                        width: 3.2rem;
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
            .payment-list {
                width: 100%;
                background: rgba(255, 255, 255, 1);
                border-radius: 0.133rem;
                padding: 0.267rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 0.667rem;

                .line1, .line2, .line3 {
                    width: 100%;
                    margin: 0.267rem 0;
                    display: flex;
                    align-items: center;

                    ::v-deep .el-radio {
                        display: flex;
                        align-items: center;

                        .el-radio__inner {
                            width: 0.4rem;
                            height: 0.4rem;
                        }

                        .el-radio__inner:after {
                            width: 0.15rem;
                            height: 0.15rem;
                        }
                    }

                    .is-checked {
                        .select-item {
                            border: 1px solid #ffc231;
                        }
                    }

                    .select-item {
                        width: 3.88rem;
                        height: 1.467rem;
                        border: solid 1px #e5e5e5;
                        padding: 0.267rem;
                        box-sizing: border-box;
                    }

                    .text {
                        font-size: 0.24rem;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                }

                .button-box {
                    width: 100%;
                    margin-top: 0.4rem;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 0.4rem;

                    .el-button {
                        width: 5rem;
                        height: 0.96rem;
                        background: rgba(255, 194, 49, 1);
                        border-radius: 0.133rem;

                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }

                .paypal-box{
                    margin:  0.4rem auto;
                }
                .charge-box{
                    margin-top: 0.267rem;
                    .el-button{
                        background: none !important;
                        border: 2px solid rgba(8,122,247,0.58);
                        span{
                            color: #53d2e7 !important;
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

                .charge-balance{
                    width: 100%;
                    text-align: center;
                    font-size: 0.267rem;
                    margin-top: 0.4rem;
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
            .charge-vip{
                width: 100%;
                background: rgba(255, 255, 255, 1);
                border-radius: 0.133rem;
                padding: 0.267rem 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 0.667rem;
                .label-item{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 0.3rem;
                    margin-bottom: 0.4rem;
                    .label{
                        width: 2.9rem;
                        text-align: right;
                        padding-right: 0.4rem;
                        box-sizing: border-box;
                    }
                    .span{
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

                .button-box {
                    width: 100%;
                    margin-top: 0.4rem;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 0.4rem;

                    .el-button {
                        width: 5rem;
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
















