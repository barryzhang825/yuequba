<template>
    <div class="page">
        <div class="gray">
            <img class="logo" @click="$router.push('/home')"  src="../../../public/images/logo.png" alt="">
            <div class="login-box">
                <el-form label-position="left" :rules="rules" ref="ruleForm" label-width="100px" :model="formData">
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input type="password" show-password v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="rePassword">
                        <el-input type="password" show-password v-model="formData.rePassword"></el-input>
                    </el-form-item>
                    <el-form-item label="推广码：">
                        <el-input v-model="formData.popuid" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="center-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>

            </div>
            <div class="center-box2">
                <img src="../../../public/images/back.png" alt="">
                <a class="register" @click="$router.push('/home')">返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {userRegister} from "../../api/pc/api";

    export default {
        name: "Register",
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
                disabled:false,
                rememberPassword:false,
                formData: {
                    username: '',
                    password: '',
                    rePassword:'',
                    popuid:''
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
                        let formData={
                            user_login:that.formData.username,
                            user_pass:that.formData.password,
                            repassword:that.formData.rePassword,
                        }
                        if(that.formData.popuid){
                            formData.popuid=that.formData.popuid
                        }
                        userRegister(formData).then(res=>{
                            this.$message({
                                message: '注册成功！',
                                type: 'success'
                            });
                            that.$router.push('/login')
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
            let popuid=this.$route.query.popuid
            if(popuid){
                this.formData.popuid=popuid
                this.disabled=true
            }
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
                    margin: 20px 0;
                }
                .center-box{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
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