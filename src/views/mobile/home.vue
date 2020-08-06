<template>
    <div class="page">
        <MobileHeader></MobileHeader>
        <van-overlay class-name="van-overlay-tag" :show="ifTagShow" @click="ifTagShow = false">
            <div class="wrapper" @click.stop>
                <div class="wrapper-title">
                    <div></div>
                    <span>热门标签</span>
                    <img class="close" @click="ifTagShow = false" src="../../../public/images/close3.png" alt="">
                </div>

                <div class="block-content">
                    <el-select v-model="tagValue" placeholder="请选择" @change="tagChange" popper-class="select-popper"
                               :popper-append-to-body="false">
                        <el-option
                                v-for="item in tagList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </van-overlay>
        <div class="center-box">
            <div class="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in bannerList">
                            <div class="img" :style="'background-image: url('+baseUrl+item.image+')'"></div>
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="hotMenu">
                <div class="hotMenu-item">
                    <img class="img1" src="../../../public/images/m1.png" @click="$router.push('/mobile/register')">
                    <span>注册会员</span>
                </div>
                <div class="hotMenu-item">
                    <img class="img2" src="../../../public/images/m2.png" @click="$router.push('/mobile/purchase')">
                    <span>购买专区</span>
                </div>
                <div class="hotMenu-item" @click="ifTagShow=true">
                    <img class="img3" src="../../../public/images/m3.png" alt="">
                    <span>热门标签</span>
                </div>
                <div class="hotMenu-item" @click="$router.push('/mobile/user')">
                    <img class="img4" src="../../../public/images/m4.png" alt="">
                    <span>用户中心</span>
                </div>
            </div>
            <div class="content-title">
                <span>随机精选</span>
                <div class="border"></div>
            </div>
            <div class="pics">
                <div class="pics-box">
                    <div class="pics-item" v-if="index<4"  @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'" v-for="(item,index) in specialList">
                        <div class="gray">
                            <div class="text">{{item.post_excerpt}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="item" v-loading="artLoading" v-for="item in artList">
                        <div class="line1">
                            <div  :class="'tag'+' tag'+item2.color_id" v-for="item2 in item.taglist">{{item2.name}}</div>
                        </div>
                        <div class="line2" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                            {{item.post_title}}
                        </div>
                        <div class="line3">
                            <div class="type">
                                <img :class="item.category_id==1?'img-upper':item.category_id==2?'img-img':item.category_id==3?'img-video':item.category_id==4?'img-year':''"
                                     :src="item.category_id==1?require('../../../public/images/upper.png'):item.category_id==2?require('../../../public/images/img.png'):item.category_id==3?require('../../../public/images/video.png'):item.category_id==4?require('../../../public/images/year.png'):''" alt="">
                                {{item.category_id==1?'主播区':item.category_id==2?'美图区':item.category_id==3?'视频区':item.category_id==4?'包年精选区':''}}
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">{{item.create_time|timeFormat}}
                            </div>
                            <div class="like">
                                <img class="img-like" src="../../../public/images/heart.png" alt="">{{item.post_like}}
                            </div>
                        </div>
                        <div class="line4">
                            <div v-if="item.more.photos.length>0" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" class="line4-item" :style="'background-image: url('+baseUrl+item.more.photos[0].url+')'"></div>
                            <div v-if="item.more.photos.length>1" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" class="line4-item" :style="'background-image: url('+baseUrl+item.more.photos[1].url+')'"></div>
                            <div v-if="item.more.photos.length>2" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" class="line4-item" :style="'background-image: url('+baseUrl+item.more.photos[2].url+')'">
                                <div class="more" v-if="item.surplusimgnum">+{{item.surplusimgnum}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                                :background="false"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="pageNum"
                                :page-size="pageSize"
                                layout="prev, pager, next"
                                :total="totalNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="device">
                <span @click="changeDevice(0)">手机端</span> | <span @click="changeDevice(1)">电脑端</span>
            </div>
        </div>
        <MobileFooter></MobileFooter>
        <MobileToTop></MobileToTop>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import MobileHeader from '@/components/mobile/Header'
    import MobileFooter from '@/components/mobile/Footer'
    import MobileToTop from '@/components/mobile/ToTop'
    import {getArticleList, getBannerList, getTagList} from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";

    export default {
        name: "MobileHome",
        components: {
            Swiper,
            MobileHeader,
            MobileFooter,
            MobileToTop
        },
        filters:{
            timeFormat(val){
                return formatTime(val)
            },
            timeFormatTwo(val){
                return formatTimeThree(val)
            },
        },
        data() {
            return {
                baseUrl: this.$baseUrl,
                imgUrl: require('../../../public/images/avatar.gif'),
                imagesUrl: [
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                ],
                currentPage: 5,
                ifTagShow: false,
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
                artLoading:false,
                pageSize:10,
                pageNum:1,
                totalNum:0,
                tagValue: '',
                bannerList: [],
                tagList: [],
                artList: [],
                hotList: [],//热门文章
                yearList: [],//包年精选文章
                recommendList: [],//推荐文章
                specialList: [],//精选文章
            }
        },
        methods: {
            tagChange(){
                this.$router.push('/result?tagId='+this.tagValue)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                window.scroll(0,0)
                this.fetchArticle(val)
            },
            async fetchArticle(pageNum=1){
                this.artLoading=true
                let that = this
                let artList=await getArticleList({
                    page:pageNum,
                    limit:that.pageSize
                })
                setTimeout(()=>{
                    this.artLoading=false
                },500)
                that.totalNum=artList.data.count
                that.artList=artList.data.list
            },
            async fetchData() {
                let that = this
                let bannerList = await getBannerList()
                this.bannerList = bannerList.data
                let tagList = await getTagList()
                this.tagList = tagList.data
                let hotList=await getArticleList({
                    page:1,
                    limit:4,
                    hot:1
                })
                this.hotList=hotList.data.list

                let yearList=await getArticleList({
                    page:1,
                    limit:4,
                    category:4
                })
                this.yearList=yearList.data.list
                let recommendList=await getArticleList({
                    page:1,
                    limit:4,
                    ttd:1
                })
                this.recommendList=recommendList.data.list
                let specialList=await getArticleList({
                    page:1,
                    limit:4,
                    boutique:1
                })
                this.specialList=specialList.data.list
                console.log(specialList,'specialList')
            },
            changeDevice(e){
                if(e){
                    localStorage.setItem('setDevice','pc')
                    this.$router.go(0)
                }else {
                    localStorage.setItem('setDevice','mobile')
                    this.$router.go(0)
                }

            }
        },
        mounted() {
            this.fetchData()
            this.fetchArticle()
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                loop: true,
                autoplay: 3000,
                paginationClickable: true,
                observer:true,
                observeParents:true,
            })
        }
    }
