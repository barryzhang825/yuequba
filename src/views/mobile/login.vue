<template>
    <div class="page">
        <div class="gray">
            <img class="logo" @click="$router.push('/mobile/home')" :src="siteInfo.site_logo" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="80px" :model="formData">
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="set">
                        <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
                        <a class="forget"  @click="$router.push('/mobile/forget')">忘记密码?</a>
                    </div>
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </div>
                    </el-form-item>

                </el-form>
                <div class="center-box2">
                    <a class="register" @click="$router.push('/mobile/register')">还没有账号，去注册>></a>
                    <div class="baidu">
                        <img src="../../../public/images/baidu.png" @click="loginWithBaidu" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchBaiduCode, fetchLogo, loginWithBaidu, userLogin} from "../../api/pc/api";
    import {Notify} from "vant";

    export default {
        name: "MobileLogin",
        data() {
            return {
                siteInfo:{},
                rememberPassword:false,
                formData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            loginWithBaidu(){
                fetchBaiduCode().then(res=>{
                    //console.log(res.url)
                    window.location.replace(res.url)
                })
            },
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        userLogin({
                            user_login:that.formData.username,
                            user_pass:that.formData.password,
                        }).then(res=>{
                            localStorage.setItem('token',res.data.token)
                            localStorage.setItem('user_info',JSON.stringify(res.data.userinfo))
                            that.$router.push('/mobile/home')
                        })
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
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
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';

            let that = this
            let code = this.$route.query.code
            if(code){
                //console.log(code,'CODE')
                loginWithBaidu({
                    code:code
                }).then(res=>{
                    //console.log(res)
                    if(res.code == 200){
                        localStorage.setItem('token',res.data.token)
                        localStorage.setItem('user_info',JSON.stringify(res.data.userinfo))

                        that.$router.push('/home')
                    }
                })
            }
            this.fetchLogo()
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
                    margin: 30px 0;
                }
                .set{
                    margin-left: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .forget{
                        cursor: pointer;
                        font-size:15px;
                        color:rgba(255,194,49,1);
                    }

                }
                .center-box{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;

                    .register{
                        cursor: pointer;
                        font-size:15px;
                        color:rgba(153,153,153,1);
                    }
                    /deep/.el-button{
                        margin-left: 30px;
                        width:2.667rem;
                        background:rgba(255,194,49,1);
                        height:1.067rem;
                        span{
                            font-size:0.32rem;
                            font-weight:400;
                            color:rgba(34,34,34,1);
                        }
                    }
                }
                .center-box2{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .baidu{
                        margin-top : 0.667rem;
                        display: flex;
                        align-items: center;
                        img{
                            cursor: pointer;
                            width: 20px;
                            height: 20px;
                        }
                    }
                    a{
                        font-size:0.32rem;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>