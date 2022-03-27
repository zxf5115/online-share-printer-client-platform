<template>
    <web-view :src="`https://web.vstown.cc/file/index.html?token=${token}`" @message="handleMessage"></web-view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['token']),
    },
    data() {
        return {
            file_token: void 0,
        }
    },
    onLoad(e) {
        this.file_token = decodeURIComponent(e.token||'');
        console.log(this.file_token)
        // 数据错误就返回上一页
        if (!this.file_token) uni.navigateBack();
    },
    
    methods: {
        handleMessage(e) {
            try {
                let action = e.detail.data[0].action;
                if (action == 'getMessageFile') {
                    this.getMessageFile();
                } else if (action.split('!@#$%^!@#$^%')[0] == 'fileObj') {
                    let res = JSON.parse(action.split('!@#$%^!@#$^%')[1]);
                    this.firstNext({ token:this.file_token, ...res });
                }
            } catch (error) {
                
            }
        },
        getMessageFile() { // 微信聊天文件
            let that = this;
            wx.chooseMessageFile({
                count: 1,
                type: 'file',
                extension: ['png', 'PNG', 'JPG', 'jpeg', 'JPEG', 'doc', 'docx', 'DOC', 'DOCX', 'xltm', 'csv', 'xlsx', 'xls', 'XLSX', 'XLS' ],
                success (res) {
                    uni.showLoading({ mask: true, title: '加载中...'});
                    that.$api('file').file(res.tempFiles[0].path).then(res => {
                        uni.hideLoading();
                        that.firstNext({ token:that.file_token, ...res });
                    }).catch(error => {
                        uni.hideLoading();
                        that.$u.toast(error.message||'网络错误');
                    });
                }
            })
        },
        firstNext(param) {
            this.$api('order').first_step(param).then(res => {
                uni.navigateTo({url: `/pages/home/order/second?order_id=${res.id}`});
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.file {
    .btn {
        padding: 76rpx 136rpx;
        border-bottom: 1rpx #F0F0F0 solid;
        background: white;
        &:nth-child(3) {
            border: 0;
            button {
                background: #25A1F9;
            }
        }
        button {
            background: #67C23A;
            width: 478rpx;
            height: 110rpx;
            line-height: 110rpx;
            color: white;
            border-radius: 8rpx;
        }
    }
}

</style>
