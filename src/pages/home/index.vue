 <template>
  <view class="container">
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
		<view class="top">
			<view class="">
				<text>\n</text>
			</view>
			<view class="dropWrap" hover-class="none" hover-stop-propagation="false">
				<dropdown class="drop" :list="list" :current="value" @onClick="change()" />
			</view>
			<view class="card" hover-class="none" hover-stop-propagation="false">
			  <uni-section type="line">
					<view >
						<uni-row class="demo-uni-row">
							<uni-col>
								<view class="demo-uni-col" style="display: flex;">
									<image style="width: 30px; height: 30px;" src="../../static/icon/8.png"></image>
									<text style="line-height: 30px;color: #1A4182;" v-if="card.jieyu>=0">本月结余：</text>
									<text style="line-height: 30px;color: #E41F1F;" v-else>本月结余：</text>
									<text style="line-height: 30px;color: #1A4182;" v-if="card.jieyu>=0">{{card.jieyu}}</text>
									<text style="line-height: 30px;color: #E41F1F;" v-else>{{card.jieyu}}</text>
								</view>
							</uni-col>
						</uni-row>
						<uni-row class="demo-uni-row">
							<uni-col>
								<view class="demo-uni-col" style="display: flex;">
									<image style="width: 30px; height: 30px;" src="../../static/icon/9.png"></image>
									<text style="line-height: 30px;color: #1A4182;">本月支出：</text>
									<text style="line-height: 30px;color: #1A4182;">{{card.zhichu}}</text>
								</view>
							</uni-col>
						</uni-row>
						<uni-row class="demo-uni-row">
							<uni-col>
								<view class="demo-uni-col" style="display: flex;">
									<image style="width: 30px; height: 30px;" src="../../static/icon/10.png"></image>
									<text style="line-height: 30px;color: #1A4182;">本月收入：</text>
									<text style="line-height: 30px;color: #1A4182;">{{card.shouru}}</text>
								</view>
							</uni-col>
						</uni-row>
					</view>
			  </uni-section>
			</view>
		</view>
<!-- 		<view class="addView">
			   <button class="addBtn" type="primary" size="mini" @tap="add">添加账本</button>
		</view> -->
		<view class="">
			 <hm-sms-list-card v-for="item in bills" :key="item.id" :side="side" :img="'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/'+item.catImg" :options="item" @click.native = "clickCard(item.id)"></hm-sms-list-card>
		</view>
	</scroll-view>
	<view @tap="goTop" class="uni-link uni-center uni-common-mt lastView">
		点击这里返回顶部
	</view>
  </view>
 </template>

 <script>
