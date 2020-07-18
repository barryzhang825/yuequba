<template>
    <div class="mobile-footer-page">
        <van-tabbar v-model="menuIndex"  active-color="#FFC231" inactive-color="#333333">
            <van-tabbar-item replace to="/mobile/home">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? icon1.active : icon1.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mobile/category?type=1">
                <span>主播区</span>
                <template #icon="props">
                    <img :src="props.active ? icon2.active : icon2.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mobile/category?type=2">
                <span>美图区</span>
                <template #icon="props">
                    <img :src="props.active ? icon3.active : icon3.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mobile/category?type=3">
                <span>视频区</span>
                <template #icon="props">
                    <img :src="props.active ? icon4.active : icon4.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mobile/category?type=4">
                <span>包年精选</span>
                <template #icon="props">
                    <img :src="props.active ? icon5.active : icon5.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "MobileHeader",
        props: {
            menu:{
                type:Number,
                default:0
            }
        },
        watch:{
            menu(value){
                this.menuIndex=value
            }
        },
        data(){
            return{
                icon1: {
                    inactive: require('../../../public/images/h10.png'),
                    active: require('../../../public/images/h11.png'),
                },
                icon2: {
                    inactive: require('../../../public/images/h20.png'),
                    active: require('../../../public/images/h22.png'),
                },
                icon3: {
                    inactive: require('../../../public/images/h30.png'),
                    active: require('../../../public/images/h33.png'),
                },
                icon4: {
                    inactive: require('../../../public/images/h40.png'),
                    active: require('../../../public/images/h44.png'),
                },
                icon5: {
                    inactive:  require('../../../public/images/h50.png'),
                    active:  require('../../../public/images/h55.png'),
                },
                menuIndex:0
            }
        },
        methods: {
            goTo(num) {
                let path = ''
                switch (num) {
                    case 1: {
                        path = '/home'
                        break;
                    }
                    case 2: {
                        path = '/category?type=1'
                        break;
                    }
                    case 3: {
                        path = '/category?type=2'
                        break;
                    }
                    case 4: {
                        path = '/category?type=3'
                        break;
                    }
                    case 5: {
                        path = '/category?type=4'
                        break;
                    }
                    case 6: {
                        path = '/purchase'
                        break;
                    }
                    case 7: {
                        path = '/user'
                        break;
                    }
                }

                this.$router.push({
                    path: path
                })
            },

        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth/10+'px';
        }
    }
</script>

<style scoped lang="scss">
    .mobile-footer-page{
        width: 100%;
        height: 1.32rem;
        background-color: #ffffff !important;
        position: fixed;
        bottom: 0;

        .van-tabbar{
            height: 1.32rem;
            box-sizing: border-box;
            .van-tabbar-item{
                height: 100%;
                box-sizing: border-box;
            }
        }

    }
</style>