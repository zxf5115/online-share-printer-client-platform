<template>
	<div class="pay" >
	    <p-nav title="提交订单"/>
        <div v-if="loading" style="padding: 30rpx">
            <u-skeleton rows="4" title title-width="70%" :loading="loading" v-if="loading" rows-width="100%"/>
        </div>
        <div class="ctn p-rte" v-else-if="orderInfo">
            <p-cell label="订单号：" :value="orderInfo.order_no" label-width="130rpx" value-color="#7A7A7D" bg="#F8EFED" height="70rpx"/>
            <div class="scene">
                <p-cell label="文件名称：" :value="orderInfo.title" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="文件页数：" :value="orderInfo.total" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="打印份数：" :value="orderInfo.print_total" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="类　　型：" :value="orderInfo.price.title" label-width="140rpx" padding="6rpx 0"/>
            </div>
            <div class="scene">
                <p-cell label="打印机：" :value="orderInfo.printer.title" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="型　号：" :value="orderInfo.printer.model" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="地　址：" :value="orderInfo.printer.address" label-width="140rpx" padding="6rpx 0"/>
                <p-cell label="店　长：" :value="orderinfo.manager.nickname" label-width="140rpx" padding="6rpx 0"/>
            </div>
            <div class="scene">
                <p-cell label="文件总页数：" :value="orderInfo.all_page_total" label-width="200rpx" padding="6rpx 0"/>
            </div>
            <div class="bottom fl fd-r jc-sb ai-ctr">
                <div class="left">
                    <p>{{orderInfo.price.price}}元/页</p>
                    <p class="fl fd-r ai-end"><span>¥{{orderPriceInteger}}</span>.{{orderPriceDecimal}}</p>
                </div>
                <div><button class="right" @click="toPay">去支付</button></div>
            </div>
        </div>
        <div class="ctn fl ai-ctr jc-ctr" v-else>
            <u-empty mode="order" :text="'订单数据错误'" />
        </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            order_id: void 0,
            loading: false,
            orderInfo: void 0,
        }
    },
    watch: {
        order_id() {
            this.requestData();
        },
    },
    computed: {
        orderPriceInteger() {
            try {
                return this.orderInfo.pay_money.split('.')[0];
            } catch (error) {
                return '';
            }
        },
        orderPriceDecimal() {
            try {
                return this.orderInfo.pay_money.split('.')[1];
            } catch (error) {
                return '';
            }
        },
    },
    onLoad(e) {
        this.order_id = e.order_id;
        let resultParams =  {
            type: 0, // 成功
            title: '支付成功',
            img: require("@/static/order/pay_success.png"),
            titleColor: '#07C160',
            subtitleTitle: "¥46.00",
            resultBtn: "打印详情"
        }
        uni.navigateTo({
            url: '/pages/common/resultView/index?resultParams=' + encodeURIComponent(JSON.stringify(resultParams))
        })
    },
    methods: {
        requestData() {
            this.loading = true;
            this.$api('order').view(this.order_id).then(res => {
                this.loading = false;
                this.orderInfo = res;
            }).catch(error => {
                this.loading = false;
            });
        },
        toPay() {
            let that = this;
            uni.showLoading({title: '加载中...'});
            this.$api('order').pay(this.order_id).then(res => {
                uni.hideLoading();
                uni.requestPayment({
                    ...res,
                    success: function (res) {
                        uni.redirectTo({
                            url: `/pages/home/order/payResult?order_id=${that.order_id}&type=1&price=${that.orderInfo.pay_money}`
                        })
                    },
                    fail: function (err) {
                        console.log(111);
                        uni.navigateTo({
                            url: `/pages/home/order/payResult?order_id=${that.order_id}&type=0`
                        })
                    }
                });
            }).catch(error => {
                uni.hideLoading();
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.pay {
    height: 100vh;
    width: 100%;
    display: flex;
    .ctn {
        flex: 1;
        .scene {
            padding: 30rpx 40rpx;
            background: white;
            border-bottom: 1px #F0F0F0 solid;
            &:nth-last-child(1) {
                border: 0;
            }
        }
        .bottom {
            height: 180rpx;
            width: calc(100% - 68rpx);
            position: absolute;
            left: 0;
            bottom: 0;
            background: white;
            padding: 20rpx 34rpx;
            .left {
                height: calc(100% - 20rpx);
                padding: 10rpx 0;
                p {
                color: #FF0000;
                &:nth-child(2) {
                    margin-top: 10rpx;
                }
                span {
                    font-size: 46rpx;
                    border-width: blod;
                    margin-bottom: -6rpx
                }
            }
            }
            button {
                width: 200rpx;
                height: 88rpx;
                background: linear-gradient(90deg, #E8500E 0%, #F97E25 100%);
                border-radius: 44rpx;
                color: white;
            }
        }
    }
}

</style>
