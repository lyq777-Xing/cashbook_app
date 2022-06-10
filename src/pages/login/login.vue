<template>
	<view class="content">
			<view class="avatarWrapper">
				<view class="avater">
					<image class="logo" src="../../static/Logo2.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="title">{{title}}</view> -->
			<view class="form">
				<!-- <uni-forms modelValue="formData" name="phone" ref="setPwdForm" :rules="rules"> -->
				<view class="inputWrapper">
					<input class="input" v-model="form.username" type="text" placeholder="请输入用户名">
				</view>
				<view class="inputWrapper">
					<input class="input" v-model="form.password" type="password" placeholder="请输入密码">
				</view>
				<view class="loginBtn">
					<text class="btnValue"  @tap='submit'>登录</text>
				</view>
				<view class="zhuceBtn">
					<text>注册</text>
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
					username:"",
					password:"",
				},
				//验证的规则
				rules:{
					username:{
						rule:/\S/,
						msg:"账号不能为空"
					},
					password:{
						rule:/^[0-9a-zA-Z]{1,16}$/,
						msg:"密码应该为1-16位"
					}
				}
			}
		},
		onLoad(){
			
		},
		methods:{
			//点击登录
			submit(){
				if(!this.validate('username')) return;
				if(!this.validate('password'))  return;
				uni.showLoading({
					title:"登录中..."
				});
				this.$http.request({
				  url:"users/oauth/token?client_id=c2&client_secret=secret&grant_type=password&username="+this.form.username+"&password="+this.form.password,
				  method: 'POST'
				})
				.then(res =>{
				  console.log(res);
				  if(res.statusCode === 400 || res.statusCode === 401){
					  uni.showToast({  
						  // icon可以加载内置图标 有效值 none loading success
						icpn: 'none',
						title: '用户名密码错误'  ,
						// image 则可以自定义图标 说实话 这个一般也不用改 除非 ui小姐姐给你做一个精美的
						image: '../../static/icon/error.png',
						duration: 5000
					  });  
				  }else if(res.statusCode===200){
					  uni.showLoading({
						  // icon可以加载内置图标 有效值 none loading success
						// icpn: 'none',
						title: '正在登录...'  ,
						// image 则可以自定义图标 说实话 这个一般也不用改 除非 ui小姐姐给你做一个精美的
						// image: '../../static/icon/error.png',
						// duration: 5000
					  });
					  this.$http.request({
					    url:"billlist/getdetail"
					  })
					  .then(res =>{
						  if(res.statusCode===200){
							  const det = JSON.parse(res.data.data)
							  console.log(det)
							  uni.setStorageSync('id',det.id)
						  }
					  })
					  uni.setStorageSync('token',"Bearer "+res.data.access_token)
					  uni.reLaunch({
					  			url: '../home/index',
					  			// animationType: 'pop-in',
					  			// animationDuration: 300
					  		})
				  }
				  // this.range = res.data.data
				  // console.log(res.data.data);
				  // console.log(this.range);
				})
				setTimeout(()=>{
					//隐藏登录状态
					uni.hideLoading();
					uni.navigateBack({
						delta:1
					})
				},200)
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
			}
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