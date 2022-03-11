<template>
<div>
  <both-sides :mapData='oldData' :blockDetails='blockDetails' @clickInSales='clickInSales' @clickMySplace='clickMySplace' @clickSearch='clickSearch'></both-sides>

  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="layer">
    <v-group ref='sumBox' :draggable="true" @dragstart="dragstart" @dragend="dragend" @wheel="wheelForScale" @click='clickBg($event)' :config="config">
        <v-image :config="{ image: image, width: 4277, height: 2652, fill: '#1E1F36' }"></v-image>
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
        <!-- @click='clickBox($event)' -->
        <v-rect v-for="(item, index) in mapData" :key='index' @click='clickBox($event)' :config="{
          x: item.x*10 + 0.5,
          y: item.y*10 + 0.5,
          width: item.volume*10,
          height: item.volume*10,
          fill: item.color,
          id: `${item.ids}`,
          stroke: '#1E1F36',
          strokeWidth: 1.5,
          fillPatternImage: item.image,
          fillPatternScaleX: item.volume*10/(item.image ? item.image.width : 1),
          fillPatternScaleY: item.volume*10/(item.image ? item.image.height : 1),
        }" />
          <!--
          perfectDrawEnabled: false 边合并优化 
          fillPatternScaleX: item.volume*10/(item.image.width ? item.image.width : 1),
          fillPatternScaleY: item.volume*10/(item.image.height ? item.image.height : 1),  -->

    </v-group>
    </v-layer>
  </v-stage>
  <transition name="fade">
    <div v-if="tag.showFrame" :style="{top: tag.top, left: tag.left}" class="frame">
      <img src="@/assets/img/frame1.png" alt="">
      <div>
        <img :src="tag.house" alt="">
      </div>
      <div>
        <p>{{ tag.name }}</p>
      </div>
      <div>
        <img src="@/assets/img/greenCircle.png" alt="">
        <span>{{ tag.location }}</span><br/>
        <img src="@/assets/img/yellowBook.png" alt="">
        <span>{{ tag.Properties }}</span>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import jsonData from '@/utils/tmpdata.json' 
import locaData from '@/utils/newdata.json'
import headTop from "@/views/components/header.vue"
import bothSides from "@/views/components/bothSides.vue"
import hintImg from '@/assets/img/hint.png'
import { Loading } from 'element-ui'
import mapBg from '@/assets/image/map/map2Bg.png'
import { selMapList, ediMapinfo } from '@/api/map.js'
import { mapState } from 'vuex'

