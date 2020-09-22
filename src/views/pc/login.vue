<template>
    <div class="page">
        <div class="gray">
            <img class="logo" :src="siteInfo.site_logo" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="80px" :model="formData">
                    <el-form-item label="邮箱：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password"
                                  @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="set">
                        <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
                        <a class="forget" @click="$router.push('/forget')"  >忘记密码?</a>
                    </div>
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>

                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="center-box">
                            <a class="register" @click="$router.push('/register')" >还没有账号，去注册>></a>
                            <div class="baidu">
                                <img src="../../../public/images/baidu.png" @click="loginWithBaidu" alt="">
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {userLogin} from '@/api/pc/api'
    import {fetchBaiduCode, fetchLogo, loginWithBaidu} from "../../api/pc/api";
    export default {
        name: "Login",
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
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
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
                    window.open(res.url,'_blank')
                })
            },

            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData=new FormData()
                        formData.append('user_email',that.formData.username)
                        formData.append('user_pass',that.formData.password)
                        userLogin({
                            user_email:that.formData.username,
                            user_pass:that.formData.password,
                        }).then(res=>{
                            this.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                            localStorage.setItem('token',res.data.token)
                            localStorage.setItem('user_info',JSON.stringify(res.data.userinfo))

                            that.$router.push('/home')
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
            // this.$message('这是一条消息提示');
            let that = this
            let code = this.$route.query.code
            if(code){
                //console.log(code,'CODE')
                loginWithBaidu({
                    code:code
                }).then(res=>{
                    //console.log(res)
                    if(res.code == 200){
                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });
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
        min-width:640px;
        width: 100%;
        height: 100%;
        min-height: 700px;
        position: absolute;
        background-image: url("../../../public/images/login-back.jpg");
        background-size: cover;
        background-position: center center;
        z-index: -1;

        .gray {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 0;

            .logo {
                margin: 80px auto;
                display: block;
            }

            .login-box {
                margin:0 auto;
                width: 640px;
                height: 420px;
                background: rgba(255, 255, 255, 1);
                opacity: 0.9;
                border-radius: 10px;

                padding: 50px 80px;
                box-sizing: border-box;

                .el-form-item{
                    margin: 30px 0;
                }
                .set{
                    margin-left: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 20px;
                    .forget{
                        cursor: pointer;
                        font-size:15px;
                        color:rgba(255,194,49,1);
                    }

                }
                .center-box{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .baidu{
                        margin-left: 50px;
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
                        span{
                            font-size:14px;
                            font-weight:400;
                            color:rgba(34,34,34,1);
                        }
                    }
                }
            }
        }
    }
</style>