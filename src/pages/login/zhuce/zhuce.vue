<template>
	<view class="container">
		<view class="ui-all">
				<view  class="imgAvatar">
					<img class="headerImg" :src="noneImg" alt="" v-if="data.userHeader === ''">
					<img class="headerImg" :src="url + data.userHeader" alt="" v-else>
				</view>
				<text @click="chooseImage">上传头像</text>
			<view class="ui-list">
				<text>昵称</text>
				<input type="text" :placeholder="value" v-model="data.userName" @input="bindnickName" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>手机号</text>
				<input type="tel" v-model="data.userPhone" :placeholder="value" @input="bindmobile" placeholder-class="place" />
				<!-- <button  open-type="getPhoneNumber" @click="changePhone()" class="getInfo bun">绑定手机号</button> -->
				<button :disabled="btnDis" @click="sendcodeone()" class="getInfo bun">{{btnText}}</button>
			</view>
			<view class="ui-list">
				<text>验证码</text>
				<input  type="tel" v-model="code" :placeholder="value" @input="bindsendcode" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>密码</text>
				<input type="tel" v-model="data.userPassword" :placeholder="value" @input="bindpwd" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>邮箱</text>
				<input  type="tel" v-model="data.userEmail" :placeholder="value" @input="bindmeail" placeholder-class="place" />
			</view>
