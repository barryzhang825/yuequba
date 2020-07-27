<template>
    <div class="page">
        <Header :menu="7"></Header>
        <div class="center-box">
            <div class="left">
                <div class="info">

                    <el-upload
                            :data="Formtoken"
                            class="avatar-uploader"
                            :action="baseHost"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <div class="line1" :style="'background-image: url('+baseUrl+userInfo.avatar+')'"></div>
<!--                        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
                    <div class="line2">{{userInfo.user_nickname}}</div>
                    <div class="line3">ID：{{userInfo.popularize}}</div>
                </div>
                <div class="menus">
                    <router-link class="menu" to="/user/info" :class="$route.path==='/user/info'?'selected':''">个人信息</router-link>
                    <router-link class="menu" to="/user/user-vip" :class="$route.path==='/user/user-vip'?'selected':''">我的VIP</router-link>
                    <router-link class="menu" to="/user/download" :class="$route.path==='/user/download'?'selected':''">下载清单</router-link>
                    <router-link class="menu" to="/user/recommend" :class="$route.path==='/user/recommend'?'selected':''">推广注册</router-link>
                    <router-link class="menu" to="/user/recommend-vip" :class="$route.path==='/user/recommend-vip'?'selected':''">推广VIP</router-link>
                    <router-link class="menu" to="/user/update-password" :class="$route.path==='/user/update-password'?'selected':''">修改密码</router-link>
                    <div class="menu" @click="loginOut">退出</div>
                </div>
            </div>
            <div class="right">
                <router-view class="right-view"></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/pc/Header'
    import Footer from '@/components/pc/Footer'
    import {userLoginOut} from "../../api/pc/api";

    export default {
        name: "User",
        components: {
            Header: Header,
            Footer: Footer,
        },
        data(){
            return{
                baseUrl: this.$baseUrl,
                baseHost: this.$baseHost+'/home/upload/index',
                imageUrl: '',
                userInfo:{
                    user_email:'',
                    create_time:'',
                    more:'',
                    user_url:'',
                    user_nickname:'',
                    avatar:''
                },
                Formtoken:{
                    token:localStorage.getItem('token')
                }
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);

                this.userInfo.avatar=res.data.avatar
                let user_info=JSON.parse(localStorage.getItem('user_info'))
                user_info.avatar=res.data.avatar
                localStorage.setItem('user_info',JSON.stringify(user_info))
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' ||  file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },




            loginOut(){
                let that = this
                userLoginOut({
                    token:localStorage.getItem('token')
                }).then(res=>{
                    localStorage.clear()
                    that.$router.push({
                        path:'/login'
                    })
                })
            }
        },
        mounted() {
            let that = this
            let user_info=''
            if(localStorage.getItem('user_info')){
                user_info = JSON.parse(localStorage.getItem('user_info'))
            }
            let token = localStorage.getItem('token')
            if (user_info && token) {
                that.userInfo=user_info
            } else {
                this.$confirm('请先去登录').then(_ => {
                    that.$router.push({
                        path: '/login'
                    })
                }).catch(_ => {
                    that.$router.push({
                        path: '/home'
                    })
                });
            }
        }

    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        background-color: $page-back-color;

        .center-box {
            margin: 20px auto;
            width: 1200px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left{
                width: 200px;
                background-color: #ffffff;
                display: flex;
                flex-direction: column;
                .info{
                    margin-top: 50px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .line1{
                        width:80px;
                        height:80px;
                        border-radius:50%;
                        @include back-img-center;
                    }
                    .line2{
                        margin: 20px 0;
                        font-size:16px;
                        font-weight:400;
                        color:rgba(0,0,0,1);
                        @include line-hidden(1)
                    }
                    .line3{
                        font-size:14px;
                        font-weight:400;
                        color:rgba(204,204,204,1);
                    }
                }
                .menus{
                    margin-bottom: 150px;
                    width: 100%;
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    .menu{
                        text-decoration: none;
                        color: #333333;
                        cursor: pointer;
                        border-left: 4px solid #ffffff;
                        width: 100%;
                        height: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size:14px;
                        font-weight:400;
                    }
                    .menu:hover,.selected{
                        border-left: 4px solid $theme-color;
                        background:#FFF7E3;
                        font-size:14px;
                        font-weight:400;
                        color:$theme-color;
                    }
                }
            }
            .right{
                width: 971px;
                background-color: #ffffff;
                .right-view{
                    width: 100%;
                    height: 100%;
                    background-color: #ffffff;
                }
            }
        }


        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>