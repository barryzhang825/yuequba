<template>
    <div class="page">
        <div class="gray">
            <img class="logo" @click="$router.push('/mobile/home')"  :src="siteInfo.site_logo" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="2.5rem" :model="formData">
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="rePassword">
                        <el-input type="password" show-password v-model="formData.rePassword"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="formData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" prop="code" class="email">
                        <el-input v-model="formData.code"></el-input>
                        <div class="button" @click="checkSend">{{sendTips}}</div>
                    </el-form-item>
<!--                    <el-form-item label="推广码：">-->
<!--                        <el-input v-model="formData.popuid" :disabled="disabled"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                            <div class="baidu">
                                <img src="../../../public/images/baidu.png" @click="loginWithBaidu" alt="">
                            </div>
                        </div>
                    </el-form-item>
                </el-form>

            </div>
            <div class="center-box2">
                <img src="../../../public/images/back.png" alt="">
                <a class="register" @click="$router.push('/mobile/home')" >返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { Notify } from 'vant';
    import {fetchBaiduCode, fetchLogo, sendEmail, userRegister} from "../../api/pc/api";
    import {checkEmail} from "../../utils/utils";
    export default {
        name: "MobileRegister",
        data() {
            var validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.formData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                siteInfo:{},
                disabled:false,
                rememberPassword:false,
                sendTips:'发送验证码',
                canSend:true,
                timeNum:60,
                formData: {
                    username: '',
                    password: '',
                    rePassword: '',
                    email: '',
                    code: '',
                    popuid: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    rePassword: [
                        {required: true, validator: validateRePassword, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
                    ],
                }
            }
        },
        methods:{
            loginWithBaidu(){
                fetchBaiduCode().then(res=>{
                    window.location.replace(res.url)
                })
            },
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData={
                            user_login:that.formData.username,
                            user_pass:that.formData.password,
                            repassword:that.formData.rePassword,
                        }
                        if(that.formData.popuid){
                            formData.popuid=that.formData.popuid
                        }
                        userRegister(formData).then(res=>{
                            Notify({ type: 'success', message: '注册成功！' });
                            that.$router.push('/mobile/login')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            checkSend(){
                if(this.canSend){
                    if(checkEmail(this.formData.email)){
                        this.sendEmail()
                    }else {
                        Notify({ type: 'warning', message: '请输入正确的邮箱' });
                    }
                }

            },
            sendEmail(){
                sendEmail({
                    user_email:this.formData.email
                }).then((res)=>{
                    //console.log(res)
                    if(res.code=200){
                        let that = this
                        Notify({ type: 'success', message: '验证码已发送！' });
                        this.sendTips='重新发送（60）'
                        let timer = setInterval(()=>{
                            if(that.timeNum>0){
                                that.canSend=false
                                that.timeNum=that.timeNum-1
                                that.sendTips='重新发送（'+(that.timeNum)+'）'
                            }else {
                                that.timeNum=60
                                that.canSend=true
                                that.sendTips='重新发送'
                                clearInterval(timer)
                            }
                        }, 1000);
                    }
                })
            },
            fetchLogo(){
                let that = this
                let siteInfo=JSON.parse(localStorage.getItem('siteInfo'))
                if(siteInfo){
                    that.siteInfo=siteInfo
                }else {
                    fetchLogo().then(res=>{
                        //console.log(res)
                        that.siteInfo=res.data
                        localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    })
                }
            }
        },
        mounted() {
            // this.$message('这是一条消息提示');
            this.fetchLogo()
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
            let popuid=this.$route.query.popuid
            if(popuid){
                this.formData.popuid=popuid
                this.disabled=true
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
@include max-width;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        background-color: rgba(246,246,246,1);

        .gray {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 0;

            .logo {
                width: 2.133rem;
                margin: 1.067rem auto;
                display: block;
            }

            .login-box {
                margin:0 auto;
                width: 9.333rem;
                background: rgba(255, 255, 255, 1);
                opacity: 0.9;
                border-radius: 0.133rem;

                padding: 0.667rem 0.7rem;
                padding-bottom: 0.3rem;
                box-sizing: border-box;

                .el-form-item{
                    margin: 0.47rem 0;
                }
                .center-box{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 0.267rem;
                    .baidu{
                        margin-left: 0.667rem;
                        display: flex;
                        align-items: center;
                        img{
                            cursor: pointer;
                            width: 25px;
                            height: 25px;
                        }
                    }
                    .register{
                        cursor: pointer;
                        font-size:15px;
                        color:rgba(153,153,153,1);
                    }
                    /deep/.el-button{
                        margin-left: 30px;
                        span{
                            font-size:0.32rem;
                            font-weight:400;
                            color:rgba(34,34,34,1);
                        }
                    }
                }
                .email{
                    /deep/.el-form-item__content{
                        display: flex;
                        .button{
                            flex-shrink: 0;
                            padding: 0 10px 0 20px;
                            cursor:pointer;
                        }
                    }
                }
            }
            .center-box2{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 20px;
                align-items: center;
                img{
                    width:18px;
                    height:17px;
                }
                a{
                    margin-left: 10px;
                    display: block;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(255,194,49,1);
                    text-decoration: none;
                }
            }
        }
    }
</style>