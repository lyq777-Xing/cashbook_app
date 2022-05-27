 <template>
   <view>推荐</view>
 </template>
 
 <script>
 export default {
   mounted(){
     this.request({
        url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
        data:{
          limit:30,
          order:"hot",
          skip:0
        }
      })
      .then(res =>{
        console.log(res);
      })
   } 
 }
 </script>
 
 <style>
 
 </style>