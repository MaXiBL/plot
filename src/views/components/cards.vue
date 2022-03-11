<template>
  <div class="cardm">
    <div class="cards" v-for="(item, index) in datacard" :key="index">
      <span class="y1s">
        <div class="yys">
          <i class="el-icon-edit"></i>
          <span @click.stop="toedits(item)">View</span>
        </div>
      </span>

      <div class="imgs">
        <img :src="item.image" alt="" />
      </div>
      <div class="name">Name：{{ item.name | startEncryption }}</div>
      <div class="desp">
        <p v-html="item.description"></p>
      </div>
      <div class="shxing">
        <span class="normal">
          {{ item.level }}
        </span>
        <span class="normal" style="color: #76ff7b">
          ( {{ item.X }}, {{ item.Y }}, {{ item.category }} )
        </span>
      </div>
      <div class="tag" v-show="type == 'Hyperspace'">{{ Math.sqrt(item.volume) }}*{{ Math.sqrt(item.volume) }}</div>
    </div>
  </div>
</template> 
<script>
export default {
  props: {
    datacard: Array,
    type: String,
  },
  data() {
    return {};
  },
  methods: {
    toedits(item) {
      this.$emit("toedits", item);
    },
  },
};
</script>
<style scoped lang='less'>
.cardm {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
.cards:nth-child(4n) {
  margin-right: 0;
}
.cards:hover {
  .y1s {
    display: inline-block;
  }
}
.cards {
  margin-bottom: 14px;
  margin-right: 13.33px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 290px;
  height: 400px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 10px;
  background: #393e46;
  .y1s {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    .yys {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9;
      background: rgba(0, 0, 0, 0.16);
      color: #ffffff;
      span,
      i {
        margin-left: 4px;
        font-size: 24px;
        font-family: Avenir;
        font-weight: normal;
        line-height: 33px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }

  .imgs {
    margin: 27px auto;
    width: 198px;
    height: 178px;
    img {
      width: 100%;
    }
  }
  .name {
    text-align: left;
    font-size: 20px;
    font-family: Avenir;
    font-weight: normal;
    line-height: 27px;
    color: #ffffff;
    opacity: 1;
    margin-bottom: 10px;
  }
  .desp {
    text-align: left;
    font-size: 16px;
    font-family: Avenir;
    font-weight: normal;
    line-height: 22px;
    color: #84848d;
    opacity: 1;
    height: 65px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    p {
      margin: 0;
    }
  }
  .shxing {
    text-align: left;
    margin-top: 14px;
    span {
      padding: 7px 11px;
      background: rgba(55, 58, 66, 0.39);
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.46);
      opacity: 1;
      border-radius: 41px;
      margin-right: 10px;
      font-size: 16px;
      font-family: Avenir;
      font-weight: normal;
      line-height: 22px;
      color: #ffbf36;
      opacity: 1;
    }
  }
  .tag {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: linear-gradient(61deg, #6b29ff 0%, #d443ff 100%);
    opacity: 1;
    border-radius: 16px;
    font-size: 20px;
    color: #ffffff;
  }
}

.cards:nth-child(1n) {
  border: #2848ff 1px solid;
}
.cards:nth-child(2n) {
  border: #8252fb 1px solid;
}
.cards:nth-child(3n) {
  border: #8252fb 1px solid;
}
.cards:nth-child(4n) {
  border: #2848ff 1px solid;
}
// .cards:hover {
//   border: rgba(43, 233, 242, 1) 1px solid;
// }
</style>