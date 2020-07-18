<template>
    <div class="page">
        <MobileTitle title="推广注册"></MobileTitle>
        <div class="tip">
            推广链接：http://www.fedcba.com
        </div>
        <div class="items">
            <div class="item">
                <div class="line line1">
                    <div class="half">
                        <span class="label">用户ID：</span>
                        <span class="value">V000001</span>
                    </div>
                    <div class="half two">
                        <span  class="label">注册时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
                <div class="line line2">

                    <div class="half">
                        <span  class="label">消费额：</span>
                        <span  class="value">￥168</span>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="line line1">
                    <div class="half">
                        <span class="label">用户ID：</span>
                        <span class="value">V000001</span>
                    </div>
                    <div class="half two">
                        <span  class="label">注册时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
                <div class="line line2">

                    <div class="half">
                        <span  class="label">消费额：</span>
                        <span  class="value">￥168</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    export default {
        name: "MobileUserRecommendRegister",
        components:{
            MobileTitle
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
        .tip{
            width: 100%;
            height: 1.173rem;
            box-sizing: border-box;
            background-color:#FFF8E8;
            font-size:0.373rem;
            font-weight:400;
            color:rgba(217,54,54,1);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding:0 0.4rem;
        }
        .items{
            width: 100%;
            padding: 0.133rem 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .item{
                margin-top: 0.267rem;
                background-color: rgba(255,255,255,1);
                padding: 0 0.25rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-radius:0.133rem;
                .line{
                    width: 100%;
                    padding: 0.42rem 0;
                    display: flex;
                    justify-content: space-between;
                    .half{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        .label{
                            flex-shrink: 0;
                            font-size:0.373rem;
                            font-weight:400;
                            color:#666666;
                        }
                        .value{
                            flex-shrink: 0;
                            font-size:0.373rem;
                            font-weight:400;
                            color:#222222;
                        }

                    }
                    .two{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                    }
                }
                .line2{
                    box-shadow:0px -1px 0px 0px rgba(238,238,238,1);
                }
            }
        }
    }

</style>