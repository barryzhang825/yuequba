<template>
    <div class="page">
        <el-table
                :data="itemList"
                stripe
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    prop=""
                    label=""
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="VIP类型"
                    width="180">
                <template slot-scope="scope">
<!--                    <span >{{ scope.row.vip_json.name}}</span>-->
                    <span >{{ scope.row.vip_json}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="价格">
            </el-table-column>
            <el-table-column
                    label="开通时间">
                <template slot-scope="scope">
                    <span >{{ scope.row.start_time|timeFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="到期时间">
                <template slot-scope="scope">
                    <span >{{ scope.row.end_time|timeFormat }}</span>
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination">
            <el-pagination
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
    import {getUserVip} from "../../api/pc/api";
    import {formatTime, formatTimeThree} from "../../utils/utils";

    export default {
        name: "UserVip",
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
                pageNum:1,
                totalNum:0,
                itemList:[],
                loading:false
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
            fetchData(pageNum=1){
                this.loading=true
                let that = this
                getUserVip({
                    token:localStorage.getItem('token'),
                    page:pageNum
                }).then(res=>{
                    console.log(res)
                    if(res.data.list && res.data.list.length>0){
                        that.totalNum=res.data.count
                        that.itemList=res.data.list
                    }

                    setTimeout(()=>{
                        that.loading=false
                    },300)
                })
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
.page{
    width: 100%;

    .pagination{
        margin: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>