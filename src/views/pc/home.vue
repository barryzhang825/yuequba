<template>
    <div class="page">
        <Header></Header>
        <div class="center-box">
            <div class="swiper"></div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    export default {
        name: "Home",
        components:{
            Header:Header
        }
    }
</script>

<style scoped lang="scss">
    .page{
        background-color: #f6f6f6;
        .center-box{
            margin: 0 auto;
            width: 1200px;
            .swiper{
                margin-top: 20px;
                width: 100%;
                height: 360px;
                border-radius:10px;
                overflow: hidden;
            }
        }
    }

</style>