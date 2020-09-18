<template>
    <div class="contact" >
        <div class="box" @click="contactUs">
            <img src="../../../public/images/kf.png" alt="">
            <div class="text">联系客服</div>
        </div>


        <van-popup v-model="show">
            <div class="content-box">
                <van-image width="200" height="200" :src="img" />
                <div class="text">添加客服微信好友，开通会员</div>
            </div>
        </van-popup>
    </div>
</template>

<script>

    import {fetchEWM} from "../../api/pc/api";

    export default {
        name: "Contact",
        data(){
            return{
                show:false,
                baseUrl: this.$baseUrl,
                img:''
            }
        },
        methods:{
            fetchData(){
                // fetchEWM().then(res=>{
                //     console.log(res,5555)
                // })
                let data = JSON.parse(localStorage.getItem('siteInfo'))
                //console.log(data,9090)
                this.img=this.baseUrl+data.site_user_wximg
            },
            contactUs(){
                this.show=true
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .contact{
        z-index: 999999999999999999999;
        cursor: pointer;
        position: fixed;
        bottom: 200px;
        right: 0;
        width: 80px;
        height: 80px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #ffc231;
        padding: 7px 0;

        .box{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 50%;
            }
            .text{
                margin-top: 5px;
                font-size: 14px;
                color: #ffffff;
            }
        }

        .van-popup{
            border-radius: 10px;
            overflow: hidden;
        }
        .content-box{
            padding: 50px 60px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .text{
                font-size: 13px;
                margin-top: 20px;
            }

        }

    }

</style>