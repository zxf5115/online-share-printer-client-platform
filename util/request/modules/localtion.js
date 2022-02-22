export default { // 这里的this指向会变成Request类
    getAddress({latitude, longitude}) {
        return new Promise((resolve, reject) => {
            uni.request({
                url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=4LABZ-JVNCG-BMYQY-IBMIU-YFXNH-JVB6U`,
                success: (res) => {
                    console.log(res.data);
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    },
};