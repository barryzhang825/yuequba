<template>
    <div class="page">
        <MobileTitle title="我的VIP"></MobileTitle>
        <div class="items">
            <div class="item">
                <div class="line line1">
                    <div class="half">
                        <span class="label">VIP类型：</span>
                        <span class="value">包月会员</span>
                    </div>
                    <div class="half">
                        <span  class="label">开通时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
                <div class="line line2">
                    <div class="half">
                        <span class="label">价格：</span>
                        <span class="value">￥49</span>
                    </div>
                    <div class="half">
                        <span  class="label">到期时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="line line1">
                    <div class="half">
                        <span class="label">VIP类型：</span>
                        <span class="value">包月会员</span>
                    </div>
                    <div class="half">
                        <span  class="label">开通时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
                <div class="line line2">
                    <div class="half">
                        <span class="label">价格：</span>
                        <span class="value">￥49</span>
                    </div>
                    <div class="half">
                        <span  class="label">到期时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="line line1">
                    <div class="half">
                        <span class="label">VIP类型：</span>
                        <span class="value">包月会员</span>
                    </div>
                    <div class="half">
                        <span  class="label">开通时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
                <div class="line line2">
                    <div class="half">
                        <span class="label">价格：</span>
                        <span class="value">￥49</span>
                    </div>
                    <div class="half">
                        <span  class="label">到期时间：</span>
                        <span  class="value">2020.6.30 17:26</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    export default {
        name: "UserVip",
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

        .items{
            width: 100%;
            padding: 0.133rem 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .item{
                margin-top: 0.267rem;
                background-color: rgba(255,255,255,1);
                padding: 0.133rem 0.4rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-radius:0.133rem;
                .line{
                    width: 100%;
                    padding: 0.4rem 0;
                    display: flex;
                    justify-content: space-between;
                    .half{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        .label{
                            flex-shrink: 0;
                            font-size:0.32rem;
                            font-weight:400;
                            color:#666666;
                        }
                        .value{
                            flex-shrink: 0;
                            font-size:0.32rem;
                            font-weight:400;
                            color:#222222;
                        }

                    }
                }
                .line2{
                    box-shadow:0px -1px 0px 0px rgba(238,238,238,1);
                }
            }
        }
    }

</style>