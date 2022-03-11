<template>
  <div>
    <div class="heads">
      <div class="head-v1">
        <img src="../../assets/img/组 20275.png" alt="" />
        <div class="maplogo head-v2 cursor" @click="jump">
          <img src="../../assets/img/location-map-svgrepo-com@2x.png" alt="" />
          <span :style="{ color: routeurl == '/' ? '#fff' : '#c1c1cc' }">{{
            $t("head.map")
          }}</span>
        </div>
        <div class="maplogo head-v3 cursor" @click="clickMarket">
          <img src="@/assets/img/conveniencestore.png" alt="" />
          <span
            :style="{ color: routeurl == '/market' ? '#fff' : '#c1c1cc' }"
            >{{ $t("head.market") }}</span
          >
        </div>
        <a
          href="https://infinitevirtualspace.medium.com/"
          target="_blank"
          class="maplogo head-v4 cursor"
        >
          <img src="@/assets/img/new.png" alt="" />
          <span>{{ $t("head.news") }}</span>
        </a>
      </div>
      <div class="right">
        <div class="head-v3">
          <img src="../../assets/img/组 222@2x.png" alt="" />
          <el-dropdown @command="handleCommand"  >
            <div class="dropdown">
              <span class="el-dropdown-link">
                {{ langtype }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </div>

            <el-dropdown-menu class="myStyle" slot="dropdown">
              <el-dropdown-item command="EN">English</el-dropdown-item>
              <el-dropdown-item command="ZH">中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div
          class="usersWallet cursor"
          v-if="!ConnectWalletID"
          @click="drawer = true"
        >
          <img src="../../assets/img/组 223@2x.png" alt="" />
          Wallet Connect
        </div>
        <div
          class="usersWalletb cursor"
          v-if="ConnectWalletID"
          @click="seeWallet()"
        >
          {{ userInfo.nickname || modifyUser.nickname }}
          <img
            v-if="userInfo.avatar || modifyUser.avatar"
            class="avatarImg"
            :src="userInfo.avatar || modifyUser.avatar"
            alt=""
          />
          <img
            v-else
            class="avatarImg"
            src="../../assets/img/x_头像@2x.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <el-drawer
      custom-class="userWallet"
      title="我是标题"
      direction="rtl"
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="boxDrawer">
        <div class="a"><span>C</span>onnect your Wallet</div>
        <div class="b">
          <span>Connect with one of our available</span>
          <span>wallet info providers or create a new one.</span>
        </div>
        <div class="c">
          <div class="wallet walleta" @click="connect('MetaMask')">
            <img src="../../assets/img/图像 31@2x.png" alt="" />
            <div class="modify">MetaMask</div>
          </div>
          <div class="wallet walletb" @click="connect('WalletConnect')">
            <img src="../../assets/img/图像 32@2x.png" alt="" />
            <div class="modify">WalletConnect</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template> 
<script>
import { walletConnect, webConnect } from "@/utils/connectWallet";
import { mapState } from "vuex";
import { selUserinfo } from "@/api/map.js";

export default {
  data() {
    return {
      drawer: false,
      langtype: "English",
      detailContect: false,
      activeRath: "",
      data: {},
      address: "",
      modifyUser: {},
      routeurl: "",
    };
  },
  props: ["userInfo"],
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  watch: {
    ConnectWalletID(val) {
      if (!this.ConnectWalletID) {
        // this.assetsData = {};
        // this.BNB = "_";
      } else {
        this.getUser();
      }
    },
    $route(to) {
      this.routeurl = to.path;
    },
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      this.$i18n.locale = command;
      this.langtype = command == "EN" ? "English" : "中文";
    },
    async connect(name) {
      if (name == "MetaMask") {
        if (window.ethereum) {
          const web3 = webConnect;
          await window.ethereum.enable();
          await window.ethereum.isConnected();
          web3.eth.getAccounts((err, accs) => {
            var address = accs[0].toString();
            this.address = address;
            this.$store.dispatch("connectWallet", { address, name });
            if (this.address) {
              this.getUser();
            }
          });
          this.$message({
            message: "connect Success",
            type: "success",
          });
          this.drawer = false;
          this.detailContect = false;
          this.getUser();
          return;
        } else {
          this.$message({
            message: "请下载MetaMask插件或连接其他钱包",
            type: "error",
          });
          return;
        }
      } else {
        walletConnect(name).then((res) => {
          console.log(res, "[][]");
          console.log("dsgtjsoi", localStorage.getItem("address"));

          if (localStorage.getItem("address")) {
            console.log("hjhjghuihkhui");
            this.getUser();
          }
        });
        this.$message({
          message: "connect Success",
          type: "success",
        });
        this.drawer = false;
        this.detailContect = false;

        return;
      }
    },
    getUser() {
      selUserinfo({
        addr: this.address || this.ConnectWalletID,
      }).then((val) => {
        if (val.code == 0) {
          this.modifyUser = val.data;
          this.$emit("modifyUser", val.data);
        }
      });
    },
    jump() {
      this.$router.push({
        name: "map",
      });
    },
    seeWallet() {
      this.$emit("seeWallet");
    },
    // 点击market
    clickMarket() {
      this.$router.push({
        name: "market",
      });
    },
  },
};
</script>

