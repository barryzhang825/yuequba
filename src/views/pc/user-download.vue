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
                    prop="name"
                    label="资源名称"
            >
            </el-table-column>

            <el-table-column
                    prop="download_time"
                    label="下载时间">
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
        name: "UserDownload",
        data() {
            return {
                currentPage: 1,
                tableData: [{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
                },{
                    name: '超级小奶猫主播[林熙的话]微信福利13V会员',
                    download_time: '2017-05-04 15:26',
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