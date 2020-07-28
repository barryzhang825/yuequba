<template>
    <div class="page">
        <MobileTitle title="个人信息"></MobileTitle>

        <el-upload
                :data="Formtoken"
                class="avatar-uploader"
                :action="baseHost"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <div class="line1" :style="'background-image: url('+baseUrl+formData.avatar+')'"></div>
            <!--                        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <!--                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>

        <div class="items">
            <van-field
                    v-model="formData.user_nickname"
                    label="昵称"
                    placeholder="输入昵称"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="formData.create_time"
                    label="注册时间"
                    placeholder="输入注册时间"
                    input-align="right"
                    right-icon="none"
                    readonly
            />
            <van-field
                    v-model="formData.user_email"
                    label="邮箱"
                    placeholder="输入邮箱"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="formData.user_url"
                    label="网址"
                    placeholder="输入网址"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-field
                    v-model="formData.more"
                    label="简介"
                    placeholder="输入简介"
                    input-align="right"
                    right-icon="arrow"
            />

        </div>
        <div class="button">
            <el-button type="primary"  @click="submitForm()">保存</el-button>
        </div>
    </div>
</template>

<script>
    import { Notify } from 'vant';
    import MobileTitle from '@/components/mobile/Title'
    import {getUserinfo, updateUserinfo} from "../../api/pc/api";
    import {checkEmail, formatTime, formatTimeThree} from "../../utils/utils";
    export default {
        name: "MobileUserInfo",
        components:{
            MobileTitle
        },
        filters:{
            timeFormat(val){
                return formatTime(val)
            },
            timeFormatTwo(val){
                return formatTimeThree(val)
            },
        },
        data(){
            return{
                baseUrl: this.$baseUrl,
                baseHost: this.$baseHost+'/home/upload/index',
                Formtoken:{
                    token:localStorage.getItem('token')
                },

                formData:{
                    user_email:'',
                    more:'',
                    user_url:'',
                    user_nickname:'',
                    create_time:'',
                }
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);

                this.formData.avatar=res.data.avatar
                let user_info=JSON.parse(localStorage.getItem('user_info'))
                user_info.avatar=res.data.avatar
                localStorage.setItem('user_info',JSON.stringify(user_info))
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' ||  file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },


            submitForm(formName) {
                let that = this
                if(that.formData.user_nickname==''){
                    Notify('请填写昵称');
                }else if(that.formData.user_email==''|| !checkEmail(that.formData.user_email)){
                    Notify('请检查邮箱');
                }else if(that.formData.user_url==''){
                    Notify('请填写网址');
                }else if(that.formData.more==''){
                    Notify('请填写简介');
                }else {
                    updateUserinfo({
                        token:localStorage.getItem('token'),
                        user_email:that.formData.user_email,
                        more:that.formData.more,
                        user_url:that.formData.user_url,
                        user_nickname:that.formData.user_nickname,
                    }).then(res=>{
                        Notify({ type: 'success', message: '保存成功！' });
                        that.fetchData()
                        that.dialogFormVisible = false
                    })
                }

            },
            fetchData(){
                let that = this
                getUserinfo({
                    token:localStorage.getItem('token')
                }).then(res=>{
                    localStorage.setItem('user_info',JSON.stringify(res.data))
                    res.data.create_time=formatTime(res.data.create_time)
                    that.formData=res.data
                })
            }
        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';

            let that = this
            let user_info = JSON.parse(localStorage.getItem('user_info'))
            user_info.create_time=formatTime(user_info.create_time)
            let token = localStorage.getItem('token')
            that.formData=user_info
        }
    }
</script>

<style scoped lang="scss">
    .page{
@include max-width;
        @include full-page;
        background-color: rgba(246,246,246,1);
        display: flex;
        flex-direction: column;
        align-items: center;

        .line1{
            margin-top: 0.4rem;
            width:80px;
            height:80px;
            border-radius:50%;
            @include back-img-center;
        }


        .items{
            margin-top: 0.267rem;
            width: 100%;
            background:rgba(255,255,255,1);
            display: flex;
            flex-direction: column;


           /deep/ .van-cell {
                .van-cell__title{
                    span{
                        font-size:0.373rem;
                        font-weight:400;
                        color:rgba(34,34,34,1);
                    }
                }
                .van-cell__value{
                    .van-field__body{
                        .van-field__control{
                            font-size:0.373rem;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }
                    }



                }

            }
        }
        .button {
            margin-top: 0.5rem;
            width: 100%;
            display: flex;
            justify-content: center;

            .el-button {
                background:rgba(255,218,68,1);
                border: none;
                width:3.2rem;
                height:1.067rem;
                font-size:0.32rem;
                font-weight:400;
                color:rgba(34,34,34,1);
            }
        }
    }

</style>