import config from '@/common/config.js'
export default { // 这里的this指向会变成Request类
    // 这个是微信小程序操作
    async login(...args) {
        let param = args[0]||{};
        if (param.type == 2) {
            return this.post('weixin_login', {...param});
        }
        let code = await this.api('user').wxLogin();
        // 获取code openid错误 返回个空指针
        if (!code) return void 0;
        // TODO: 这里需要联调一键登录
        param.type = 1;
        return this.post('weixin_login', {code, ...param});
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
    setUserinfo(userinfo) {
        return this.post('member/handle', userinfo);
    }
};