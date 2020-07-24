<template>
    <div class="page">
        <div class="gray">
            <img class="logo" @click="$router.push('/mobile/home')" src="../../../public/images/logo.png" alt="">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {userLogin} from "../../api/pc/api";

    export default {
        name: "MobileLogin",
        data() {
            return {
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
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        userLogin({
                            user_login:that.formData.username,
                            user_pass:that.formData.password,
                        }).then(res=>{
                            that.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                            localStorage.setItem('token',res.data.token)
                            localStorage.setItem('user_login',res.data.userinfo.user_login)
                            that.$router.push('/mobile/home')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
            // this.$message('这是一条消息提示');
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
        }
    }
</script>

<style scoped lang="scss">
    .page {
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
                    justify-content: center;
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