import dropdown from '../../components/dt-dropdown/dt-dropdown.vue'
import HmSmsListCard from '@/components/hm-sms-list-card/index.vue'
// Vue.component('dropdown', dropdown)
  export default {
	components:{
		dropdown,
		HmSmsListCard 
	},
    data(){
      return{
        value: 0,
        range: [],
		arr:{},
		list:[],
		card:{
			jieyu:0,
			zhichu:0,
			shouru:0
		},
		bills:[],
		// options: {
		//   billName: 'IM PAYBAK',
		//   billDate: '3:46 PM',
		//   billPrice: '糟糕的星期三！通常用于演示',
		// },
		side:'/static/icon/upd.png',
		scrollTop:0,
		old: {
			scrollTop: 0
		},
      }
    },
	onPullDownRefresh() {
		console.log("onPullDownRefresh");
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
						this.list[i] = this.arr.text
					}
					this.$http.request({
					  url:"bill/getkeeping?id="+ this.range[0].value
					})
					.then(res =>{
						console.log(res);
						if(res.data.meta.status === 200){
							console.log(res);
							this.card = res.data.data
						}else{
							uni.showToast({
								icpn: 'none',
								title: '请退出重试'  ,
								image: '../../static/icon/error.png',
								duration: 5000
							});  
						}
					})
					this.$http.request({
					  url:"bill/get?userId="+ uni.getStorageSync("id") + "&" + "billlistId="+this.range[0].value
					})
					.then(res =>{
						console.log(res);
						if(res.data.meta.status === 200){
							console.log(res);
							this.bills = res.data.data
						}else{
							uni.showToast({
								icpn: 'none',
								title: '请退出重试'  ,
								image: '../../static/icon/error.png',
								duration: 5000
							});  
						}
					})
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
		uni.stopPullDownRefresh();
	},
    methods: {
	  onClick: function(e) {
		console.log('onClick');
	  },
	  clickCard(id){
		console.log("card...");  
		uni.redirectTo({
			url:'/pages/home/upd/upd?id='+id
		})
		console.log();
		
	  },
      change(e) {
        console.log("e:", e);
		this.value = e
		this.$http.request({
		  url:"bill/getkeeping?id="+ this.range[this.value].value
		})
		.then(res =>{
			console.log(res);
			if(res.data.meta.status === 200){
				console.log(res);
				this.card = res.data.data
			}else{
				uni.showToast({
					icpn: 'none',
					title: '请退出重试'  ,
					image: '../../static/icon/error.png',
					duration: 5000
				});  
			}
		})
		this.bills = []
		this.$http.request({
		  url:"bill/get?userId="+ uni.getStorageSync("id") + "&" + "billlistId="+ this.range[this.value].value
		})
		.then(res =>{
			console.log(res);
			if(res.data.meta.status === 200){
				console.log(res);
				this.bills = res.data.data
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
      onClick(e){
        console.log(e)
      },
      actionsClick(text){
        uni.showToast({
          title:text,
          icon:'none'
        })
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
	  add(){
		  console.log("add...");
	  }
    },
    created(){
		// this.$http.request({
		//   url:"billlist/getdetail"
		// })
		// .then(res =>{
		//   if(res.statusCode=== 200){
		// 	  if(res.meta.status===200){
		// 		  const det = JSON.parse(res.data.data)
		// 		  console.log(det)
		// 		  console.log("id..." + det.id);
		// 		  uni.setStorageSync('id',det.id)
		// 	  }else{
		// 		  uni.showToast({
		// 			title:"出错了，请退出重试"
		// 		  });
		// 	  }
		//   }else{
		// 	  uni.showToast({
		// 		title:"出错了，请退出重试"
		// 	  });
		//   }
		// })
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
					this.list[i] = this.arr.text
				}
				this.$http.request({
				  url:"bill/getkeeping?id="+ this.range[0].value
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						this.card = res.data.data
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							image: '../../static/icon/error.png',
							duration: 5000
						});  
					}
				})
				this.$http.request({
				  url:"bill/get?userId="+ uni.getStorageSync("id") + "&" + "billlistId="+this.range[0].value
				})
				.then(res =>{
					console.log(res);
					if(res.data.meta.status === 200){
						console.log(res);
						this.bills = res.data.data
					}else{
						uni.showToast({
							icpn: 'none',
							title: '请退出重试'  ,
							image: '../../static/icon/error.png',
							duration: 5000
						});  
					}
				})
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
    },
    mounted(){
   } ,
 }
 </script>

 <style lang="scss">
	 .addBtn{
	 	 float: right;
	 	 margin-right: 15px;
	 }
	 .addView{
		 padding-top: 15px;
	 	 width: 100vm;
	 	 height: 40px;
	 }
	 .scroll-Y {
	 	background-color: #FFFEF6;
	 	height: 100vh;
	 }
	 .lastView{
	 	width: 100vw;
	 	height: 50upx;
	 	line-height: 80upx;
	 	text-align: center;
	 }
 	.container{
		width: 100vw;
		height: 100vh;
		 background-color: #FFFEF6;
    .card{
      width: 80%;
      margin: 0 auto;
    }

     .demo-uni-row{
       .demo-uni-col{
         
       }
     }
   }
   .drop{
	   background-color: white;
	   // margin-top: 15px;
	   width: 200px;
   }
   .dropWrap{
	   margin-left: 15px;
	   // margin-top: 15px;
	   width: 200px;
	   margin-bottom: 15px;
   }
   .top{
	   // margin-top: 15px;
	   width: 100vw;
	   height: 200px;
	   background-color: #EEF4FF;
   }
   .hm-sms-list-card {
	   height: 315.18rpx !important;
   }
 </style>