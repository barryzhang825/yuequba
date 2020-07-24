<template>
    <div class="page">
        <MobileTitle title="搜索"></MobileTitle>
        <div class="center-box">

            <div class="content">
                <div class="left">
                    <div class="result-tip">
                        搜索到 {{totalNum}} 篇相关的文章
                    </div>

                    <div class="item" v-loading="artLoading" v-for="item in artList">
                        <div class="line1">
                            <div  :class="'tag'+' tag'+item2.color_id" v-for="item2 in item.taglist">{{item2.name}}</div>
                        </div>
                        <div class="line2">
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
                                layout="prev, pager, next, jumper"
                                :total="totalNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="device">
                <span>手机端</span> |
                <span>电脑端</span>
            </div>
        </div>
        <MobileFooter></MobileFooter>
        <MobileToTop></MobileToTop>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.min.css';
    import MobileTitle from '@/components/mobile/Title'
    import MobileFooter from '@/components/mobile/Footer'
    import MobileToTop from '@/components/mobile/ToTop'
    import {formatTime, formatTimeThree} from "../../utils/utils";
    import {getArticleList, getBannerList, getTagList} from "../../api/pc/api";
    export default {
        name: "MobileResult",
        components: {
            MobileTitle,
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
                currentPage: 5,
                artLoading:false,
                keyword: '',//关键词
                tagValue: '',
                pageSize: 5,
                pageNum: 1,
                totalNum: 0,
                tagList: [],
                artList: [],
                hotList: [],//热门文章
                yearList: [],//包年精选文章
                recommendList: [],//推荐文章
                specialList: [],//精选文章
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.fetchArticle(val)
            },
            async fetchData() {
                if (this.$route.query.keyword) {
                    this.tagId = '';
                    this.tagValue = '';
                    this.keyword = this.$route.query.keyword;
                } else if (this.$route.query.tagId) {
                    this.keyword=''
                    this.tagId = this.$route.query.tagId;
                    this.tagValue=parseInt (this.$route.query.tagId);
                }
                this.fetchArticle()
                let that = this
                let bannerList = await getBannerList()
                this.bannerList = bannerList.data
                let tagList = await getTagList()
                this.tagList = tagList.data
                let hotList = await getArticleList({
                    page: 1,
                    limit: 4,
                    hot: 1
                })
                this.hotList = hotList.data.list

                let yearList = await getArticleList({
                    page: 1,
                    limit: 4,
                    category: 4
                })
                this.yearList = yearList.data.list
                let recommendList = await getArticleList({
                    page: 1,
                    limit: 4,
                    ttd: 1
                })
                this.recommendList = recommendList.data.list
                let specialList = await getArticleList({
                    page: 1,
                    limit: 4,
                    boutique: 1
                })
                this.specialList = specialList.data.list
            },
            async fetchArticle(pageNum = 1) {
                this.artLoading = true
                let that = this
                let formData = {}
                if (that.tagId) {
                    formData = {
                        page: pageNum,
                        limit: that.pageSize,
                        tag_id: that.tagId
                    }
                } else if (that.keyword) {
                    formData = {
                        page: pageNum,
                        limit: that.pageSize,
                        keyword: that.keyword
                    }
                }
                let artList = await getArticleList(formData)
                setTimeout(() => {
                    this.artLoading = false
                }, 500)
                console.log(artList, 'artList')
                that.totalNum = artList.data.count
                that.artList = artList.data.list
            },
        },
        mounted() {
            this.fetchData()
        },
        beforeCreate() {
            window.scrollTo(0, 0)
        }
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        background-color: $page-back-color;
        padding-bottom: 1.32rem;

        .van-overlay-tag{
            z-index: 999999;
            .wrapper{
                margin: 5.333rem auto;
                width:8rem;
                height:3.2rem;
                background:rgba(255,255,255,1);
                border-radius:10px;
                padding: 0.4rem;
                box-sizing: border-box;
                .wrapper-title{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        font-size:0.32rem;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        position: relative;
                        left: 0.267rem;
                    }
                    .close{
                        width:0.56rem;
                        height:0.56rem;
                        border-radius: 50%;
                        justify-self: flex-end;
                        
                    }
                }

                .block-content {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    /deep/.select-popper{
                        z-index: 8888 !important;
                    }
                    .el-select{
                        margin: 0.267rem auto;
                        width: 80%;
                        z-index: 999;
                    }
                }
            }
        }


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
                    .result-tip{
                        margin-bottom: 0.267rem;
                        width: 100%;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius:0.133rem;
                        padding: 0.267rem;
                        box-sizing: border-box;
                        font-size:0.293rem;
                        font-weight:400;
                        color:rgba(51,51,51,1);
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
                            justify-content: flex-start;

                            .line4-item:nth-child(2){
                                margin: 0 20px;
                            }

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