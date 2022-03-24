<template>
	<div class="pr" >
	    <p-nav :title="type ? '支付成功' : '付款失败'"/>
        <div class="ctn fl jc-ctr ai-ctr">
            <image :src="type ? require('@/static/order/pay_success.png') : require('@/static/order/pay_fail.png')">
            <span :style="{
                color: type ? '#07C160' : '#F76160'
            }">{{type ? '支付成功' : '付款失败'}}</span>
            <label v-if="!type">请重新进行支付！</label>
            <p v-else>￥ {{price}}</p>
        </div>
        <div class="btn">
            <button :style="{
                background: !type ? '#25A1F9' : '#07C160'
            }" @click="btnAction">{{type == 0 ? '去支付' : '打印详情'}}</button>
        </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            type: 0, // 0 失败 1 成功
            price: '',
            order_id: void 0,
        }
    },
    onLoad(e) {
        Object.assign(this, e);
        this.type = parseInt(this.type)
    },
    methods: {
        btnAction () {
            if (this.type) {
                return uni.redirectTo({url: `/pages/home/order/detail?order_id=${this.order_id}`});
            }
            return uni.navigateBack();
        },
    },
}
</script>
<style lang="scss" scoped>
.pr {
    height: 100vh;
    width: 100%;
    display: flex;
   .ctn {
        height: 70vh;
        image {
            margin-left: 40rpx;
            width: 178rpx;
            height: 178rpx;
        }
        span {
            margin-top: 36rpx;
            font-size: 36rpx;
        }
        label {
            margin-top: 52rpx;
            color: #434343;
        }
        p {
            margin-top: 42rpx;
            font-size: 36rpx;
        }
   }
   .btn {
       button {
           width: 396rpx;
           height: 94rpx;
           border-radius: 47rpx;
           color: white;
       }
   }
}

</style>
