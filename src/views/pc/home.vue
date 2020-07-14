<template>
    <div class="page">
        <Header></Header>
        <div class="center-box">
            <div class="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in imagesUrl">
                            <div class="img" :style="'background-image: url('+item+')'"></div>
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
            <div class="class">
                <div class="item" :style="'background-image: url('+imgUrl+')'">
                    <div class="text">
                        <a>漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元</a>
                    </div>
                    <div class="gray"></div>
                </div>
                <div class="item" :style="'background-image: url('+imgUrl+')'">
                    <div class="text">
                        <a>漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元</a>
                    </div>
                    <div class="gray"></div>
                </div>
                <div class="item" :style="'background-image: url('+imgUrl+')'">
                    <div class="text">
                        <a>漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元</a>
                    </div>
                    <div class="gray"></div>
                </div>
                <div class="item" :style="'background-image: url('+imgUrl+')'">
                    <div class="text">
                        <a>漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元漂亮网红女主播线上卖货，一天净收入10万元</a>
                    </div>
                    <div class="gray"></div>
                </div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                        <div class="line4"></div>
                    </div>
                </div>
                <div class="right"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import Header from '@/components/pc/Header'

    export default {
        name: "Home",
        components: {
            Header: Header,
            Swiper
        },
        data(){
            return{
                imgUrl:require('../../../public/images/avatar.gif'),
                imagesUrl:[
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                ]
            }
        },
        mounted() {
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                loop:true,
                paginationClickable: true
            })
        }
    }
</script>

<style scoped lang="scss">
    .page {
        background-color: #f6f6f6;

        .center-box {
            margin: 0 auto;
            width: 1200px;

            .swiper {
                margin-top: 20px;
                width: 100%;
                border-radius: 10px;
                overflow: hidden;

                .swiper-container {
                    width: 100%;
                    height: 360px;
                    .img{
                        width: 100%;
                        height: 100%;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }

                    /deep/ .swiper-pagination-bullet{
                        width:14px;
                        height:14px;
                        opacity:1;
                        background:rgba(255,255,255,1);
                        border-radius:50%;
                    }
                    /deep/ .swiper-pagination-bullet-active{
                        width:14px;
                        height:14px;
                        background:rgba(255,194,49,1);
                        border-radius:50%;
                    }

                    /deep/ .swiper-button-next{
                        right: 20px;
                        width: 45px;
                        height: 45px;
                        background-size: 100% 100%;
                        background-image: url("../../../public/images/right.png");
                    }

                    /deep/  .swiper-button-prev{
                        left: 20px;
                        width: 45px;
                        height: 45px;
                        background-size: 100% 100%;
                        background-image: url("../../../public/images/left.png");
                    }
                }
            }
            .class{
                width: 100%;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                .item{
                    width: 280px;
                    height: 230px;
                    position: relative;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    border-radius:10px;
                    .text{
                        z-index: 1;
                        position: absolute;
                        bottom: 0;
                        padding: 25px 20px;
                        box-sizing: border-box;
                        a{
                            font-size:16px;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }

                    }
                    .gray{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        background:rgba(20,20,20,1);
                        opacity:0.5;
                        border-radius:10px;
                    }
                }
            }
            .content{
                width: 1200px;
                margin: 20px auto;
                display: flex;
                flex-direction: row;
                .left{
                    width: 800px;
                    display: flex;
                    flex-direction: column;
                    .item{
                        background-color: #ffffff;
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:10px;
                        padding: 20px;
                        box-sizing: border-box;
                        .line1,.line2,.line3,.line4{
                            width: 100%;
                            display: flex;
                            align-items: center;
                        }
                        .line1{
                            .tag{
                                padding: 7px 10px;
                                box-sizing: border-box;
                                border-radius:4px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size:14px;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                margin-right: 10px;
                            }
                            .tag1{
                                background:#2EBF8A;
                            }
                            .tag2{
                                background:#FFC231;
                            }
                            .tag3{
                                background:#F54DA8;
                            }
                            .tag4{
                                background:#FF3170;
                            }
                            .tag5{
                                background:#4793F1;
                            }
                        }
                    }
                }
                .right{
                    width: 370px;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

</style>