<template>
    <div class="mobile-title-page">
        <img @click="goBack" src="../../../public/images/back03.png" alt="">
        <span>{{title}}</span>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: "MobileTitle",
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        },
        props:{
          title:{
              type:String,
              default:'标题'
          }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .mobile-title-page{
        width: 100%;
        background-color: rgba(255,255,255,1) !important;
        height: 1.333rem;
        box-shadow:0px 2px 4px 0px rgba(204,204,204,0.7);

        padding: 0 0.4rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width:0.28rem;
            height:0.533rem;
        }
        span{
            padding: 0 0.267rem;
            font-size:0.4rem;
            font-weight:400;
            color:rgba(51,51,51,1);
            @include line-hidden(1)
        }
    }

</style>