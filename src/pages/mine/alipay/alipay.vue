<template>
	<view>
		<mp-html id="payDiv" class="payDiv" :content="conent" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conent:'<h1>a</h1>',
			};
		},
		onLoad() {
			this.alipay()
		},
		methods:{
			alipay(){
					   this.$http.request({
					     url:"alipay/pay",
					   		 data:{
					   			 subject:'充值会员',
					   			 total_amount:'9.99',
					   			 body: uni.getStorageSync("id")
					   		 },
							 method:'POST'
					   })
					   .then(res =>{
					   	console.log(res);
					   	if(res.data.meta.status === 200){
					   		console.log(res);
							this.conent=res.data.data
							console.log(this.conent);
					   	}else{
					   		uni.showToast({
					   			icpn: 'none',
					   			title: '请退出重试'  ,
					   			image: '../../static/icon/error.png',
					   			duration: 5000
					   		});  
					   	}
					   })
					  
					 //  // 仅作为示例，非真实参数信息。
					 //  uni.requestPayment({
						// provider: 'wxpay',
					 //  	timeStamp: String(Date.now()),
					 //  	nonceStr: 'A1B2C3D4E5',
					 //  	package: 'prepay_id=wx20180101abcdefg',
					 //  	signType: 'MD5',
					 //  	paySign: '',
					 //  	success: function (res) {
					 //  		console.log('success:' + JSON.stringify(res));
					 //  	},
					 //  	fail: function (err) {
					 //  		console.log('fail:' + JSON.stringify(err));
					 //  	}
					 //  });
			}, 
		}
	}
</script>

<style lang="scss">

</style>
