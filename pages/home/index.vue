<template>
	<div class="index fl">
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
    onLaunch: function() {
    },
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    created() {
        let that =this;
        uni.login({
			provider:'weixin',
			success:function(loginRes) {
			// 获取用户信息
			    uni.getUserInfo({
				    provider:'weixin',
					success:function(infoRes){
                        console.log(infoRes);
				    	console.log(that.yonghuwx)
					}
				});
			}
		});
    },
    methods: {
        jumpPrinterList() {
            uni.navigateTo({url: '/pages/mine/printerList/index'})
        },
        jumpPrinter() {

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
