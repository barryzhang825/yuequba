<template>
    <div class="page">
        <MobileTitle title="购买专区"></MobileTitle>
        <div class="container">
            <div class="white">
                <div class="item" :class="selectedIndex==0?'selected':''" @click="selectedIndex=0">
                    <div class="line1">包月VIP</div>
                    <div class="line2">
                        <span>￥49</span>/月
                    </div>
                    <div class="line3">全站资源无限下载</div>
                    <img class="check" v-if="selectedIndex==0" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="false">包年精选福利</div>
                </div>
                <div class="item" :class="selectedIndex==1?'selected':''" @click="selectedIndex=1">
                    <div class="line1">包月VIP</div>
                    <div class="line2">
                        <span>￥49</span>/月
                    </div>
                    <div class="line3">全站资源无限下载</div>
                    <img class="check" v-if="selectedIndex==1" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="false">包年精选福利</div>
                </div>
                <div class="item" :class="selectedIndex==2?'selected':''" @click="selectedIndex=2">
                    <div class="line1">包月VIP</div>
                    <div class="line2">
                        <span>￥49</span>/月
                    </div>
                    <div class="line3">全站资源无限下载</div>
                    <img class="check" v-if="selectedIndex==2" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="false">包年精选福利</div>
                </div>
                <div class="item" :class="selectedIndex==3?'selected':''" @click="selectedIndex=3">
                    <div class="line1">包月VIP</div>
                    <div class="line2">
                        <span>￥49</span>/月
                    </div>
                    <div class="line3">全站资源无限下载</div>
                    <img class="check" v-if="selectedIndex==3" src="../../../public/images/check.png" alt="">
                    <div class="tag" v-if="true">包年精选福利</div>
                </div>
                <div class="button-box">
                    <el-button type="primary">立即购买</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import { Notify } from 'vant';
    export default {
        name: "MobilePurchase",
        components: {
            MobileTitle
        },
        data() {
            return {
                selectedIndex:0
            }
        },
        methods:{

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
        @include full-page;
        background-color: rgba(246, 246, 246, 1);
        .container{
            width: 100%;
            padding: 0.267rem;
            box-sizing: border-box;
            .white{
                width: 100%;
                background:rgba(255,255,255,1);
                border-radius:0.133rem;
                padding: 0.267rem 0;
                display: flex;
                flex-direction: column;
                align-items: center;

                .item{
                    margin-bottom: 0.4rem;
                    cursor: pointer;
                    width:7.467rem;
                    height:3.2rem;
                    border:1px solid rgba(230,230,230,1);
                    border-radius:0.25rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0.133rem 0.4rem;
                    box-sizing: border-box;
                    position: relative;
                    .line1{
                        font-size:0.32rem;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        text-align: center;
                    }
                    .line2{
                        font-size:0.213rem;
                        font-weight:400;
                        color: #333333;
                        text-align: center;
                        span{
                            color:rgba(255,49,88,1);
                            font-size:0.64rem;
                        }
                    }
                    .line3{
                        border-top: 1px solid rgba(232,232,232,1);
                        font-size:0.24rem;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        text-align: center;
                        padding-top: 0.267rem;
                        box-sizing: border-box;
                    }
                    .check{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 0.669rem;
                    }
                    .tag{
                        padding: 0 0.133rem;
                        height:0.56rem;
                        background:rgba(255,49,88,1);
                        border-radius:0.267rem 0rem 0.267rem 0rem;
                        position: absolute;
                        top: -0.133rem;
                        left: 0;

                        font-size:0.24rem;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .selected{
                    width:7.467rem;
                    height:3.2rem;
                    border:2px solid rgba(255,49,88,1);
                    border-radius:0.25rem;

                }
                .button-box{
                    width: 100%;
                    display: flex;
                    justify-content: center;

                    .el-button{
                        width:3.2rem;
                        height:0.96rem;
                        background:rgba(255,194,49,1);
                        border-radius:0.133rem;

                        font-size:0.24rem;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }

            }
        }


    }

</style>



