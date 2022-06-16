<template>
	<view class="container">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="uni-padding-wrap uni-common-mt">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>备注</text>
						</view>
						<input class="uni-input" v-model="data.billName" name="billName" placeholder="请输入备注" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>消费时间</text>
						</view>
						<view class="picker">
							<uni-datetime-picker class="uni-input" type="date" :clear-icon="false" v-model="data.billDate" @change="dateChange()" @maskClick="maskClick" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>消费方式</text>
						</view>
						<view class="dropWrap">
							<dropdown class="drop" :list="list" :current="value"  @onClick="change()" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>消费金额</text>
						</view>
						<input class="uni-input" v-model="data.billPrice" name="billPrice" placeholder="请输入金额" @click="openfun()"/>
						<wly-keyboard ref="keyboard" v-model="price" :pnum="pnum" @getnum_="getnum" @ongetnum_="ongetnum" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>选择收支</text>
						</view>
						<view class="">
							<dropdown class="drop" :list="descList" :current="descListValue" @onClick="descListChange()" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>账单名称</text>
						</view>
						<view class="">
							<dropdown class="drop" :list="billList" :current="billListValue" @onClick="billListChange()" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>所属分类</text>
						</view>
						<view class="dropWrap">
							<dropdown class="drop" :list="catNameList" :current="catNameListValue"  @onClick="catNameListChange()" />
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">
							<text>记录照片</text>
						</view>
						<view class="updImg">
							<view class="uploadImg">
								<!-- <page-head :title="title"></page-head> -->
								<view class="uni-padding-wrap uni-common-mt">
									<view class="demo">
										<block>
											<image :src="imageSrc" class="image" mode="widthFix" ></image>
											<!-- <image :src="noneImg" class="image" mode="widthFix" v-else></image> -->
										</block>
										<block>
											<view class="uni-hello-addfile" style="text-align: center;" @click="chooseImage">点击更换图片</view>
										</block>
									</view>
								</view>
							</view>
						</view>
						<!-- <input class="uni-input" v-model="data.billImg" placeholder="请输入备注" /> -->
					</view>
					<view class="uni-btn-v">
						<button class="sub" form-type="submit">确认修改</button>
						<button class="res" type="default" @tap="del">删除该账单</button>
					</view>
				</form>
			</view>
		</scroll-view>
		<view @tap="goTop" class="uni-link uni-center uni-common-mt lastView">
			点击这里返回顶部
		</view>
	</view>
</template>

