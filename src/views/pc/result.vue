<template>
    <div class="page">
        <Header :menu="1"></Header>
        <div class="center-box">
            <div class="content">
                <div class="left">
                    <div class="resultTip">
                        搜索到 278 篇相关的文章
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
                                layout="prev, pager, next, jumper"
                                :total="1000">
                        </el-pagination>
                    </div>
                </div>
                <div class="right">
                    <div class="block-box">
                        <div class="title">热门标签</div>
                        <div class="block-content">
                            <el-select v-model="tagValue" placeholder="请选择">
                                <el-option
                                        v-for="item in tagOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="title">包年精选</div>
                        <div class="block-content">
                            <div class="block-swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item,index) in imagesUrl">
                                        <div class="block-img" :style="'background-image: url('+item+')'"></div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination2"></div>
                            </div>
                            <div class="block-content-title">新增超高颜值萌妹82W粉丝奔跑晶骡子大尺</div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="title">热门文章</div>
                        <div class="block-content">
                            <div class="article">
                                <div class="left">
                                    <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                </div>
                                <div class="right">
                                    <div class="right-title">
                                        《我不是药神》引大家对版权深思,主播冯提主播冯提主播冯提
                                    </div>
                                    <div class="right-info">
                                        <div>2020-05-23</div>
                                        <div class="view">
                                            <img src="../../../public/images/view.png" alt="">
                                            250
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="article">
                                <div class="left">
                                    <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                </div>
                                <div class="right">
                                    <div class="right-title">
                                        《我不是药神》引大家对版权深思,主播冯提主播冯提主播冯提
                                    </div>
                                    <div class="right-info">
                                        <div>2020-05-23</div>
                                        <div class="view">
                                            <img src="../../../public/images/view.png" alt="">
                                            250
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="article">
                                <div class="left">
                                    <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                </div>
                                <div class="right">
                                    <div class="right-title">
                                        《我不是药神》引大家对版权深思,主播冯提主播冯提主播冯提
                                    </div>
                                    <div class="right-info">
                                        <div>2020-05-23</div>
                                        <div class="view">
                                            <img src="../../../public/images/view.png" alt="">
                                            250
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="article">
                                <div class="left">
                                    <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                </div>
                                <div class="right">
                                    <div class="right-title">
                                        《我不是药神》引大家对版权深思,主播冯提主播冯提主播冯提
                                    </div>
                                    <div class="right-info">
                                        <div>2020-05-23</div>
                                        <div class="view">
                                            <img src="../../../public/images/view.png" alt="">
                                            250
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="title">精选资源</div>
                        <div class="block-content">
                            <div class="block-swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item,index) in imagesUrl">
                                        <div class="block-img" :style="'background-image: url('+item+')'"></div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination2"></div>
                            </div>
                            <div class="block-content-title">新增超高颜值萌妹82W粉丝奔跑晶骡子大尺</div>
                            <div class="block-items">
                                <div class="block-item">
                                    <div class="line1" :style="'background-image: url('+imgUrl+')'"></div>
                                    <div class="line2">2020-06-18</div>
                                    <div class="line3">
                                        《苦瓜电竞》--让你体验不一样的电竞主播...
                                    </div>
                                </div>
                                <div class="block-item">
                                    <div class="line1" :style="'background-image: url('+imgUrl+')'"></div>
                                    <div class="line2">2020-06-18</div>
                                    <div class="line3">
                                        《苦瓜电竞》--让你体验不一样的电竞主播...
                                    </div>
                                </div>
                                <div class="block-item">
                                    <div class="line1" :style="'background-image: url('+imgUrl+')'"></div>
                                    <div class="line2">2020-06-18</div>
                                    <div class="line3">
                                        《苦瓜电竞》--让你体验不一样的电竞主播...
                                    </div>
                                </div>
                                <div class="block-item">
                                    <div class="line1" :style="'background-image: url('+imgUrl+')'"></div>
                                    <div class="line2">2020-06-18</div>
                                    <div class="line3">
                                        《苦瓜电竞》--让你体验不一样的电竞主播...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'

    export default {
        name: "Result",
        components: {
            Header: Header,
            Footer: Footer,
            Swiper
        },
        data() {
            return {
                imgUrl: require('../../../public/images/avatar.gif'),
                imagesUrl: [
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                ],
                currentPage: 5,
                tagOptions: [{
                    value: '选项1',
                    label: '女神主播'
                }, {
                    value: '选项2',
                    label: '女神主播'
                }, {
                    value: '选项3',
                    label: '女神主播'
                }],
                tagValue:'',
                keyword:'',

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        mounted() {
            this.keyword = this.$route.query.keyword;
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                loop: true,
                autoplay : 3000,
                paginationClickable: true
            })
            let swiper2 = new Swiper('.block-swiper-container', {
                pagination: '.swiper-pagination2',
                loop: true,
                autoplay : 3000,
                paginationClickable: true
            })
        }
    }
