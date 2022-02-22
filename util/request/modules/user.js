import config from '@/common/config.js'
export default { // 这里的this指向会变成Request类
    // 这个是微信小程序操作
    async login(...args) {
        if (await this.api('user').checkSession()) {
            // 触发了更新code;
            args[0].code = await this.api('user').wxLogin();
        }
        return this.post('weixin_login', {...args[0]});
    },
    async checkSession() {
        return new Promise((resolve, reject) => {
            wx.checkSession({
                provider: 'weixin',
                success: res => {
                    resolve(true)
                },
                fail: err => {
                    reject(false);
                }
            })
        })
    },
    async wxLogin() {
        return new Promise((resolve, reject) => {
            uni.login({
                provider: 'weixin',
                success: res => {
                    resolve(res.code)
                },
                fail: err => {
                    reject(void 0);
                }
            })
        })
    },
    mobile(param) {
        return this.post('member/mobile', param);
    },
    setUserinfo(userinfo) {
        return this.post('member/handle', userinfo);
    },
    archive() {
        return this.get('member/archive');
    },

};