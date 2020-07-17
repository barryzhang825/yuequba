<template>
    <div class="page">
        <MobileTitle title="下载清单"></MobileTitle>
        <div class="items">
            <div class="item">
                <div class="line line1">
                    <span class="label">下载时间：</span>
                    <span class="value">2020.6.30 17:26</span>
                </div>
                <div class="line line2">
                    <span class="label">资源名称：</span>
                    <span class="value">小奶猫主播[林熙的话]微信福利13V</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileTitle from '@/components/mobile/Title'

    export default {
        name: "UserDownload",
        components: {
            MobileTitle
        },
        mounted() {
            let clientWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = clientWidth / 10 + 'px';
        }
    }
</script>

<style scoped lang="scss">
    .page {
        @include full-page;
        background-color: rgba(246, 246, 246, 1);

        .items {
            width: 100%;
            padding: 0.133rem 0.267rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .item {
                margin-top: 0.267rem;
                background-color: rgba(255, 255, 255, 1);
                padding: 0.133rem 0.4rem;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-radius: 0.133rem;

                .line {
                    width: 100%;
                    padding: 0.4rem 0;
                    display: flex;
                    justify-content: flex-start;

                    .label {
                        flex-shrink: 0;
                        font-size: 0.32rem;
                        font-weight: 400;
                        color: #666666;
                    }

                    .value {
                        flex-shrink: 0;
                        font-size: 0.32rem;
                        font-weight: 400;
                        color: #222222;
                    }
                }

                .line2 {
                    box-shadow: 0px -1px 0px 0px rgba(238, 238, 238, 1);
                }
            }
        }
    }

</style>