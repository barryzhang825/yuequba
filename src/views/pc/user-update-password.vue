<template>
    <div class="page">
        <div class="header">
            <div class="text">修改密码</div>
        </div>
        <div class="content">
            <div class="tip">为了确保安全，密码最好是由“字母+字符+数字”组成！</div>
            <el-form :model="ruleFormData" :rules='rules' ref="ruleForm" label-width="100px" class="ruleForm">
                <el-form-item
                        label="新密码"
                        prop="password">
                    <el-input type="password" v-model="ruleFormData.password" ></el-input>
                </el-form-item>
                <el-form-item
                        label="确认新密码"
                        prop="rePassword">
                    <el-input type="password" v-model="ruleFormData.rePassword" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserUpdatePassword",
        data(){
            var validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'))
                } else if (value !== this.ruleFormData.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return{
                ruleFormData:{
                    password:'',
                    rePassword:'',
                },
                rules: {
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                    ],
                    rePassword: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        { required: true, validator: validateRePassword, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">

    .page {
        width: 100%;

        .header {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid rgba(235, 235, 235, 1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            box-sizing: border-box;


        }

        .content {
            padding: 20px;
            box-sizing: border-box;

            .tip {
                background-color: #FFF1F1;
                border: 1px solid rgba(255, 204, 204, 1);
                padding: 15px 25px;
                box-sizing: border-box;
                font-size: 14px;
                font-weight: 400;
                color: rgba(241, 47, 47, 1);
                margin-bottom: 20px;
            }
            .ruleForm{
                width: 50%;
                .el-button {
                    width: 80px;
                    height: 30px;
                    border-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>