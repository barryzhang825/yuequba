<template>
    <div class="page">
        <div class="gray">
            <img class="logo" @click="$router.push('/mobile/home')"  src="../../../public/images/logo.png" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="2.5rem" :model="formData">
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="rePassword">
                        <el-input type="password" show-password v-model="formData.rePassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                        </div>
                    </el-form-item>
                </el-form>

            </div>
            <div class="center-box2">
                <img src="../../../public/images/back.png" alt="">
                <a class="register"  @click="$router.push('/mobile/home')" >返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {forgetPassword} from "../../api/pc/api";

    export default {
        name: "MobileForget",
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
                rememberPassword:false,
                formData: {
                    username: '',
                    password: '',
                    rePassword: '',
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
                }
            }
        },
        methods:{
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        forgetPassword({
                            user_login:that.formData.username,
                            user_pass:that.formData.password,
                            repassword:that.formData.rePassword,
                        }).then(res=>{
                            that.$message.success('修改成功！')
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
                    margin: 0.47rem 0;
                }
                .center-box{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    margin-top: 0.267rem;
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