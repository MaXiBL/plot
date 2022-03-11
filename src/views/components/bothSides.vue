<template>
  <div class="optionBox">
      <div ref="leftOption" class="leftOption">
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark firstTitle">{{ $t('map.atlantis') }}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark leftMapImage">
            <img src="@/assets/img/smallMap.png" alt="">
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark secondTitle">{{ $t('map.blocknum') }}</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple colorIdentification_1">
            <div></div>
            <span>{{ $t('map.normal') }}</span>  
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light colorIdentification_2">
            <div></div>
            <span>{{ $t('map.rare') }}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple colorIdentification_3">
            <div></div>
            <span>{{ $t('map.boom') }}</span>  
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light colorIdentification_4">
            <div></div>
            <span>{{ $t('map.centre') }}</span>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark mySpace1">
            <div></div>
            <span>{{ $t('map.myspace') }}</span>
            <el-switch
              @change='mySpaceChange'
              v-model="value"
              active-color="#17A1FF"
              inactive-color="#3E3E3E">
            </el-switch>  
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark mySpace2">
            <div></div>
            <span>{{ $t('map.onmarket') }}</span>
            <el-switch
              @change='clickInSell'
              v-model="inSell"
              active-color="#17A1FF"
              inactive-color="#3E3E3E">
            </el-switch>  
          </div></el-col>
          <!-- <el-col :span="24"><div class="grid-content bg-purple-dark thirdlyTitle">{{ $t('map.landsituation') }}</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple leftMultiple_1">
              <div @click="clickInSell">
                <i v-if="inSell" class="el-icon-check"></i>
              </div>
              <span>{{ $t('map.onmarket') }}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light leftMultiple_2">
              <span>
                <i class="el-icon-check"></i>
              </span>
              <span>No mint</span>
          </div></el-col> -->
          <el-col :span="24"><div class="grid-content bg-purple-dark fourthlyTitle">
            <span>{{ $t('map.searchland') }}</span>
            <span @click="clickclear">{{ $t('map.atlescontinent') }}</span>
            <!-- <i class="el-icon-question"></i> -->
            <!-- <div v-if="a" style="position: absolute; top: 61px; color: #fff; left: 238px; width: 200px; height: 20px; background: red;"></div> -->
          </div></el-col>
          <!-- <el-col :span="24"><div class="grid-content bg-purple-dark blueTitle">
            <span>{{ $t('map.atlescontinent') }}</span>  
          </div></el-col> -->
          <el-col :span="24"><div class="grid-content bg-purple-dark searchTitle_1">
            <span>{{ $t('map.hyperspacename') }}</span>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchInput_1">
            <input v-model="formData.landName" :placeholder="$t('map.entername')" type="text">
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchTitle_2">
            <span>Token ID</span>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchInput_2">
            <input v-model="formData.tokenId" :placeholder="$t('map.enterid')" type="text">
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchTitle_3">
            <span>{{ $t('map.coordinate') }}: </span>
            <span> ( x, y, at )</span>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchInput_3">
            <input v-model="formData.x" placeholder="x" type="text">
            <span>,</span>
            <input v-model="formData.y" placeholder="y" type="text">
            <span>,</span>
            <span>At</span>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark searchButton">
            <button @click="clickScreach">{{ $t('map.screach') }}</button>
          </div></el-col>
          <!-- <el-col :span="24"><div class="grid-content bg-purple-dark lastTitle">{{ $t('map.quantity') }}</div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark saleNum">
            <span>2541</span>  
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark lastTitle">{{ $t('map.countdown') }}</div></el-col>
          <count-down endTime="1642147200000" :callback="callback" endText="出售中 · · ·"></count-down> -->
          <el-col :span="24"><div class="grid-content bg-purple-dark contactNum">
            <p>{{ $t('map.contact') }}</p>
            <a href="https://twitter.com/IVSProtocol" target="_blank"><img src="@/assets/img/tal3.png" alt=""></a>
            <a href="https://discord.com/invite/Dds99EU7um" target="_blank"><img src="@/assets/img/tal1.png" alt=""></a>
            <a href="https://t.me/InfiniteVirtualSpace_Global" target="_blank"><img src="@/assets/img/tal4.png" alt=""></a>
            <a href="https://www.facebook.com/Infinite-Virtual-Space-100504305799877" target="_blank"><img src="@/assets/img/tal2.png" alt=""></a>
          </div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark lastp lastp1"><!-- {{ $t('map.Buyyourown') }} --></div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark lastp"><!-- {{ $t('map.createspace') }} --></div></el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark lastblue"><!-- {{ $t('map.thespace') }} --></div></el-col>
        </el-row>
      </div>

      <div ref="rightOption" class="rightOption">
        <el-col :span="24"><div class="grid-content bg-purple-dark firstTitle">{{ $t('map.information') }}</div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightMapImage">
          <img :src="rightOptionBg" alt="">
        </div></el-col>
        <el-col v-if="stage.stage" :span="24"><div class="grid-content bg-purple-dark secondTitleDef">
          <span>{{ $t('map.insale') }}</span>
        </div></el-col>
        <el-col v-if="!stage.stage" :span="24"><div class="grid-content bg-purple-dark secondTitle">
          <!-- <img src="@/assets/img/redFlag.png" alt=""> -->
          <span>{{ itemDetails.nickName }}</span>
          <!-- <img src="@/assets/img/redFlag.png" alt="">  -->
        </div></el-col>
        <el-col v-if="!stage.stage" :span="24"><div v-html="itemDetails.introduce" class="grid-content bg-purple-dark rightContent">
          
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_1">
          <span>{{ $t('map.coordinate') }}</span>  
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_2">
          <img src="@/assets/img/greenCircle.png" alt="">
          <span>{{ itemDetails.coordinate }}</span>
          <img @click="seccendCopy" src="@/assets/img/clamp.png" alt="">  
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_3">
          <span>{{ $t('map.properties') }}</span>  
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_4">
          <img src="@/assets/img/yellowBook.png" alt="">
          <span>{{ itemDetails.properties }}</span>
          <span> ( {{ $t('map.level') }} )</span> 
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_5">
          <span>{{ $t('map.size') }}</span>  
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark rightOption_6">
          <img src="@/assets/img/purpleSquares.png" alt="">
          <span>{{ itemDetails.size }}</span>
          <span>( {{ itemDetails.sizeNum }} {{ $t('map.parcels') }} )</span> 
          <!-- <span>View Spaces</span> -->
        </div></el-col>
        <el-col v-if="!stage.stage" :span="24"><div class="grid-content bg-purple-dark rightLastImage">
          <span>{{ $t('map.address') }}：</span>
        </div></el-col>
        <el-col v-if="!stage.stage" :span="24"><div class="grid-content bg-purple-dark contractadres">
          <span>{{ itemDetails.address }}</span>
          <img @click="copyAddress" src="@/assets/img/clamp.png" alt="">  
        </div></el-col>
        <el-col v-if="!stage.stage" :span="24"><div class="grid-content bg-purple-dark lastContent">
          <span>
            {{ $t('map.holder') }}：
          </span>
        </div></el-col>
        <el-col :span="24"><div class="grid-content bg-purple-dark head">
          <img v-if="!stage.stage" :src="itemDetails.holder.head" alt="">
          <span v-if="!stage.stage">{{ itemDetails.holder.name }}</span>
        </div></el-col>
        <el-col :span="24"><div ref="lastButton" class="grid-content bg-purple-dark lastButton">
          <button>{{ $t('map.buyspace') }}</button>
          <p><!-- {{ $t('map.howspace') }} --></p>
        </div></el-col>
      </div>

      <div ref="topOption" class="topOption">
        <div>
          <div>
            <img class="a" src="@/assets/img/smallMap.png" alt="">
          </div>
          <span class="b">{{ $t('map.atlantis') }}</span>
        </div>
        <div>
          <div>
            <img src="@/assets/img/shanhe.png" alt="">
          </div>
          <span>{{ $t('map.developed') }}</span>
        </div>
        <img @click="showTopMenu(false)" src="@/assets/img/downArrows2.png" alt="">
      </div>

      <div ref="LeftMenu" @click="showLeftMenu" class="showLeftMenu">
        <img :src="leftArrowsImage" alt="">
      </div>
      <div v-if="hideRightMinu" ref="RightMenu" @click="showRightMenu" class="showRightMenu">
        <img :src="rightArrowsImage" alt="">
      </div>
      <div ref="TopMenu" @click="showTopMenu(true)" class="showTopMenu">
        <img src="@/assets/img/downArrows.png" alt="">
      </div>

      <div class="count_down" v-if="showCountdown">
        <div>
          <span>{{ $t('map.countdown') }}</span>
        </div>
        <count-down :endTime="start_sale_at" :callback="callback" endText="出售中 · · ·"></count-down>
        <div class="last">
          <span>{{ $t('map.quantity') }} : </span>
          <span>{{ pre_sale_amount }}</span>
        </div>
      </div>

      <div @click="closeCountdown" v-if="showCountdown" class="close">
        <img src="@/assets/img/close.png" alt="">
      </div>
  </div>
