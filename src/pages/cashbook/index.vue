 <template>
   <view class="container">
	   <!-- 账本页面 -->
	   <view class="addView">
		   <button class="addBtn" type="primary" size="mini" @tap="add">添加账本</button>
	   </view>
	   <view class="listView">
		   <uni-list>
		   	<!-- 水平排列，左图右文 -->
		   	<uni-list-item v-for="item in range" :key="item.id" class="uni-list-box" :data="range" >
		   			<view >
							<image class="uni-thumb" :src="noneImg"  mode="widthFix" v-if="item.billlistImg===''"></image>
		   					<image class="uni-thumb" :src="url + item.billlistImg" mode="aspectFill" v-else></image>
		   				</view>
		   				<!-- <br> -->
		   				<view class="">
		   					<view class="title">
		   						<text class="text">
		   								{{item.billlistName}}\n
		   						</text>
		   					</view>
		   					<!-- <br> -->
		   					<view class="title">
		   						<text class="jieyu">结余：{{item.jieyu}}\n</text>
		   					</view>
		   					<!-- <br> -->
		   					<view class="title">
		   						<text class="count">已经记录：{{item.count}}笔</text>
		   						<image src="../../static/icon/upd.png" mode="aspectFill" class="updImg" @tap="upd(item.id)"></image>
		   					</view>
		   				</view>
		   	</uni-list-item>
		   </uni-list>
	   </view>
   </view>
 </template>

 <script>
 export default {
	data(){
		return{
			range:[],
			url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
			noneImg:'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/b737bcfd-4faf-48dd-b8a9-bbae0cb706d2.gif',
		}
	},
	created(){
		 this.$http.request({
		   url:"billlist/getallb?userId="+uni.getStorageSync("id")
		 })
		 .then(res =>{
		   console.log(res);
		   this.range = res.data.data
		   console.log(res.data.data);
		   console.log(this.range);
		 })
	},
	onPullDownRefresh() {
		console.log("onPullDownRefresh");
		this.$http.request({
		  url:"billlist/getallb?userId="+uni.getStorageSync("id")
		})
		.then(res =>{
		  console.log(res);
		  this.range = res.data.data
		  console.log(res.data.data);
		  console.log(this.range);
		})
		uni.stopPullDownRefresh();
	},
	methods:{
		upd(id){
			uni.redirectTo({
				url:'/pages/cashbook/upd/upd?id='+id
			})
			console.log("upd..." + id);
		},
		add(){
			uni.redirectTo({
				url:'/pages/cashbook/add/add'
			})
			console.log("add..." );
		},
	}
 }
 </script>

 <style lang="scss">
 .container{
	 padding-top: 15px;
	 background-color: #FFFEF6;
	 // background-color: black;
	 width: 100vw;
	 height: 100vh;
 }
 .uni-list-box {
	 border: 2px #30899E solid;
	 border-radius: 5;
	 // background-color: #fff;
     flex-direction: row;
     justify-content: space-between; 
     // margin-top: 15px;
	 margin-left: 3vw;
	 margin-right: 3vw;
	 display: flex;
	 margin-bottom: 15px;
	 // justify-content: center;
	 // align-items: flex-end;
 }
 .uni-thumb {  
	 //紫色边框图片样式
     flex-shrink: 0;
     margin-right: 10px;
     width: 30vw;
     height:120px;
     border-radius: 5;
     overflow: hidden;   
     border: 2px #C1DDA4 solid;
     image {
         width: 120px;
         height: 120px;
     }
 }
 .title{
	 // display: flex;
	 // flex-wrap: wrap;
	 margin-left: 15px;
	 width: 64vw;
	 // text-align: left;
	 color: black;
	 line-height: 30px;
 }
 .title .text{
	 // line-height: 15px;
	 padding-top: 10px;
	 text-align: left;
	 font-size: 18px;
	 color: black;
	 // display: block;
 }
 .title .jieyu{
	 margin-top: 15px;
 	 // line-height: 20px;
 	 padding-top: 10px;
 	 text-align: left;
 	 font-size: 15px;
 	 color: palevioletred;
	 // display: block;
 }
 .title .count{
	 margin-top: 15px;
 	 // line-height: 15px;
 	 padding-top: 10px;
 	 text-align: left;
 	 font-size: 15px;
 	 color: black;
	 // display: block;
 }
 .updImg{
	 // float: right;
	 width: 20px;
	 height: 20px;
	 
 }
 .addBtn{
	 float: right;
	 margin-right: 15px;
 }
 .addView{
	 width: 100vm;
	 height: 40px;
 }
 // .title .btnValue{
	//  line-height: 25px;
	//  // padding-top: 10px;
	//  text-align: right;
	//  font-size: 15px;
	//  color: black;
 // }
 </style>