<template>
  <div class="osv fl ai-ctr jc-ctr" v-if="order_status <= 5 && order_status > 0">
    <!-- 打印中 -->
    <div v-if="order_status == 1" class="fl ai-ctr jc-ctr">  
      <div class="fl a-ctr jc-ctr"><u-loading-icon></u-loading-icon></div>
      <p>正在打印中</p>
      <image :src="require('@/static/order/status_1.png')" style="height: 144rpx;width: 184rpx;">
    </div>
    <!-- 已完成 -->
    <div v-else-if="order_status == 2" class="fl ai-ctr jc-ctr">
      <image :src="require('@/static/order/status_2.png')" style="height: 140rpx;width: 140rpx;">
      <p>打印完成</p>
    </div>
    <!-- 异常 -->
    <div class="fl ai-ctr jc-ctr" v-else-if="order_status == 3">
      <image :src="require('@/static/order/status_3.png')" style="height: 140rpx;width: 140rpx;">
      <p>打印失败，请重新尝试！</p>
    </div>
    <!-- 已取消 -->
    <div v-else-if="order_status == 4" class="fl ai-ctr jc-ctr">
      <image :src="require('@/static/order/status_2.png')" style="height: 140rpx;width: 140rpx;">
      <p>已取消</p>
    </div>
    <!-- 已退款 -->
    <div v-else-if="order_status == 5" class="fl ai-ctr jc-ctr">
      <image :src="require('@/static/order/status_2.png')" style="height: 140rpx;width: 140rpx;">
      <p>已退款</p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "orderStatusView",
  props: {
    order_status: {
      default: void 0
    }
  },
};
</script>
<style lang="scss" scoped>
.osv {
  padding: 0 40rpx;
  height: 434rpx;
  background-color: rgb(249, 250, 255);
  p {
    font-size: 28rpx;
    line-height: 80rpx;
    text-align: center;
  }
}
</style>