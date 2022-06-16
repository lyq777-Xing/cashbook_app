// //es6
// export default (params) => {
//     return new Promise((resolve, reject) => {
//         // 加载中
//         uni.showLoading({
//             title: "加载中..."
//         })

//         wx.request({
//             ...params,
//             success(res) {
//                 resolve(res)
//             },
//             fail(err) {
//                 reject(err)
//             },
//             complete() {
//                 uni.hideLoading();
//             }
//         })
//     })
// }
// 120.48.85.254
const BASE_URL = 'http://120.48.85.254:8888/'//接口地址
export const request = (options) => {	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {Authorization:uni.getStorageSync('token')},
			success: (res) => {
					if (res == '') {
					return uni.showToast({
						icon: 'loading',
						title:'获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title:'请求失败'
				})
				reject(err)
			}
		})
	})
}

//定义对象
var http = {
	request
};

export default http

