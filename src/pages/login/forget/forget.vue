<template>
	<view class="content">
		<!-- 是登录页面 -->
			<view class="avatarWrapper">
				<view class="avater">
					<image class="logo" src="https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/logo2.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="title">{{title}}</view> -->
			<view class="form">
				<!-- <uni-forms modelValue="formData" name="phone" ref="setPwdForm" :rules="rules"> -->
				<view class="inputWrapper">
					<input class="input" v-model="form.phone" type="text" placeholder="请输入绑定手机号">
				</view>
				<view class="inputWrapper">
					<input class="input" v-model="form.code" type="text" placeholder="请输入验证码">
				</view>
				<view class="">
					<button size="mini" :disabled="btnDis" @click="sendcode()" class="getInfo bun">{{btnText}}</button>
				</view>
				<view class="inputWrapper">
					<oneclick @success='captchaSuccess' @hide='captchaHide' :oneclickReload='captchaReload' :captchaShow='captchaShow' :options='options'></oneclick>
				</view>
				<view class="loginBtn">
					<text @tap='submit()'>重置密码</text>
				</view>
				<!-- </uni-forms> -->
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:"蓝鲸记账",
				//用户输入的内容
				form:{
					phone:"",
					code:"",
				},
				//验证的规则
				rules:{
					phone:{
						rule:/^[1][3,4,5,7,8][0-9]{9}$/,
						msg:"请输入正确的手机号"
					},
					code:{
						rule:/\S/,
						// rule:/^[0-9a-zA-Z]{1,16}$/,
						msg:"请输入验证码"
					}
				},
				options: {
					appId: '40ba323954dfade3e33c299a192faa40', //控制台应用管理页面进行获取
					style: 'oneclick'
				},
				captchaShow: false,
				captchaReload: false,
				flag:false,
				btnDis: false,// 发送验证码按钮不禁用
				btnText: "发送验证码",// 提示
			}
		},
		onLoad(){
			
		},
		methods:{
			
			 // 验证码成功回调
			  captchaSuccess: function (data) {
			    console.log('验证码成功回调token:', data)  //获取验证码token，用于后端验证码校验
				this.flag = true
				console.log(this.flag);
			  },
			
			  // 验证码关闭回调
			  captchaHide: function () {
			    console.log('captcha_hide')
			       // this.setData({
			         captchaShow: false
			    // })
			  },
			//点击登录
			submit(){
				// captchaReload用来重置验证码
				// this.setData({
				  captchaReload: true
				// })
				if(!this.validate('phone')) return;
				if(!this.validate('code'))  return;
				console.log(this.flag);
				if(!this.flag){
					uni.showToast({
						title:"请先验证"
					});
					return;
				}
				uni.showToast({
					title:"重置中..."
				});
				this.$http.request({
				  url:"user/updpwd?phone="  + this.form.phone +"&cat="+this.form.code,
				  method:'POST'
				})
				.then(res =>{
				  console.log(res);
				  if(res.data.meta.status===200){
					  uni.showToast({
						title: '重置成功...'  ,
					  });
				  }
				});
			},
			//判断验证是否符合要求
			validate(key){
				let bool=true;
				if(!this.rules[key].rule.test(this.form[key])){
					//提示信息
					uni.showToast({
						title:this.rules[key].msg,
					})
					//取反
					bool=false;
					return false;
				}
				return bool;
			},
			sendcode(){
				// this.$http.request({
				//   url:"sendmsg/smscodeforgetpwd?phone=" + this.form.phone,
				// })
				// .then(res =>{
				//   console.log(res);
				//   if(res.data.meta.status === 200){
				// 	  uni.showToast({
				// 	  	title:"发送成功",
				// 		icon:'success'
				// 	  })
				//   }else{
				// 	  uni.showToast({
				// 	  	title:"发送失败",
				// 		icon:'error'
				// 	  })
				//   }
				// })
				let that = this;
				if (that.isPoneAvailable(that.form.phone)) {
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// 发送短信验证码
				that.$http.request({
					  url:"sendmsg/smscodeforgetpwd?phone=" + that.form.phone,
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						// this.data = JSON.parse(res.data.data)
						console.log(that.data);
						// uni.redirectTo({
						// 	url:'/pages/mine/index'
						// })
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							image: '../../static/icon/error.png',
							duration: 5000
						});  
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
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
		}
			
	}
</script>

<style>
	.content{
		/* text-align: center; */
		/* height: 400upx; */
		background-color: #FFFEF6;
		width: 100vw;
		height: 100vh;
	}
	.avatarWrapper{
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avater{
		width: 300upx;
		height: 300upx;
		overflow: hidden;
	}
	.avater .logo{
		width: 100%;
	}
/* 	.title{
		text-align: center;
		font-size: 36upx;
		color: #8f8f94;
	} */
	.form{
		padding: 0 100upx;
		margin-top: 80px;
	}
	.inputWrapper{
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}
	.loginBtn{
		width: 100%;
		height: 80upx;
		background: #77B3D7;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loginBtn .btnValue{
		color: white;
	}
	.zhuceBtn{
		text-align: center;
		color: #12498C;
		font-style: 15px;
		margin-top: 20px;
	}
</style>