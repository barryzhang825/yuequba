<template>
    <div class="page">
        <MobileTitle title="通知公告"></MobileTitle>
        <div class="items">
            <div class="resultTip">
                <img src="../../../public/images/home.png" alt="">
                首页 ><span>&nbsp;通知公告</span>
            </div>

            <div class="item">
                <div class="line1">重要通知：还未补填邮箱的请赶紧，已有多人账号被盗了</div>
                <div class="line2">
                    发现大部分人未补填邮箱，请赶紧补填了，否则因账号丢失无法找回的，后果自负。
                    1、点击导航栏的“用户中心” 2、查看邮箱处是否为空，为空的话请补填邮箱
                </div>
                <div class="line3">
                    <div class="type">
                        <img class="img-upper" src="../../../public/images/notification.png" alt="">通知公告
                    </div>
                    <div class="time">
                        <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                    </div>
                    <div class="like">
                        <img class="img-like" src="../../../public/images/heart.png" alt="">2
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="line1">重要通知：还未补填邮箱的请赶紧，已有多人账号被盗了</div>
                <div class="line2">
                    发现大部分人未补填邮箱，请赶紧补填了，否则因账号丢失无法找回的，后果自负。
                    1、点击导航栏的“用户中心” 2、查看邮箱处是否为空，为空的话请补填邮箱
                </div>
                <div class="line3">
                    <div class="type">
                        <img class="img-upper" src="../../../public/images/notification.png" alt="">通知公告
                    </div>
                    <div class="time">
                        <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                    </div>
                    <div class="like">
                        <img class="img-like" src="../../../public/images/heart.png" alt="">2
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="line1">重要通知：还未补填邮箱的请赶紧，已有多人账号被盗了</div>
                <div class="line2">
                    发现大部分人未补填邮箱，请赶紧补填了，否则因账号丢失无法找回的，后果自负。
                    1、点击导航栏的“用户中心” 2、查看邮箱处是否为空，为空的话请补填邮箱
                </div>
                <div class="line3">
                    <div class="type">
                        <img class="img-upper" src="../../../public/images/notification.png" alt="">通知公告
                    </div>
                    <div class="time">
                        <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                    </div>
                    <div class="like">
                        <img class="img-like" src="../../../public/images/heart.png" alt="">2
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    export default {
        name: "MobileNotification",
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
            padding: 0 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .resultTip{
                margin: 0.267rem 0;
                background-color: #ffffff;
                box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                border-radius: 0.133rem;
                padding: 0.267rem;
                box-sizing: border-box;

                display: flex;
                flex-direction: row;
                align-items: center;
                font-size:0.213rem;
                font-weight:400;
                color:rgba(255,194,49,1);

                white-space: pre-wrap;
                img{
                    margin-right: 0.133rem;
                    width:0.32rem;
                    height:0.32rem;
                }
                span{
                    color: #666;
                }

            }
            .item{
                margin-bottom: 0.267rem;
                background-color: rgba(255,255,255,1);
                padding: 0.267rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                border-radius:10px;
                justify-content: space-around;
                .line1{
                    font-size:0.24rem;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    @include line-hidden(1)
                }
                .line2{
                    margin-top: 0.2rem;
                    font-size:0.24rem;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    @include line-hidden(2)
                }

                .line3 {
                    width: 100%;
                    margin: 0.267rem 0;
                    display: flex;

                    .type, .time, .like {
                        display: flex;
                        align-items: center;
                        margin-right: 0.267rem;

                        img {
                            margin-right: 0.133rem;
                        }
                    }

                    .type {
                        .img-upper {
                            width: 0.267rem;
                            height: 0.32rem;
                        }
                        font-size: 0.213rem;
                        font-weight: 400;
                        color: rgba(100, 100, 100, 1);
                    }

                    .time {
                        .img-time {
                            width: 0.267rem;
                            height: 0.267rem;
                        }

                        font-size: 0.213rem;
                        font-weight: 400;
                        color: rgba(100, 100, 100, 1);
                    }

                    .like {
                        .img-like {
                            width: 0.267rem;
                            height: 0.24rem;
                        }

                        font-size: 0.213rem;
                        font-weight: 400;
                        color: rgba(128, 128, 128, 1);
                    }
                }

            }
        }
    }

</style>