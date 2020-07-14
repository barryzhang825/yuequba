<template>
    <div class="page">
        <div class="header">
            <div class="text">个人信息</div>
            <el-button type="primary" >主要按钮</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfo"
    }
</script>

<style scoped lang="scss">

    .page{
        width: 100%;
        .header{
            width: 100%;
            height: 50px;
            border-bottom: 1px solid rgba(235,235,235,1);
            display: flex;
            .el-button{
                width:80px;
                height:30px;
                border-radius:3px;
            }
        }
    }
</style>