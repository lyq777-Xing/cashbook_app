<template>
  <div class="hm-sms-list-card">
    <div class="box">
      <!-- <image class="xueshengdangan" :src="options.xueshengdangan" /> -->
      <image class="primary" :src="img" />
      <div class="sub">
        <div class="outer">
          <div class="wrap">
            <text class="paybak">{{ options.billName }}</text>
            <!-- <text class="company">{{ options.company }}</text> -->
          </div>
          <text class="txt">{{ options.billDate }}</text>
        </div>
        <div class="block">
          <text class="desc">{{options.billDescribe}}:{{ options.billPrice }}</text>
        </div>
      </div>
      <image class="side" :src="side" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmSmsListCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-sms-list-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          // xueshengdangan:
          //   '/static/hm-sms-list-card/images/img_25832_0_1.png',
          // billImg:
            // '/static/hm-sms-list-card/images/img_25832_0_2.png',
          billName: 'IM PAYBAK',
          // company: '公司',
          billDate: '3:46 PM',
          billPrice: '糟糕的星期三！通常用于演示',
		  billDescribe: 'test',
		  id:1
        };
      }
    },
	side: {
	  type: String,
	  default: '/static/hm-sms-list-card/images/img_25832_0_0.png'
	},
	img: {
	  type: String,
	  default:'/static/hm-sms-list-card/images/img_25832_0_2.png'
	},
	// side:'/static/hm-sms-list-card/images/img_25832_0_0.png',
	// img:'/static/hm-sms-list-card/images/img_25832_0_2.png',
  },
  data() {
    return {};
  },
  methods: {
	  // upd(id){
		 //  console.log("cardaaaa...");
		  
	  // }
  }
};
</script>
<style>
@import './index.response.css';
</style>
