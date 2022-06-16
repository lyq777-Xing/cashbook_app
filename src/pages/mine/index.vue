 <template>
   <view class="container">
	   <view class="top">
<!-- 		   <view class="shezhi">
			   <image class="shezhiImg" src="../../static/hm-sms-list-card/images/img_25832_0_0.png" mode=""></image>
		   </view> -->
		   <view class="imgtop">
			   <!-- 用户头像 -->
			   <image class="userImg" :src="url + data.userHeader" mode=""></image>
		   </view>
		   <!-- 昵称信息 -->
		   <view class="texttop">
			   <uni-row>
			   	<uni-col>
					<view class="texttopb"  style="display: flex;">
						<text class="texttopa">{{data.userName}}</text>
						<img class="icontwo" @click="goupd()" src="../../static/icon/upd.png" alt="">
					</view>
				</uni-col>
			   </uni-row>
		   </view>
	   </view>
<!-- 	   <view class="two">
		   <text class="texttwo">记账天数 356   |   记账笔数 567</text>
	   </view> -->
	   <view class="final">
		   <view class="daochuzhangdan"  @click="putreport()">
			   <text class="daochutext">导出账单 </text>
			   <text class="kuohao">></text>
		   </view>
		   <view class="daochuzhangdan" @click="tuxiaochao()">
			   <text class="daochutext" >用户反馈 </text>
			   <text class="kuohao">></text>
		   </view>
		   <view class="daochuzhangdan" @click="alipay()">
			   <text class="daochutext" >成为会员 </text>
			   <text class="kuohao">></text>
		   </view>