<!-- 			<e-modal :visible.sync="visible" @cancel="handleCancel">
				<view class="changemobile">
					<view class="ui-list">
						<text>手机号</text>
						<input  type="tel" v-model="newphone" :placeholder="value" @input="bindnewmobile" placeholder-class="place" />
					</view>
					<view class="ui-list">
						<text>验证码</text>
						<input  type="tel" v-model="code" :placeholder="value" @input="bindsendcode" placeholder-class="place" />
					</view>
					<view class="ui-list">
						<button :disabled="btnDis" @click="sendcodeone()" class="getInfo bun">{{btnText}}</button>
					</view>
					<button class="save" @tap="updphone">确 认 绑 定</button>
				</view>
			</e-modal> -->
			<button class="save" @tap="savaInfo">注 册</button>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '请填写',
				url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
				data:{
					userEmail:'',
					userHeader:'',
					userName:'',
					userPassword:'',
					userPhone:''
				},
				visible: '',
				newphone:'',
				code:'',
				btnDis: false,// 发送验证码按钮不禁用
				btnText: "发送验证码",// 提示
				noneImg:'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif',
				
			};
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh");
			uni.stopPullDownRefresh();
		},
		methods:{
			bindnickName(e) {
				this.data.userName = e.detail.value;
			},
			bindmobile(e) {
				this.data.userPhone = e.detail.value;
			},
			bindpwd(e){
				this.data.userPassword = e.detail.value;
			},
			bindnewmobile(e){
				this.newphone = e.detail.value;
			},
			bindmeail(e){
				this.data.userEmail = e.detail.value;
			},
			bindsendcode(e){
				this.code = e.detail.value;
			},
			changePhone(){
				console.log("changePhone...");
				this.visible = true
			},
			handleCancel() {
				console.log('cancel')
			},
			savaInfo() {
				let that = this;
				if (!that.data.userName) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.data.userHeader) {
					uni.showToast({
						title: '请上传头像',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.code) {
					uni.showToast({
						title: '请填写验证码',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.data.userPassword) {
					uni.showToast({
						title: '请填写密码',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (that.isPoneAvailable(that.data.userPhone)) {
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				console.log("Zhuce...");
				that.add(this.data);
			},
			add(dataa){
				this.$http.request({
					 url:"user/zhuce/" + this.code,
					 method:'POST',
					 data:dataa
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						this.addBilllist(res.data.data.id)
					}else if(res.data.meta.status === 423){
						uni.showToast({
							icpn: 'none',
							title: '该手机号已经被占用'  ,
							duration: 5000
						});  
					}else if(res.data.meta.status === 424){
						uni.showToast({
							icpn: 'none',
							title: '验证码错误'  ,
							duration: 5000
						});  
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							duration: 5000
						});  
					}
				})
			},
			addBilllist(userId){
				this.$http.request({
					 url:"billlist/zhuceadd/" + userId,
					 method:'POST',
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						uni.showToast({
							icpn: 'none',
							title: '注册成功'  ,
							duration: 5000
						});  
						uni.redirectTo({
							url:'/pages/login/zhuce/zhuce'
						})
					}else if(res.data.meta.status === 423){
						uni.showToast({
							icpn: 'none',
							title: '该手机号已经被占用'  ,
							duration: 5000
						});  
					}else if(res.data.meta.status === 413){
						uni.showToast({
							icpn: 'none',
							title: '该用户名已经被占用'  ,
							duration: 5000
						});  
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							duration: 5000
						});  
					}
				})
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			sendcodeone(){
				let that = this;
				if (that.isPoneAvailable(that.data.userPhone)) {
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// 发送短信验证码
				this.$http.request({
					 url:"user/smscodefour?phone=" + that.data.userPhone,
				})
				.then(res =>{
					console.log(res);
					if(res.statusCode !== 200){
						uni.showToast({
							icpn: 'error',
							title: '发送失败'  ,
							duration: 5000
						});  
					}else{
						if(res.data.meta.status === 200){
							console.log(res);
							// this.data = JSON.parse(res.data.data)
							console.log(this.data);
						}else if(res.data.meta.status === 423){
							uni.showToast({
								icpn: 'none',
								title: '该手机号已经被占用'  ,
								duration: 5000
							});  
						}else{
							uni.showToast({
								icpn: 'none',
								title: '请退出重试'  ,
								duration: 5000
							});  
						}
					}
				})
				// 发送成功
				uni.showToast({
					title: '发送成功'
				});
				// 开启倒计时
				this.countDown();
			},
			countDown(){
				// 初始化定时器
				let t = null;
				// 倒计时1分钟
				let timer = 30;
				// 按钮禁用
				this.btnDis = true;
				// 计时器清零
				clearInterval(t);
				// 按钮显示时间
				this.btnText = `${timer}s`;
				t = setInterval(() => {
				// 当倒计时完时，显示重新发送,按钮开启
					if (timer == 0) {
						clearInterval(t);
						this.btnText = "重新发送";
						this.btnDis = false;
						return;
					}
					// 实现倒计时效果
					timer--;
					this.btnText = `${timer}s`;
				}, 1000)
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'http://120.48.85.254:8888/upload/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'imgFile',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								// this.imageSrc = imageSrc
								const dataa = JSON.parse(res.data)
								this.data.userHeader = dataa.data
								console.log(this.data.userHeader);
								// console.log(this.imageSrc);
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Blue Whale需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	 .changemobile{
	 	width: 80%;
	 	margin: 10px auto;
	 }
	 .container {
	 	display: block;
	 }
	 
	 .ui-all {
	 	padding: 20rpx 40rpx;
	 
	 	.avatar {
	 		margin: 0 auto;
	 		width: 100%;
	 		text-align: left;
	 		padding: 20rpx 0;
	 		border-bottom: solid 1px #f2f2f2;
	 		position: relative;
	 
	 		.imgAvatar {
	 			width: 100px;
	 			height: 100px;
	 			margin: 0 auto;
	 			border-radius: 50%;
	 			display: inline-block;
	 			vertical-align: middle;
	 			overflow: hidden;
	 
	 			.iavatar {
	 				width: 100%;
	 				height: 100%;
	 				display: block;
	 			}
	 		}
	 
	 		text {
	 			display: inline-block;
	 			vertical-align: middle;
	 			color: #8e8e93;
	 			font-size: 28rpx;
	 			margin-left: 40rpx;
	 		}
	 
	 		&:after {
	 			content: ' ';
	 			width: 20rpx;
	 			height: 20rpx;
	 			border-top: solid 1px #030303;
	 			border-right: solid 1px #030303;
	 			transform: rotate(45deg);
	 			-ms-transform: rotate(45deg);
	 			/* IE 9 */
	 			-moz-transform: rotate(45deg);
	 			/* Firefox */
	 			-webkit-transform: rotate(45deg);
	 			/* Safari 和 Chrome */
	 			-o-transform: rotate(45deg);
	 			position: absolute;
	 			top: 85rpx;
	 			right: 0;
	 		}
	 	}
	 
	 	.ui-list {
	 		width: 100%;
	 		text-align: left;
	 		padding: 20rpx 0;
	 		border-bottom: solid 1px #f2f2f2;
	 		position: relative;
	 
	 		text {
	 			color: #4a4a4a;
	 			font-size: 28rpx;
	 			display: inline-block;
	 			vertical-align: middle;
	 			min-width: 150rpx;
	 		}
	 
	 		input {
	 			color: #030303;
	 			font-size: 30rpx;
	 			display: inline-block;
	 			vertical-align: middle;
	 		}
	 		button{
	 			color: #030303;
	 			font-size: 30rpx;
	 			display: inline-block;
	 			vertical-align: middle;
	 			background: none;
	 			margin: 0;
	 			padding: 0;
	 			&::after{
	 				display: none;
	 			}
	 		}
	 		picker {
	 			width: 90%;
	 			color: #030303;
	 			font-size: 30rpx;
	 			display: inline-block;
	 			vertical-align: middle;
	 			position: absolute;
	 			top: 30rpx;
	 			left: 150rpx;
	 		}
	 
	 		textarea {
	 			color: #030303;
	 			font-size: 30rpx;
	 			vertical-align: middle;
	 			height: 150rpx;
	 			width: 100%;
	 			margin-top: 50rpx;
	 		}
	 
	 		.place {
	 			color: #999999;
	 			font-size: 28rpx;
	 		}
	 	}
	 
	 	.right:after {
	 		content: ' ';
	 		width: 20rpx;
	 		height: 20rpx;
	 		border-top: solid 1px #030303;
	 		border-right: solid 1px #030303;
	 		transform: rotate(45deg);
	 		-ms-transform: rotate(45deg);
	 		/* IE 9 */
	 		-moz-transform: rotate(45deg);
	 		/* Firefox */
	 		-webkit-transform: rotate(45deg);
	 		/* Safari 和 Chrome */
	 		-o-transform: rotate(45deg);
	 		position: absolute;
	 		top: 40rpx;
	 		right: 0;
	 	}
	 
	 	.save {
	 		background: #030303;
	 		border: none;
	 		color: #ffffff;
	 		margin-top: 40rpx;
	 		font-size: 28rpx;
	 	}
	 	.headerImg{
	 		width: 100px;
	 		height: 100px;
	 	}
	 }
 </style>
