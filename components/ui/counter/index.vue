<template>
  <div class="counter fl fd-r jc-sb ai-ctr" :style="{
        height: height,
        width: width,
    }">
    <button class="add fl jc-ctr ai-ctr" @click="addAction">+</button>
    <div class="number">
      <input v-model="value" class="n-input" type="number"/>
    </div>
    <button class="dec fl jc-ctr ai-ctr" @click="decAction">-</button>
  </div>
</template>

<script>
export default {
  name: "counter",
  model: {
    prop: 'value',    
    event: 'input'    
  },
  props: {
    height: {
      type: String,
      default: '94rpx',
    },
    width: {
      type: String,
      default: '514rpx',
    },
    max: { // undefine是无限
      default: void 0,
    },
    min: { 
      type: Number,
      default: 1,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    }
  },
  methods: {
    decAction () {
      if (this.value - this.step < this.min) return;
      this.$emit('input', this.value - this.step);
    },
    addAction () {
      if (this.max != void 0 && (this.value + this.step > this.max)) return;
      this.$emit('input', this.value + this.step);
    }
  },
};
</script>
<style lang="scss" scoped>
.counter {
  .number {
    flex: 1;
    margin: 0 10rpx;
    border: 1rpx solid #25A1F9;
    height: 100%;
    border-radius: 6rpx;
    .n-input {
      text-align: center;
      width: 100%;
      height: 100%;
    }
  }
  button {
    color: white;
    font-size: 50rpx;
    background: #25A1F9;
    border-radius: 6rpx;
    width: 27.626%;
    height: 100%;
  }
}
</style>