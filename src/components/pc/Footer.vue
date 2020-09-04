<template>
    <div class="footer-page">
        <div class="center">
            {{siteInfo.site_icp}}
        </div>
    </div>
</template>

<script>
    import {fetchLogo} from "../../api/pc/api";

    export default {
        name: "Footer",
        data(){
            return{
                siteInfo:{}
            }
        },
        methods:{
            fetchLogo(){
                let that = this
                let siteInfo=JSON.parse(localStorage.getItem('siteInfo'))
                if(siteInfo){
                    that.siteInfo=siteInfo
                }else {
                    fetchLogo().then(res=>{
                        console.log(res)
                        that.siteInfo=res.data
                        localStorage.setItem('siteInfo',JSON.stringify(res.data))
                    })
                }
            }
        },
        mounted() {
            this.fetchLogo()
        }
    }
</script>

<style scoped lang="scss">
    .footer-page{
        width: 100%;
        background-color: rgba(31,31,31,1);
        display: flex;
        align-items: center;
        height: 70px;
        .center{
            padding-top: 10px;
            text-align: center;
            margin: 0 auto;
            width: 1200px;
            font-size:16px;
            font-weight:400;
            color:rgba(100,100,100,1);
        }
    }

</style>