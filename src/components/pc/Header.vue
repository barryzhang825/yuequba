<template>
    <div class="page">
        <div class="center">
            <div class="left">
                <img src="../../../public/images/logo.png" alt="">
            </div>
            <div class="middle">
                <div class="item selected">首页</div>
                <div class="item">主播区</div>
                <div class="item">美图区</div>
                <div class="item">视频区</div>
                <div class="item">包年精选区</div>
                <div class="item">购买专区</div>
                <div class="item">用户中心</div>
            </div>
            <div class="right">
                <img class="search" src="../../../public/images/search.png" alt="">
                <div class="alert-box">
                    <img class="alert" src="../../../public/images/alert.png" alt="">
                    <div class="num">1</div>
                </div>
                <div class="link"><a href="">登录</a> | <a href="">注册</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
.page{
    width:100%;
    height:100px;
    background-color:rgba(255,255,255,1) !important;
    box-shadow:0px 4px 8px 0px rgba(230, 230, 230, 0.35);
    .center{
        height: 100%;
        margin: 0 auto;
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            height: 100%;
            display: flex;
            align-items: center;
            img{
                width: 160px;
            }
        }
        .middle{
            width: 650px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .item{
                cursor: pointer;
                height: 40px;
                font-size:18px;
                font-weight:400;
                color: #333333;
                border-bottom: 2px solid #ffffff;
            }
            .selected{
                color:rgba(255,194,49,1);
                border-bottom: 2px solid rgba(255,194,49,1);
            }
        }
        .right{
            width: 200px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .search{
                cursor: pointer;
                width: 27px;
                height: 27px;
            }

            .alert-box{
                cursor: pointer;
                width: 24px;
                height: 28px;
                position: relative;
                .alert{
                    width: 24px;
                    height: 28px;
                }
                .num{
                    width: 20px;
                    height: 20px;
                    background-color: #FF3158;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    position: absolute;
                    top: -5px;
                    right: -5px;

                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
            }
            .link{
                color:rgba(255,194,49,1);
                a{
                    text-decoration: none;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(255,194,49,1);
                }
            }
        }
    }
}
</style>