<style scoped lang='less'>
.heads {
  position: fixed;
  z-index: 1111;
  top: 0;
  width: 100%;
  height: 60px;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  .head-v1 {
    margin-left: 58px;
    img:first-child {
      // width: 128px;
      // height: 40px;
      margin-right: 110px;
      vertical-align: middle;
    }
    .head-v2 {
      display: inline-block;
      margin-right: 90px;
      img {
        width: 27px;
        height: 27px;
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        color: #c1c1cc;
      }
    }
    .head-v3 {
      display: inline-block;
      margin-right: 90px;
      img {
        width: 27px;
        height: 27px;
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        color: #c1c1cc;
      }
    }
    .head-v4 {
      display: inline-block;
      text-decoration: none;
      color: #fff;
      img {
        width: 27px;
        height: 27px;
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        color: #c1c1cc;
      }
    }
    span:hover {
      color: #fff !important;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .head-v3 {
      display: flex;
      align-items: center;
      // width: 80px;
      margin: 0 30px 0 40px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }
      .dropdown {
        cursor: pointer;
      }
    }
    .usersWalletb {
      margin-right: 81px;
      color: #17a1ff;
      font-size: 18px;
      padding: 5px 17px 5px 17px;
      background: #24262c;
      border-radius: 17px 0 0 17px;
      position: relative;
      .avatarImg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -30px;
        background: #171b21;
        border: 1px solid #17a1ff;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        margin-left: 8px;
      }
    }
    .usersWallet {
      margin-right: 30px;
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 34px;
      background: linear-gradient(221deg, #2848ff 0%, #17a1ff 100%);
      opacity: 1;
      border-radius: 17px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}
.myStyle li:hover,.myStyle li:active{
  background: #171b21;
  color:#ffffff;
}
.myStyle {

  background: #171b21;
}
.boxDrawer {
  padding: 43px 0;

  .a {
    padding: 0 53px;
    span {
      color: #17a1ff;
    }
    text-align: left;
    padding-bottom: 22px;
    font-size: 28px;
    font-family: Avenir;
    font-weight: 800;
    line-height: 38px;
    color: #ffffff;
    border-bottom: 1px solid #222733;
  }
  .b {
    padding: 20px 53px 23px 53px;
    text-align: left;
    height: 50px;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    color: #7a7f8b;
    opacity: 1;
  }
  .c {
    padding: 0 53px;
    width: 359px;
    cursor: pointer;
    height: 155px;

    opacity: 1;
    border-radius: 10px;
    .walleta {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-top: 1px solid #222733;
    }
    .walletb {
      border-bottom: 1px solid #222733;

      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .wallet {
      border-left: 1px solid #222733;
      border-right: 1px solid #222733;
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 77px;
      img {
        width: 28px;
        height: 28px;
        margin-right: 18px;
      }
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
    }
    .wallet:hover {
      background: #383952;
    }
  }
}
</style>
<style>

.popper__arrow::after,.popper__arrow {
  border-bottom-color:#171b21 !important;
}

.el-dropdown-menu {
  border: none !important;
}

.el-drawer__body {
  background-color: #000000;
}
.userWallet {
  width: 442px !important;
  top: 60px !important;
  background-color: #000000;
}
.userWalletDetail {
  width: auto !important;
  top: 60px !important;
  background-color: transparent;
}
.el-drawer__body {
  border-radius: 0px 0px 0px 31px !important;
}
/* .userWalletDetailBox .el-drawer__open .el-drawer.rtl {
  border-radius: 0px 0px 0px 31px !important;
}
.userWalletDetailBox .el-drawer__container {
  border-radius: 0px 0px 0px 31px !important;
  height: 248px;
} */
</style>