</script>

<style scoped lang="scss">
    .page {
@include max-width;
        width: 100%;
        background-color: $page-back-color;
        padding-bottom: 1.32rem;

        .van-overlay-tag {
            z-index: 999999;

            .wrapper {
                margin: 5.333rem auto;
                width: 8rem;
                height: 3.2rem;
                background: rgba(255, 255, 255, 1);
                border-radius: 10px;
                padding: 0.4rem;
                box-sizing: border-box;

                .wrapper-title {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        font-size: 0.32rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        position: relative;
                        left: 0.267rem;
                    }

                    .close {
                        width: 0.56rem;
                        height: 0.56rem;
                        border-radius: 50%;
                        justify-self: flex-end;

                    }
                }

                .block-content {
                    width: 100%;
                    display: flex;
                    align-items: center;

                    /deep/ .select-popper {
                        z-index: 8888 !important;
                    }

                    .el-select {
                        margin: 0.267rem auto;
                        width: 80%;
                        z-index: 999;
                    }
                }
            }
        }


        .center-box {
            margin: 0 auto;
            width: 100%;

            .swiper {
                width: 100%;
                overflow: hidden;

                .swiper-container {
                    width: 100%;
                    height: 4.267rem;

                    .img {
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        @include back-img-center;
                    }

                    /deep/ .swiper-pagination-bullet {
                        width: 0.187rem;
                        height: 0.187rem;
                        opacity: 1;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 50%;
                    }

                    /deep/ .swiper-pagination-bullet-active {
                        width: 0.187rem;
                        height: 0.187rem;
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

            .hotMenu {
                position: relative;
                top: -0.267rem;
                z-index: 1;
                margin: 0 auto;
                width: 9.467rem;
                height: 2.133rem;
                background: rgba(255, 255, 255, 1);
                box-shadow: -4px 4px 10px 0px rgba(204, 204, 204, 0.3);
                border-radius: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;

                .hotMenu-item {
                    width: 25%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .img1 {
                        width: 0.747rem;
                        height: 0.68rem;
                    }

                    .img2 {
                        width: 0.8rem;
                        height: 0.8rem;
                    }

                    .img3 {
                        width: 0.827rem;
                        height: 0.707rem;
                    }

                    .img4 {
                        width: 0.8rem;
                        height: 0.8rem;
                    }

                    span {
                        margin-top: 0.133rem;
                        font-size: 0.32rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }

            .content-title {
                margin: 0.267rem 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                span {
                    font-size: 0.4rem;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

                .border {
                    margin: 0.133rem 0;
                    width: 0.667rem;
                    height: 0.08rem;
                    background: rgba(255, 194, 49, 1);
                    border-radius: 0.04rem;
                }
            }

            .pics {
                width: 100%;
                box-sizing: border-box;
                .pics-box {
                    overflow-x: scroll;
                    display: flex;
                    box-sizing: border-box;
                    .pics-item {
                        flex-shrink: 0;
                        width: 3.733rem;
                        height: 3.067rem;
                        border-radius: 0.133rem;
                        @include back-img-center;
                        margin: 0 0.267rem;

                        .gray {
                            width: 100%;
                            height: 100%;
                            background: rgba(20, 20, 20, .5);
                            border-radius: 0.133rem;
                            position: relative;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: center;

                            .text {
                                text-align: justify;
                                font-size: 0.213rem;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                position: absolute;
                                bottom: 0;
                                margin: 0.267rem;
                                @include line-hidden(2);
                            }
                        }
                    }
                }
            }

            .content {
                margin-top: 0.267rem;
                width: 100%;

                .left {
                    width: 100%;
                    padding: 0 0.267rem;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;

                    .item {
                        margin-bottom: 0.267rem;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 0.133rem;
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
                            font-size: 0.36rem;
                            font-weight: 400;
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
                            justify-content: flex-start;

                            .line4-item:nth-child(2){
                                margin: 0 0.267rem;
                            }

                            .line4-item {
                                cursor: pointer;
                                width: 2.78rem;
                                height: 2.133rem;
                                @include back-img-center;
                                position: relative;

                                .more {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(20, 20, 20, 0.6);
                                    font-size: 0.64rem;
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

            .device {
                white-space: pre-wrap;
                padding-bottom: 0.4rem;
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 0.32rem;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                span{
                    text-decoration: none;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }

</style>