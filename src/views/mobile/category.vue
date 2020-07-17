<template>
    <div class="page">
        <MobileHeader></MobileHeader>
        <div class="center-box">

            <div class="content">
                <div class="left">
                    <div class="resultTip">
                        <img src="../../../public/images/home.png" alt="">
                        首页 ><span>&nbsp;{{category==1?'主播区':category==2?'美图区':category==3?'视频区':category==4?'包年精选区':''}}</span>
                    </div>

                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区
                                <!--                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区-->
                                <!--                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区-->
                                <!--                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区-->
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" :style="'background-image: url('+imgUrl+')'"></div>
                            <div class="line4-item" :style="'background-image: url('+imgUrl+')'"></div>
                            <div class="line4-item" :style="'background-image: url('+imgUrl+')'">
                                <div class="more">+5</div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <!--                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区-->
                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区
                                <!--                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区-->
                                <!--                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区-->
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" v-for="item in 3"
                                 :style="'background-image: url('+imgUrl+')'"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <!--                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区-->
                                <!--                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区-->
                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区
                                <!--                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区-->
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" v-for="item in 3"
                                 :style="'background-image: url('+imgUrl+')'"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <!--                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区-->
                                <!--                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区-->
                                <!--                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区-->
                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" v-for="item in 3"
                                 :style="'background-image: url('+imgUrl+')'"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <!--                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区-->
                                <!--                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区-->
                                <!--                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区-->
                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" v-for="item in 3"
                                 :style="'background-image: url('+imgUrl+')'"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line1">
                            <div class="tag tag1">主播</div>
                            <div class="tag tag2">美女</div>
                            <div class="tag tag3">颜值萌妹</div>
                            <div class="tag tag4">福利</div>
                            <div class="tag tag5">粉丝</div>
                        </div>
                        <div class="line2">
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子大尺度福利[9V]
                        </div>
                        <div class="line3">
                            <div class="type">
                                <!--                                <img class="img-upper" src="../../../public/images/upper.png" alt="">主播区-->
                                <!--                                <img class="img-year" src="../../../public/images/year.png" alt="">包年精选区-->
                                <!--                                <img class="img-video" src="../../../public/images/video.png" alt="">视频区-->
                                <img class="img-img" src="../../../public/images/img.png" alt="">美图区
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">2
                            </div>
                        </div>
                        <div class="line4">
                            <div class="line4-item" v-for="item in 3"
                                 :style="'background-image: url('+imgUrl+')'"></div>
                        </div>
                    </div>

                    <div class="pagination">
                        <el-pagination
                                :background="false"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="100"
                                layout="prev, pager, next"
                                :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="device">
                <span>手机端</span> |
                <span>电脑端</span>
            </div>
        </div>
        <MobileFooter :menu="menu"></MobileFooter>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.min.css';
    import MobileHeader from '@/components/mobile/Header'
    import MobileFooter from '@/components/mobile/Footer'
    export default {
        name: "MobileCategory",
        components: {
            MobileHeader,
            MobileFooter,
        },
        data() {
            return {
                imgUrl: require('../../../public/images/avatar.gif'),
                currentPage: 5,
                category:0,
                menu:0,
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            fetchData(){
                this.category=this.$route.query.type;
                this.menu=Number(this.$route.query.type);
            }
        },
        watch:{
            '$route':'fetchData'
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        background-color: $page-back-color;
        padding-bottom: 1.32rem;


        .center-box {
            margin: 0 auto;
            width:100%;

            .content {
                margin-top: 0.267rem;
                width: 100%;
                .left {
                    width:100%;
                    padding: 0 0.267rem;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    .resultTip{
                        margin-bottom: 0.267rem;
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

                    }
                    .item {
                        margin-bottom: 0.267rem;
                        background-color: #ffffff;
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:0.133rem;
                        padding: 0.333rem;
                        box-sizing: border-box;

                        .line1, .line2, .line3, .line4 {
                            width: 100%;
                            display: flex;
                            align-items: center;
                        }

                        .line1 {

                            .tag {
                                cursor: pointer;
                                padding: 0.093rem 0.133rem;
                                box-sizing: border-box;
                                border-radius: 0.053rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 0.2rem;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                margin-right: 0.133rem;
                            }

                            .tag1 {
                                background: #2EBF8A;
                            }

                            .tag2 {
                                background: $theme-color;
                            }

                            .tag3 {
                                background: #F54DA8;
                            }

                            .tag4 {
                                background: #FF3170;
                            }

                            .tag5 {
                                background: #4793F1;
                            }
                        }

                        .line2 {
                            cursor: pointer;
                            font-size:0.36rem;
                            font-weight:400;
                            color: rgba(51, 51, 51, 1);
                            @include line-hidden(2);
                            margin: 0.133rem 0;
                        }

                        .line3 {
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
                                    width: 0.24rem;
                                    height: 0.24rem;
                                }

                                .img-year {
                                    width: 0.267rem;
                                    height: 0.293rem;
                                }

                                .img-video {
                                    width: 0.293rem;
                                    height: 0.213rem;
                                }

                                .img-img {
                                    width: 0.293rem;
                                    height: 0.267rem;
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

                        .line4 {
                            display: flex;
                            justify-content: space-between;

                            .line4-item {
                                cursor: pointer;
                                width: 2.8rem;
                                height: 2.133rem;
                                @include back-img-center;
                                position: relative;

                                .more {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(20, 20, 20, 0.6);
                                    font-size:0.64rem;
                                    font-weight:400;
                                    color:rgba(255,255,255,1);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                            }
                        }
                    }

                    .pagination {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        overflow: hidden;

                        /deep/ .el-pagination {
                            .btn-prev, .btn-next, .el-pager li {
                                background-color: #f6f6f6;
                            }
                        }
                    }
                }

            }
            .device{
                white-space: pre-wrap;
                padding-bottom: 0.4rem;
                width: 100%;
                display: flex;
                justify-content: center;
                font-size:0.32rem;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
    }

</style>