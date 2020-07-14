<template>
    <div class="page">
        <el-table
                :data="tableData"
                stripe
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
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="价格">
            </el-table-column>
            <el-table-column
                    prop="start_time"
                    label="开通时间">
            </el-table-column>
            <el-table-column
                    prop="end_time"
                    label="到期时间">
            </el-table-column>

        </el-table>

        <div class="pagination">
            <el-pagination
                    :background="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    background
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "UserVip",
        data() {
            return {
                currentPage: 1,
                tableData: [{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },{
                    type: '包年会员',
                    price: 88,
                    start_time: '2016-05-04',
                    end_time: '2017-05-04',
                },]
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