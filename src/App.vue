<template>
  <div id="app">
    <v-header
      :userInfo="userInfo"
      @seeWallet="detailContect = !detailContect"
    />
    <div class="mainBox">
      <router-view @modifyUser="modifyUserData" />
    </div>
    <div class="userWalletDetailBox"  v-if="detailContect">
      <!-- <el-drawer
        custom-class="userWalletDetail"
        title=""
        :visible.sync="detailContect"
        :with-header="false"
      > -->
      <div class="moban cursor" @click="detailContect=false"></div>
      <div class="detailContect">
        <div class="li liBg" @click="jump('user')">
          <img src="./assets/img/组 101.png" alt="" />
          Individual Account
        </div>
        <div class="li" @click="jump('assets')">
          <img src="./assets/img/组 102 (2).png" alt="" />
          Assets
        </div>
        <div class="li" @click="signOut">
          <img src="./assets/img/组 103.png" alt="" />
          Sign Out
        </div>
      </div>
      <!-- </el-drawer> -->
    </div>
  </div>
</template>

<script>
import { selUserinfo } from "@/api/map.js";

import header from "../src/views/components/header.vue";
export default {
  components: {
    "v-header": header,
  },
  data() {
    return {
      drawer: false,
      langtype: "",
      detailContect: false,
      activeRath: "",
      userInfo: {},
    };
  },
  watch: {
    $route(to, from) {
      this.activeRath = to.path;
    },
  },
  mounted() {
    selUserinfo({
      addr: this.ConnectWalletID,
    }).then((val) => {
      if (val.code == 0) {
        this.userInfo = val.data;
      }
    });
  },

  methods: {
    modifyUserData(res) {
      console.log('sadsssssg');
      this.userInfo = res;
    },
    signOut() { 
      this.$store.dispatch("Logout");
      this.$message({
        message: "Logout Success",
        type: "success",
      });
      this.detailContect = false;
      return;
    },
    jump(url) {
      if (this.activeRath == "/" + url) return;
      this.detailContect = false;
      this.$router.push({ name: url });
    },
  },
};
</script>

<style lang="less">
.mainBox {
  padding-top: 60px;
}
.moban{
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  z-index: 1112;
}
.detailContect {
  z-index: 11111111111;
  position: fixed;
  top: 60px;
  right: 0px;
  background: #171b21;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  border-radius: 0px 0px 0px 31px;
  .li:last-child {
    border-bottom: none;
  }
  .li {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #ffffff;
    // margin: 0 26px;
    width: 300px;
    text-align: center;
    padding: 26px 0;
    border-bottom: 1px solid #252a36;
    img {
      margin-left: 26px;
      margin-right: 20px;
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #222831;
  min-height: 100%;
}
.userWalletDetailBox{
  background:chartreuse ;
}
.userWalletDetailBox .el-drawer__open .el-drawer.rtl {
  border-radius: 0px 0px 0px 31px !important;
}
.userWalletDetailBox .el-drawer__container {
  border-radius: 0px 0px 0px 31px !important;
  height: 248px;
}

.cursor {
  cursor: pointer;
}
</style>
