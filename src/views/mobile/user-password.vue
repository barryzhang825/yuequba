<template>
    <div class="page">
        <MobileTitle title="修改密码"></MobileTitle>
        <div class="box">
            <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码"/>
            <van-field v-model="rePassword" type="password" label="确认新密码" placeholder="请再次输入密码"/>
        </div>
        <div class="tip">注：为了确保安全，密码最好是由“字母+字符+数字”组成！</div>
        <div class="button">
            <el-button type="primary">确定</el-button>
        </div>

    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import { Notify } from 'vant';
    export default {
        name: "UserPassword",
        components: {
            MobileTitle
        },
        data() {
            return {
                password: '',
                rePassword: '',
            }
        },
        methods:{

        },
        mounted() {
            Notify('通知内容');
            // this.$message.error('这是一个消息')
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
        }
    }
</script>

<style scoped lang="scss">
    .page {
        @include full-page;
        background-color: rgba(246, 246, 246, 1);

        .box {
            width: 100%;
            margin-top: 0.267rem;
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
                width:3.2rem;
                height:1.067rem;
                font-size:0.32rem;
                font-weight:400;
                color:rgba(34,34,34,1);
            }
        }

    }

</style>