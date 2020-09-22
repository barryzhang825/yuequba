<template>
    <div class="page">
        <MobileTitle title="文章详情"></MobileTitle>
        <div class="container">
            <div class="resultTip">
                <img src="../../../public/images/home.png" alt="">
                首页 ><span>&nbsp;{{category==1?'主播区':category==2?'美图区':category==3?'视频区':category==4?'包年精选区':''}}</span>
                > <span style="color:#646464;">正文</span>
            </div>
            <div class="line1">
                <div :class="'tag'+' tag'+item2.color_id" v-for="item2 in articleDetail.taglist">{{item2.name}}</div>
            </div>
            <div class="line2">
                {{articleDetail.post_title}}
            </div>
            <div class="line3">
                <div class="type">
                    <img :class="articleDetail.category_id==1?'img-upper':articleDetail.category_id==2?'img-img':articleDetail.category_id==3?'img-video':articleDetail.category_id==4?'img-year':''"
                         :src="articleDetail.category_id==1?require('../../../public/images/upper.png'):articleDetail.category_id==2?require('../../../public/images/img.png'):articleDetail.category_id==3?require('../../../public/images/video.png'):articleDetail.category_id==4?require('../../../public/images/year.png'):''"
                         alt="">
                    {{articleDetail.category_id==1?'主播区':articleDetail.category_id==2?'美图区':articleDetail.category_id==3?'视频区':articleDetail.category_id==4?'包年精选区':''}}
                </div>
                <div class="time">
                    <img class="img-time" src="../../../public/images/time1.png" alt="">{{articleDetail.create_time|timeFormatTwo}}
                </div>
                <div class="like">
                    <img class="img-like" src="../../../public/images/heart1.png" alt="">{{articleDetail.post_like}}
                </div>
                <div class="com">
                    <img class="img-comment" src="../../../public/images/comment.png" alt="">{{articleDetail.comment_count}}
                </div>
                <div class="download">
                    下载资源：{{articleDetail.down_num}}
                </div>
            </div>
            <div class="introduction">
                <img src="../../../public/images/tag.png" alt="">
                <span style="color:rgba(255,194,49,1);">摘要：</span>
                {{articleDetail.post_excerpt}}
            </div>
            <div class="images" v-loading="loading1">
                <img v-for="item in articleDetail.more.photos" :src="baseUrl+item.url" alt="">
            </div>
            <div class="download-box">
                <div class="download-box-line1">
                    <div class="tip">
                        请购买VIP会员后下载资源
                    </div>
                    <div class="down" @click="getResource" v-loading='loading'>
                        网盘链接，点击检测有效后下载
                    </div>
                </div>
                <div class="download-box-line2">
                    下载前请先检测资源是否有效，如果提示失效，请多点几次，有可能是网络异常。<br>
                    目前只支持购买VIP会员后下载资源，购买VIP会员请点击“购买专区”。
                </div>
            </div>
            <div class="set">
                <div class="set-like" @click="likeArt">
                    <img src="../../../public/images/like0.png" alt="">
                    喜欢（{{articleDetail.post_like}}）
                </div>
                <div class="set-share" v-clipboard:copy="shareUrl" v-clipboard:success="onCopy">
                    <img src="../../../public/images/share0.png" alt="">
                    分享
                </div>
            </div>
            <div class="art-list">
                <div class="item"
                     @click="articleDetail.prev_article?$router.push('/detail?type='+category+'&id='+articleDetail.prev_article.id):''">
                    <div v-if="articleDetail.prev_article" class="img"
                         :style="'background-image: url('+baseUrl+articleDetail.prev_article.more.thumbnail+')'"></div>
                    <div v-if="!articleDetail.prev_article" class="img"
                         :style="'background-image: url('+imgUrl+')'"></div>
                    <div class="info">
                        <div class="button">上一篇</div>
                        <div class="title">
                            {{articleDetail.prev_article?articleDetail.prev_article.post_title:'暂无更多'}}
                        </div>
                    </div>
                </div>
                <div class="item"
                     @click="articleDetail.next_article?$router.push('/detail?type='+category+'&id='+articleDetail.next_article.id):''">
                    <div v-if="articleDetail.next_article" class="img"
                         :style="'background-image: url('+baseUrl+articleDetail.next_article.more.thumbnail+')'"></div>
                    <div v-if="!articleDetail.next_article" class="img"
                         :style="'background-image: url('+imgUrl+')'"></div>
                    <div class="info">
                        <div class="title">
                            {{articleDetail.next_article?articleDetail.next_article.post_title:'暂无更多'}}
                        </div>
                        <div class="button">下一篇</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="guess">
            <div class="title">猜你喜欢</div>
            <div class="art-list">
                <div class="item" v-for="(item,index) in recommendList" v-if="index<3"
                     @click="$router.push('/detail?type='+item.category_id+'&id='+item.id)">
                    <div class="img" :style="'background-image: url('+baseUrl+item.more.thumbnail+')'"></div>
                    <div class="art-title">
                        {{item.post_title}}
                    </div>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="title">发表评论</div>
            <el-input
                    ref="commentIpnut"
                    @focus="showEmoji=false"
                    type="textarea"
                    :rows="5"
                    resize="none"
                    :placeholder="placeholder"
                    v-model="commentContent">
            </el-input>
            <div class="comment-button">
                <div class="comment-button-left" @click="showEmoji=true">
                    <img src="../../../public/images/emoji.png" alt="">
                    <span>添加表情</span>

                </div>
                <vue-emoji
                        v-if="showEmoji"
                        @select="selectEmoji">
                </vue-emoji>
                <div class="comment-button-right">
                    <el-button type="primary" @click="doComment">评论</el-button>
                </div>
            </div>
            <div class="all-comment" v-loading="loading2">
                <div class="all-comment-title">全部评论（{{articleDetail.comment_count}}）</div>
                <div class="comment-item" v-for="item in commentList">
                    <div class="comment-item-left">
                        <div v-if="item.user_avatar" class="img"
                             :style="'background-image: url('+baseUrl+item.user_avatar+')'"></div>
                        <div v-if="!item.user_avatar" class="img" :style="'background-image: url('+avatarUrl+')'"></div>
                    </div>
                    <div class="comment-item-right">
                        <div class="line1">
                            <div class="username">{{item.user_name}}</div>
                            <div class="time">{{item.create_time|timeFormatTwo}}</div>
                        </div>
                        <span class="line2" v-html="emoji(item.content)">

                                    </span>
                        <div class="line3">
                            <span @click="replyComment(item)">回复</span>
                        </div>
                        <div class="reply" v-for="item2 in item.twolist">
                            <div class="reply-left">
                                <div v-if="item2.user_avatar" class="img"
                                     :style="'background-image: url('+baseUrl+item2.user_avatar+')'"></div>
                                <div v-if="!item2.user_avatar" class="img"
                                     :style="'background-image: url('+avatarUrl+')'"></div>
                            </div>
                            <div class="reply-right">
                                <div class="reply-right-line1">
                                    <div class="reply-line1-left">
                                        {{item2.user_name}}
                                        <div class="tag" v-if="item2.user_id==1">官方</div>
                                    </div>
                                    <div class="reply-line1-right">
                                        {{item2.create_time|timeFormatTwo}}
                                    </div>
                                </div>
                                <div class="reply-right-line2" v-html="emoji(item2.content)">
                                    <!--                                                {{item2.content}}-->
                                </div>
                                <div class="reply-right-line3">
                                    <!--                                                <span @click="replyComment(item)">回复</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MobileToTop></MobileToTop>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="80%">
            <div class="downloadTip">
                <div class="line2">
                    <!--                    <span>资源提取密码：{{resource_pass}}</span>-->
                    <!--                    <div class="copy" v-clipboard:copy="resource_pass" v-clipboard:success="onResourceCopy">复制</div>-->
                </div>

                <div class="line2" v-for="(item,index) in resource_url">
                    <span>资源 - {{index+1}}： &nbsp;</span>
                    <!--                    <div class="copy" v-clipboard:copy="item.pass" v-clipboard:success="onResourceCopy">复制提取</div>-->
                    <div class="copy" @click="goResource(item.url)">下载链接</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {Dialog, Notify} from 'vant';
    import MobileTitle from '@/components/mobile/Title'
    import MobileToTop from '@/components/mobile/ToTop'
    import {
        doComment,
        getArticleDetail,
        getArticleList,
        getArticleResource,
        getCommentList,
        likeArticle
    } from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";
    import vueEmoji from "../../components/mobile/emoji";
    import VueClipboard from "vue-clipboard2";

    export default {
        name: "MobileDetail",
        components: {
            MobileTitle,
            MobileToTop,
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
                category: 1,
                imgUrl: require('../../../public/images/default.png'),
                commentContent: '',
                articleDetail: {
                    more: {
                        photos: []
                    }
                },
                recommendList: [],//推荐文章
                loading: false,
                loading1: false,
                loading2: false,
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
            checkDownload() {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                }, 2000)
            },
            onCopy() {
                Notify({type: 'success', message: '复制链接成功，去粘贴分享吧~'});
            },
            goResource(url) {
                window.open(url)
            },
            onResourceCopy() {
                Notify({type: 'success', message: '复制成功！'});
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
            async likeArt() {
                let that = this
                let res = await likeArticle({
                    id: that.id
                })
                if (res.msg == '赞好啦！') {
                    this.$set(that.articleDetail, 'post_like', that.articleDetail.post_like + 1);
                } else if (res.msg == '您已赞过啦！') {
                    // this.$message.info('您已赞过啦！')
                    Notify({type: 'success', message: '您已赞过啦！'});
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
                let articleDetail = await getArticleDetail({
                    id: that.id
                })
                that.articleDetail = articleDetail.data
                let recommendList = await getArticleList({
                    page: 1,
                    limit: 3,
                    ttd: 1
                })
                this.recommendList = recommendList.data.list
                that.fetchComment()
                this.loading1 = false

                window.scroll(0, 0)
            },
            async fetchComment() {
                let that = this
                that.loading2 = true
                let commentList = await getCommentList({
                    id: that.id
                })
                that.commentList = commentList.data.list
                that.loading2 = false
                console.log(that.commentList, 88)

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
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .page {
        ::v-deep .el-dialog__body{
            padding: 0 20px;
            padding-bottom: 20px;
        }
        @include full-page;
        background-color: rgba(246, 246, 246, 1);
        @include max-width;

        .container {
            width: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
            margin-top: 0.267rem;
            padding: 0.4rem 0.267rem;
            box-sizing: border-box;

            .resultTip {
                margin-bottom: 0.533rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 0.213rem;
                font-weight: 400;
                color: rgba(255, 194, 49, 1);
                white-space: pre-wrap;

                img {
                    margin-right: 0.133rem;
                    width: 0.32rem;
                    height: 0.32rem;
                }

                .normal {
                    color: #666;
                }

            }

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
                margin: 0.2rem 0;
            }

            .line3 {
                margin: 0.267rem 0;
                display: flex;

                .type, .time, .like, .com, .download {
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

                .com {
                    .img-comment {
                        width: 0.267rem;
                        height: 0.267rem;
                    }

                    font-size: 0.213rem;
                    font-weight: 400;
                    color: rgba(128, 128, 128, 1);
                }

                .download {
                    font-size: 0.213rem;
                    font-weight: 400;
                    color: rgba(128, 128, 128, 1);
                }
            }

            .introduction {
                background: rgba(247, 247, 247, 1);
                border: 1px solid rgba(230, 230, 230, 1);
                padding: 0.4rem 0.267rem;
                box-sizing: border-box;
                color: #666666;
                font-size: 0.213rem;
                font-weight: 400;
                line-height: 1.7;
                margin-bottom: 0.133rem;

                img {
                    margin-right: 0.133rem;
                    position: relative;
                    top: 0.02rem;
                    width: 0.28rem;
                    height: 0.28rem;
                }
            }

            .images {
                width: 100%;
                display: flex;
                flex-direction: column;

                img {
                    width: 100%;
                    margin: 0.133rem 0;
                }
            }

            .download-box {
                width: 100%;
                background: rgba(245, 245, 245, 1);
                border: 1px solid rgba(230, 230, 230, 1);
                padding: 0.267rem;
                box-sizing: border-box;
                margin: 0.133rem 0;

                .download-box-line1 {
                    width: 100%;
                    font-size: 0.213rem;
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
                        padding: 0.093rem 0.133rem;
                        cursor: pointer;
                        margin-left: 0.267rem;
                        background: rgba(27, 191, 112, 1);
                        border-radius: 0.053rem;
                        color: #ffffff;
                    }
                }

                .download-box-line2 {
                    margin-top: 0.4rem;
                    font-size: 0.213rem;
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
                margin: 0.267rem 0;
                margin-bottom: 0.667rem;

                .set-like {
                    cursor: pointer;
                    border: 1px solid rgba(255, 49, 88, 1);
                    border-radius: 0.107rem;
                    font-size: 0.213rem;
                    font-weight: 400;
                    color: rgba(255, 64, 64, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.2rem;

                    img {
                        width: 0.28rem;
                        height: 0.24rem;
                        margin-right: 0.133rem;
                    }
                }

                .set-share {
                    cursor: pointer;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: 0.107rem;
                    font-size: 0.213rem;
                    font-weight: 400;
                    color: rgba(128, 128, 128, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.2rem;

                    img {
                        width: 0.373rem;
                        height: 0.373rem;
                        margin-right: 0.133rem;
                    }
                }
            }

            .art-list {
                display: flex;
                justify-content: space-between;

                .item {
                    cursor: pointer;
                    width: 4.533rem;
                    padding: 0 0.133rem;

                    .img {
                        width: 100%;
                        height: 2.133rem;
                        @include back-img-center;
                    }

                    .info {
                        display: flex;
                        margin: 0.2rem 0;
                        width: 100%;
                        justify-content: space-between;

                        .button {
                            flex-shrink: 0;
                            width: 1.2rem;
                            height: 0.533rem;
                            background: rgba(51, 51, 51, 1);

                            padding: 0 0.133rem;
                            font-size: 0.213rem;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                        }

                        .title {
                            @include line-hidden(2);
                            padding-left: 0.133rem;
                            box-sizing: border-box;
                            font-size: 0.213rem;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                    }

                }


            }
        }

        .guess {
            margin: 0.267rem 0;
            width: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
            border-radius: 0.133rem;
            padding: 0.4rem;
            box-sizing: border-box;

            .title {
                width: 100%;
                border-left: 0.053rem solid $theme-color;
                position: relative;
                left: -0.4rem;

                padding-left: 0.4rem;
                font-size: 0.32rem;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            .art-list {
                display: flex;
                justify-content: space-between;

                .item {
                    padding: 0 5px;
                    cursor: pointer;
                    width: 3.0rem;
                    display: flex;
                    flex-direction: column;

                    .img {
                        width: 100%;
                        height: 2.2rem;
                        @include back-img-center;
                        margin: 0.2rem 0;
                    }

                    .art-title {
                        font-size: 0.213rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        @include line-hidden(2);
                    }
                }
            }
        }

        .comment {
            margin-bottom: 0.267rem;
            width: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.35);
            border-radius: 0.133rem;
            padding: 0.4rem;
            box-sizing: border-box;

            .title {
                width: 100%;
                border-left: 0.053rem solid $theme-color;
                position: relative;
                left: -0.4rem;

                padding-left: 0.4rem;
                font-size: 0.32rem;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            /deep/ .el-textarea {
                margin: 0.267rem 0;

                .el-textarea__inner {
                    background-color: rgba(246, 246, 246, 1);
                }
            }

            .comment-button {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                box-sizing: border-box;

                .comment-button-left {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    position: relative;

                    span {
                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        margin-left: 0.133rem;
                    }

                    img {
                        width: 0.427rem;
                        height: 0.427rem;
                    }
                }

                .comment-button-right {
                    /deep/ .el-button {
                        width: 1.6rem;
                        height: 0.693rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 0.24rem;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }

            .all-comment {
                width: 100%;
                padding: 0.267rem 0;
                box-sizing: border-box;
                border-top: 1px solid rgba(230, 230, 230, 1);
                margin-top: 0.267rem;

                .all-comment-title {
                    font-size: 0.24rem;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    padding-bottom: 0.267rem;
                }

                .comment-item {
                    padding-top: 0.333rem;
                    width: 100%;
                    display: flex;
                    flex-direction: row;

                    .comment-item-left {
                        .img {
                            width: 0.96rem;
                            height: 0.96rem;
                            border-radius: 50%;
                            @include back-img-center;
                        }
                    }

                    .comment-item-right {
                        width: calc(100% - 0.96rem);
                        padding-left: 0.267rem;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;

                        .line1 {
                            width: 100%;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;

                            .username {
                                font-size: 0.24rem;
                                font-weight: 400;
                                color: rgba(102, 102, 102, 1);
                            }

                            .time {
                                font-size: 0.213rem;
                                font-weight: 400;
                                color: rgba(153, 153, 153, 1);
                            }
                        }

                        .line2 {
                            margin-top: 0.133rem;
                            width: 100%;
                            font-size: 0.213rem;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }

                        .line3 {
                            width: 100%;
                            display: flex;
                            justify-content: flex-end;

                            span {
                                cursor: pointer;
                                font-size: 0.213rem;
                                font-weight: 400;
                                color: rgba(255, 194, 49, 1);
                            }
                        }

                        .reply {
                            margin-top: 0.133rem;
                            width: 100%;
                            padding: 0.2rem 0.267rem;
                            box-sizing: border-box;
                            background: rgba(247, 247, 247, 1);
                            border: 1px solid rgba(230, 230, 230, 1);
                            display: flex;
                            flex-direction: row;

                            .reply-left {
                                .img {
                                    width: 0.96rem;
                                    height: 0.96rem;
                                    border-radius: 50%;
                                    @include back-img-center;
                                }
                            }

                            .reply-right {
                                width: calc(100% - 0.96rem);
                                padding-left: 0.267rem;
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
                                        flex-shrink: 0;
                                        display: flex;
                                        flex-direction: row;
                                        align-items: center;
                                        font-size: 0.213rem;
                                        font-weight: 400;
                                        color: rgba(51, 51, 51, 1);

                                        .tag {
                                            margin-left: 0.133rem;
                                            background: rgba(54, 137, 240, 1);
                                            border-radius: 0.053rem;
                                            font-size: 0.213rem;
                                            font-weight: 400;
                                            color: rgba(255, 255, 255, 1);
                                            padding: 0.027rem 0.093rem;
                                            box-sizing: border-box;
                                        }
                                    }

                                    .reply-line1-right {
                                        flex-shrink: 0;
                                        font-size: 0.213rem;
                                        font-weight: 400;
                                        color: rgba(128, 128, 128, 1);
                                    }
                                }

                                .reply-right-line2 {
                                    margin-top: 0.133rem;
                                    width: 100%;
                                    font-size: 0.213rem;
                                    font-weight: 400;
                                    color: rgba(51, 51, 51, 1);
                                }

                                .reply-right-line3 {
                                    width: 100%;
                                    display: flex;
                                    justify-content: flex-end;

                                    span {
                                        cursor: pointer;
                                        font-size: 0.213rem;
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
                margin-top: .5rem;

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