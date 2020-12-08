<template>
    <div class="page">
        <MobileTitle title="修改密码"></MobileTitle>
        <div class="box">
            <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码"/>
            <van-field v-model="rePassword" type="password" label="确认新密码" placeholder="请再次输入密码"/>
            <van-field v-model="email" label="邮箱" placeholder="请输入邮箱"/>
            <div class="code">
                <div class="left">验证码</div>
                <div class="center">
                    <input v-model="code" type="text" placeholder="输入验证码">
                </div>
                <div class="right" v-if="!hasSend" @click="sendCode">发送验证码</div>
                <div class="right" v-if="hasSend">已发送</div>
            </div>
        </div>
        <div class="tip">注：为了确保安全，密码最好是由“字母+字符+数字”组成！</div>
        <div class="button">
            <el-button type="primary" @click="submitForm">确定</el-button>
        </div>

    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import {Notify} from 'vant';
    import {sendEmail, updatePassword} from "../../api/pc/api";
    import {checkEmail} from "../../utils/utils";

    export default {
        name: "UserPassword",
        components: {
            MobileTitle
        },
        data() {
            return {
                hasSend:false,
                password: '',
                rePassword: '',
                email:'',
                code :'',
            }
        },
        methods: {
            submitForm() {
                let that = this
                if (this.password == '') {
                    Notify('请输入密码！');
                } else if (this.password != this.rePassword) {
                    Notify('两次密码不一致！');
                } else if (this.password.length < 6 || this.password.length > 18) {
                    Notify('密码长度应在 6 到 18 个字符！');
                }else if (this.email=='' || this.code=='') {
                    Notify('请输入正确的邮箱验证码！');
                }  else {
                    updatePassword({
                        token: localStorage.getItem('token'),
                        newpass: that.password,
                        repass: that.password,
                        user_email: that.email,
                        code:that.code
                    }).then(res => {
                        if (res.code == 200) {
                            Notify({type: 'success', message: '修改成功！'});
                            that.password = ''
                            that.rePassword = ''
                            that.email = ''
                            that.code = ''
                            that.hasSend = false
                        }
                    })
                }
            },
            sendCode(){
                let that = this
                if(!checkEmail(this.email)){
                    Notify('请输入正确的邮箱！');
                }else {
                    sendEmail({
                        user_email: this.email
                    }).then((res) => {
                        if (res.code = 200) {
                            Notify({ type: 'success', message: '验证码已发送！' });
                            that.hasSend=true
                        }
                    })
                }
            }
        },
        mounted() {
            // Notify('通知内容');
            // this.$message.error('这是一个消息')
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
        }
    }
</script>

<style scoped lang="scss">
    .page {
        @include max-width;
        @include full-page;
        background-color: rgba(246, 246, 246, 1);

        .box {
            width: 100%;
            margin-top: 0.267rem;

            .code {
                background-color: #FFFFFF;
                width: 100%;
                padding: 0.267rem 0.4rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .left{
                    flex-shrink: 0;
                    width: 100px;
                    font-size: 0.32rem;
                }
                .center{
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    input{
                        font-size: 0.32rem;
                        border: none;
                    }
                }
                .right{
                    width: 80px;
                    font-size: 0.32rem;
                }
            }
        }

        .tip {
            width: 100%;
            padding: 0.4rem;
            box-sizing: border-box;

            font-size: 0.32rem;
            font-weight: normal;
            color: rgba(242, 48, 48, 1);
        }

        .button {
            margin-top: 2rem;
            width: 100%;
            display: flex;
            justify-content: center;

            .el-button {
                width: 3.2rem;
                height: 1.067rem;
                font-size: 0.32rem;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
            }
        }

    }

</style>