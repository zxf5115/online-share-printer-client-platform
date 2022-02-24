<template>
    <div style="height: 100vh;">
        <p-nav title="个人资料" :line="false" />
        <div class="ctn fl jc-sb">
            <div>
                <div class="top fl jc-ctr ai-ctr">
                    <image :src="source.avatar" />
                    <span @click="getUserProfile">点击获取微信头像昵称</span>
                </div>
                <p-cell label="昵称：" label-size="30rpx" label-color="#B0B0B0" padding="40rpx 40rpx">
                    <u-input placeholder="请输入昵称" border="none" clearable v-model="source.nickname" />
                </p-cell>
                <p-cell label="手机号：" label-size="30rpx" label-color="#B0B0B0" padding="40rpx 40rpx">
                    <button class="phone-btn" :class="{'is-read': isRead}" style="justify-content: start; width: 100%;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{source.username}}</button>

                </p-cell>
                <p-cell label="地区：" label-size="30rpx" label-color="#B0B0B0" padding="40rpx 40rpx">
                    <p style="color: #4992FF;" @click="getLocation">{{source.address||'点击选择所在地区'}}</p>
                </p-cell>
            </div>
            <div class="submit">
                <button @click="submit">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QQMap from '@/static/common/js/location/qqmap-wx-jssdk.js'
export default {
    computed: {
        ...mapGetters([ 'userinfo' ]),
    },
    data() {
        return {
            source: {},
            qqmap: void 0,
            code: void 0,
        }
    },
    async onLoad() {
        this.source = JSON.parse(JSON.stringify(this.userinfo));
        await this.getCode();
        this.qqmap = new QQMap({
            key: '4LABZ-JVNCG-BMYQY-IBMIU-YFXNH-JVB6U'
        });
    },
    methods: {
        async getCode() {
            this.code = await this.$api('user').wxLogin();
            if (!this.code) this.$u.toast('获取用户信息失败，请检查网络配置');
        },
        submit() {
            uni.showLoading({ mask: true, title: '加载中...'});
            this.$store.dispatch('user/setUserinfo', this.source).then(res => {
                uni.hideLoading();
                this.$u.toast('保存成功');
            }).catch(error => {
                uni.hideLoading();
                uni.showToast({
						title: '设置用户信息失败请重试!',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
            })
        },
        getLocation() {
            let that = this;
            uni.showLoading({ mask: true, title: '定位中...'});
            uni.getLocation({
                type: 'wgs84',
                success: function (local) {
                    uni.hideLoading();
                    // 地址反解析
                    that.qqmap.reverseGeocoder({
                          location: local || '', 
                          success: function(res) {//成功后的回调
                            that.$set(that.source, 'address', `${res.result.address_component.province}${res.result.address_component.city}${res.result.address_component.district}${res.result.address_component.street}`)
                          },
                          fail: function(error) {
                            that.$u.toast('地址解析失败，请重试');
                          },
                          complete: function(res) {
                            console.log(res);
                          }
                    })
                },
                fail: function(err) {
                    console.log(err);
                    uni.hideLoading();
                }
            });
        },
        getPhoneNumber(e) {
            if (!e.detail.encryptedData) return;
            uni.showLoading({ mask: true, title: '加载中...'});
            this.$api('user').mobile({
                data: e.detail.encryptedData,
                iv: e.detail.iv,
                code: this.code,
            }).then(res => {
                this.source.username = res;
                this.getCode();
                uni.hideLoading();
            }).catch(error => {
                this.$u.toast('获取手机号码失败');
                uni.hideLoading();
            })
            
        },
        getUserProfile() {
            uni.getUserProfile({
                desc:'Wexin', // 这个参数是必须的
                success: res => {
                    this.source.avatar = res.userInfo.avatarUrl;
                    this.source.nickname = res.userInfo.nickName;
                },
                fail: err => {
                    uni.showToast({
						title: '取消了授权',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
                }
            })
        }
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
    .phone-btn {
        justify-content: start;
        padding: 0;
        margin: 0;
        font-size: 32rpx;
        color: black;
        line-height: 1;
    }
    .top {
        margin: 62rpx 0 40rpx 0;
        height: 272rpx;
        image {
            width: 166rpx;
            height: 166rpx;
            border-radius: 50%;
        }
        span {
            color: #999;
            font-size: 24rpx;
            margin-top: 34rpx;
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
