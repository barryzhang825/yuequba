<template>
    <div class="page">
        <div class="header">
            <div class="text">个人信息</div>
            <el-button type="primary" @click="dialogFormVisible = true">修改</el-button>

        </div>
        <div class="content">
            <div class="line">
                <div class="left">登录名</div>
                <div class="right">admin98765</div>
            </div>
            <div class="line">
                <div class="left">注册时间</div>
                <div class="right">2020.6.30 15:36:02</div>
            </div>
            <div class="line">
                <div class="left">邮箱</div>
                <div class="right">admin98765@mail.com</div>
            </div>
            <div class="line">
                <div class="left">网址</div>
                <div class="right">www.admin98765.com</div>
            </div>
            <div class="line">
                <div class="left">简介</div>
                <div class="right textarea">特斯拉在国内开启大规模招聘 特斯拉在国内开启大规模招聘 特斯拉在国内开启大规模招聘</div>
            </div>
        </div>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="登录名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址" :label-width="formLabelWidth" prop="website">
                    <el-input v-model="form.website" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input type="textarea" v-model="form.introduction" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    username: '',
                    email: '',
                    website: '',
                    introduction: '',
                },
                formLabelWidth: '120px',
                rules: {
                    username: [
                        {required: true, message: '请输入登录名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                    ],
                    website: [
                        {required: true, message: '请输入网址', trigger: 'blur'}
                    ],
                    introduction: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
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

            .el-button {
                width: 80px;
                height: 30px;
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;

            .line {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                margin: 15px 0;

                .left {
                    width: 100px;
                    text-align: right;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(101, 101, 101, 1);
                }

                .right {
                    width: calc(100% - 100px);
                    text-align: left;
                    padding-left: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(33, 33, 33, 1);
                }

                .textarea {
                    line-height: 1.5;
                    width: 50%;
                }
            }
        }
    }
</style>