import putong from '@/assets/img/普通.png'
import xiyou from '@/assets/img/稀有.png'
import fanrong from '@/assets/img/繁荣.png'
import zhongxin from '@/assets/img/中心.png'

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
  computed: {
    ...mapState(["ConnectWalletID"])
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
      mapData: [],
      aprevious: {  // 用于保存点击的元素及颜色
        evt: '',
        color: ''
      },
      tag: {
        showFrame: false,
        top: '341px',
        left: '951px',
        location: '',
        Properties: '',
        name: '',
        house: ''
      },
      stage: {  // 拖动距离及缩放大小，用于计算点击图片位置
        x: '',
        y: '',
        scale: '1'
      },
      blockDetails: '', // 单个方块详情
      clickBlock: false, // 用于分辨点击的是方块还是舞台
      oldData: [], // 真正请求回来的数据
      amendDate: [], // 调整后的数据
    }
  },
  async created () {
    // startLoading()
    // for (var i = 0; i < 9; i++) {
    //   setTimeout((i) => {
    //     this.mapData = this.mapData.concat(jsonData.splice(0, 5000))
    //     this.$refs.sumBox.getNode().cache()
    //     if (i == 8) {
    //       console.log(this.mapData)
    //       loading.close()
    //       for (var j = 0; j < this.mapData.length; j++){
    //         if (this.mapData[j].imgurl != '') {
    //           var fn = (j) => {
    //             var image = new window.Image()
    //             image.src = this.mapData[j].imgurl
    //             image.onload = () => {
    //               this.mapData[j].image = image
    //               setTimeout(() => {
    //                 this.$refs.sumBox.getNode().cache()
    //               }, 3000)
    //             }
    //           }
    //           fn(j)
    //         }
    //       }
    //     }
    //   }, 0 , i)
    // }
    // Konva.Image.fromURL('https://konvajs.org/assets/yoda.jpg', function(image){
    //       console.log(image)
    //       console.log(window.URL.createObjectURL(image))
    //     });
    await selMapList().then((val) => {
      if (val.code == 0) {
        // val.data = [
        //     {
        //         "id": 30229,
        //         "tokenid": 30229,
        //         "name": "Monkey One",
        //         "uri": "",
        //         "image": "",
        //         "description": "<p>Monkey</p>",
        //         "amount": 2,
        //         "contract_addr": "0xA88bd2cF0184121099Ef5544f18B9914F137B3Fa",
        //         "contract_type": "ERC1155",
        //         "category": "art",
        //         "category2": "",
        //         "extra": "{}",
        //         "creator": "0x8F169e01559256500AADE42C84d3F3bE9fCb908D",
        //         "ctime": "2022-01-07T19:13:48+08:00",
        //         "owner": "0xc825067bD538F3b0099d4C3Db7842E7431F904ab",
        //         "X": 38,
        //         "Y": 30,
        //         "is_super": 0,
        //         "belong_to": 0,
        //         "level": 0,
        //         "volume": 1,
        //         "on_sale": false
        //     },
        //     {
        //         "id": 30230,
        //         "tokenid": 30230,
        //         "name": "gg",
        //         "uri": "http://192.168.90.122:3342/media/a1f8b06dc0333399d712ed9ee65be6af7563aa914cad9be229cbe9ff14949ac1.jpg",
        //         "image": "http://192.168.90.122:3342/media/a1f8b06dc0333399d712ed9ee65be6af7563aa914cad9be229cbe9ff14949ac1.jpg",
        //         "description": "<p>faa</p>",
        //         "amount": 1,
        //         "contract_addr": "0xA88bd2cF0184121099Ef5544f18B9914F137B3Fa",
        //         "contract_type": "ERC1155",
        //         "category": "art",
        //         "category2": "",
        //         "extra": "{}",
        //         "creator": "0x7B4d62CA240a44291524Dd0b57CAE52Af0785416",
        //         "ctime": "2022-01-07T19:14:07+08:00",
        //         "owner": "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
        //         "X": 39,
        //         "Y": 30,
        //         "is_super": 0,
        //         "belong_to": 0,
        //         "level": 1,
        //         "volume": 81,
        //         "on_sale": true
        //     },
        // ]
        // val.data = []
        this.oldData = val.data
        this.amendDate = this.oldData.map((item) => {
          return {
            "x": item.X,
            "y": item.Y,
            "color": item.image ? '' : item.level == 'normal' ? '#175DEA' : item.level == 'rare' ? '#5CB6E6' : item.level == 'boom' ? '#2EC149' : item.level == 'centre' ? '#E6E202' : '#175DEA',
            "volume": Math.sqrt(item.volume),
            "ids": item.id,
            "imgurl": item.image,
            "image": null
          }
        })
      }
    })
    console.log(this.oldData)
    console.log(this.amendDate)

    var image = new window.Image()
    image.src = `${ mapBg }`
    image.onload = () => {
      console.log(2)
      this.image = image
      startLoading()
      for (var i = 0; i < 20; i++) {
        setTimeout((i) => {
          this.mapData = this.mapData.concat(this.amendDate.splice(0, 500))
          if (i == 19) {
            loading.close()
            for (var j = 0; j < this.mapData.length; j++){
              if (this.mapData[j].imgurl != '') {
                var fn = (j) => {
                  var image = new window.Image()
                  image.src = this.mapData[j].imgurl
                  image.onload = () => {
                    this.mapData[j].image = image
                  }
                }
                fn(j)
              }
            }
          }
        }, 0 , i)
      }
    }
    // async await
  },
  mounted () {
    // this.$Hint('hahahahah', '200000', hintImg)
    // this.$refs.sumBox.getNode().cache()
    // selMapList().then((val) => {
    //   console.log(val)
    // })
  },
  methods: {
    // 拖动缩放
    wheelForScale (e) {
      if (this.tag.showFrame == true) this.tag.showFrame = false
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
      // 用于限制舞台缩放大小
      if (this.config.scaleX < 0.2) {
        this.config.scaleX = '0.19380669946781492'
        this.config.scaleY = '0.19380669946781492'
      } else if (this.config.scaleX > 1.8) {
        this.config.scaleX = '1.728'
        this.config.scaleY = '1.728'
      }
      // 保存缩放大小用于计算坐标
      this.stage.scale = this.config.scaleX
      // 下面的这两句不加的话，不管鼠标放哪，都会以左上角为中心放大缩小，也就是x0,y0
      // 用鼠标位置减去刚才计算好的值乘以新的缩放比例，这样缩放的时候就相当一一直在移动图片，实现根据鼠标位置来放大缩小图片
      this.config.x = pointer.x - mousePointTo.x * this.config.scaleX
      this.config.y = pointer.y - mousePointTo.y * this.config.scaleY
      // 舞台缩放后更新舞台移动位置用于计算坐标
      this.stage.x = this.config.x
      this.stage.y = this.config.y
    },
    // 显示隐藏 标签lable
    clickBox(e){
        let mousePos = this.$refs.stage.getNode().getPointerPosition();
        // 标签文
        let Properties = ''
        this.tag.location = `( ${Math.floor(e.target.attrs.x)/10} , ${Math.floor(e.target.attrs.y)/10} )`
        

        /* 
         *  用坐标搜索改变方块颜色及位置
         *
          this.mapData.map((item) => {
            if (item.x*10 == 620 && item.y*10 == 100) {
              console.log(222) 
              item.color = 'red'
              this.$refs.sumBox.getNode().to({
                x: width/2 - 620,
                y: height/2 - 40,
                duration: 0.4,
                easing: Konva.Easings['StrongEaseIn']
              });
              this.$refs.sumBox.getNode().cache()
              console.log(item, 111)
            }
          })
        */
        // 把选中元素单独移到新的图层
        // e.target.moveTo(this.$refs.newlayer.getNode())

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

        this.tag.left = `${width/2}px`
        // this.lableY = height/2 - 60
        this.tag.top = `${height/2 - 185}px`
        this.$refs.sumBox.getNode().to({
          x: width/2 - (e.evt.clientX - this.$refs.sumBox._konvaNode.attrs.x),
          y: height/2 - (e.evt.clientY - this.$refs.sumBox._konvaNode.attrs.y),
          duration: 0.4,
          easing: Konva.Easings['StrongEaseIn']
        });
        // 舞台移动后更新 舞台位置 准备下一点击
        this.stage.x = width/2 - (e.evt.clientX - this.$refs.sumBox._konvaNode.attrs.x)
        this.stage.y = height/2 - (e.evt.clientY - this.$refs.sumBox._konvaNode.attrs.y)
        // 动画
        // const hexagon = this.$refs.sumBox.getNode();
        // const anim = new Konva.Animation(function(frame) {
        //   hexagon.setX(x);
        //   hexagon.setY(y);
        // }, hexagon.getLayer());
        // anim.start();

        // 阻止重复
        // this.$refs.layertag.getNode().batchDraw()

        for ( var i = 0; i < this.mapData.length; i++) {
          if (Math.floor(e.target.attrs.x)/10 == this.mapData[i].x && Math.floor(e.target.attrs.y)/10 == this.mapData[i].y) {
            this.clickBlock = true  // 处理点击方块
            // 保存上一个元素以及颜色，更新选中方块颜色
          } else if (this.mapData[i].ids == 'sign') {  // 处理上一个点击的舞台
            this.mapData.splice(i, 1)
          }
        }
        
        // 数据传递，用于展示右侧菜单数据
        this.blockDetails = {
          id: e.target.attrs.id,
          stage: !this.clickBlock,
        }

        // 点击了方块
        if (this.clickBlock) {
          // 处理标签文
          if (e.target.attrs.fillPatternImage) {
            for (let i = 0; i < this.oldData.length; i++) {
              if (this.oldData[i].X == Math.floor(e.target.attrs.x)/10 && this.oldData[i].Y == Math.floor(e.target.attrs.y)/10) {
                Properties = this.oldData[i].level
                this.tag.house = this.oldData[i].level == 'normal' ? putong : this.oldData[i].level == 'rare' ? xiyou : this.oldData[i].level == 'boom' ? fanrong : this.oldData[i].level == 'centre' ? zhongxin : putong
              }
            }
          } else {
            Properties = e.target.attrs.fill == '#175DEA' ? 'normal' : e.target.attrs.fill == '#5CB6E6' ? 'rare' : e.target.attrs.fill == '#2EC149' ? 'boom' : e.target.attrs.fill == '#E6E202' ? 'centre' : 'normal'
            this.tag.house = e.target.attrs.fill == '#175DEA' ? putong : e.target.attrs.fill == '#5CB6E6' ? xiyou : e.target.attrs.fill == '#2EC149' ? fanrong : e.target.attrs.fill == '#E6E202' ? zhongxin : putong
          }
          // 处理点击颜色
          if (!e.target.attrs.fillPatternImage) {
            this.mapData.push(
            {
              "x": Math.floor(e.target.attrs.x)/10,
              "y": Math.floor(e.target.attrs.y)/10,
              "color": "#8252FB",
              "volume": e.target.attrs.width/10,
              "ids": 'sign',
              "imgurl": "",
              "image": null
            })
          }
          for (let i = 0; i < this.oldData.length; i++) {
            if (this.oldData[i].X == Math.floor(e.target.attrs.x)/10 && this.oldData[i].Y == Math.floor(e.target.attrs.y)/10) {
              this.tag.name = this.oldData[i].name
            }
          }
        }
        // 点击的是舞台 给舞台添加方块
        if (!this.clickBlock) {
          for (let i = 0; i < locaData.length; i++) {
            if (locaData[i].x == Math.floor(e.target.attrs.x)/10 && locaData[i].y == Math.floor(e.target.attrs.y)/10) {
              Properties = locaData[i].color == '#175DEA' ? 'normal' : locaData[i].color == '#5CB6E6' ? 'rare' : locaData[i].color == '#2EC149' ? 'boom' : locaData[i].color == '#E6E202' ? 'centre' : 'normal'
              this.tag.house = locaData[i].color == '#175DEA' ? putong : locaData[i].color == '#5CB6E6' ? xiyou : locaData[i].color == '#2EC149' ? fanrong : locaData[i].color == '#E6E202' ? zhongxin : putong
            }
          }

          this.mapData.push(
          {
            "x": Math.floor(e.target.attrs.x)/10,
            "y": Math.floor(e.target.attrs.y)/10,
            "color": "#8252FB",
            "volume": 1,
            "ids": 'sign',
            "imgurl": "",
            "image": null
          })
          this.tag.name = 'Not mint'
        }
        // 显示tag
        this.tag.Properties = Properties
        this.tag.showFrame = true
    },
    // 拖拽舞台开始
    dragstart() {
      this.tag.showFrame = false
    },
    // 拖拽结束 
    dragend(e) {
      // console.log(e.target.attrs.x, e.target.attrs.y)
      this.stage.x = e.target.attrs.x
      this.stage.y = e.target.attrs.y
    },
    // 点击舞台
    clickBg(e) {
      // console.log('鼠标位置', (this.$refs.stage.getStage().getPointerPosition().x - this.stage.x)/this.stage.scale, (this.$refs.stage.getStage().getPointerPosition().y - this.stage.y)/this.stage.scale)
      let x = Math.floor(((this.$refs.stage.getStage().getPointerPosition().x - this.stage.x)/this.stage.scale)/10)
      let y = Math.floor(((this.$refs.stage.getStage().getPointerPosition().y - this.stage.y)/this.stage.scale)/10)
      // console.log(x,y)
      // 用本地数据判断点的时候是方块
      for ( var i = 0; i < locaData.length; i++) {
        if (x == locaData[i].x && y == locaData[i].y) {
          
          if (this.clickBlock) {
            // 点击了方块，不处理，让点击方块方法自己处理
            this.clickBlock = false
          } else {
            // 点击了舞台 ， 补齐缺少的数据
            e.target.attrs.x = x*10
            e.target.attrs.y = y*10
            e.target.attrs.id = locaData[i].ids
            this.clickBox(e)
          }

        }
      }
    },
    // 点击搜索
    clickSearch(val) {
      // 隐藏了tag
      this.tag.showFrame = false
      console.log('clickSearch事件', val)
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].ids == 'sign') {  // 处理上一个点击的舞台
          this.mapData.splice(i, 1)
        }
      }
      let tmparr = []
      if (val.landName != '' || val.tokenId != '' || (val.x != '' && val.y != '')) {
        // 循环购买的空间如果搜索的是购买的空间就循环此列表，无需再循环本地列表
        for (let i = 0; i < this.oldData.length; i++) {
          if ((this.oldData[i].X == val.x && this.oldData[i].Y == val.y) || this.oldData[i].name == val.landName || this.oldData[i].tokenid == val.tokenId ) {
            console.log(this.mapData[i])
            // 分别处理有图的空间还是无图空间
            if (this.oldData[i].imgurl) {
              
            } else {
              tmparr.push(
              {
                "x": this.oldData[i].X,
                "y": this.oldData[i].Y,
                "color": "#8252FB",
                "volume":Math.sqrt(this.oldData[i].volume),
                "ids": 'sign',
                "imgurl": "",
                "image": null
              })
            }
            // 移动舞台位置对应搜索的坐标
            this.$refs.sumBox.getNode().to({
              x: width/2 - this.oldData[i].X*10*this.stage.scale,
              y: height/2 - this.oldData[i].Y*10*this.stage.scale,
              duration: 0.4,
              easing: Konva.Easings['StrongEaseIn']
            })
            // 右边栏相关信息展示
            this.blockDetails = {
              id: this.oldData[i].id,
              stage: false,
            }
            // 舞台位置以变化更新舞台位置信息
            this.stage.x = width/2 - this.oldData[i].X*10*this.stage.scale
            this.stage.y = height/2 - this.oldData[i].Y*10*this.stage.scale
            break
          }
        }
        this.mapData = this.mapData.concat(tmparr)
        if (tmparr.length > 0) {
          return false
        }

        //  处理搜索的是普通未购买的坐标
        let exist = true
        for (let j = 0; j < locaData.length; j++) {
          if (locaData[j].x == val.x && locaData[j].y == val.y) {
            this.$refs.sumBox.getNode().to({
              x: width/2 - val.x*10*this.stage.scale,
              y: height/2 - val.y*10*this.stage.scale,
              duration: 0.4,
              easing: Konva.Easings['StrongEaseIn']
            })
            this.stage.x = width/2 - val.x*10*this.stage.scale
            this.stage.y = height/2 - val.y*10*this.stage.scale

            this.mapData.push(
            {
              "x": val.x,
              "y": val.y,
              "color": "#8252FB",
              "volume": 1,
              "ids": 'sign',
              "imgurl": "",
              "image": null
            })
            // 右边栏相关信息展示
            this.blockDetails = {
              id: locaData[j].ids,
              stage: true,
            }
            exist = false
          }
        }
        if (exist) {
          this.$Hint('Block does not exist !', '2000', hintImg)
        }

      }
    },
    // 点击出售中
    clickInSales(val) {
      console.log('点击了出售中', val)
      if (val) {
        startLoading()
        this.mapData = this.oldData.map((item) => {
          if (item.on_sale) {
            return {
              "x": item.X,
              "y": item.Y,
              "color": item.image ? '' : item.level == 'normal' ? '#175DEA' : item.level == 'rare' ? '#5CB6E6' : item.level == 'boom' ? '#2EC149' : item.level == 'centre' ? '#E6E202' : '#175DEA',
              "volume": Math.sqrt(item.volume),
              "ids": item.id,
              "imgurl": item.image,
              "image": null
            }
          } else {
            return {}
          }
        })
        console.log(this.mapData)
        loading.close()
      } else {
        this.mapData = this.oldData.map((item) => {
          return {
            "x": item.X,
            "y": item.Y,
            "color": item.image ? '' : item.level == 'normal' ? '#175DEA' : item.level == 'rare' ? '#5CB6E6' : item.level == 'boom' ? '#2EC149' : item.level == 'centre' ? '#E6E202' : '#175DEA',
            "volume": Math.sqrt(item.volume),
            "ids": item.id,
            "imgurl": item.image,
            "image": null
          }
        })
      }
      for (var j = 0; j < this.mapData.length; j++){
        if (this.mapData[j].imgurl != '') {
          var fn = (j) => {
            var image = new window.Image()
            image.src = this.mapData[j].imgurl
            image.onload = () => {
              this.mapData[j].image = image
            }
          }
          fn(j)
        }
      }
    },
    // 点击我的土地
    clickMySplace(val) {
      console.log('点击了我的土地', val)
      if (val) {
        startLoading()
        this.mapData = this.oldData.map((item) => {
          if (item.owner == this.ConnectWalletID) {
            return {
              "x": item.X,
              "y": item.Y,
              "color": item.image ? '' : item.level == 'normal' ? '#175DEA' : item.level == 'rare' ? '#5CB6E6' : item.level == 'boom' ? '#2EC149' : item.level == 'centre' ? '#E6E202' : '#175DEA',
              "volume": Math.sqrt(item.volume),
              "ids": item.id,
              "imgurl": item.image,
              "image": null
            }
          } else {
            return {}
          }
        })
        loading.close()
      } else {
        this.mapData = this.oldData.map((item) => {
          return {
            "x": item.X,
            "y": item.Y,
            "color": item.image ? '' : item.level == 'normal' ? '#175DEA' : item.level == 'rare' ? '#5CB6E6' : item.level == 'boom' ? '#2EC149' : item.level == 'centre' ? '#E6E202' : '#175DEA',
            "volume": Math.sqrt(item.volume),
            "ids": item.id,
            "imgurl": item.image,
            "image": null
          }
        })
      }
      for (var j = 0; j < this.mapData.length; j++){
        if (this.mapData[j].imgurl != '') {
          var fn = (j) => {
            var image = new window.Image()
            image.src = this.mapData[j].imgurl
            image.onload = () => {
              this.mapData[j].image = image
            }
          }
          fn(j)
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.frame {
  position: fixed;
  width: 273px;
  height: 189px;
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
      padding-top: 5px;
      width: 90%;
      height: 90%;
      border-radius: 50%;
    }
  }
  div:nth-child(3) {
    width: 137px;
    height: 65px;
    top: 11px;
    left: 103px;
    text-align: left;
    p:first-child {
      margin: 0;
      color: #fff;
      font-size: 24px;
      height: 65px;
      text-align: left;
      line-height: 30px;
      padding-top: 5px;
      overflow: hidden;
    }
  }
  div:nth-child(4) {
    position: absolute;
    top: 90px;
    left: 25px;
    margin-top: 10px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      padding-bottom: 15px;
    }
    span {
      font-size: 14px;
      padding-bottom: 15px;
      color: #fff;
      vertical-align: middle;
      margin-left: 10px;
      display: inline-block;;
      text-align: left;
      width: 100px;
    }
    img:first-child {
      padding-top: 5px;
    }
    span:nth-child(2) {
      padding-top: 5px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
