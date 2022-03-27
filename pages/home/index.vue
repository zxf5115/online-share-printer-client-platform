<template>
	<div class="index fl" >
	    <p-nav title="共享打印机"/>
	    <div class="ctn">
            <div class="top fl ai-ctr jc-ctr" @click="jumpPrinter()">
                <image :src="require('@/static/home/index/top.png')">
            </div>
            <div class="bottom fl ai-ctr jc-ctr" @click="jumpPrinterList()">
                <image :src="require('@/static/home/index/bottom.png')">
            </div>
	    </div>
	</div>
</template>

<script>
export default {
    methods: {
        jumpPrinterList() {
            uni.navigateTo({url: '/pages/mine/printerList/index'})
        },
        jumpPrinter() {
            let taht = this;
            uni.scanCode({
                success: function (res) {
                    console.log(res);
                    if (res.scanType != 'QR_CODE') {
                        taht.$u.toast('错误的二维码');
                        return;
                    }
                    // TODO:这里用的测试打印机数据
                    let token = res.result;
                    
                    //'efcsCWI3k2a5XYhr8BQXQtajKPTO21f06+KDFZ5AHepDCt0mtxm/JuVa9DjXGGO7tKmVirtrWPjO32mp0Irt6G3HPSiJsi2HupD2cu4=';
                    // console.log(token, encodeURIComponent(token));
                    uni.navigateTo({
                        url: `/pages/home/order/first?token=${encodeURIComponent(token)}`
                    });
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.index {
	overflow: hidden;
    height: 100vh;
}
.ctn {
    flex: 1;
    image {
        width: 320rpx;
        height: 392rpx;
    }
    .top {
        height: 50%;
        background: linear-gradient(180deg, #6BDFFF 0%, #3DACFC 100%);
    }
    .bottom {
        height: 50%;
        background: linear-gradient(180deg, #FDC624 0%, #E6C434 99.36%);
    }
}
</style>
