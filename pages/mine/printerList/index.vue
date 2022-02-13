<template>
    <div>
        <p-nav title="打印记录"/>
        <div class="list" :style="{
			height: `calc(100vh - ${l_navHeight||0}px)`,
		}">
			<!-- 数据列表 -->
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" :scrollTop="scrollTop">
				<template v-slot:list>
                    <uni-swipe-action>
                        <uni-swipe-action-item v-for="(item, i) in l_listData" :key="i">
                            <div class="item" @click="toDetail(item)">
                                <p-cell label="时间：" label-width="118rpx" value-color="#7A7A7D" padding="20rpx 30rpx">
                                    <div class="fl fd-r jc-sb ai-ctr">
                                        <span class="ol-t-1">{{item.create_time}}</span>
                                        <label :style="{
                                            color: config.orderStatus[item.order_status.value].color
                                        }">{{item.order_status.text}}</label>
                                    </div>
                                </p-cell>
                                <u-line color="#f0f0f0" style="margin: 10rpx 0"></u-line>
                                <p-cell label="订单号：" label-width="168rpx" value-color="#434343" padding="20rpx 30rpx 10rpx 30rpx">
                                    <div class="fl fd-r jc-sb ai-ctr">
                                        <span class="ol-t-1">{{item.order_no}}</span>
                                        <label>¥{{item.pay_money}}</label>
                                    </div>
                                </p-cell>
                                <p-cell label="文件名称：" label-width="168rpx" value-color="#434343" padding="10rpx 30rpx" >
                                    <span class="ol-t-1" style="height:100%; ">{{item.title}}</span>
                                </p-cell>
                                <p-cell label="文件总页数：" :value="item.all_page_total" label-width="168rpx" value-color="#434343" padding="10rpx 30rpx" />
                            </div>
                            <template v-slot:right>
                                <div class="r-del fl jc-ctr ai-ctr"  @click="delClick(item)">
                                    <u-icon name="close-circle" size="88rpx" :color="'#fff'"/>
                                    <span>删除</span>
                                </div>
                            </template>
                        </uni-swipe-action-item>
                    </uni-swipe-action>
					
				</template>
			</p-list-view>
		</div>
    </div>
</template>

<script>
import listView from '@/mixins/listView.js';
import config from '@/common/config'
export default {
    mixins: [ listView ],
    data() {
        return {
            soruce: {},
        }
    },
    created() {
        this.requestList(true);
    },
    computed: {
        config() {
            return config;
        }
    },
    methods: {
        delClick(item) {
            console.log(item);
            
        },
        toDetail(item) {
            console.log(item);
            if (item.pay_status.value == 0) {
                uni.navigateTo({
                   url: `/pages/home/order/pay?order_id=${item.id}`,
                })
            } else {
                uni.navigateTo({
                   url: `/pages/home/order/detail?order_id=${item.id}`,
               })
            }
        },
        requestList(firstLoad = false, cover = false) {
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
            this.$api('order').list(this.l_pageinfo.p).then(res => {
				this.l_total = res.total;
				let list = res.data;
				cover ? this.$_setListData(list) : this.$_appendListData(list);
			})
		}
    },
}
</script>

<style lang="scss" scoped>

.list {
    .item {
        width: 750rpx;
        min-height: 290rpx;
        background-color: white;
        margin-bottom: 20rpx;
        .item-ctn {
            border-top: 1rpx solid #f0f0f0;
        }
    }
    .r-del {
        width: 200rpx;
        height: 100%;
        background: red;
        color: white;
        span {
            margin-top: 30rpx;
            font-size: 30rpx;
        }
    }
    
}
</style>
