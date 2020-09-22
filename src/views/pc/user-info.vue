<template>
    <div class="page">
        <div class="header">
            <div class="text">个人信息</div>
            <el-button type="primary" @click="dialogFormVisible = true">修改</el-button>

        </div>
        <div class="content">
            <div class="line">
                <div class="left">昵称：</div>
                <div v-if="userInfo.user_nickname" class="right">{{userInfo.user_nickname||'-'}}</div>
            </div>
            <div class="line">
                <div class="left">注册时间：</div>
                <div v-if="userInfo.create_time" class="right">{{userInfo.create_time|timeFormat}}</div>
            </div>
            <div class="line">
                <div class="left">流量余额：</div>
                <div v-if="userInfo.kb" class="right">{{userInfo.kb}}</div>
            </div>
            <div class="line">
                <div class="left">邮箱：</div>
                <div v-if="userInfo.user_email" class="right">{{userInfo.user_email||'-'}}</div>
            </div>
            <div class="line">
                <div class="left">网址：</div>
                <div v-if="userInfo.user_url" class="right">{{userInfo.user_url||'-'}}</div>
            </div>
            <div class="line">
                <div class="left">简介：</div>
                <div v-if="userInfo.more" class="right textarea">{{userInfo.more||'-'}}</div>
            </div>
        </div>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="formData" :rules="rules" ref="ruleForm">
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="user_nickname">
                    <el-input v-model="formData.user_nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="user_email">
                    <el-input v-model="formData.user_email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址" :label-width="formLabelWidth" prop="user_url">
                    <el-input v-model="formData.user_url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="more">
                    <el-input type="textarea" v-model="formData.more" autocomplete="off"></el-input>
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
    import {formatTime, formatTimeThree} from "../../utils/utils";
    import {getUserinfo, updateUserinfo} from "../../api/pc/api";

    export default {
        name: "UserInfo",
        filters:{
            timeFormat(val){
                return formatTime(val)
            },
            timeFormatTwo(val){
                return formatTimeThree(val)
            },
        },
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                rules: {
                    user_nickname: [
                        {required: true, message: '请输入登录名', trigger: 'blur'},
                        { min: 1, max: 10, message: '长度需小于 10 个字符', trigger: 'blur' }
                    ],
                    user_email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
                    ],
                    user_url: [
                        {required: true, message: '请输入网址', trigger: 'blur'}
                    ],
                    more: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
                    ],
                },
                formData:{
                    user_email:'',
                    more:'',
                    user_url:'',
                    user_nickname:'',
                },
                userInfo: {
                    user_email:'',
                    create_time:'',
                    more:'',
                    user_url:'',
                    user_nickname:'',
                }
            }
        },
        methods: {
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateUserinfo({
                            token:localStorage.getItem('token'),
                            user_email:that.formData.user_email,
                            more:that.formData.more,
                            user_url:that.formData.user_url,
                            user_nickname:that.formData.user_nickname,
                        }).then(res=>{
                            that.$message.success('修改成功！')
                            that.fetchData()
                            that.dialogFormVisible = false
                        })
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData(){
                let that = this
                getUserinfo({
                    token:localStorage.getItem('token')
                }).then(res=>{
                    //console.log(res,999)
                    localStorage.setItem('user_info',JSON.stringify(res.data))
                    that.userInfo=res.data
                    that.formData=res.data
                })
            }

        },
        mounted() {
            let that = this
            let user_info = JSON.parse(localStorage.getItem('user_info'))
            let token = localStorage.getItem('token')
            that.userInfo=user_info
            that.formData=user_info
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