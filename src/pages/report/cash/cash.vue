<template>
	<view class="container">
		  <view class="chartsView">
		    <canvas canvas-id="rgibcJRDaIHoolbFXFzZImneWapnBoTj" id="rgibcJRDaIHoolbFXFzZImneWapnBoTj" class="charts" @touchend="tap"/>
		  </view>
		  
		  <view class="textView">
		  	<text class="chartsText" @click="goReturn()">点击返回</text>
		  </view>
	</view>
</template>

<script>
import uCharts from '@qiun/ucharts';
var uChartsInstance = {};
export default {
  data() {
    return {
      cWidth: 750,
      cHeight: 500,
	  data:[],
	  report:'',
	  json:[]
    };
  },
  onReady() {
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  created(){
	
  },
  onLoad() {
  	this.getData()
  },
  methods: {
	getData(){
		this.$http.request({
		  url:"bill/getreporttwo?userId="+ uni.getStorageSync("id")
		})
		.then(res =>{
			console.log(res);
			if(res.data.meta.status === 200){
				console.log(res);
				this.data = res.data.data
					const a = JSON.stringify(this.data)
					console.log(a);
					this.json = JSON.parse(a)
					// this.report = a;
					// console.log(this.report);
					// this.json = JSON.parse(a);
					// console.log(this.json);
					// for (var i = 0; i < this.json.length; i++) {
					// 	this.report = this.report + JSON.stringify(this.json[i])
					// 	console.log(this.report);
					// 	// this.report[i] = this.json[i]
					// }
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
	goReturn(){
		uni.redirectTo({
			url:'/pages/report/index'
		})
	},
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
              {
                data:this.json
              }
            ]
          };
        this.drawCharts('rgibcJRDaIHoolbFXFzZImneWapnBoTj', res);
      }, 3000);
    },
    drawCharts(id,data){
		console.log(data);
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "ring",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        series: data.series,
        animation: true,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        dataLabel: true,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25
        },
        title: {
          name: "统计",
          fontSize: 15,
          color: "#666666"
        },
        // subtitle: {
        //   name: "70%",
        //   fontSize: 25,
        //   color: "#7cb5ec"
        // },
        extra: {
          ring: {
            ringWidth: 60,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom"
          }
        }
      });
    },
    tap(e){
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
</script>

<style lang="scss">
.charts{
    width: 750rpx;
    height: 500rpx;
  }
  .container{
	  width: 100vw;
	  height: 100vh;
	  background-color: #FFFEF6;
  }
  .chartsView{
	  padding-top: 150px;
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
