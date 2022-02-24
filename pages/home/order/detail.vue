<template>
	<div class="pay" >
	    <p-nav title="提交订单"/>
        <div class="ctn p-rte" v-if="orderInfo || refreshFlag">
            <p-list-view
              style="height:100%"
              :more="0"
              :firstLoad="false"
              :downRefresh="refreshFlag"
              :nodata="false"
              @refresh="refreshAction"
            >
                <template v-slot:list>
                    <orderStatusView :order_status="orderInfo.order_status.value"/>
                    <div class="scene">
                        <p-cell label="时间：" :value="orderInfo.create_time" label-width="84rpx" padding="4rpx 0">
                            <div class="jc-sb fl ai-ctr fd-r">
                                <span style="color: #7A7A7D;">{{orderInfo.create_time}}</span>
                                <span :style="{
                                    color: config.orderStatus[orderInfo.order_status.value].color
                                }">{{orderInfo.order_status.text}}</span>
                            </div>
                        </p-cell>
                    </div>
                    <div class="scene">
                        <p-cell label="订单号：" :value="orderInfo.order_no" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="文件名称：" :value="orderInfo.title" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="文件页数：" :value="orderInfo.total" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="打印份数：" :value="orderInfo.print_total" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="类　　型：" :value="orderInfo.price.title" label-width="140rpx" padding="8rpx 0"/>
                    </div>
                    <div class="scene">
                        <p-cell label="打印机：" :value="orderInfo.printer.title" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="型　号：" :value="orderInfo.printer.model" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="地　址：" :value="orderInfo.printer.address" label-width="140rpx" padding="8rpx 0"/>
                        <p-cell label="店　长：" :value="orderinfo.manager.nickname" label-width="140rpx" padding="8rpx 0"/>
                    </div>
                    <div class="scene">
                        <p-cell label="文件总页数：" :value="orderInfo.all_page_total" label-width="200rpx" padding="8rpx 0"/>
                    </div>
                    <div class="scene">
                        <p-cell label="支付金额：" :value="orderInfo.pay_money" value-color="red" label-width="200rpx" padding="8rpx 0"/>
                        <div class="btn" v-if="orderInfo.order_status.value == 3">
                            <button @click="again">重新打印</button>
                        </div>
                    </div>
                </template>
            </p-list-view>
        </div>
        <div class="ctn fl ai-ctr jc-ctr" v-else>
            <u-empty mode="order" :text="'订单数据错误'" />
        </div>
	</div>
</template>

<script>
import config from '@/common/config.js'
import orderStatusView from './components/orderStatusView.vue'
export default {
    components: { orderStatusView },
    data() {
        return {
            order_id: void 0,
            loading: false,
            orderInfo: void 0,
            refreshFlag: false,
        }
    },
    watch: {
        order_id() {
            this.requestData();
        },
    },
    computed: {
        config() {
            return config;
        }
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
        refreshAction() {
            this.requestData();
        },
        requestData() {
            this.refreshFlag = true;
            uni.showLoading({ mask: true, title: '加载中...'});
            this.$api('order').view(this.order_id).then(res => {
                uni.hideLoading();
                this.refreshFlag = false;
                this.orderInfo = res;
            }).catch(error => {
                uni.hideLoading();
                this.refreshFlag = false;
            });
        },
        again() {
            this.$api('order').again(this.orderInfo.id).then(res => {
                this.requestData();
            }).catch(error => {
                this.$u.toast(error.message||'网络错误');
            })
        }
    },
}
</script>
<style>
::v-deep page { background-color: rgb(255, 255, 255) !important; }
</style>
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
            .btn {
                padding: 30rpx 0;
                button {
                    width: 396rpx;
                    height: 94rpx;
                    border-radius: 47rpx;
                    background: #25A1F9;
                    color: #F9FAFF;
                }
            }
        }
    }
}

</style>
