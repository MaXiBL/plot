<template>
  <div class="ImBack">
      <div>
        <!-- <p>Space Market</p> -->
        <img src="@/assets/img/42.png" alt="" />
        <p>Come up Soon</p>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.ImBack {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/交易市场.png") no-repeat;
  background-size: 100% 100%;
  z-index: 99999999999999;
  position: fixed;
  top: 60px;
  left: 0;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p:first-child {
      font-size: 92px;
      font-family: "DIN-BoldItalicAlt";
      font-weight: 400;
      line-height: 112px;
      color: #1655ff;
      opacity: 1;
      font-style: oblique;
      margin: 0;
      margin-bottom: 20px;
    }
    img {
      width: 320px;
      height: 318px;
    }
    p:last-child {
      font-size: 72px;
      font-family: "DIN-BoldItalicAlt";
      font-weight: 400;
      line-height: 87px;
      color: #ffffff;
      opacity: 1;
      font-style: oblique;
    }
  }
}
</style>