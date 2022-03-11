<template>
  <el-col :span="24"><div class="grid-content bg-purple-dark countDown">
    <div>
      <span>Days</span>
      <span>Hours</span>
      <span>Mins</span>
      <span>Secs</span>
    </div>
    <span class="subject" :endTime="endTime" :callback="callback" :endText="endText">
      <slot>
        {{content}}
      </slot>
    </span>
    </div>
  </el-col>
</template>
<script>
  import { selPresell } from '@/api/map.js'
  export default {
    data(){
      return {
      content: '',
      }
    },
    props:{
      endTime:{
        type: Number,
        default :''
      },
      endText:{
        type : String,
        default:'已结束'
      },
      callback : {
        type : Function,
        default :''
      }
    },
    created() {
      selPresell().then((val) => {
        // this.countdowm(val.start_sale_at)
        this.countdowm(1642852800000)
      })
    },
    mounted () {
    //  this.countdowm(this.endTime)
    },
    methods: {
      countdowm(timestamp){
      let self = this;
      let timer = setInterval(function(){
        let nowTime = new Date();
        let endTime = new Date(timestamp - 0);
        let t = endTime.getTime() - nowTime.getTime();
        if(t>0){
          let day = Math.floor(t/86400000);
          let hour=Math.floor((t/3600000)%24);
          let min=Math.floor((t/60000)%60);
          let sec=Math.floor((t/1000)%60);
          day = day < 10 ? "0" + day : day;
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          if(day > 0){
            format = `${day}天${hour}小时${min}分${sec}秒`;
          } 
          if(day <= 0 && hour > 0 ){
            format = `${hour}小时${min}分${sec}秒`; 
          }
          if(day <= 0 && hour <= 0){
            format =`${min}分${sec}秒`;
          }
          // self.content = format;
          self.content = `${day ? day : '00'} : ${hour ? hour : '00'} : ${min ? min : '00'} : ${sec ? sec : '00'}`
          }else{
           clearInterval(timer);
           self.content = self.endText;
           self._callback();
          }
         },1000);
        },
        _callback(){
        if(this.callback && this.callback instanceof Function){
           this.callback('0');
         }
      }
    }
  }
</script>
<style lang="less" scoped>
.countDown {
  width: 316px;
  height: 98px;
  background: rgba(70, 83, 114, 0.39);
  opacity: 1;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 18px;
  div:first-child {
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
    padding-bottom: 3px;
    padding-right: 4px;
    span {
      font-size: 16px;
      color: #C1C1CC;
    }
  }
  .subject {
    font-size: 40px;
    color: #17A1FF;
  }
}
</style>
