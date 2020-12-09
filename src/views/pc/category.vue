<template>
    <div class="page">
        <Header :menu="menu"></Header>
        <div class="center-box">
            <div class="content">
                <div class="left">
                    <div class="resultTip">
                        <img src="../../../public/images/home.png" alt="">
                        首页 ><span>&nbsp;{{category==1?siteInfo.categorys[0].name:category==2?siteInfo.categorys[1].name:category==3?siteInfo.categorys[2].name:category==4?siteInfo.categorys[3].name:'栏目专区'}}</span>
                    </div>
                    <div class="item" v-loading="artLoading" v-for="item in artList">
                        <div class="line1">
                            <div :class="'tag'+' tag'+item2.color_id" v-for="item2 in item.taglist">{{item2.name}}</div>
                        </div>
                        <div class="line2" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                            {{item.post_title}}
                        </div>
                        <div class="line3">
                            <div class="type">
                                <img :class="item.category_id==1?'img-upper':item.category_id==2?'img-img':item.category_id==3?'img-video':item.category_id==4?'img-year':''"
                                     :src="item.category_id==1?require('../../../public/images/upper.png'):item.category_id==2?require('../../../public/images/img.png'):item.category_id==3?require('../../../public/images/video.png'):item.category_id==4?require('../../../public/images/year.png'):''" alt="">
                                {{item.category_id==1?siteInfo.categorys[0].name:item.category_id==2?siteInfo.categorys[1].name:item.category_id==3?siteInfo.categorys[2].name:item.category_id==4?siteInfo.categorys[3].name:''}}
                            </div>
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time.png" alt="">{{item.create_time|timeFormat}}
                            </div>
<!--                            <div class="like">-->
<!--                                <img class="img-like" src="../../../public/images/heart.png" alt="">{{item.post_like}}-->
<!--                            </div>-->
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
                                hide-on-single-page
                                :background="false"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="pageNum"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="totalNum">
                        </el-pagination>
                    </div>
                    <div class="device" v-if="device=='mobile'">
                        <span @click="changeDevice(0)">手机端</span> | <span @click="changeDevice(1)">电脑端</span>
                    </div>
                </div>
                <div class="right">
                    <div class="block-box">
                        <div class="title">热门标签</div>
                        <div class="block-content">
                            <el-select v-model="tagValue" placeholder="请选择" @change="tagChange">
                                <el-option
                                        v-for="item in tagList"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="title">包年精选</div>
                        <div class="block-content">
                            <div class="block-swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item,index) in yearList">
                                        <div @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" class="block-img" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination2"></div>
                            </div>
                            <!--                            <div class="block-content-title">新增超高颜值萌妹82W粉丝奔跑晶骡子大尺</div>-->
                        </div>
                    </div>
                    <div class="block-box">
                        <div class="title">热门文章</div>
                        <div class="block-content">
                            <div class="article" v-for="item in hotList" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                                <div class="left">
                                    <div class="img" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                </div>
                                <div class="right">
                                    <div class="right-title">
                                        {{item.post_title}}
                                    </div>
                                    <div class="right-info">
                                        <div>{{item.create_time|timeFormat}}</div>
                                        <div class="view">
                                            <img src="../../../public/images/view.png" alt="">
                                            {{item.post_hits}}
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
                                    <div class="swiper-slide" v-for="(item,index) in specialList">
                                        <div class="block-img" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination2"></div>
                            </div>
                            <!--                            <div class="block-content-title">新增超高颜值萌妹82W粉丝奔跑晶骡子大尺</div>-->
                            <div class="block-items">
                                <div class="block-item" v-for="(item,index) in specialList" v-if="index<4">
                                    <div class="line1" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    <div class="line2">{{item.create_time|timeFormatTwo}}</div>
                                    <div class="line3" @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                                        {{item.post_title}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-box" >
                        <div class="title">浏览历史</div>
                        <div class="block-content">
                            <div class="block-items">
                                <div class="block-item" v-for="(item,index) in historyList" >
                                    <div class="line1"
                                         @click="$router.push('/detail?type='+item.category_id+'&id='+item.pp_id)"
                                         :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    <div class="line2">{{item.create_time|timeFormatTwo}}</div>
                                    <div class="line3"
                                         @click="$router.push('/detail?type='+item.category_id+'&id='+item.pp_id)">
                                        {{item.post_title}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Contact></Contact>
        <Footer></Footer>
        <ToTop></ToTop>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import ToTop from "@/components/pc/ToTop";
    import {getArticleList, getBannerList, getHistoryList, getTagList} from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";

    export default {
        name: "Category",
        components: {
            ToTop,
            Header: Header,
            Footer: Footer,
            Swiper
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
                siteInfo:{categorys:[{name:''},{name:''},{name:''},{name:''}]},
                device:localStorage.getItem('device'),
                baseUrl: this.$baseUrl,
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
                artLoading:false,
                tagValue:'',
                keyword:'',
                category:0,
                menu:0,
                pageSize:5,
                pageNum:1,
                totalNum:0,
                tagList: [],
                artList: [],
                hotList: [],//热门文章
                yearList: [],//包年精选文章
                specialList: [],//包年精选文章
                historyList: [],//历史浏览记录

            }
        },
        methods: {
            changeDevice(e){
                if(e){
                    localStorage.setItem('setDevice','pc')
                    this.$router.go(0)
                }else {
                    localStorage.setItem('setDevice','mobile')
                    this.$router.go(0)
                }

            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.fetchArticle(val)
            },
            tagChange(){
                this.$router.push('/result?keyword='+this.tagValue)
            },
            async fetchData(){
                this.fetchArticle()
                this.category=this.$route.query.type;
                this.menu=Number(this.$route.query.type)+1;
                let that = this
                let tagList = await getTagList()
                this.tagList = tagList.data
                let hotList=await getArticleList({
                    page:1,
                    limit:4,
                    hot:1
                })
                this.hotList=hotList.data.list

                let historyList = await getHistoryList({

                })
                this.historyList = historyList.data.list

                let yearList=await getArticleList({
                    page:1,
                    limit:4,
                    category:4,
                    ttd: 1
                })
                this.yearList=yearList.data.list
                let specialList=await getArticleList({
                    page:1,
                    limit:4,
                    boutique:1
                })
                this.specialList=specialList.data.list
            },
            async fetchArticle(pageNum=1){
                this.artLoading=true
                let that = this
                let artList=await getArticleList({
                    page:pageNum,
                    limit:that.pageSize,
                    category:this.category?this.$route.query.type:''
                })
                setTimeout(()=>{
                    this.artLoading=false
                },500)
                that.totalNum=artList.data.count
                that.artList=artList.data.list
            },
        },
        watch:{
            '$route':'fetchData'
        },
        mounted() {
            this.siteInfo=JSON.parse(localStorage.getItem('siteInfo'))
            let that = this
            this.category=this.$route.query.type
            this.fetchData()
            this.keyword = this.$route.query.keyword;
            let swiper2 = new Swiper('.block-swiper-container', {
                pagination: '.swiper-pagination2',
                loop: true,
                autoplay: 3000,
                paginationClickable: true,
                observer:true,
                onSlideChangeStart: function(swiper){
                    that.swiperActiveIndex2=swiper.activeIndex
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .page {
        min-width:1200px;
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
                            justify-content: flex-start;

                            .line4-item:nth-child(2){
                                margin: 0 20px;
                            }
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
                    .device {
                        margin-bottom: 20px;
                        white-space: pre-wrap;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        font-size: 15px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        span{
                            cursor: pointer;
                            text-decoration: none;
                            color: rgba(51, 51, 51, 1);
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