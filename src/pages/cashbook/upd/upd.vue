<template>
	<view>
		<!-- 更新账本 -->
		<view class="title">
			<text class="listName">账本名称：\n</text>
			<text>\n</text>
			<input class="billlistName" v-model="data.billlistName"></input>
			<text>\n</text>
			<text class="listName">设置账本封面:</text>
			<!-- <image class="listImg" :src="url + data.billlistImg" mode=""></image> -->
			<view class="uploadImg">
				<!-- <page-head :title="title"></page-head> -->
				<view class="uni-padding-wrap uni-common-mt">
					<view class="demo">
						<block>
							<image :src="noneImg" class="image" mode="widthFix" v-if="imageSrc===''"></image>
							<image :src="imageSrc" class="image" mode="widthFix" v-else></image>
						</block>
						<block>
							<view class="uni-hello-addfile" @click="chooseImage">点击更换图片</view>
						</block>
					</view>
				</view>
			</view>
			<text>\n</text>
<!-- 			<uni-file-picker 
				v-model="imageValue"  
				file-mediatype="image"
				mode="grid"
				file-extname="png,jpg"
				:limit="1"
				@progress="progress" 
				@success="success" 
				@fail="fail" 
				@select="select"
			/> -->
			
			<!-- <uni-file-picker limit="1" title="最多选择1张图片"></uni-file-picker> -->
			
<!-- 			<uni-file-picker 
				v-model="value" file-mediatype="all">
				<button>选择文件</button>
			</uni-file-picker> -->
			
			<text class="listName">收支信息\n</text>
			<text>\n</text>
			<uni-row class="demo-uni-row">
				<uni-col>
					<view class="demo-uni-col" style="display: flex;">
						<image style="width: 30px; height: 30px;" src="../../../static/icon/8.png"></image>
						<text class="">总支出：{{data.zhichu}}\n</text>
						<text>\n</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row class="demo-uni-row">
				<uni-col>
					<view class="demo-uni-col" style="display: flex;">
						<image style="width: 30px; height: 30px;" src="../../../static/icon/9.png"></image>
						<text class="">总收入：{{data.shouru}}\n</text>
						<text>\n</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row class="demo-uni-row">
				<uni-col>
					<view class="demo-uni-col" style="display: flex;">
						<image style="width: 30px; height: 30px;" src="../../../static/icon/10.png"></image>
						<text class="">总结余：{{data.jieyu}}</text>
					</view>
				</uni-col>
			</uni-row>
			<!-- <image style="width: 30px; height: 30px;" src="../../../static/icon/8.png"></image> -->
<!-- 			<text class="billlistName">总支出：{{data.zhichu}}\n</text>
			<text>\n</text>
			<text class="billlistName">总收入：{{data.shouru}}\n</text>
			<text>\n</text>
			<text class="billlistName">总结余：{{data.jieyu}}</text> -->
		</view>
		<view class=" updBtn uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
			<text class="btnValue"  @tap='upd'>确认修改</text>
		</view>
		
		<view class=" delBtn uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
			<text class="btnValue"  @tap='del'>删除该账本</text>
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
					count:'',
					id:0,
					jieyu:0,
					shouru:0,
					userId:0,
					zhichu:0
				},
				listId:0,
				url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
				// imageStyles:{
				// 	width:64,
				// 	height:64,
				// 	border:{
				// 		color:"#ff5a5f",
				// 		width:2,
				// 		style:'dashed',
				// 		radius:'2px'
				// 	}
				// },
				imageSrc: '',
				noneImg:'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif',
				// value:[
				// 	{
				// 		"name":"file.txt",
				// 		"extname":"txt",
				// 		"url":"https://xxxx",
				// 		// ...
				// 	}
				// ]
			};
		},
		onUnload() {
			this.imageSrc = '';
		},
		created() {
		},
		methods:{
			onLoad:function(option){
				this.listId=option.id
				console.log(option.id);
				console.log(this.listId);
				this.getData(option.id)
			},
			getData(id){
				this.$http.request({
				  url:"billlist/findById?id="+id
				})
				.then(res =>{
				  console.log(res);
				  this.data = res.data.data
				  this.imageSrc= "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/" + res.data.data.billlistImg
				  console.log(res.data.data);
				  console.log(this.data);
				})
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
			// async beforeUpload(index, list) {
			//     uni.uploadFile({
			//         url: 'http://120.48.85.254:8888/upload/upload',
			// 		filePath: list[0].url,
			// 		name: 'imgFile', //后台接收字段名
			// 	   // formData:{formData},
			// 		header: {
			// 		   // "Content-Type": "multipart/form-data",
			// 		   "Authorization":uni.getStorageSync('token')
			// 			// ...this.uploadHeaders
			// 		},
			// 		success: (res) => {
			// 			console.log('请求成功_______________', res)
			// 		},
			// 		fail: (err) => {
			// 			console.log('请求error_______________', err)
			// 		}
			// 	})
			 
			// }
			upd(){
				this.$http.request({
				  url:"billlist/upd",
				  data:this.data,
				  method:'POST'
				})
				.then(res =>{
				  console.log(res);
				  if(res.data.meta.status === 200){
					  uni.showToast({
					  	title:"更新成功",
						icon:'success'
					  })
					  uni.redirectTo({
					  	url:'/pages/cashbook/index'
					  })
				  }
				  // this.range = res.data.data
				  // console.log(res.data.data);
				  // console.log(this.range);
				})
			},
			del: function (e) {
				uni.showModal({
					title:'提示',
					content: "若删除该账本，其有关账单信息也将永久被删除，请问是否确定删除？",
					// confirmText: "确定",
					// cancelText: "取消",
					 success: function (res) {
						  if (res.confirm) {
							  console.log('用户点击确定');
							  this.$http.request({
							    url:"billlist/del?id="+this.data.id,
							    // data:this.data,
							    method:'DELETE'
							  })
							  .then(res =>{
							    console.log(res);
							    // this.range = res.data.data
							    // console.log(res.data.data);
							    // console.log(this.range);
							  })
						  } else if (res.cancel) {
							  uni.showToast({
							  	title: '已取消删除',
							  	icon: 'success',
							  	duration: 1000
							  })
							  console.log('用户点击取消');
						  }
					  }
				})
			}
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
</style>
