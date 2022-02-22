export default { // 这里的this指向会变成Request类
    file(file, params) {
        return this.upload('file/file', {
            params: params, 
            filePath: file, 
            custom: {loading: true},
            name: 'file', 
        })
    },
    picture(file, params) {
        return this.upload('file/picture', {
            params: params, 
            filePath: file, 
            // #ifdef MP-ALIPAY
            fileType: 'image', 
            // #endif
            custom: {loading: true}, 
            name: 'file',
        })
    },
};