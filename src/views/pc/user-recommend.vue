<template>
    <div class="page">
        <el-table
                :data="itemList"
                stripe
                style="width: 100%">
            <el-table-column
                    prop=""
                    label=""
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="to_user_id"
                    label="用户ID"
            >
            </el-table-column>

            <el-table-column
                    label="注册时间">
                <template slot-scope="scope">
                    <span >{{ scope.row.create_time|timeFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="consume"
                    label="消费额"
            >
                <template slot-scope="scope">
                    ￥{{ scope.row.money }}
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination">
            <el-pagination
                                hide-on-single-page
                    :background="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    :page-size="15"
                    background
                    layout="prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {getDownloadList, getRecommentList} from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";

    export default {
        name: "UserRecommend",
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
                currentPage: 1,
                pageNum: 1,
                totalNum: 0,
                itemList: [],
                loading: false
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.fetchData(val)
            },
            fetchData(pageNum = 1) {
                this.loading = true
                let that = this
                getRecommentList({
                    token: localStorage.getItem('token'),
                    page: pageNum
                }).then(res => {
                    console.log(res)
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
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;

        .pagination {
            margin: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
</style>