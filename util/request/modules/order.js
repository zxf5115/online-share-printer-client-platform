
export default { // 这里的this指向会变成Request类
    first_step(param) {
        return this.post('member/order/first_step', param);
    },
    second_step(param) {
        return this.post('member/order/second_step', param);
    },
    view(id) {
        return this.get(`member/order/view/${id}`);
    },
    pay(order_id) {
        return this.post('member/order/pay', {order_id});
    },
    list(page) {
        return this.get(`member/order/list?page=${page}`);
    },
    again(id) {
        return this.post('member/order/again', {id});
    },
    delete(id) {
        return this.post('member/order/delete', {id});
    }
};