</template>

<script>
import leftArrows from '@/assets/img/leftArrows.png'
import rightArrows from '@/assets/img/rightArrows.png'
import rightAgainst from '@/assets/img/rightAgainst.png'
import leftAgainst from '@/assets/img/leftAgainst.png'
import countDown from '@/views/components/countDown.vue'
import hintImg from '@/assets/img/hint.png'
import locaData from '@/utils/newdata.json'
import { mapState } from 'vuex'
import { selUserinfo, selPresell } from '@/api/map.js'

import putong from '@/assets/img/普通.png'
import xiyou from '@/assets/img/稀有.png'
import fanrong from '@/assets/img/繁荣.png'
import zhongxin from '@/assets/img/中心.png'

export default {
  components: {
    countDown
  },
  props:['blockDetails', 'mapData'],
  data() {
    return {
      value: false, // my space
      inSell: false, // 出售
      showCountdown: true, // 倒计时
      formData: {   // 左侧搜索表单
        landName: '',
        tokenId: '',
        x: '',
        y: ''
      },
      leftshow: true,
      leftArrowsImage: leftArrows,
      rightshow: false,
      hideRightMinu: false, // 右侧菜单按钮启始隐藏
      rightArrowsImage: rightAgainst,
      itemDetails: {
        nickName: '', // 昵称
        introduce: '', // 简介
        coordinate: '', // 坐标
        properties: '', // 品质
        size: '', // 大小
        sizeNum: '', // 大小数量
        address: '', // 地址
        holder: { // 持有者
          head: '',
          name: ''
        },
      },
      onlyOne: true,   // 开始点击方块出现右侧菜单
      stage: {},
      pre_sale_amount: '', // 预售数量
      start_sale_at: 0, // 预售时间
      rightOptionBg: ''
    }
  },
  watch: {
    blockDetails(val) {
      this.stage = val
      console.log(val)
      if (val.stage) {
        for (let i = 0; i < locaData.length; i++) {
          if (val.id == locaData[i].ids) {
            this.itemDetails.coordinate = ` ( ${locaData[i].x} , ${locaData[i].y} )`
            this.itemDetails.properties = locaData[i].color == '#175DEA' ? 'normal' : locaData[i].color == '#5CB6E6' ? 'rare' : locaData[i].color == '#2EC149' ? 'boom' : locaData[i].color == '#E6E202' ? 'centre' : 'normal'
            this.rightOptionBg = locaData[i].color == '#175DEA' ? putong : locaData[i].color == '#5CB6E6' ? xiyou : locaData[i].color == '#2EC149' ? fanrong : locaData[i].color == '#E6E202' ? zhongxin : putong
            this.itemDetails.size = `${locaData[i].volume}*${locaData[i].volume} `
            this.itemDetails.sizeNum = `${locaData[i].volume*locaData[i].volume}`
          }
        }
      } else {
        console.log(this.mapData, val)
        for (var i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].id == val.id) {
            console.log(this.mapData[i])
            this.itemDetails.coordinate = ` ( ${this.mapData[i].X} , ${this.mapData[i].Y} )`
            this.itemDetails.properties = this.mapData[i].level
            this.itemDetails.size = `${Math.sqrt(this.mapData[i].volume)}*${Math.sqrt(this.mapData[i].volume)} `
            this.rightOptionBg = this.mapData[i].image ? this.mapData[i].image : this.mapData[i].level == 'normal' ? putong : this.mapData[i].level == 'rare' ? xiyou : this.mapData[i].level == 'boom' ? fanrong : this.mapData[i].level == 'centre' ? zhongxin : putong
            this.itemDetails.sizeNum = `${this.mapData[i].volume}`
            this.itemDetails.nickName = this.mapData[i].name
            this.itemDetails.introduce = this.mapData[i].description
            this.itemDetails.address = this.mapData[i].owner
            selUserinfo({
              addr: this.mapData[i].owner
            }).then((val) => {
              if (val.code == 0) {
                this.itemDetails.holder.name = val.data.nickname
                this.itemDetails.holder.head = val.data.avatar
              }
            })
          }
        }
      }
      

      // 右侧菜单启始点击出现
      if (this.onlyOne) {
        this.hideRightMinu = true
        this.showRightMenu()
        this.onlyOne = false
      }
    }
  },
  computed: {
    ...mapState(["ConnectWalletID"])
  },
  created() {
    selPresell().then((val) => {
      this.pre_sale_amount = val.pre_sale_amount
    })
  },
  mounted() {
    this.itemDetails.address = this.ConnectWalletID
  },
  methods: {
    // 显示隐藏左菜单
    showLeftMenu() {
      if (this.leftshow) {
        let tag = 0
        let tag2 = 360
        let time = setInterval(() => {
          if (tag <= -360) {
            clearInterval(time)
            return
          }
          this.$refs.leftOption.style.left = `${tag - 10}px`;
          this.$refs.LeftMenu.style.left = `${tag2 - 10}px`;
          tag -= 10
          tag2 -= 10
        },0)
      } else {
        let tag = -360
        let tag2 = 0
        let time = setInterval(() => {
          if (tag >= 0) {
            clearInterval(time)
            return
          }
          this.$refs.leftOption.style.left = `${tag + 10}px`;
          this.$refs.LeftMenu.style.left = `${tag2 + 10}px`;
          tag += 10
          tag2 += 10
        },0)
      }
      this.leftshow = !this.leftshow
      this.leftArrowsImage = this.leftArrowsImage == leftArrows ? leftAgainst : leftArrows
    },
    // 显示隐藏右菜单
    showRightMenu() {
      if (this.rightshow) {
        let tag = 0
        let tag2 = 360
        let time = setInterval(() => {
          if (tag <= -360) {
            clearInterval(time)
            return
          }
          this.$refs.rightOption.style.right = `${tag - 10}px`;
          this.$refs.lastButton.style.right = `${tag - 10}px`;
          this.$refs.RightMenu.style.right = `${tag2 - 10}px`;
          tag -= 10
          tag2 -= 10
          this.onlyOne = true
        },0)
      } else {
        let tag = -360
        let tag2 = 0
        let time = setInterval(() => {
          if (tag >= 0) {
            clearInterval(time)
            return
          }
          this.$refs.rightOption.style.right = `${tag + 10}px`;
          this.$refs.lastButton.style.right = `${tag + 10}px`;
          this.$refs.RightMenu.style.right = `${tag2 + 10}px`;
          tag += 10
          tag2 += 10
        },0)
      }
      this.rightshow = !this.rightshow
      this.rightArrowsImage = this.rightArrowsImage == rightAgainst ? rightArrows : rightAgainst
    },
    // 显示隐藏上菜单
    showTopMenu(val) {
      if (val) {
        let tag = -40
        let time = setInterval(() => {
          if (tag >= 60) {
            clearInterval(time)
            return
          }
          this.$refs.topOption.style.top = `${tag + 10}px`;
          tag += 10
        },0)
      } else {
        let tag = 60
        let time = setInterval(() => {
          if (tag <= -40) {
            clearInterval(time)
            return
          }
          this.$refs.topOption.style.top = `${tag - 10}px`;
          tag -= 10
        },0)
      }
    },
    // 开启倒计时
    callback(val) {
      if (val == 0) this.showCountdown = false
    },
    // 开启关闭我的地图
    mySpaceChange(val) {
      if (val == true) this.inSell = false
      this.$emit('clickMySplace', this.value)
    },
    // 点击出售中
    clickInSell (val) {
      if (val == true) this.value = false
      this.$emit('clickInSales', this.inSell)
    },
    // 点击搜索
    clickScreach() {
      if (this.formData.landName == '' && this.formData.tokenId == '' && (this.formData.x == '' || this.formData.y == '')) {
        this.$Hint('Search criteria cannot be empty !', '2000', hintImg)
      } else {
        this.inSell = false
        this.value = false
        this.$emit('clickSearch', this.formData)
      }
    },
    // 复制坐标
    seccendCopy() {
      let that = this
      this.$copyText(this.itemDetails.coordinate).then(
        (e) => {
          that.$message.success('复制成功！')
        },
        (e) => {
          that.$message.error('复制失败！')
        }
      )
    },
    // 复制地址
    copyAddress() {
      let that = this
      this.$copyText(this.itemDetails.address).then(
        (e) => {
          that.$message.success('复制成功！')
        },
        (e) => {
          that.$message.error('复制失败！')
        }
      )
    },
    // 关闭倒计时 
    closeCountdown() {
      this.showCountdown = false
    },
    // 点击清空
    clickclear() {
      this.formData.landName = ''
      this.formData.tokenId = ''
      this.formData.x = ''
      this.formData.y = ''
    }
  }
}
</script>

