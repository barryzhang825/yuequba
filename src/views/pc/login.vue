<template>
    <div class="page">
        <div class="gray">
            <img class="logo" src="../../../public/images/logo.png" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="80px" :model="formData">
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password"></el-input>
                    </el-form-item>
                    <div class="set">
                        <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
                        <a class="forget" href="/forget">忘记密码?</a>
                    </div>
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="center-box">
                            <a class="register" href="/register">还没有账号，去注册>></a>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {userLogin} from '@/api/pc/api'
    export default {
        name: "Login",
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
                        let formData=new FormData()
                        formData.append('user_login',that.formData.username)
                        formData.append('user_pass',that.formData.password)
                        userLogin(formData).then(res=>{
                            console.log(res,888)
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
        }
    }
</script>

<style scoped lang="scss">
    .page {min-width:1200px;
        width: 100%;
        height: 100%;
        min-height: 700px;
        position: absolute;
        background-image: url("../../../public/images/login-back.png");
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