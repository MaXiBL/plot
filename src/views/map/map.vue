<template>
<div>
  <both-sides></both-sides>

  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="layer">
    <v-group ref='sumBox' :draggable="true" @dragstart="dragstart" @wheel="wheelForScale" :config="config">
        <v-image :config="{ image: '', width: 3900, height: 2500, fill: '#1E1F36' }"></v-image>
        <!-- <v-rect v-for="(item, index) in mapData" :key='index' @click='clickBox($event)' :config="{
          x: 100 * index,
          y: 100 * index,
          width: 90,
          height: 90,
          stroke: '#1E1F36',
          strokeWidth: 1,
          fillPatternImage: item.image,
          fillPatternScaleX: 90/item.image.width,
          fillPatternScaleY: 90/item.image.height,
        }" /> -->
        <v-rect v-for="(item, index) in mapData" :key='index' @click='clickBox($event)' :config="{
          x: item.x*10,
          y: item.y*10,
          width: item.volume*10,
          height: item.volume*10,
          fill: item.color,
          id: `${item.ids}`,
          stroke: '#1E1F36',
          strokeWidth: 1,
          fillPatternImage: item.image,
          fillPatternScaleX: item.volume*10/(item.image ? item.image.width : 1),
          fillPatternScaleY: item.volume*10/(item.image ? item.image.height : 1),
        }" />
          <!--
          perfectDrawEnabled: false 边合并优化 
          fillPatternScaleX: item.volume*10/(item.image.width ? item.image.width : 1),
          fillPatternScaleY: item.volume*10/(item.image.height ? item.image.height : 1),  -->

    </v-group>
    <v-group :draggable="true">
      <v-label :config="{
            x: lableX,
            y: lableY,
            opacity: 1,
            visible: flag,
        }">
            <v-tag :config="tagConfig" />
            <v-text :config="textConfig" />
        </v-label>
    </v-group>
    </v-layer>
    <v-layer>
      
    </v-layer>
  </v-stage>
  <transition name="fade">
    <div v-if="tag.showFrame" :style="{top: tag.top, left: tag.left}" class="frame">
      <img src="@/assets/img/frame.png" alt="">
      <div>
        <img src="@/assets/img/house.png" alt="">
      </div>
      <div>
        <p>Not availa...</p>
        <img src="@/assets/img/greenCircle.png" alt="">
        <span>{{ tag.location }}</span>
        <p>Properties: normal</p>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import jsonData from '@/utils/data.json'
import headTop from "@/views/components/header.vue"
import bothSides from "@/views/components/bothSides.vue"
import hintImg from '@/assets/img/hint.png'
import { Loading } from 'element-ui'

let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中···',
    background: 'rgba(0, 0, 0, 0.3)'
  })
}