<script>
	import {uniDatetimePicker} from '@dcloudio/uni-ui'
	import dropdown from '../../../components/dt-dropdown/dt-dropdown.vue'
	import graceChecker from "../../../common/graceChecker.js"
	export default {
		components:{
			uniDatetimePicker,
			dropdown
		},
		onPullDownRefresh() {
			this.$http.request({
			  url:"billlist/getall?userId="+uni.getStorageSync("id")
			})
			.then(res =>{
				console.log(res);
				if(res.data.meta.status === 200){
					this.range = res.data.data
					console.log(res.data.data);
					for (var i = 0; i < this.range.length; i++) {
						console.log(this.range[i]);
						this.arr = this.range[i]
						this.billList[i] = this.arr.text
						if(this.data.billlistName === this.arr.text){
							this.billListValue = i
						}
					}
				}else{
					uni.showToast({
						// icon可以加载内置图标 有效值 none loading success
						icpn: 'none',
						title: '请退出重试'  ,
						// image 则可以自定义图标 说实话 这个一般也不用改 除非 ui小姐姐给你做一个精美的
						image: '../../static/icon/error.png',
						duration: 5000
					});  
				}
			})
			
			this.$http.request({
			  url:"cat/getall"
			})
			.then(res =>{
				console.log(res);
				if(res.data.meta.status === 200){
					console.log(res);
					this.catList = res.data.data
					for (var i = 0; i < this.catList.length; i++) {
						this.catNameList[i] = this.catList[i].catName
						if(this.data.catName === this.catList[i].catName){
							this.catNameListValue = i
						}
					}
					console.log(this.catList);
					console.log(this.catNameList);
					console.log(this.catNameListValue);
					// this.ress = this.data
				}else{
					uni.showToast({
						icpn: 'none',
						title: '请重试'  ,
						image: '/static/icon/error.png',
						duration: 5000
					});  
				}
			})
			uni.stopPullDownRefresh();
		},
		created(){
			this.$http.request({
			  url:"billlist/getall?userId="+uni.getStorageSync("id")
			})
			.then(res =>{
				console.log(res);
				if(res.data.meta.status === 200){
					this.range = res.data.data
					console.log(res.data.data);
					for (var i = 0; i < this.range.length; i++) {
						console.log(this.range[i]);
						this.arr = this.range[i]
						this.billList[i] = this.arr.text
						if(this.data.billlistName === this.arr.text){
							this.billListValue = i
						}
					}
				}else{
					uni.showToast({
						// icon可以加载内置图标 有效值 none loading success
						icpn: 'none',
						title: '请退出重试'  ,
						// image 则可以自定义图标 说实话 这个一般也不用改 除非 ui小姐姐给你做一个精美的
						image: '../../static/icon/error.png',
						duration: 5000
					});  
				}
			})
			
			this.$http.request({
			  url:"cat/getall"
			})
			.then(res =>{
				console.log(res);
				if(res.data.meta.status === 200){
					console.log(res);
					this.catList = res.data.data
					for (var i = 0; i < this.catList.length; i++) {
						this.catNameList[i] = this.catList[i].catName
						if(this.data.catName === this.catList[i].catName){
							this.catNameListValue = i
						}
					}
					console.log(this.catList);
					console.log(this.catNameList);
					console.log(this.catNameListValue);
					// this.ress = this.data
				}else{
					uni.showToast({
						icpn: 'none',
						title: '请重试'  ,
						image: '/static/icon/error.png',
						duration: 5000
					});  
				}
			})
		},
		data() {
			return {
				id:0,
				data:{},
				// ress:{},
				value:0,
				// datatime:'',
				list:["","支付宝","微信","其他"],
				billList:[],
				billListValue:0,
				arr:{},
				 /** 组件常用参数说明
				  * ongetnum_ -> 绑定方法 数字变化
				  * getnum_   -> 绑定方法 点击确认
				  */ 
				 props: {
					 leng: { //输入长度
						 type: [String, Number],
						 default:'6'
					 },
					 pass:{ // 是否开启密码模式
						 type: Boolean,
						 default:false
					 },
					 pnum: { //初始化数量
						 type: [String, Number],
						 default: '0'
					 },
		 
					 decimal:{ // 保存几位小数
						 type: [String, Number],
						 default:2
					 },
				 },
				 price:'0',
				 catNameList:[],
				 catList:[],
				 catNameListValue:0,
				 descList:["支出","收入"],
				 descListValue:0,
				 scrollTop:0,
				 old: {
					scrollTop: 0
				 },
				 url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
				 imageSrc: '',
				 noneImg:'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif'
			}
		},
		onLoad:function(option){
			this.imageSrc = '';
			this.id=option.id
			console.log(this.id);
			this.$http.request({
			  url:"bill/getById?id="+this.id
			})
			.then(res =>{
				console.log(res);
				if(res.data.meta.status === 200){
					console.log(res);
					this.data = res.data.data
					this.getValue()
					if(this.data.billImg === "" || this.data.billImg === null){
						this.imageSrc = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif"
					}
					else{
						this.imageSrc = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/" + this.data.billImg;
					}
					// this.ress = this.data
				}else{
					uni.showToast({
						icpn: 'none',
						title: '请重试'  ,
						image: '/static/icon/error.png',
						duration: 5000
					});  
				}
			})
		},
		methods:{
			getValue(){
				// this.data.billDescribe
				for (var i = 0; i < this.descList.length; i++) {
					console.log("this.descList[i]..." + this.descList[i]);
					console.log("this.data.billDescribe..." + this.data.billDescribe);
					if(this.descList[i] === this.data.billDescribe){
						this.descListValue = i
						console.log("descListValue..." + this.descListValue);
					}
				}
				
				for (var i = 0; i < this.billList.length; i++) {
					if(this.billList[i] === this.data.billlistName){
						this.billListValue = i
						console.log(this.billListValue);
					}
				}
				
				for (var i = 0; i < this.list.length; i++) {
					if(this.list[i] === this.data.billMode){
						this.value = i
						console.log("paymode..." + this.value);
					}
				}
			},
			descListChange(e){
				console.log("e:", e);
				this.descListValue = e
				this.data.billDescribe = this.descList[e]
				console.log(this.data.billDescribe);
			},
			catNameListChange(e){
				console.log("e:", e);
				this.catNameListValue = e
				this.data.catName = this.catNameList[e]
				console.log(this.data.catName);
			},
			change(e) {
			    console.log("e:", e);
				this.value = e
				this.data.billMode = this.list[e]
				console.log(this.data.billMode);
			},
			dateChange(e){
				console.log("e:", e);
				console.log("dateChange...");
			},
			maskClick(e){
				console.log("click...");
				console.log('maskClick事件:', e);
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(this.data);
			    //定义表单规则
			    var rule = [
			        // {name:"billName", checkType : "string", checkRule:"1,15",  errorMsg:"应为1-3个字符"},
					{name:"billName", checkType : "notnull", checkRule:"",  errorMsg:"请输入账单名称"},
			        // {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
			        // {name:"billDate", checkType : "notnull", checkRule:"",  errorMsg:"请选择支出/收入时间"},
					// {name:"catName", checkType : "notnull", checkRule:"",  errorMsg:"请选择所属分类"},
					// {name:"billlistName", checkType : "notnull", checkRule:"",  errorMsg:"请选择账单名称"},
					{name:"billPrice", checkType : "notnull", checkRule:"",  errorMsg:"请输入支出/收入金额"}
			    ];
			    //进行表单检查
			    var formData = e.detail.value;
			    var checkRes = graceChecker.check(formData, rule);
			    if(checkRes){
			        uni.showToast({title:"验证通过!", icon:"none"});
					// upd
					this.$http.request({
					  url:"bill/upd",
					  data:this.data,
					  method:'PUT'
					})
					.then(res =>{
					  console.log(res);
					  if(res.data.meta.status === 200){
						  uni.showToast({ title:"更新成功", icon: "none" });
						  // uni.reLaunch({
								// url: '../../index',
						  // })
						  uni.redirectTo({
						  	url:'/pages/home/index'
						  })
					  }else{
						  uni.showToast({ title:"更新失败", icon: "none" });
					  }
					})
			    }else{
			        uni.showToast({ title:graceChecker.error, icon: "none" });
			    }
			},
			del: function (e) {
				let that = this
				uni.showModal({
					title:'提示',
					content: "将永久删除该账单，请问是否确定删除？",
					// confirmText: "确定",
					// cancelText: "取消",
					 success: function (res) {
						  if (res.confirm) {
							  console.log('用户点击确定');
							  that.$http.request({
							    url:"bill/del?id="+that.data.id,
							    // data:this.data,
							    method:'DELETE'
							  })
							  .then(res =>{
							    console.log(res);
								if(res.data.meta.status === 200){
									uni.showToast({
										title: '删除成功',
										icon: 'success',
										duration: 1000
									})
									uni.redirectTo({
										url:'/pages/home/index'
									})
								}else{
									uni.showToast({
										title: '删除失败',
										icon: 'error',
										duration: 1000
									})
								}
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
			},
			billListChange(e){
				console.log("e:", e);
				this.billListValue = e
				this.data.billlistName = e
				console.log("change..." + e);
			},
			/** 
			 * pnum:初始化值
			 */
			//打开弹窗
			openfun() {
				this.price = this.data.billPrice
				this.$refs.keyboard.openfun()
			},
			// 关闭弹窗
			closefun() {
				this.$refs.keyboard.closefun()
			},
			//点击确定获取返回值
			getnum(e) {
				console.log(e);
				this.closefun()
				this.price = e
				console.log(this.price);
				if(this.price === "null" || this.price === ""){
					this.data.billPrice = 0
				}else{
					this.data.billPrice = this.price
				}
			},
			//数字变化时
			ongetnum(e) {
				console.log("unmberChange..." + e);
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				console.log("before this.scrollTop..." + this.scrollTop);
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "已返回顶部"
					// title: "纵向滚动 scrollTop 值已被修改为 0"
				})
				console.log("after this.scrollTop..." + this.scrollTop);
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
								console.log(dataa);
								this.data.billImg = dataa.data
								console.log(this.data.billImg);
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
		}
	}
</script>

<style lang="scss">
	.lastView{
		width: 100vw;
		height: 50upx;
		line-height: 80upx;
		text-align: center;
	}
	.uni-form-item .title {
		padding: 20rpx 0;
	}
	.dropWrap .text.data-v-30fce8e2 {
		width: 78vw !important;
	}
	// .container{
	// 	width: 100vw;
	// 	height: 100vh;
	// 	background-color: #FFFEF6;
	// 	// background-color: aliceblue;
	// 	// background-color: blue;
	// }
	.scroll-Y {
		background-color: #FFFEF6;
		height: 100vh;
	}
	.uni-input{
		width: 80vw;
		margin: 0 auto;
		height: 80upx;
		border-radius: 20px;
		text-align: center;
		background-color: white;
	}
	.title{
		width: 70vw;
		margin: 0 auto;
		text-align: left;
	}
	.top{
		// margin-top: 15px;
		width: 100vw;
		height: 50upx;
		text-align: center;
	}
	.toptext{
		color: black;
		line-height: 30px;
		font-size: 20px;
		// margin-top: 15px;
	}
	.uni-btn-v{
		// margin-top: 25px;
		width: 50vw;
		margin: 25px auto;
	}
	.sub{
		margin: 0 auto;
	}
	.res{
		margin: 25px auto;
	}
	.picker{
		width: 80vw;
		margin: 0 auto;
		border-radius: 20px;
	}
	.dropWrap{
		width: 80vw;
		margin: 0 auto;
	}
	.drop{
		// margin-left: 0px;
		// left: 0px;
		width: 200px;
	}
	.dropWrap.data-v-30fce8e2 {
		width: 80vw !important;
		border-radius: 20px;
		text-align: center !important;
		height: 80upx !important;
	}
	.dropdown .ul.data-v-30fce8e2{
		width: 80vw !important;
	}
	.mode .key .key-num {
		float: left;
	}
	.mode .key .btn {
		float: right;
	}
	.mode .key {
	    height: 500rpx;
	}
	.updImg{
		width: 80vw;
		// height: 80vh;
		margin: 15px auto;
	}
	// .uni-padding-wrap{
	// 	height: ;
	// }
	
</style>