<style lang="less" scoped>
.optionBox {
  font-family: Avenir;
  .leftOption {
    width: 360px;
    height: 100%;
    background: #1C232B;
    position: fixed;
    left: 0;
    z-index: 2;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;    
      /*height: 4px;*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
    .firstTitle {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      color: #fff;
      font-weight: 700;
      box-shadow: 0px 5px 6px #000;
    }
    .leftMapImage {
      margin-top: 2px;
      height: 150px;
      padding: 14px 30px 16px;
      img {
        width: 299px;
        height: 144px;
        border-radius: 10px;
      }
    }
    .secondTitle {
      font-size: 24px;
      color: #fff;
      font-weight: 500;
    }
    .colorIdentification_1 {
      padding-top: 16px;
      display: flex;
      div {
        margin-left: 30px;
        background: #175DEA;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 4px;
      }
      span {
        color: #C1C1CC;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .colorIdentification_2 {
      padding-top: 16px;
      display: flex;
      div {
        background: #5CB6E6;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        margin-left: 30px;
        border-radius: 4px;
        // margin-left: -18px;
      }
      span {
        color: #C1C1CC;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .colorIdentification_3 {
      padding-top: 27px;
      padding-bottom: 22px;
      border-bottom: 1px solid #171B21;
      display: flex;
      div {
        background: #2EC149;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 4px;
        margin-left: 30px;
      }
      span {
        color: #C1C1CC;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .colorIdentification_4 {
      padding-top: 27px;
      padding-bottom: 22px;
      border-bottom: 1px solid #171B21;
      display: flex;
      div {
        margin-left: 30px;
        background: #E6E202;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 4px;
      }
      span {
        color: #C1C1CC;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .mySpace1 {
      padding-top: 17px;
      padding-bottom: 20px;
      div:first-child {
        margin-left: 30px;
        float: left;
        background: #FF9F07;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 4px;
      }
      span {
        margin-right: 10px;
        font-size: 20px;
        width: 135px;
        color: #fff;
        font-weight: 500;
        display: inline-block;
        text-align: left;
      }
    }
    .mySpace2 {
      padding-top: 17px;
      padding-bottom: 20px;
      border-bottom: 1px solid #171B21;
      div:first-child {
        margin-left: 30px;
        float: left;
        background: #FFFFFF;
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 4px;
      }
      span {
        margin-right: 10px;
        font-size: 20px;
        width: 135px;
        color: #fff;
        font-weight: 500;
        display: inline-block;
        text-align: left;
      }
    }
    .thirdlyTitle {
      padding-top: 20px;
      font-size: 24px;
      color: #fff;
      font-weight: 500;
    }
    .leftMultiple_1 {
      padding-top: 10px;
      padding-bottom: 17px;
      border-bottom: 1px solid #171B21;
      display: flex;
      div {
        color: #fff;
        width: 20px;
        height: 20px;
        display: inline-block; 
        border: 1px solid #2F3441;
        margin-left: 30px;
        // margin-left: -22px;
        vertical-align: middle;
        cursor: pointer;
        i {
          width: 21px;
          height: 21px;
          line-height: 20px;
          background: #17A1FF;
        }
      }
      span {
        margin-left: 10px;
        vertical-align: top;
        color: #fff;
        font-size: 19px;
        font-weight: 500;
      }
    }
    .leftMultiple_2 {
      padding-top: 10px;
      padding-bottom: 17px;
      border-bottom: 1px solid #171B21;
      div {
        color: #fff;
        width: 20px;
        height: 20px;
        display: inline-block; 
        border: 1px solid #2F3441;
        margin-left: 25px;
        vertical-align: middle;
        cursor: pointer;
        i {
          width: 21px;
          height: 21px;
          line-height: 20px;
          background: #17A1FF;
        }
      }
      span {
        margin-left: 10px;
        vertical-align: middle;
        color: #84848D;
        font-size: 20px;
        font-weight: 500;
      }
    }
    .fourthlyTitle {
      padding-top: 20px;
      text-align: left;
      padding-left: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 45px;
      span {
        font-size: 24px;
        color: #fff;
        font-weight: 500;
      }
      i {
        color: #AEAFBA;
        width: 20px;
        height: 20px;
        margin-right: -99px;
        margin-left: 71px;
        font-size: 20px;
      }
      span:last-child {
        border: 1px solid #17A1FF;
        border-radius: 10px;
        height: 15px;
        padding: 2px 10px;
        color: #17A1FF;
        font-size: 12px;
        margin-left: 50px;
        margin-top: 7px;
        cursor: pointer;
      }
    }
    .blueTitle {
      padding-top: 8px;
      padding-bottom: 18px;
      text-align: center;
      span {
        border: 1px solid #17A1FF;
        border-radius: 10px;
        padding: 2px 10px;
        color: #17A1FF;
        font-size: 12px;
      }
    }
    .searchTitle_1 {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      padding-bottom: 10px;
      text-align: left;
      span {
        padding-left: 30px;
        // margin-left: -70px;
      }
    }
    .searchInput_1 {
      input {
        width: 299px;
        height: 40px;
        background: #1C232B;
        border-radius: 5px;
        border: 1px solid #2F3441;
        padding-left: 10px;
        color: #fff;
        outline:none;
        font-style: oblique;
      }
    }
    .searchTitle_2 {
      padding-top: 20px;
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      padding-bottom: 10px;
      text-align: left;
      span {
        padding-left: 30px;
      }
    }
    .searchInput_2 {
      input {
        width: 299px;
        height: 40px;
        background: #1C232B;
        border-radius: 5px;
        border: 1px solid #2F3441;
        padding-left: 10px;
        color: #fff;
        outline:none;
        font-style: oblique;
      }
    }
    .searchTitle_3 {
      padding-top: 20px;
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      padding-bottom: 10px;
      text-align: left;
      span:first-child {
        padding-left: 30px;
      }
      span:last-child {
        color: #C1C1CC;
      }
    }
    .searchInput_3 {
      padding-bottom: 30px;
      input {
        width: 70px;
        height: 40px;
        background: #1C232B;
        border-radius: 5px;
        border: 1px solid #2F3441;
        display: inline-block;
        color: #fff;
        outline:none;
        text-align: center;
      }
      input:first-child {
        margin-left: -37px;
      }
      span {
        padding: 0 15px;
        color: #84848D;
      }
    }
    .searchButton {
      padding-bottom: 20px;
      border-bottom: 1px solid #171B21;
      button {
        width: 299px;
        height: 40px;
        background: linear-gradient(228deg, #2848FF 0%, #17A1FF 100%);
        opacity: 1;
        border-radius: 20px;
        border: 0;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
    }
    .lastTitle {
      font-size: 24px;
      color: #fff;
      font-weight: 500;
      padding-left: 30px;
      text-align: left;
      padding-bottom: 16px;
    }
    .saleNum {
      color: #fff;
      font-weight: 700;
      font-size: 24px;
      padding-bottom: 30px;
    }
    .lastp {
      color: #C1C1CC;
      font-size: 16px;
      margin-top: 5px;
    }
    .lastp1 {
      padding-top: 30px;
    }
    .lastblue {
      color: #396AFC;
      font-size: 13px;
      padding-top: 10px;
      padding-bottom: 50px;
    }
    .contactNum {
      padding-top: 17px;
      p {
        margin: 0;
        font-size: 18px;
        font-family: Avenir;
        font-weight: 500;
        line-height: 25px;
        color: #FFFFFF;
        text-align: left;
        padding-left: 30px;
        padding-bottom: 20px;
      }
      a {
        width: 30px;
        height: 30px;
        float: left;
        display: inline-block;
        margin-left: 45px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .rightOption {
    width: 360px;
    height: 100%;
    background: #1C232B;
    position: fixed;
    right: -360px;
    z-index: 2;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 4px;    
      /*height: 4px;*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
    .firstTitle {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      color: #fff;
      font-weight: 700;
      box-shadow: 0px 5px 6px #000;
    }
    .rightMapImage {
      margin-top: 2px;
      height: 224px;
      padding: 14px 30px 16px;
      img {
        // width: 300px;
        height: 224px;
        border-radius: 10px;
      }
    }
    .secondTitleDef {
      font-size: 24px;
      color: #17A1FF;
      font-weight: Medium;
      text-align: left;
      padding-left: 30px;
      font-family: Avenir;
      padding-bottom: 13px;
      border-bottom: 1px solid #171B21;
    }
    .secondTitle {
      font-size: 24px;
      color: #fff;
      font-weight: 500;
      text-align: left;
      padding-left: 30px;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
    }
    .rightContent {
      font-size: 16px;
      color: #84848D;
      padding: 12px 30px 16px;
      text-align: left;
      border-bottom: 1px solid #171B21;
    }
    .rightOption_1, .rightOption_3, .rightOption_5 {
      font-size: 16px;
      color: #84848D;
      padding-top: 12px;
      text-align: left;
      padding-bottom: 13px;
      span {
        padding-left: 30px;
      }
    }
    .rightOption_2 {
      text-align: left;
      padding-left: 30px;
      img:first-child {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
      span {
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
      }
      img:last-child {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 120px;
        cursor: pointer;
      }
    }
    .rightOption_4 {
      text-align: left;
      padding-left: 30px;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
      span:nth-child(2){
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
        padding-left: 10px;
      }
      span:nth-child(3) {
        font-size: 16px;
        vertical-align: middle;
        color: #84848D;
      }
    }
    .rightOption_6 {
      text-align: left;
      padding-left: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #171B21;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
      span:nth-child(2){
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
        padding-left: 10px;
      }
      span:nth-child(3) {
        font-size: 16px;
        vertical-align: middle;
        color: #84848D;
      }
      span:nth-child(4) {
        font-size: 16px;
        color: #84848D;
        vertical-align: bottom;
        border: 1px solid #17A1FF;
        border-radius: 20px;
        padding: 4px 18px;
      }
    }
    .rightLastImage {
      color: #fff;
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      padding-top: 15px;
      padding-bottom: 20px;
      span {
        padding-left: 30px;
      }
    }
    .contractadres {
      text-align: left;
      padding-left: 30px;
      padding-bottom: 18px;
      span {
        color: #84848D;
        font-size: 20px;
        vertical-align: middle;
        width: 212px;
        overflow: hidden;
        display: inline-block;
      }
      img:last-child {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 35px;
        cursor: pointer;
        display: inline-block;
      }
    }
    .lastContent {
      color: #fff;
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      padding-top: 15px;
      padding-bottom: 20px;
      span {
        padding-left: 30px;
      }
    }
    .head {
      text-align: left;
      padding-left: 30px;
      padding-bottom: 245px;
      span {
        color: #eee;
        font-size: 20px;
        vertical-align: middle;
        margin-left: 18px;
      }
      img {
        width: 70px;
        height: 70px;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
    .lastButton {
      background: #000;
      height: auto;
      padding-bottom: 40px;
      position: fixed;
      right: -360px;
      bottom: 0;
      width: 360px;
      button {
        margin-top: 30px;
        width: 300px;
        height: 60px;
        background: linear-gradient(219deg, #2848FF 0%, #17A1FF 100%);
        background: #393E46;
        opacity: 1;
        border-radius: 10px;
        border: 0;
        color: #EEEEEE;
        font-size: 20px;
        cursor: pointer;
      }
      p {
        font-size: 13px;
        margin-top: 17px;
        color: #396AFC;
      }
    }
  }

  .topOption {
    width: 500px;
    height: 100px;
    background: #292643;
    position: fixed;
    top: -40px;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    border-radius: 10px;
    display: flex;
    &>img {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
    &>div {
      flex: 1;
      padding-top: 10px;
      div {
        margin: 0 auto;
        width: 180px;
        height: 55px;
        margin-bottom: 5px;
        overflow: hidden;
        border-radius: 5px;
        img {
          width: 100%;
          height: 100%;
        }
        .a {
          width: 100%;
          height: 160%;
          margin-top: -15px;
        }
      }
      span {
        color: #fff;
      }
    }
    .b {
      color: #17A1FF;
    }
  }

  .showLeftMenu {
    position: absolute;
    top: 60px;
    width: 50px;
    height: 60px;
    left: 360px;
    z-index: 1;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .showRightMenu {
    position: absolute;
    top: 60px;
    width: 50px;
    height: 60px;
    right: 0px;
    z-index: 1;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .showTopMenu {
    position: absolute;
    top: 60px;
    width: 80px;
    height: 26px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    border-radius: 5px;
    background: #494853;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    img {
      padding-top: 6px;
    }
  }

  .count_down {
    width: 360px;
    height: 245px;
    position: fixed;
    left: 360px;
    top: 115px;
    background: rgba(37, 42, 54, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    z-index: 3;
    div:first-child {
      font-size: 24px;
      color: #fff;
      padding-top: 20px;
      padding-bottom: 18px;
    }
    .last {
      margin-bottom: -16px;
      color: #fff;
      font-size: 24px;
    }
  }
  .close {
    width: 25px;
    height: 25px;
    z-index: 3;
    position: fixed;
    left: 715px;
    top: 97px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>