const width = window.innerWidth;
const height = window.innerHeight - 60;
export default{
  components: {
    headTop,
    bothSides
  },
  data () {
    return {
      width: width,
      height: height,
      configKonva: { 
          width: width, 
          height: height,
      },
      image: null,
      // 下面的配置项是v-group中的，x，y基于v-stage这个盒子最开始的位置，scaleX和scaleY是缩放比例
      config: {
        name: 'layerImage',
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
      },
      flag: false,
      lableX: 0,
      lableY: 0,
      tagConfig: {
        fill: '#001B2E',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        stroke: '#fff',
        strokeWidth: 1,
        cornerRadius: 5,
        shadowColor: '#1E1F36',
        shadowBlur: 10,
        shadowOffset: 0,
        shadowOpacity: 0.5
      },
      textConfig: {
        text: '',
        fontFamily: 'Avenir',
        fontSize: 20,
        padding: 10,
        fill: '#fff'
      },
      mapData: [],
      aprevious: {
        evt: '',
        color: ''
      },
      tag: {
        showFrame: false,
        top: '341px',
        left: '951px',
        location: ''
      },
    }
  },
  created () {
    startLoading()
    // this.mapData = jsonData
    for (var i = 0; i < 9; i++) {
      setTimeout((i) => {
        this.mapData = this.mapData.concat(jsonData.splice(0, 5000))
        this.$refs.sumBox.getNode().cache()
        if (i == 8) {
          console.log(this.mapData)
          loading.close()
          for (var j = 0; j < this.mapData.length; j++){
            if (this.mapData[j].imgurl != '') {
              var fn = (j) => {
                var image = new window.Image()
                image.src = this.mapData[j].imgurl
                image.onload = () => {
                  this.mapData[j].image = image
                  setTimeout(() => {
                    this.$refs.sumBox.getNode().cache()
                  }, 3000)
                }
              }
              fn(j)
            }
          }
        } 
      }, 0 , i)
    }

    // Konva.Image.fromURL('https://konvajs.org/assets/yoda.jpg', function(image){
    //       console.log(image)
    //       console.log(window.URL.createObjectURL(image))
    //     });

    var image = new window.Image()
    image.src = 'https://konvajs.org/assets/yoda.jpg'
    image.onload = () => {
      this.image = image
    }
    // async await
  },
  mounted () {
    // this.$Hint('hahahahah', '200000', hintImg)
    this.$refs.sumBox.getNode().cache()
  },
  methods: {
    // 拖动缩放
    wheelForScale (e) {
      // if (this.tag.showFrame == true) this.tag.showFrame = false
      if (this.flag == true) this.flag = false
      // 获取节点数据，等下用来获取鼠标的位置
      const stage = this.$refs.stage.getStage()
      // 设置缩放比例，这个可以自己调，不过我觉得1.2倍挺合适的
      const scaleBy = 1.2
      // 获取鼠标位置
      const pointer = stage.getPointerPosition()
      // 下面这三句我没太搞懂，里面的.layerImage应该是config里面的配置，然后拿到图片的位置
      const layerImageNode = this.$refs.layer.getStage().find('.layerImage')[0]
      this.bgx = layerImageNode.getAttr('x')
      this.bgy = layerImageNode.getAttr('y')
      // 这里用鼠标位置减去图片的位置，然后除以缩放的比例
      const mousePointTo = {
        x: (pointer.x - this.bgx) / this.config.scaleX,
        y: (pointer.y - this.bgy) / this.config.scaleY
      }
      // 判断鼠标滚轮的滚动方向
      // 修改config中scale的缩放比例，用上一次的值乘以倍数就是放大，除以倍数就是缩小
      if (e.evt.deltaY < 0) {
        this.config.scaleX = this.config.scaleX * scaleBy
        this.config.scaleY = this.config.scaleY * scaleBy
      } else {
        this.config.scaleX = this.config.scaleX / scaleBy
        this.config.scaleY = this.config.scaleY / scaleBy
      }
      if (this.config.scaleX < 0.2) {
        this.config.scaleX = '0.19380669946781492'
        this.config.scaleY = '0.19380669946781492'
      } else if (this.config.scaleX > 1.8) {
        this.config.scaleX = '1.728'
        this.config.scaleY = '1.728'
      }
      // 下面的这两句不加的话，不管鼠标放哪，都会以左上角为中心放大缩小，也就是x0,y0
      // 用鼠标位置减去刚才计算好的值乘以新的缩放比例，这样缩放的时候就相当一一直在移动图片，实现根据鼠标位置来放大缩小图片
      this.config.x = pointer.x - mousePointTo.x * this.config.scaleX
      this.config.y = pointer.y - mousePointTo.y * this.config.scaleY
    },
    // 显示隐藏 标签lable
    clickBox(e){
        let mousePos = this.$refs.stage.getNode().getPointerPosition();
        // 标签文
        let Properties = e.target.attrs.fill == '#175DEA' ? 'normal' : e.target.attrs.fill == '#5CB6E6' ? 'rare' : e.target.attrs.fill == '#2EC149' ? 'boom' : e.target.attrs.fill == '#E6E202' ? 'centre' : 'VIP members'
        this.textConfig.text = ` ( ${e.target.attrs.x} , ${e.target.attrs.y} ) \n\n Properties: ${Properties}`
        // this.tag.location = `（ ${e.target.attrs.x} , ${e.target.attrs.y} ）`
        console.log(e.target.attrs)
        /* 
         *  保存上一个元素以及颜色，更新选中方块颜色
         *
          if (!e.target.attrs.fillPatternImage) {
            if (this.aprevious.evt) {
              this.aprevious.evt.fill(this.aprevious.color)
              this.aprevious.evt.draw();
            }
            this.aprevious.evt = e.target
            this.aprevious.color = e.target.attrs.fill
            e.target.fill('#9243FF')
            e.target.draw()
            this.$refs.sumBox.getNode().cache()
          }
        */

        // this.config.x = (e.evt.clientX - this.$refs.sumBox._konvaNode.attrs.x)/ this.$refs.sumBox._konvaNode.attrs.scaleX
        // this.config.y = (e.evt.clientY - this.$refs.sumBox._konvaNode.attrs.y)/ this.$refs.sumBox._konvaNode.attrs.scaleY
        // this.config.x = width/2 - (e.evt.clientX - this.$refs.sumBox._konvaNode.attrs.x)
        // this.config.y = height/2 - (e.evt.clientY - this.$refs.sumBox._konvaNode.attrs.y)
        this.lableX = width/2
        // this.tag.left = `${width/2 -9}px`
        this.lableY = height/2 - 60
        // this.tag.top = `${height/2 -98}px`
        this.$refs.sumBox.getNode().to({
          x: width/2 - (e.evt.clientX - this.$refs.sumBox._konvaNode.attrs.x),
          y: height/2 - (e.evt.clientY - this.$refs.sumBox._konvaNode.attrs.y),
          duration: 0.4,
          easing: Konva.Easings['StrongEaseIn']
        });
        // 动画
        // const hexagon = this.$refs.sumBox.getNode();
        // const anim = new Konva.Animation(function(frame) {
        //   hexagon.setX(x);
        //   hexagon.setY(y);
        // }, hexagon.getLayer());
        // anim.start();

        // 阻止重复
        this.$refs.layer.getNode().batchDraw()
        // this.tag.showFrame = true
        this.flag = true
    },
    // 拖拽舞台开始
    dragstart() {
      this.flag = false
    },
  }
}

