<template>
    <div class="to-top">
        <transition name="fade">
            <img v-if="show" src="../../../public/images/totop.png" @click="scorllToTop" alt="">
        </transition>
    </div>
</template>

<script>
    export default {
        name: "ToTop",
        data() {
            return {
                show: false
            }
        },
        methods: {
            scorllToTop() {

                var timer = setInterval(function () {
                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let ispeed = Math.floor(-osTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                    this.isTop = true;
                    if (osTop === 0) {
                        clearInterval(timer);
                    }
                }, 30)
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 100) {
                    this.show = true
                } else {
                    this.show = false
                }
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped lang="scss">
    .to-top {
        position: fixed;
        right: 50px;
        bottom: 50px;
        z-index: 99;
        .fade-enter,.fade-leave-to{
            opacity:0;
        }
        .fade-enter-active,.fade-leave-active{
            transition:opacity .5s;
        }
        img {
            background-color: #ffffff;
            border-radius: 50%;
            cursor: pointer;
            width: 60px;
            height: 60px;
        }
    }

</style>