<template>
    <div class="page">
        <Header :menu="menu"></Header>
        <div class="center-box">
            <div class="content">
                <div class="left">
                    <div class="article">
                        <div class="resultTip">
                            <img src="../../../public/images/home.png" alt="">
                            首页 > <span style="color:#646464;">解压教程</span>
                        </div>
                        <div class="line2">
                            {{articleDetail.title}}
                        </div>
                        <div class="line3">
                            <div class="time">
                                <img class="img-time" src="../../../public/images/time1.png" alt="">{{articleDetail.create_time|timeFormat}}
                            </div>

                        </div>
                        <div class="introduction">

                            <div class="introduction-content" v-html="articleDetail.post_content"></div>
                        </div>
                    </div>
                    <div class="guess">
                        <div class="title">猜你喜欢</div>
                        <div class="art-list">
                            <div class="item" v-for="(item,index) in recommendList" v-if="index<3"
                                 @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                                <div class="img"
                                     :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                <div class="art-title">
                                    {{item.post_title}}
                                </div>
                            </div>
                        </div>
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
                                        <div @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)"
                                             class="block-img"
                                             :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
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
                            <div class="article" v-for="item in hotList"
                                 @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                                <div class="left">
                                    <div class="img"
                                         :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
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
                                        <div class="block-img"
                                             @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)"
                                             :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination2"></div>
                            </div>
                            <!--                            <div class="block-content-title">新增超高颜值萌妹82W粉丝奔跑晶骡子大尺</div>-->
                            <div class="block-items">
                                <div class="block-item" v-for="(item,index) in specialList" v-if="index<4">
                                    <div class="line1"
                                         @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)"
                                         :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                                    <div class="line2">{{item.create_time|timeFormatTwo}}</div>
                                    <div class="line3"
                                         @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                                        {{item.post_title}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div class="downloadTip">
                <div class="line1">点击确定跳转下载地址</div>
                <div class="line2">
                    <span>资源提取密码：{{resource_pass}}</span>
                    <div class="copy" v-clipboard:copy="resource_pass" v-clipboard:success="onResourceCopy">复制</div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goResource">确 定</el-button>
  </span>
        </el-dialog>
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
    import {
        doComment,
        getArticleDetail,
        getArticleList, getArticleResource,
        getBannerList, getCommentList,
        getTagList, getTeachList,
        likeArticle
    } from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";
    import vueEmoji from '../../components/pc/emoji'
    import VueClipboard from 'vue-clipboard2'


    export default {
        name: "TeachDetail",
        components: {
            ToTop,
            Header: Header,
            Footer: Footer,
            Swiper,
            vueEmoji,
            VueClipboard
        },
        filters: {
            timeFormat(val) {
                return formatTime(val)
            },
            timeFormatTwo(val) {
                return formatTimeThree(val)
            },
        },
        data() {
            return {
                dialogVisible: false,
                baseUrl: this.$baseUrl,
                imgUrl: require('../../../public/images/default.png'),
                avatarUrl: require('../../../public/images/user.png'),
                imagesUrl: [
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                    require('../../../public/images/avatar.gif'),
                ],
                loading: false,
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
                loading1: false,
                loading2: false,
                tagValue: '',
                category: 0,
                menu: 1,
                commentContent: '',
                id: '',
                tagList: [],
                hotList: [],//热门文章
                yearList: [],//包年精选文章
                specialList: [],//精选文章
                recommendList: [],//推荐文章
                articleDetail: {
                    more: {
                        photos: []
                    }
                },
                parent_id: '',//回复上级的id
                commentList: [],
                showEmoji: false,
                placeholder: '说点什么...',
                shareUrl: '',//分享链接
                resource_url: '',
                resource_pass: '',
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onCopy() {
                this.$message.success('复制链接成功，去粘贴分享吧~')
                console.log(this.$route)
                console.log(this.$router)
                console.log(window.location.href)
            },
            goResource() {
                this.dialogVisible = false
                window.open(this.resource_url)
            },
            getResource() {
                let that = this
                that.loading = true
                getArticleResource({
                    id: this.id,
                    token: localStorage.getItem('token')
                }).then(res => {
                    setTimeout(() => {
                        that.loading = false
                        if (res.data.resource_pass) {
                            that.dialogVisible = true
                            that.resource_url = res.data.resource_url
                            that.resource_pass = res.data.resource_pass
                        }
                    }, 1500)
                })
            },
            onResourceCopy() {
                this.$message.success('复制成功！')
            },
            async likeArt() {
                let that = this
                let res = await likeArticle({
                    id: that.id
                })
                if (res.msg == '赞好啦！') {
                    this.$set(that.articleDetail, 'post_like', that.articleDetail.post_like + 1);
                } else if (res.msg == '您已赞过啦！') {
                    this.$message.info('您已赞过啦！')
                }
                console.log(res, 'res')
            },
            async fetchData() {
                let that = this
                this.category = this.$route.query.type;
                this.id = this.$route.query.id;
                this.menu = Number(this.$route.query.type) + 1;
                this.shareUrl = window.location.href

                this.loading1 = true
                let articleDetail = await getTeachList({
                    icon_name: 'home_top_course'
                })
                that.articleDetail = articleDetail.data

                this.loading1 = false
                // that.fetchComment()
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
                    category: 4,
                    ttd: 1
                })
                this.yearList = yearList.data.list
                let recommendList = await getArticleList({
                    page: 1,
                    limit: 3,
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
            async fetchComment() {
                let that = this
                that.loading2 = true
                let commentList = await getCommentList({
                    id: that.id
                })
                that.commentList = commentList.data.list
                that.loading2 = false
            },
            tagChange() {
                this.$router.push('/result?tagId=' + this.tagValue)
            },


            replyComment(item) {
                this.commentContent = ''
                console.log(item)
                this.placeholder = '回复@' + item.user_name
                this.parent_id = item.id
                this.$refs['commentIpnut'].focus()
            },
            doComment() {
                let that = this
                if (that.commentContent != '') {
                    let formdata = {}
                    if (that.placeholder == '说点什么..') {
                        formdata = {
                            pp_id: that.id,
                            content: that.commentContent
                        }
                    } else {
                        formdata = {
                            pp_id: that.id,
                            content: that.commentContent,
                            parent_id: that.parent_id
                        }
                    }
                    console.log(formdata)
                    doComment(formdata).then(res => {
                        console.log(res)
                        that.fetchComment()
                    })
                    // this.commentList.push(this.commentContent)
                    this.commentContent = ''
                }
                this.showEmoji = false
            },
            selectEmoji(code) {
                console.log('select', this.showEmoji)
                // this.showEmoji = false
                this.commentContent += code
            },
        },
        watch: {
            '$route': 'fetchData'
        },
        mounted() {
            this.fetchData()
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                loop: true,
                autoplay: 3000,
                paginationClickable: true,
                observer: true,
                observeParents: true,
            })
            let swiper2 = new Swiper('.block-swiper-container', {
                pagination: '.swiper-pagination2',
                loop: true,
                autoplay: 3000,
                paginationClickable: true,
                observer: true,
                observeParents: true,
            })
        },
        beforeCreate() {
            window.scroll(0, 0)
        }
    }
</script>

<style scoped lang="scss">
    .page {
        min-width: 1200px;
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

                    .article {
                        margin-bottom: 20px;
                        width: 800px;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
                        padding: 20px 30px;
                        box-sizing: border-box;

                        .resultTip {
                            padding-bottom: 20px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            font-size: 16px;
                            font-weight: 400;
                            color: rgba(255, 194, 49, 1);

                            white-space: pre-wrap;

                            img {
                                margin-right: 10px;
                            }

                        }

                        .line1, .line2, .line3 {
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

                            .type, .time, .like, .com, .download {
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

                            .com {
                                .img-comment {
                                    width: 19px;
                                    height: 19px;
                                }

                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(128, 128, 128, 1);
                            }

                            .download {
                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(100, 100, 100, 1);
                            }
                        }

                        .introduction {
                            background: rgba(247, 247, 247, 1);
                            border: 1px solid rgba(230, 230, 230, 1);
                            padding: 30px 20px;
                            box-sizing: border-box;
                            color: #666666;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 1.7;
                            margin-bottom: 10px;


                            /*img {*/
                            /*    margin-right: 10px;*/
                            /*    position: relative;*/
                            /*    top: 5px;*/
                            /*    width: 21px;*/
                            /*    height: 21px;*/
                            /*}*/
                        }

                        .images {
                            width: 100%;
                            display: flex;
                            flex-direction: column;

                            img {
                                width: 100%;
                                margin: 10px 0;
                            }
                        }

                        .download-box {
                            width: 100%;
                            background: rgba(245, 245, 245, 1);
                            border: 1px solid rgba(230, 230, 230, 1);
                            padding: 20px;
                            box-sizing: border-box;
                            margin: 10px 0;

                            .download-box-line1 {
                                width: 100%;
                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                                display: flex;
                                align-items: center;

                                .tip {
                                    color: #333333;
                                    display: block;
                                }

                                .down {
                                    display: block;
                                    padding: 7px 10px;
                                    cursor: pointer;
                                    margin-left: 20px;
                                    background: rgba(27, 191, 112, 1);
                                    border-radius: 4px;
                                    color: #ffffff;
                                }
                            }

                            .download-box-line2 {
                                margin-top: 30px;
                                font-size: 16px;
                                font-weight: 400;
                                color: #FF2F47;
                                line-height: 2;
                                white-space: pre-line;
                            }
                        }

                        .set {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0;
                            margin-bottom: 50px;

                            .set-like {
                                cursor: pointer;
                                border: 1px solid rgba(255, 49, 88, 1);
                                border-radius: 8px;
                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(255, 64, 64, 1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 15px;

                                img {
                                    width: 21px;
                                    height: 18px;
                                    margin-right: 10px;
                                }
                            }

                            .set-share {
                                cursor: pointer;
                                border: 1px solid rgba(204, 204, 204, 1);
                                border-radius: 8px;
                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(128, 128, 128, 1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 15px;

                                img {
                                    width: 28px;
                                    height: 28px;
                                    margin-right: 10px;
                                }
                            }
                        }

                        .art-list {
                            display: flex;
                            justify-content: space-between;

                            .item {
                                cursor: pointer;
                                width: 340px;

                                .img {
                                    width: 100%;
                                    height: 160px;
                                    @include back-img-center;
                                }

                                .info {
                                    display: flex;
                                    margin: 15px 0;

                                    .button {
                                        width: 70px;
                                        height: 40px;
                                        background: rgba(51, 51, 51, 1);

                                        padding: 0 10px;
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(255, 255, 255, 1);
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }

                                    .title {
                                        margin: auto 0;
                                        width: calc(100% - 70px);
                                        @include line-hidden(2);
                                        padding-left: 10px;
                                        box-sizing: border-box;
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(51, 51, 51, 1);
                                    }
                                }

                            }


                        }
                    }

                    .guess {
                        margin-bottom: 20px;
                        width: 800px;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
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

                        .art-list {
                            display: flex;
                            justify-content: space-between;

                            .item {
                                cursor: pointer;
                                width: 240px;
                                display: flex;
                                flex-direction: column;

                                .img {
                                    width: 100%;
                                    height: 180px;
                                    @include back-img-center;
                                    margin: 15px 0;
                                }

                                .art-title {
                                    font-size: 16px;
                                    font-weight: 400;
                                    color: rgba(51, 51, 51, 1);
                                    @include line-hidden(2);
                                }
                            }
                        }
                    }

                    .comment {
                        margin-bottom: 20px;
                        width: 800px;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
                        border-radius: 10px;
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

                        /deep/ .el-textarea {
                            margin: 20px 0;

                            .el-textarea__inner {
                                background-color: rgba(246, 246, 246, 1);
                            }
                        }

                        .comment-button {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .comment-button-left {
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                position: relative;

                                span {
                                    font-size: 18px;
                                    font-weight: 400;
                                    color: rgba(51, 51, 51, 1);
                                    margin-left: 10px;
                                }
                            }

                            .comment-button-right {
                                /deep/ .el-button {
                                    width: 120px;
                                    height: 52px;

                                    font-size: 18px;
                                    font-weight: 400;
                                    color: rgba(51, 51, 51, 1);
                                }
                            }
                        }

                        .all-comment {
                            width: 100%;
                            padding: 20px 0;
                            box-sizing: border-box;
                            border-top: 1px solid rgba(230, 230, 230, 1);
                            margin-top: 20px;

                            .all-comment-title {
                                font-size: 18px;
                                font-weight: 400;
                                color: rgba(102, 102, 102, 1);
                                padding-bottom: 20px;
                            }

                            .comment-item {
                                padding-top: 25px;
                                width: 100%;
                                display: flex;
                                flex-direction: row;

                                .comment-item-left {
                                    .img {
                                        width: 72px;
                                        height: 72px;
                                        border-radius: 50%;
                                        @include back-img-center;
                                    }
                                }

                                .comment-item-right {
                                    width: calc(100% - 72px);
                                    padding-left: 20px;
                                    box-sizing: border-box;
                                    display: flex;
                                    flex-direction: column;

                                    .line1 {
                                        width: 100%;
                                        display: flex;
                                        flex-direction: row;
                                        justify-content: space-between;

                                        .username {
                                            font-size: 18px;
                                            font-weight: 400;
                                            color: rgba(102, 102, 102, 1);
                                        }

                                        .time {
                                            font-size: 16px;
                                            font-weight: 400;
                                            color: rgba(153, 153, 153, 1);
                                        }
                                    }

                                    .line2 {
                                        margin-top: 10px;
                                        width: 100%;
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(51, 51, 51, 1);
                                    }

                                    .line3 {
                                        width: 100%;
                                        display: flex;
                                        justify-content: flex-end;

                                        span {
                                            cursor: pointer;
                                            font-size: 16px;
                                            font-weight: 400;
                                            color: rgba(255, 194, 49, 1);
                                        }
                                    }

                                    .reply {
                                        margin-top: 10px;
                                        width: 100%;
                                        padding: 15px 20px;
                                        box-sizing: border-box;
                                        background: rgba(247, 247, 247, 1);
                                        border: 1px solid rgba(230, 230, 230, 1);
                                        display: flex;
                                        flex-direction: row;

                                        .reply-left {
                                            .img {
                                                width: 72px;
                                                height: 72px;
                                                border-radius: 50%;
                                                @include back-img-center;
                                            }
                                        }

                                        .reply-right {
                                            width: calc(100% - 72px);
                                            padding-left: 20px;
                                            box-sizing: border-box;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: space-around;

                                            .reply-right-line1 {
                                                width: 100%;
                                                display: flex;
                                                flex-direction: row;
                                                justify-content: space-between;

                                                .reply-line1-left {
                                                    display: flex;
                                                    flex-direction: row;
                                                    align-items: center;
                                                    font-size: 16px;
                                                    font-weight: 400;
                                                    color: rgba(51, 51, 51, 1);

                                                    .tag {
                                                        margin-left: 10px;
                                                        background: rgba(54, 137, 240, 1);
                                                        border-radius: 4px;
                                                        font-size: 16px;
                                                        font-weight: 400;
                                                        color: rgba(255, 255, 255, 1);
                                                        padding: 2px 7px;
                                                        box-sizing: border-box;
                                                    }
                                                }

                                                .reply-line1-right {
                                                    font-size: 16px;
                                                    font-weight: 400;
                                                    color: rgba(128, 128, 128, 1);
                                                }
                                            }

                                            .reply-right-line2 {
                                                margin-top: 10px;
                                                width: 100%;
                                                font-size: 16px;
                                                font-weight: 400;
                                                color: rgba(51, 51, 51, 1);
                                            }

                                            .reply-right-line3 {
                                                width: 100%;
                                                display: flex;
                                                justify-content: flex-end;

                                                span {
                                                    cursor: pointer;
                                                    font-size: 16px;
                                                    font-weight: 400;
                                                    color: rgba(255, 194, 49, 1);
                                                }
                                            }
                                        }
                                    }
                                }

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

                            .el-select {
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

                                .swiper-pagination2 {
                                    position: relative;
                                    top: -20px;
                                    z-index: 999;
                                    display: flex;
                                    justify-content: center;
                                }
                            }

                            .block-content-title {
                                cursor: pointer;
                                font-size: 16px;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                                @include line-hidden(1)
                            }

                            .article {
                                cursor: pointer;
                                margin: 10px 0;
                                width: 100%;
                                display: flex;

                                .left {
                                    width: 120px;

                                    .img {
                                        width: 120px;
                                        height: 100px;
                                        @include back-img-center
                                    }
                                }

                                .right {
                                    padding-left: 20px;
                                    box-sizing: border-box;
                                    width: calc(100% - 120px);
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;

                                    .right-title {
                                        font-size: 18px;
                                        font-weight: 400;
                                        color: rgba(51, 51, 51, 1);
                                        @include line-hidden(2)
                                    }

                                    .right-info {
                                        width: 100%;
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(128, 128, 128, 1);
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;

                                        .view {
                                            display: flex;
                                            align-items: center;

                                            img {
                                                margin-right: 5px;
                                                width: 20px;
                                                height: 16px;

                                            }
                                        }
                                    }
                                }
                            }

                            .block-items {
                                margin-top: 20px;
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: space-between;

                                .block-item {
                                    margin-bottom: 20px;
                                    cursor: pointer;
                                    width: 150px;
                                    display: flex;
                                    flex-direction: column;

                                    .line1 {
                                        @include back-img-center;
                                        width: 150px;
                                        height: 120px;
                                    }

                                    .line2 {
                                        margin-top: 5px;
                                        margin-bottom: 7px;
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(128, 128, 128, 1);
                                    }

                                    .line3 {
                                        font-size: 16px;
                                        font-weight: 400;
                                        color: rgba(51, 51, 51, 1);
                                        @include line-hidden(2)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .downloadTip {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .line1 {
                width: 100%;
                text-align: center;
            }

            .line2 {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 1rem;

                .copy {
                    cursor: pointer;
                    margin-left: 0.4rem;
                    border: 1px solid gainsboro;
                    border-radius: 0.267rem;
                    padding: 0 0.133rem;
                    color: #949494;
                }
            }
        }
    }

</style>