</script>

<style lang="less">
.frame {
  position: fixed;
  width: 250px;
  height: 110px;
  img:first-child {
    width: 100%;
    height: 100%;
  }
  div {
    display: inline-block;
    position: absolute;
    // overflow: hidden;
  }
  div:nth-child(2) {
    width: 64px;
    height: 64px;
    border: 1px solid #9A51FD;
    border-radius: 50%;
    top: 15px;
    left: 24px;
    img {
      border-radius: 50%;
    }
  }
  div:nth-child(3) {
    width: 130px;
    height: 65px;
    top: 15px;
    left: 103px;
    text-align: left;
    p:first-child {
      margin: 0;
      color: #fff;
      font-size: 24px;
      padding-bottom: 3px;
    }
    img {
      width: 16px;
      height: 17px;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      color: #fff;
      vertical-align: middle;
    }
    p:last-child {
      margin: 0;
      color: #fff;
      font-size: 14px;
      padding-top: 3px;
    }
  }
}
// .frame2 {
//   position: fixed;
//   width: 500px;
//   height: 384px;
//   border-radius: 20px;
//   overflow: hidden;
//   div:first-child {
//     height: 80px;
//     background-color: #1C232B;
//     font-size: 28px;
//     color: #189CFF;
//     line-height: 80px;
//   }
//   div:last-child {
//     height: 304px;
//     background-color: #252A36;
//     display: flex;
//     flex-wrap: wrap;
//     span {
//       height: 20px;
//       border: 1px solid #8252FB;
//       flex: 11%;
//     }
//   }
// }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
