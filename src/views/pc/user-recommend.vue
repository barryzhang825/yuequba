<template>
    <div class="page">
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop=""
                    label=""
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="用户ID"
            >
            </el-table-column>

            <el-table-column
                    prop="register_time"
                    label="注册时间">
            </el-table-column>
            <el-table-column
                    prop="consume"
                    label="消费额"
            >
                <template slot-scope="scope">
                    ￥{{ scope.row.consume }}
                </template>
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
        name: "UserRecommend",
        data() {
            return {
                currentPage: 1,
                tableData: [{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
                },{
                    id: '1523545',
                    register_time: '2017-05-04 15:26',
                    consume: '588',
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