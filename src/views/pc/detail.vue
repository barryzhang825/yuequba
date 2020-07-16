<template>
    <div class="page">
        <Header :menu="menu"></Header>
        <div class="center-box">
            <div class="content">
                <div class="left">
                    <div class="article">
                        <div class="resultTip">
                            <img src="../../../public/images/home.png" alt="">
                            首页 ><span>&nbsp;{{category==1?'主播区':category==2?'美图区':category==3?'视频区':category==4?'包年精选区':''}}</span> > <span style="color:#646464;">正文</span>
                        </div>
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
                                <img class="img-time" src="../../../public/images/time1.png" alt="">2020-05-24
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart1.png" alt="">2
                            </div>
                            <div class="com">
                                <img class="img-comment" src="../../../public/images/comment.png" alt="">2
                            </div>
                            <div class="download">
                                下载资源：2
                            </div>
                        </div>
                        <div class="introduction">
                            <img src="../../../public/images/tag.png" alt="">
                            <span style="color:rgba(255,194,49,1);">摘要：</span>
                            [抖音福利]新增超高颜值萌妹82W粉丝奔跑晶骡子福利新增超高颜值萌妹82W粉丝奔跑晶骡子福利新增超高颜值萌妹82W粉丝奔跑晶骡子福利[9V]
                        </div>
                        <div class="images">
                            <img v-for="item in 3" src="../../../public/images/avatar.gif" alt="">
                        </div>
                        <div class="download-box">
                            <div class="download-box-line1">
                                <div class="tip">
                                    请购买VIP会员后下载资源
                                </div>
                                <div class="down">
                                    网盘链接，点击检测有效后下载
                                </div>
                            </div>
                            <div class="download-box-line2">
                                下载前请先检测资源是否有效，如果提示失效，请多点几次，有可能是网络异常。<br>
                                目前只支持购买VIP会员后下载资源，购买VIP会员请点击“购买专区”。
                            </div>
                        </div>
                        <div class="set">
                            <div class="set-like">
                                <img src="../../../public/images/like0.png" alt="">
                                喜欢（2）
                            </div>
                            <div class="set-share">
                                <img src="../../../public/images/share0.png" alt="">
                                分享
                            </div>
                        </div>
                        <div class="art-list">
                            <div class="item">
                                <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                <div class="info">
                                    <div class="button">上一篇</div>
                                    <div class="title">
                                        冯提莫:主播不低俗却励志,不当网红一姐,却当佛系少女
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="img" :style="'background-image: url('+imgUrl+')'" ></div>
                                <div class="info">
                                    <div class="title">
                                        冯提莫:主播不低俗却励志,不当网红一姐,却当佛系少女
                                    </div>
                                    <div class="button">下一篇</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="guess">
                        <div class="title">猜你喜欢</div>
                        <div class="art-list">
                            <div class="item" v-for="item in 3">
                                <div class="img" :style="'background-image: url('+imgUrl+')'"></div>
                                <div class="art-title">
                                    冯提莫:主播不低俗却励志,不当网红一姐,却当佛系少女
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="title">发表评论</div>
                        <el-input
                                type="textarea"
                                :rows="5"
                                resize="none"
                                placeholder="说点什么..."
                                v-model="commentContent">
                        </el-input>
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
        <ToTop></ToTop>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import ToTop from "../../components/pc/ToTop";

    export default {
        name: "Detail",
        components: {
            ToTop,
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
                category:0,
                menu:0,
                commentContent:'',
                // faceList: [
                //     {value: '\ud83d\ude00', url: require('../assets/imgs/emoji/grinning-face_1f600.png')},  // value为表情对应的unicode码，url为路径
                //     {value: '\ud83d\ude01', url: require('../assets/imgs/emoji/grinning-face-with-smiling-eyes_1f601.png')}
                //     ]
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
                this.menu=Number(this.$route.query.type)+1;
            }
        },
        watch:{
            '$route':'fetchData'
        },
        mounted() {
            this.fetchData()
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

                    .article{
                        margin-bottom: 20px;
                        width: 800px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:10px;
                        padding: 20px 30px;
                        box-sizing: border-box;
                        .resultTip{
                            padding-bottom: 20px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            font-size:16px;
                            font-weight:400;
                            color:rgba(255,194,49,1);

                            white-space: pre-wrap;
                            img{
                                margin-right: 10px;
                            }

                        }
                        .line1, .line2, .line3{
                            width: 100%;
                            display: flex;
                            align-items: center;
                        }
                        .line1 {
                            .tag {
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
                            font-size: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                            @include line-hidden(1);
                            margin: 10px 0;
                        }
                        .line3 {
                            margin: 20px 0;
                            display: flex;

                            .type, .time, .like ,.com ,.download {
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
                            .com{
                                .img-comment {
                                    width: 19px;
                                    height: 19px;
                                }
                                font-size:16px;
                                font-weight:400;
                                color:rgba(128,128,128,1);
                            }
                            .download{
                                font-size:16px;
                                font-weight:400;
                                color:rgba(100,100,100,1);
                            }
                        }
                        .introduction{
                            background:rgba(247,247,247,1);
                            border:1px solid rgba(230,230,230,1);
                            padding: 30px 20px;
                            box-sizing: border-box;
                            color: #666666;
                            font-size:16px;
                            font-weight:400;
                            line-height: 1.7;
                            margin-bottom: 10px;
                            img{
                                margin-right: 10px;
                                position: relative;
                                top: 5px;
                                width:21px;
                                height:21px;
                            }
                        }
                        .images{
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            img{
                                width: 100%;
                                margin: 10px 0;
                            }
                        }
                        .download-box{
                            width: 100%;
                            background:rgba(245,245,245,1);
                            border:1px solid rgba(230,230,230,1);
                            padding: 20px ;
                            box-sizing: border-box;
                            margin: 10px 0;
                            .download-box-line1{
                                width: 100%;
                                font-size:16px;
                                font-weight:400;
                                color:rgba(51,51,51,1);
                                display: flex;
                                align-items: center;
                                .tip{
                                    color: #333333;
                                    display: block;
                                }
                                .down{
                                    display: block;
                                    padding: 7px 10px;
                                    cursor: pointer;
                                    margin-left: 20px;
                                    background:rgba(27,191,112,1);
                                    border-radius:4px;
                                    color: #ffffff;
                                }
                            }
                            .download-box-line2{
                                margin-top: 30px;
                                font-size:16px;
                                font-weight:400;
                                color:#FF2F47;
                                line-height: 2;
                                white-space: pre-line;
                            }
                        }
                        .set{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0;
                            margin-bottom: 50px;
                            .set-like{
                                cursor: pointer;
                                border:1px solid rgba(255,49,88,1);
                                border-radius:8px;
                                font-size:16px;
                                font-weight:400;
                                color:rgba(255,64,64,1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 15px;
                                img{
                                    width:21px;
                                    height:18px;
                                    margin-right: 10px;
                                }
                            }
                            .set-share{
                                cursor: pointer;
                                border:1px solid rgba(204,204,204,1);
                                border-radius:8px;
                                font-size:16px;
                                font-weight:400;
                                color:rgba(128,128,128,1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 15px;
                                img{
                                    width:28px;
                                    height:28px;
                                    margin-right: 10px;
                                }
                            }
                        }
                        .art-list{
                            display: flex;
                            justify-content: space-between;
                            .item{
                                cursor: pointer;
                                width:340px;
                                .img{
                                    width:100%;
                                    height:160px;
                                    @include back-img-center;
                                }
                                .info{
                                    display: flex;
                                    margin: 15px 0;
                                    .button{
                                        width:70px;
                                        height:40px;
                                        background:rgba(51,51,51,1);

                                        padding: 0 10px;
                                        font-size:16px;
                                        font-weight:400;
                                        color:rgba(255,255,255,1);
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                    .title{
                                        @include line-hidden(2);
                                        padding-left: 10px;
                                        box-sizing: border-box;
                                        font-size:16px;
                                        font-weight:400;
                                        color:rgba(51,51,51,1);
                                    }
                                }

                            }


                        }
                    }
                    .guess{
                        margin-bottom: 20px;
                        width: 800px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:10px;
                        padding: 30px;
                        box-sizing: border-box;
                        .title {
                            width: 100%;
                            border-left: 4px solid $theme-color;
                            position: relative;
                            left: -30px;

                            padding-left: 30px;
                            font-size: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }

                        .art-list{
                            display: flex;
                            justify-content: space-between;
                            .item{
                                cursor: pointer;
                                width: 240px;
                                display: flex;
                                flex-direction: column;
                                .img{
                                    width: 100%;
                                    height: 180px;
                                    @include back-img-center;
                                    margin: 15px 0;
                                }
                                .art-title{
                                    font-size:16px;
                                    font-weight:400;
                                    color:rgba(51,51,51,1);
                                    @include line-hidden(2);
                                }
                            }
                        }
                    }
                    .comment{
                        margin-bottom: 20px;
                        width: 800px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:10px;
                        padding: 30px;
                        box-sizing: border-box;
                        .title {
                            width: 100%;
                            border-left: 4px solid $theme-color;
                            position: relative;
                            left: -30px;

                            padding-left: 30px;
                            font-size: 24px;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                        /deep/.el-textarea{
                            margin: 20px 0;
                            .el-textarea__inner{
                                background-color: rgba(246,246,246,1);
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