</script>

<style scoped lang="scss">
    .page {
        background-color: $page-back-color;

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

                    .img {
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        @include back-img-center;
                    }

                    /deep/ .swiper-pagination-bullet {
                        width: 14px;
                        height: 14px;
                        opacity: 1;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 50%;
                    }

                    /deep/ .swiper-pagination-bullet-active {
                        width: 14px;
                        height: 14px;
                        background: $theme-color;
                        border-radius: 50%;
                    }

                    /deep/ .swiper-button-next {
                        right: 20px;
                        width: 45px;
                        height: 45px;
                        background-size: 100% 100%;
                        background-image: url("../../../public/images/right.png");
                    }

                    /deep/ .swiper-button-prev {
                        left: 20px;
                        width: 45px;
                        height: 45px;
                        background-size: 100% 100%;
                        background-image: url("../../../public/images/left.png");
                    }
                }
            }

            .class {
                width: 100%;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;

                .item {
                    cursor: pointer;
                    width: 280px;
                    height: 230px;
                    position: relative;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    border-radius: 10px;

                    .text {
                        z-index: 1;
                        position: absolute;
                        bottom: 0;
                        padding: 25px 20px;
                        box-sizing: border-box;

                        a {
                            font-size: 16px;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            @include line-hidden(2)
                        }

                    }

                    .gray {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        background: rgba(20, 20, 20, 1);
                        opacity: 0.5;
                        border-radius: 10px;
                    }
                }
            }

            .content {
                width: 1200px;
                margin: 0 auto;
                margin-top: 30px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .left {
                    width: 800px;
                    display: flex;
                    flex-direction: column;

                    .resultTip{
                        margin-bottom: 20px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
                        padding: 20px;
                        box-sizing: border-box;


                        font-size:18px;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                    .item {
                        margin-bottom: 20px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
                        padding: 20px;
                        box-sizing: border-box;

                        .line1, .line2, .line3, .line4 {
                            width: 100%;
                            display: flex;
                            align-items: center;
                        }

                        .line1 {

                            .tag {
                                cursor: pointer;
                                padding: 7px 10px;
                                box-sizing: border-box;
                                border-radius: 4px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                margin-right: 10px;
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
                            font-size: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                            @include line-hidden(1);
                            margin: 10px 0;
                        }

                        .line3 {
                            margin: 20px 0;
                            display: flex;

                            .type, .time, .like {
                                display: flex;
                                align-items: center;
                                margin-right: 20px;

                                img {
                                    margin-right: 10px;
                                }
                            }

                            .type {
                                .img-upper {
                                    width: 18px;
                                    height: 18px;
                                }

                                .img-year {
                                    width: 20px;
                                    height: 22px;
                                }

                                .img-video {
                                    width: 22px;
                                    height: 16px;
                                }

                                .img-img {
                                    width: 22px;
                                    height: 20px;
                                }

                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(100, 100, 100, 1);
                            }

                            .time {
                                .img-time {
                                    width: 20px;
                                    height: 20px;
                                }

                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(100, 100, 100, 1);
                            }

                            .like {
                                .img-like {
                                    width: 20px;
                                    height: 18px;
                                }

                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(128, 128, 128, 1);
                            }
                        }

                        .line4 {
                            display: flex;
                            justify-content: space-between;

                            .line4-item {
                                cursor: pointer;
                                width: 240px;
                                height: 180px;
                                @include back-img-center;
                                position: relative;

                                .more {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(20, 20, 20, 0.6);
                                    font-size: 48px;
                                    font-weight: 400;
                                    color: rgba(255, 255, 255, 1);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                            }
                        }
                    }

                    .pagination {
                        width: 100%;
                        padding: 20px 0;
                        display: flex;
                        justify-content: center;

                        /deep/ .el-pagination {
                            .btn-prev, .btn-next, .el-pager li {
                                background-color: #f6f6f6;
                            }
                        }
                    }
                }

                .right {
                    width: 370px;
                    display: flex;
                    flex-direction: column;

                    .block-box {
                        margin-bottom: 20px;
                        width: 100%;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
                        padding: 20px;
                        box-sizing: border-box;

                        .title {
                            width: 100%;
                            border-left: 4px solid $theme-color;
                            position: relative;
                            left: -20px;

                            padding-left: 20px;
                            font-size: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                        .block-content {
                            width: 100%;
                            .el-select{
                                margin-top: 20px;
                                width: 100%;
                            }
                            .block-swiper-container {
                                margin: 20px 0;
                                width: 100%;
                                height: 200px;
                                overflow: hidden;
                                .block-img {
                                    cursor: pointer;
                                    width: 100%;
                                    height: 100%;
                                    @include back-img-center;
                                }
                                /deep/ .swiper-pagination-bullet {
                                    width: 10px;
                                    height: 10px;
                                    opacity: 1;
                                    background: rgba(255, 255, 255, 1);
                                    border-radius: 50%;
                                }

                                /deep/ .swiper-pagination-bullet-active {
                                    width: 10px;
                                    height: 10px;
                                    background: $theme-color;
                                    border-radius: 50%;
                                }
                                .swiper-pagination2{
                                    position: relative;
                                    top: -20px;
                                    z-index: 999;
                                    display: flex;
                                    justify-content: center;
                                }
                            }
                            .block-content-title{
                                cursor: pointer;
                                font-size:16px;
                                font-weight:400;
                                color:rgba(51,51,51,1);
                                @include line-hidden(1)
                            }

                            .article{
                                cursor: pointer;
                                margin: 10px 0;
                                width: 100%;
                                display: flex;
                                .left{
                                    width: 120px;
                                    .img{
                                        width: 120px;
                                        height: 100px;
                                        @include back-img-center
                                    }
                                }
                                .right{
                                    padding-left: 20px;
                                    box-sizing: border-box;
                                    width: calc(100% - 120px);
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    .right-title{
                                        font-size:18px;
                                        font-weight:400;
                                        color:rgba(51,51,51,1);
                                        @include line-hidden(2)
                                    }
                                    .right-info{
                                        width: 100%;
                                        font-size:16px;
                                        font-weight:400;
                                        color:rgba(128,128,128,1);
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        .view{
                                            display: flex;
                                            align-items: center;
                                            img{
                                                margin-right: 5px;
                                                width: 20px;
                                                height: 16px;

                                            }
                                        }
                                    }
                                }
                            }

                            .block-items{
                                margin-top: 20px;
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                .block-item{
                                    margin-bottom: 20px;
                                    cursor: pointer;
                                    width: 150px;
                                    display: flex;
                                    flex-direction: column;

                                    .line1{
                                        @include back-img-center;
                                        width: 150px;
                                        height: 120px;
                                    }
                                    .line2{
                                        margin-top: 5px;
                                        margin-bottom: 7px;
                                        font-size:16px;
                                        font-weight:400;
                                        color:rgba(128,128,128,1);
                                    }
                                    .line3{
                                        font-size:16px;
                                        font-weight:400;
                                        color:rgba(51,51,51,1);
                                        @include line-hidden(2)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>