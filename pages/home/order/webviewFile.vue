<template>
	<div class="file" >
        <div class="btn"><button @click="getMessageFile">聊天记录文件</button></div>
        <div class="btn"><button @click="chooseFile">本地文件</button></div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            token: void 0,
        }
    },
    onLoad(e) {
        
    },
    mounted() {
        document.addEventListener('UniAppJSBridgeReady', function(e) {
            console.log('111', e)
            uni.postMessage({
                data: {
                    options:'来自H5的问候'
                }
            });
            uni.getEnv(function(res) {
                console.log('当前环境：' + JSON.stringify(res));
            });
        });
    },
    methods: {
        getMessageFile() { // 微信聊天文件
            let that = this;
            wx.chooseMessageFile({
                count: 1,
                type: 'file',
                extension: ['png', 'PNG', 'JPG', 'jpeg', 'JPEG', 'doc', 'docx', 'DOC', 'DOCX', 'xltm', 'csv', 'xlsx', 'xls', 'XLSX', 'XLS' ],
                success (res) {
                    that.$api('file').file(res.tempFiles[0].path).then(res => {
                        that.firstNext({ token:that.token, ...res });
                    });
                }
            })
        },
        chooseFile() {
            uni.postMessage({
                data: {
                    options:'来自H5的问候'
                }
            });
            return;
            uni.chooseFile({
                count: 1,
                extension: ['png', 'PNG', 'JPG', 'jpeg', 'JPEG', 'doc', 'docx', 'DOC', 'DOCX', 'xltm', 'csv', 'xlsx', 'xls', 'XLSX', 'XLS' ],
                success (res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFiles
            }
            })
        },
        firstNext(param) {
            this.$api('order').first_step(param).then(res => {
                uni.redirectTo({url: `/pages/home/order/second?order_id=${res.id}`});
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.file {
    .upload-file {
        display: hidden;
    }
    .btn {
        padding: 76rpx 136rpx;
        border-bottom: 1rpx #F0F0F0 solid;
        background: white;
        &:nth-child(2) {
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
