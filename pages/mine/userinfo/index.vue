<template>
    <div style="height: 100vh;">
        <p-nav title="个人信息" :line="false" />
        <div class="ctn fl jc-sb">
            <div>
                <div class="top fl jc-ctr ai-ctr">
                    <image src="https://cdn.uviewui.com/uview/album/1.jpg" />
                </div>
                <p-cell label="昵称：" label-size="30rpx" label-color="#B0B0B0" padding="20rpx 40rpx">
                    <u--input placeholder="请输入昵称" border="bottom" clearable v-model="source.name" />
                </p-cell>
                <p-cell label="手机号：" label-size="30rpx" label-color="#B0B0B0" padding="20rpx 40rpx">
                    <u--input placeholder="请输入手机号" border="bottom" clearable v-model="source.name" />
                </p-cell>
            </div>
            <div class="submit">
                <button>保存</button>
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
            soruce: {},
        }
    },
    methods: {
    },
}
</script>
<style>
::v-deep page { background-color: rgb(255, 255, 255) !important; }
::v-deep .p-cell-label {
    width: 224rpx !important;
}
</style>
<style lang="scss" scoped>

.ctn {
    height: calc(100% - 160rpx);
    /deep/ .p-cell {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            width: calc(100% - 60rpx);
            left: 30rpx;
            height: 1px;
            background: #F0F0F0;
            bottom: 0;
        }
    }
    .top {
        margin: 62rpx 0 40rpx 0;
        height: 212rpx;
        image {
            width: 166rpx;
            height: 166rpx;
            border-radius: 50%;
        }
    }
    .submit {
        padding: 60rpx 0;
        button {
            width: 470rpx;
            height: 94rpx;
            background-color: #25A1F9;
            color: white;
            border-radius: 47rpx;
        }
    }
}
</style>
