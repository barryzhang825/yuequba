<template>
    <div class="page">
        <MobileTitle title="推广VIP"></MobileTitle>
        <div class="tip">
            推广链接：http://www.fedcba.com
        </div>
        <van-empty v-if="totalNum<1" description="暂无数据" />
        <div class="items">
            <div class="item" v-for="item in itemList">
                <div class="line line1">
                    <div class="half">
                        <span class="label">用户ID：</span>
                        <span class="value">{{item.id}}</span>
                    </div>
                    <div class="half two">
                        <span  class="label">交易时间：</span>
                        <span  class="value">{{item.create_time|timeFormat}}</span>
                    </div>
                </div>
                <div class="line line2">
                    <div class="half">
                        <span class="label">VIP类型：</span>
                        <span class="value">{{ item.vip_json.name}}</span>
                    </div>
                    <div class="half two">
                        <span  class="label">价格：</span>
                        <span  class="value">￥{{item.money}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination" v-if="totalNum>10">
            <el-pagination
                                hide-on-single-page
                    :background="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    :page-size="15"
                    background
                    layout="prev, pager, next"
                    :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'
    import {getRecommentVip} from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";
    export default {
        name: "MobileUserRecommendVip",
        components:{
            MobileTitle
        },
        filters:{
            timeFormat(val){
                return formatTime(val)
            },
            timeFormatTwo(val){
                return formatTimeThree(val)
            },
        },
        data(){
          return{
              pageNum: 1,
              totalNum: 0,
              itemList: [],
              loading: false
          }
        },
        methods:{
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.fetchData(val)
            },
            fetchData(pageNum = 1) {
                this.loading = true
                let that = this
                getRecommentVip({
                    token: localStorage.getItem('token'),
                    page: pageNum
                }).then(res => {
                    //console.log(res)
                    if (res.data.list && res.data.list.length > 0) {
                        that.totalNum = res.data.count
                        that.itemList = res.data.list
                    }

                    setTimeout(() => {
                        that.loading = false
                    }, 300)
                })
            }
        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .page{
@include max-width;
        @include full-page;
        background-color: rgba(246,246,246,1);
        overflow: scroll;
        padding-bottom: 0.267rem;
        box-sizing: border-box;
        .tip{
            width: 100%;
            height: 1.173rem;
            box-sizing: border-box;
            background-color:#FFF8E8;
            font-size:0.373rem;
            font-weight:400;
            color:rgba(217,54,54,1);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding:0 0.4rem;
        }
        .items{
            width: 100%;
            padding: 0.133rem 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .item{
                margin-top: 0.267rem;
                background-color: rgba(255,255,255,1);
                padding: 0 0.25rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-radius:0.133rem;
                .line{
                    width: 100%;
                    padding: 0.42rem 0;
                    display: flex;
                    justify-content: space-between;
                    .half{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        .label{
                            flex-shrink: 0;
                            font-size:0.373rem;
                            font-weight:400;
                            color:#666666;
                        }
                        .value{
                            flex-shrink: 0;
                            font-size:0.373rem;
                            font-weight:400;
                            color:#222222;
                        }

                    }
                    .two{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                    }
                }
                .line2{
                    box-shadow:0px -1px 0px 0px rgba(238,238,238,1);
                }
            }
        }
        .pagination{
            margin: 0.267rem 0;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: center;
            /deep/ .btn-prev,.btn-next{
                margin: 0;
            }
            /deep/.el-pagination.is-background .el-pager li{
                margin: 0 3px;
            }
        }
    }

</style>