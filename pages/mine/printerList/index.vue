<template>
    <div>
        <p-nav title="打印记录"/>
        <div class="list" :style="{
			height: `calc(100vh - ${l_navHeight||0}px)`,
		}">
			<!-- 数据列表 -->
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" :scrollTop="scrollTop">
				<template v-slot:list>
					<div class="item" v-for="(item, i) in l_listData" :key="i">
                        <p-cell label="时间：" label-width="118rpx" value-color="#7A7A7D" padding="20rpx 30rpx">
                            <div class="fl fd-r jc-sb ai-ctr">
                                <span class="ol-t-1">2021-12-12  16:00</span>
                                <label style="color: #4282F8;">打印中</label>
                            </div>
                        </p-cell>
                        <u-line color="#f0f0f0" style="margin: 10rpx 0"></u-line>
                        <p-cell label="订单号：" label-width="168rpx" value-color="#434343" padding="20rpx 30rpx 10rpx 30rpx">
                            <div class="fl fd-r jc-sb ai-ctr">
                                <span class="ol-t-1">NPREV231231234</span>
                                <label>¥30.00</label>
                            </div>
                        </p-cell>
                        <p-cell label="文件名称：" :value="'小学一年级作业'" label-width="168rpx" value-color="#434343" padding="10rpx 30rpx" />
                        <p-cell label="文件总页数：" :value="'50'" label-width="168rpx" value-color="#434343" padding="10rpx 30rpx" />
					</div>
				</template>
			</p-list-view>
		</div>
    </div>
</template>

<script>
import listView from '@/mixins/listView.js';
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
    methods: {
        requestList(firstLoad = false, cover = false) {
			console.log('模拟请求数据', firstLoad, cover)
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
			setTimeout(() => {
				this.l_total = 11;
				let res = [1,1,1,1,1,1,1,1,1,1];
				cover ? this.$_setListData(res) : this.$_appendListData(res);
			}, 1200);
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
    
}
</style>
