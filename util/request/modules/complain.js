export default { // 这里的this指向会变成Request类
    handle(params) {
        return this.post('member/complain/handle', params);
    },
};