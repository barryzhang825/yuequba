<template>
    <div class="footer-page">
        <div class="center">
            Copyright © 2020 D.S
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
    .footer-page{
        width: 100%;
        background-color: rgba(31,31,31,1);
        display: flex;
        align-items: center;
        height: 119px;
        .center{
            margin: 0 auto;
            width: 1200px;
            font-size:16px;
            font-weight:400;
            color:rgba(100,100,100,1);
        }
    }

</style>