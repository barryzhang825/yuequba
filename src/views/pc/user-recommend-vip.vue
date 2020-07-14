<template>
    <div class="page">
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop=""
                    label=""
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="用户ID"
            >
            </el-table-column>

            <el-table-column
                    prop="type"
                    label="VIP类型">
            </el-table-column>

            <el-table-column
                    prop="consume"
                    label="价格"
            >
                <template slot-scope="scope">
                    ￥{{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="deal_time"
                    label="交易时间">
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
        name: "UserRecommendVip",
        data() {
            return {
                currentPage: 1,
                tableData: [{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
                },{
                    id: '1523545',
                    type: '包年会员',
                    price: '588',
                    deal_time: '2017-05-04 15:26',
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