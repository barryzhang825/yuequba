<template>
    <div class="page">
        <MobileTitle title="个人信息"></MobileTitle>
        <div class="items">
            <van-field
                    v-model="username"
                    label="登录名"
                    placeholder="输入登录名"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="time"
                    label="注册时间"
                    placeholder="输入注册时间"
                    input-align="right"
                    right-icon="none"
                    readonly
            />
            <van-field
                    v-model="email"
                    label="邮箱"
                    placeholder="输入邮箱"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="url"
                    label="网址"
                    placeholder="输入网址"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="introduction"
                    label="简介"
                    placeholder="输入简介"
                    input-align="right"
                    right-icon="arrow"
            />

        </div>
        <div class="button">
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    export default {
        name: "MobileUserInfo",
        components:{
            MobileTitle
        },
        data(){
            return{
                username:'Admin98765',
                time:'2020-6-30 15:36:02',
                email:'admin98765@mail.com',
                url:'www.admin98765.com',
                introduction:'这里是个人信息简介内容位置',
            }
        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
        }
    }
</script>

<style scoped lang="scss">
    .page{
        @include full-page;
        background-color: rgba(246,246,246,1);
        .items{
            margin-top: 0.267rem;
            width: 100%;
            background:rgba(255,255,255,1);
            display: flex;
            flex-direction: column;


           /deep/ .van-cell {
                .van-cell__title{
                    span{
                        font-size:0.373rem;
                        font-weight:400;
                        color:rgba(34,34,34,1);
                    }
                }
                .van-cell__value{
                    .van-field__body{
                        .van-field__control{
                            font-size:0.373rem;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }
                    }



                }

            }
        }
        .button {
            margin-top: 0.5rem;
            width: 100%;
            display: flex;
            justify-content: center;

            .el-button {
                background:rgba(255,218,68,1);
                border: none;
                width:3.2rem;
                height:1.067rem;
                font-size:0.32rem;
                font-weight:400;
                color:rgba(34,34,34,1);
            }
        }
    }

</style>