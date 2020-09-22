<template>
    <div class="contact" >
        <van-popup v-model="show">
            <div class="content-box">
                <van-image width="200" height="200" :src="img" />
                <div class="text">加客服微信后，请先付款，告诉客服账号信息，然后客服会在后台为您开通相应的VIP套餐。</div>
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
                width: 200px;
                font-size: 13px;
                margin-top: 20px;
            }

        }

    }

</style>