<!-- 		   <view class="daochuzhangdan">
			   <text class="daochutext">关于我们 </text>
			   <text class="kuohao">></text>
		   </view> -->
		   <!-- <mp-html id="payDiv" class="payDiv" :content="conent" /> -->
	   </view>
   </view>
 </template>

 <script>
	 // import mpHtml from '@/components/mp-html/mp-html'
	 // import mpHtml from "@/uni_modules/mp-html"
	 // import uParse from '@/components/gaoyia-parse/parse.vue'
 export default {
   data(){
	   return{
		   // conent:'<h1>aaa</h1>',
		   data:{
			   
		   },
		   url:"https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/",
	   }
   },
   // components: {
   //     mpHtml
   //   },
   created(){
	   this.getdata()
   },
   onPullDownRefresh() {
   	console.log("onPullDownRefresh");
   	this.getdata()
   	uni.stopPullDownRefresh();
   },
   methods:{
	   tuxiaochao(){
		   wx.openEmbeddedMiniProgram({
		     appId: "wx8abaf00ee8c3202e",
		     extraData :{
		       // 把1368数字换成你的产品ID，否则会跳到别的产品
		       id : "412580",
		       // 自定义参数，具体参考文档
		       customData : {
		           clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
		       }
		     }
		   })
	   },
	   goupd(){
		   console.log("upd...");
		   uni.redirectTo({
		   	url:'/pages/mine/upd/upd?id='+this.data.id
		   })
	   },
	   getdata(){
		   this.$http.request({
		     url:"bill/getdetail",
		   })
		   .then(res =>{
		   	console.log(res);
		   	if(res.data.meta.status === 200){
		   		console.log(res);
		   		this.data = JSON.parse(res.data.data)
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
	   alipay(){
		   uni.showModal({
		   	title:'提示',
		   	content: "小程序暂无该功能，请跳转至官网登录支付成为会员",
		   	// confirmText: "确定",
		   	// cancelText: "取消",
		   	 // success: function (res) {
		   		//   if (res.confirm) {
		   		// 	  console.log('用户点击确定');
		   		// 	  this.$http.request({
		   		// 	    url:"billlist/del?id="+this.data.id,
		   		// 	    // data:this.data,
		   		// 	    method:'DELETE'
		   		// 	  })
		   		// 	  .then(res =>{
		   		// 	    console.log(res);
		   		// 	    // this.range = res.data.data
		   		// 	    // console.log(res.data.data);
		   		// 	    // console.log(this.range);
		   		// 	  })
		   		//   } else if (res.cancel) {
		   		// 	  uni.showToast({
		   		// 	  	title: '已取消删除',
		   		// 	  	icon: 'success',
		   		// 	  	duration: 1000
		   		// 	  })
		   		// 	  console.log('用户点击取消');
		   		//   }
		   	 //  }
		   })
		   // function plusReady(){  
			  //  // 在这里调用plus api  
			  //  plus.runtime.openURL({
				 //   url:'http://120.48.85.254:8888/alipay/pay',
				 //   method:'POST',
				 //   data:{
					// 	 subject:'充值会员',
					// 	 total_amount:'9.99',
					// 	 body: uni.getStorageSync("id")
				 //   },
			  //  })
		   // }  
		   // if(window.plus){  
			  //  plusReady();  
		   // }else{  
			  //  document.addEventListener('plusready',plusReady,false);  
		   // }
		   
		   // uni.redirectTo({
		   // 	url:'/pages/mine/alipay/alipay'
		   // })
		  //  this.$http.request({
		  //    url:"alipay/pay",
		  //  		 data:{
		  //  			 subject:'充值会员',
		  //  			 total_amount:'9.99',
		  //  			 body: uni.getStorageSync("id")
		  //  		 },
				//  method:'POST'
		  //  })
		  //  .then(res =>{
		  //  	console.log(res);
		  //  	if(res.data.meta.status === 200){
		  //  		console.log(res);
				// // HTMLParamElement
				// this.conent=res.data.data
				// console.log(this.conent);
				//  this.$nextTick(()=>{
				// 	 // const doc = new HTMLParser(this.conent.toString().trim());
				// 	 // console.log(doc);
				// 	 // let form=doc.getElementsByClassName("punchout_form")[0]
				// 	 let form=document.getElementsByName("punchout_form")[0]
				// 	 form.submit()
				// 	 console.log(res);
				//  })
		  //  		// this.card = res.data.data
		  //  	}else{
		  //  		uni.showToast({
		  //  			icpn: 'none',
		  //  			title: '请退出重试'  ,
		  //  			image: '../../static/icon/error.png',
		  //  			duration: 5000
		  //  		});  
		  //  	}
		  //  })
		  
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
	   putreport(){
		   // this.$http.request({
		   //   url:"bill/getreportthree/1/200"
		   // })
		   // .then(res =>{
		   // 	console.log(res);
		   // 	if(res.data.meta.status === 200){
		   // 		console.log(res);
		   // 		// this.card = res.data.data
		   // 	}else{
		   // 		uni.showToast({
		   // 			icpn: 'none',
		   // 			title: '请退出重试'  ,
		   // 			image: '../../static/icon/error.png',
		   // 			duration: 5000
		   // 		});  
		   // 	}
		   // })
		   // wx.openLocation('bill/getreportthree/1/200')
		   // wx.request({
			  //  url:`http://120.48.85.254:8888/bill/getreportthree/1/200`,
			  //  method: "GET",
			  //  responseType: "arraybuffer",
			  //  header: {Authorization:uni.getStorageSync('token')},
			  //  success: rest => {
				 //   console.log(rest)
				 // if(rest.statusCode === 200){
				 //   const fs = wx.getFileSystemManager(); //获取全局唯一的文件管理器
				 //   fs.writeFile({ // 写文件
					//  filePath: wx.env.USER_DATA_PATH + `aaaa.xlsx`, // wx.env.USER_DATA_PATH 指定临时文件存入的路径，后面字符串自定义
					//  data: rest.data,
					//  encoding: "binary", //二进制流文件必须是 binary
					//  success (res){
					//    wx.openDocument({ // 新开页面打开文档
					// 	 filePath: wx.env.USER_DATA_PATH + `aaaa.xlsx`,  //拿上面存入的文件路径
					// 	 success: function (res) {
					// 	   setTimeout(()=>{wx.hideLoading()},500)
					// 	 }
					//    })
					//  }
				 //   });
				 // }
			  //  }
		   // })
		    // window.location.href  =  'http://120.48.85.254:8888/bill/getreportthree/1/200'
			// wx.downloadFile({
			// 	url:`http://120.48.85.254:8888/bill/getreportthree/1/200`,
			// 	method: "GET",
			// 	header: {Authorization:uni.getStorageSync('token')},
			// 	success (res) {
			// 	    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			// 	    if (res.statusCode === 200) {
			// 	      wx.playVoice({
			// 	        filePath: res.tempFilePath
			// 	      })
			// 	    }
			// 	  }
			// })
			uni.showModal({
				title:'提示',
				content: "小程序暂无该功能，请跳转至官网登录导出",
				// confirmText: "确定",
				// cancelText: "取消",
				 // success: function (res) {
					//   if (res.confirm) {
					// 	  console.log('用户点击确定');
					// 	  this.$http.request({
					// 	    url:"billlist/del?id="+this.data.id,
					// 	    // data:this.data,
					// 	    method:'DELETE'
					// 	  })
					// 	  .then(res =>{
					// 	    console.log(res);
					// 	    // this.range = res.data.data
					// 	    // console.log(res.data.data);
					// 	    // console.log(this.range);
					// 	  })
					//   } else if (res.cancel) {
					// 	  uni.showToast({
					// 	  	title: '已取消删除',
					// 	  	icon: 'success',
					// 	  	duration: 1000
					// 	  })
					// 	  console.log('用户点击取消');
					//   }
				 //  }
			})
	   }
   }
 }
 </script>

 <style lang="scss" scoped>
	 .shezhi{
		 width: 80vw;
		 height: 80px;
		 margin: 0 auto;
		 padding-top: 25px;
	 }
	 .shezhiImg{
		 width: 30px;
		 height: 30px;
		 float: right;
	 }
	 .imgtop{
		 padding-top: 25px;
		 width: 100px;
		 height: 125px;
		 margin: 0 auto;
		 // background-color: aquamarine;
	 }
	 // .image{
		//  width: 100px;
		//  height: 100px;
		//  display:block;
		//  margin: 0 auto;
		//  // background-color: aquamarine;
	 // }
	 .userImg{
		 display:block;
		 margin: 0 auto;
		 // background-color: black;
		 width: 100px;
		 height: 100px;
		 border-radius: 50px;
	 }
	 .texttop{
		 width: 100vw;
		 height: 20px;
		 text-align: center;
	 }
	 .texttopa{
		 line-height: 20px;
		 font-size: 15px;
		 margin: 0 auto;
	 }
	 .icontwo{
		 width: 20px;
		 // margin: 0 auto;
		 height: 20px;
	 }
	 .texttopb{
		 text-align: center;
		 width: 150px;
		 height: 20px;
		 margin: 0 auto;
	 }
	 .two{
		 width: 100vw;
		 height: 20px;
		 margin-top: 10px;
		 line-height: 20px;
		 text-align: center;
	 }
	 .texttwo{
		 font-size: 15px;
	 }
	 .daochuzhangdan{
		 margin: 25px auto;
		 width: 90vw;
		 height: 60px;
		 background-color: whitesmoke;
		 font-size: 15px;
		 line-height: 60px;
	 }
	 .daochutext{
		 float: left;
		 font-size: 15px;
	 }
	 .kuohao{
		 float: right;
		 font-size: 15px;
	 }
	 .container{
		 width: 100vw;
		 height: 100vh;
		 background-color: #FFFEF6;
	 }
	 
 </style>