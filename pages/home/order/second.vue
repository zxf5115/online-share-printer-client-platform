<template>
	<div class="index fl" >
	    <p-nav title="提交订单"/>
	    <div class="step fl jc-sb">
            <div class="count">
                <p-cell label="请选择份数：" label-width="198rpx" padding="0">
                    <counter v-model="count" height="94rpx" width="514rpx"/>
                </p-cell>
            </div>
            <div class="btn">
                <button @click="nextAction()">下一步</button>
            </div>
	    </div>
	</div>
</template>

<script>
import counter from '@/components/ui/counter'
export default {
    components: { counter },
    data() {
        return {
            count: 1,
            order_id: void 0,
        };
    },
    onLoad(e) {
        this.order_id = e.order_id;
        if (this.order_id == void 0) {
            this.$u.toast('数据错误');
            return uni.navigateBack();
        }
    },
    methods: {
       nextAction() {
           this.$api('order').second_step({
               order_id: this.order_id,
               print_total: this.count,
           }).then(res => {
               console.log(res);
               uni.redirectTo({
                   url: `/pages/home/order/pay?order_id=${res.id}`,
               })
           })
       }
    },
}
</script>
<style lang="scss" scoped>
.index {
	overflow: hidden;
    height: 100vh;
}
.step {
    flex: 1;
    .count {
        background: white;
        padding: 50rpx 20rpx;
    }
    .btn {
        padding: 66rpx 0;
        button {
            background: #25A1F9;
            height: 94rpx;
            border-radius: 47rpx;
            width: 396rpx;
            color: white;
            line-height: 94rpx;
            
        }
    }
}
</style>
