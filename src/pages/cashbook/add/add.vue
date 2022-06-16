<template>
	<view class="container">
		<!-- 添加账本 -->
		<view class="title">
			<text class="listName">账本名称：\n</text>
			<view class="uni-form-item uni-column">
				<input class="uni-input" v-model="data.billlistName" placeholder="请输入账本名称"></input>
			</view>
			<text>\n</text>
			<text class="listName">设置账本封面:</text>
			<view class="uploadImg">
				<view class="uni-padding-wrap uni-common-mt">
					<view class="demo">
						<block>
							<image :src="noneImg" class="image" mode="widthFix" v-if="imageSrc===''"></image>
							<image :src="imageSrc" class="image" mode="widthFix" v-else></image>
						</block>
						<block>
							<view class="uni-hello-addfile" @click="chooseImage">点击添加图片</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class=" updBtn uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
			<text class="btnValue"  @tap='add'>确认添加</text>
		</view>
	</view>
</template>

<script>
	import {uniFilePicker} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				data:{
					billlistImg:'',
					billlistName:'',
					userId:uni.getStorageSync("id")
				},
				listId:0,
				url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
				imageSrc: '',
				noneImg:'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif',
			};
		},
		onUnload() {
			this.imageSrc = '';
		},
		created() {
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh");
			uni.stopPullDownRefresh();
		},
		methods:{
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
								this.imageSrc = imageSrc
								const dataa = JSON.parse(res.data)
								this.data.billlistImg = dataa.data
								console.log(this.data.billlistImg);
								console.log(this.imageSrc);
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
			add(){
				this.$http.request({
				  url:"billlist/add",
				  data:this.data,
				  method:'POST'
				})
				.then(res =>{
				  console.log(res);
				  if(res.data.meta.status === 200){
					  console.log(res);
					  uni.showToast({
					  	title:"添加成功",
						icon:'success'
					  })
					  uni.redirectTo({
					  	url:'/pages/cashbook/index'
					  })
				  }
				})
			},
		}
	}
</script>

<style lang="scss">
// .listImg{
// 	width: 200px;
// 	height: 200px;
// }
.image{
	width: 200px;
	height: 200px;
}
.listName{
	color: black;
	font-size: 20px;
	line-height: 20px;
}
.uploadImg{
	margin: 0 auto;
}
.title{
	margin-left: 15px;
	margin-top: 15px;
}
.billlistName{
	margin-left: 25px;
	font-size: 16px;
	color: black;
}

.demo-uni-col{
	margin-left: 25px;
	font-size: 16px;
	color: black;
}
.uni-hello-addfile{
	margin-left: 25px;
}

.uni-input{
	width: 80vw;
	margin: 0 auto;
	height: 80upx;
	border-radius: 20px;
	text-align: center;
	background-color: white;
}

.updBtn{
	width: 50%;
	height: 80upx;
	background: #77B3D7;
	border-radius: 50upx;
	// margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 50px auto;
}
.updBtn .btnValue{
	color: white;
}

.delBtn{
	width: 50%;
	height: 80upx;
	background: #FC6B6B;
	border-radius: 50upx;
	// margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 50px auto;
}
.delBtn .btnValue{
	color: white;
}

 .container{
	 padding-top: 15px;
	 background-color: #FFFEF6;
	 // background-color: black;
	 width: 100vw;
	 height: 100vh;
 }
</style>
