<template>
    <div class="fl bd">
        <p-nav title="我的" />
        <div class="ctn">
            <div class="top">
                <image class="bg" :src="require('@/static/mine/index/banner.png')" />
                <image class="ava" src="https://cdn.uviewui.com/uview/album/1.jpg" />
                <span class="username">阿高</span>
                <p class="edit fl jc-sb fd-r ai-ctr" @click="jump({path: '/pages/mine/userinfo/index'})">
                    编辑个人资料
                    <image src="../../static/icon/edit.png" />
                </p>
            </div>
            <div class="list">
                <div class="item fl fd-r ai-ctr" v-for="(item, i) in items" :key="i" @click="jump(item)">
                    <image :src="item.icon" />
                    <p>{{item.title}}</p>
                    <u-icon name="arrow-right" color="#B7B7B7" size="16"></u-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    data() {
        return {
            items: [
                {
                    icon: require('../../static/mine/index/item1.png'),
                    title: '打印记录',
                    path: '/pages/mine/myDevice/index',
                }, {
                    icon: require('../../static/mine/index/item2.png'),
                    title: '意见反馈',
                    path: '/pages/mine/feedback/index',
                }, {
                    icon: require('../../static/mine/index/item3.png'),
                    title: '联系我们',
                    path: '/pages/mine/contact/index',
                }, 
            ]
        }
    },
    methods: {
        jump(e) {
          if (e.type === 'tabbar')
            uni.switchTab({url: e.path})
          else
            uni.navigateTo({url: e.path,});
        },
        rightClick(e) {
            console.log(e);
        },
        leftClick(e) {
            console.log(e);
        }
    },
}
</script>
<style lang="scss" scoped>
.bd {
    height: 100vh;
}
.ctn {
    flex: 1;
    .top {
        position: relative;
        .bg {
            width: 100%;
            height: 428rpx;
            z-index: 0;
        }
        .ava {
            position: absolute;
            width: 118rpx;
            height: 118rpx;
            border-radius: 59rpx;
            left: 50rpx;
            top: 96rpx;
        }
        .username  {
            position: absolute;
            color: #fff;
            font-size: 32rpx;
            left: 200rpx;
            top: 116rpx;
        }
        .edit {
            position: absolute;
            color: #A8C5FF;
            width: 180rpx;
            font-size: 24rpx;
            top: 162rpx;
            left: 200rpx;
            image {
                width: 30rpx;
                height: 30rpx;
            }
        }
    }
    .list {
        z-index: 1;
        background: white;
        margin: 0 40rpx;
        margin-top: -152rpx;
        border-top-right-radius: 40rpx;
        border-top-left-radius: 40rpx;
        flex: 1;
        .item {
            height: 154rpx;
            border-bottom: 1rpx solid #F0F0F0;
            padding-right: 70rpx;
            padding: 0 40rpx;
            z-index: 1;
            &:nth-last-child(1) {
                border-bottom: 0;
            }
            image:nth-child(1) {
                width: 76rpx;
                height: 76rpx;
            }
            p {
                flex: 1;
                margin: 0 40rpx;
            }
        }
    }
    
}
</style>
