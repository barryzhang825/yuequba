<template>
    <div class="footer-page">
        <div class="center">
            <div class="left"></div>
            <div class="center"><span>{{siteInfo.site_icp}}</span></div>
            <div class="right"><span>联络邮箱：</span><span>{{siteInfo.site_admin_email}}</span></div>
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
                        //console.log(res)
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
        height: 40px;
        .center{
            padding-top: 5px;
            text-align: center;
            margin: 0 auto;
            width: 1200px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            span{
                font-size:16px;
                font-weight:400;
                color:rgba(100,100,100,1);
            }
            .right{
                flex-shrink: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .center{
                flex-basis: 0;
            }
        }
    }

</style>