<template>
   <view class="container">
	   <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<!-- <view class="title">
			   <text class="text">统计报表</text>
			</view> -->
			<view class="chartsOne">
				<text class="chartsText">本月支出统计表</text>
				<canvas canvas-id="uchatsdemo2" id="uchatsdemo2" type="2d" class="charts" @touchend="tap"/>
			</view>
			
			<view class="textView">
				<text class="chartsText" @click="goCashReport()">查看支出占比概况</text>
			</view>
			 <!-- <view>
			    <canvas canvas-id="pXvnDwlcmgKzjRmYFDGGWVOcfyDABFfX" id="pXvnDwlcmgKzjRmYFDGGWVOcfyDABFfX" class="charts2" @touchend="tap"/>
			  </view> -->
		</scroll-view>
		<view @tap="goTop" class="uni-link uni-center uni-common-mt lastView">
			点击这里返回顶部
		</view>
   </view>
 </template>

 <script>
 import uCharts from '@qiun/ucharts';
 var uChartsInstance = {};
 export default {
   data() {
		return {
			 cWidth: 650,
			 cHeight: 500,
			 pixelRatio: 2,
			 scrollTop:0,
			 old: {
				scrollTop: 0
			 },
			 data:{},
			 Yox:[],
			 Xoy:[],
	   };
	},
	created(){
		this.getDate()
	},
	 onReady() {
		   //这里的 750 对应 css .charts 的 width
		   this.cWidth = uni.upx2px(650);
		   //这里的 500 对应 css .charts 的 height
		   this.cHeight = uni.upx2px(500);
		   this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
		   this.getServerData();
	 },
	 methods: {
			 goCashReport(){
				 // uni.reLaunch({
					// url: '/page/report/cash/cash',
					// // animationType: 'pop-in',
					// // animationDuration: 300
				 // })'
				 uni.redirectTo({
				 	url:'/pages/report/cash/cash'
				 })
			 },
			getDate(){
				this.$http.request({
				  url:"bill/getreportone?userId="+ uni.getStorageSync("id")
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						this.data = res.data.data
						console.log(this.data.y);
						for (var i = 0; i < this.data.y.length; i++) {
							this.Yox[i] =  this.data.y[i]
						}
						for (var i = 0; i < this.data.x.length; i++) {
							this.Xoy[i] =  this.data.x[i]
						}
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							image: '../../static/icon/error.png',
							duration: 5000
						});  
					}
				})
			},
			getServerData() {
			 //模拟从服务器获取数据时的延时
			 setTimeout(() => {
			   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			   let res = {
				   categories: this.Xoy,
				   series: [
					 {
					   name: "当日支出",
					   data: this.Yox
					 }
				   ]
				 };
			   this.drawCharts('uchatsdemo2', res);
			 }, 500);
		   },
			drawCharts(id,data){
			 const query = uni.createSelectorQuery().in(this);
			 query.select('#' + id).fields({ node: true, size: true }).exec(res => {
			   if (res[0]) {
				 const canvas = res[0].node;
				 const ctx = canvas.getContext('2d');
				 canvas.width = res[0].width * this.pixelRatio;
				 canvas.height = res[0].height * this.pixelRatio;
				 uChartsInstance[id] = new uCharts({
				   type: "line",
				   dataLabel:false,
				   context: ctx,
				   width: this.cWidth * this.pixelRatio,
				   height: this.cHeight * this.pixelRatio,
				   categories: data.categories,
				   series: data.series,
				   pixelRatio: this.pixelRatio,
				   animation: true,
				   background: "#aaaaff",
				   color: ["#73C0DE","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				   padding: [15,10,0,15],
				   legend: {},
				   xAxis: {
					 disableGrid: true,
					 labelCount: 4
				   },
				   yAxis: {
					 gridType: "dash",
					 dashLength: 1
				   },
				   extra: {
					 line: {
					   type: "straight",
					   width: 1
					 }
				   }
				 });
			   }else{
				 console.error("[uCharts]: 未获取到 context");
			   }
			 });
		   },
			tap(e){
			 uChartsInstance[e.target.id].touchLegend(e);
			 uChartsInstance[e.target.id].showToolTip(e);
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
	 }
 };
 </script>

 <style lang="scss" scoped>
	 .lastView{
	 	width: 100vw;
	 	height: 50upx;
	 	line-height: 80upx;
	 	text-align: center;
	 }
	 .scroll-Y {
	 	background-color: #FFFEF6;
	 	height: 100vh;
	 }
	 .container{
		 width: 100vw;
		 height: 100vh;
	 }
	.charts{
		 width: 100vw;
		 height: 500rpx;
	}
	.chartsOne{
		margin-top: 25px;
		width: 100vw;
		height: 550rpx;
		text-align: center;
		font-size: 50rpx;
		line-height: 50rpx;
	}
	.title{
	   width: 100%;
	   height: 20px;
	   text-align: center;
	   margin-bottom: 15px;
	   margin-top: 25px;
	}
	.text{
		font-size: 15px;
		color: #73C0DE;
	}
	.chartsText{
		font-size: 15px;
		color: #73C0DE;
	}
	.textView{
		width: 100vw;
		text-align: center;
		line-height: 35px;
	}
 </style>