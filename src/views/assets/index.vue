<template>
  <div>
    <div>
      <div class="main">
        <div class="mhead">{{ $t("user.myassets") }}:</div>
        <div class="mMoney">
          <div class="a">
            <img src="../../assets/img/组 224@2x.png" alt="" />
            0 IVST
          </div>
          <div class="hine"></div>
          <div class="b">
            <img src="../../assets/img/组 225@2x.png" alt="" />
            {{ BNB }} BNB
          </div>
          <div class="c">（{{ $t("user.mainnetwork") }}）</div>
        </div>
        <div class="mbdy">
          <tab
            :datas="tabarr"
            @clickSort="clickSort"
            @hecclick="clickCompound"
          ></tab>

          <div class="cardeare">
            <cards
              :datacard="assetsData"
              :type="type"
              @toedits="toedits"
            ></cards>
            <div class="pagination" v-if="total>32">
              <el-pagination
                background
                :page-size="parseInt(count)"
                layout="prev, pager, next"
                :total="total"
                @current-change="changePage"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="" :visible.sync="dialogVisible">
        <div class="hebbmg">
          <div class="diatit">
            <div class="aa">{{ $t("user.compositehyperspace") }}</div>
            <div class="imgs">
              <img src="../../assets/img/蒙版组 31@2x.png" alt="" />
            </div>
            <p class="cc">{{ $t("user.dialog_tit") }}</p>
            <p class="dd">
              {{ $t("user.dialog_tit1") }}
            </p>
            <div class="zuob">
              <span v-for="(item, index) in circulationSpan" :key="index">{{
                item
              }}</span>
            </div>
            <div
              @click="
                circulationTrue = true;
                dialogVisible = false;
              "
              class="dobtns cursor"
            >
              Submit
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 合成确认 -->
      <el-dialog title="" :visible.sync="circulationTrue">
        <div class="hebbmg">
          <div class="diatit">
            <div class="aa1">Block confirmation in progress</div>
            <div class="imgs1">
              <img src="../../assets/img/蒙版组 31@2x.png" alt="" />
            </div>
            <p class="cc1">
              Waiting for block confirmation. It takes about a minute to see
              your hyperspace
            </p>
            <div class="zuob"></div>
            <div @click="clickSubmit" class="dobtns cursor">Submit</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import headTop from "../components/header.vue";
import tab from "../components/tab.vue";
import cards from "../components/cards.vue";
import { getAsstesinfo, landConsolidation } from "@/api/assets.js";
import { mapState } from "vuex";
import hintImg from "@/assets/img/hint.png";
import { walletConnect, webConnect } from "@/utils/connectWallet";

export default {
  components: {
    headTop,
    tab,
    cards,
  },

  data() {
    return {
      type: "Space",
      assetsData: [],
      dialogVisible: false,
      circulationTrue: false,
      BNB: "",
      page: 1,
      total: "",
      count: 32,
      tabarr: [
        {
          name: "Space",
        },
        {
          name: "Hyperspace",
        },
      ],
      datacard: [],
      circulationSpan: [], // 合成时的span坐标
      tmpArr: [],
    };
  },
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  watch: {
    ConnectWalletID(val) {
      if (!this.ConnectWalletID) {
        this.assetsData = {};
        this.BNB = "0";
      } else {
        this.getMoney();
        this.getData();
      }
    },
  },
  mounted() {
    if (this.ConnectWalletID) {
      this.getMoney();
      this.getData();
    }
  },
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  methods: {
    // 改变页码
    changePage(page) {
      this.page = page;
      this.getData();
    },
    async getMoney() {
      if (window.ethereum) {
        const web3 = webConnect;
        var BNB = await web3.eth.getBalance(this.ConnectWalletID);
        this.BNB = web3.utils.fromWei(BNB);
        this.BNB = (this.BNB - 0).toFixed(4)
        console.log("web3.eth.getBalance(addr)", this.BNB);
      }
    },
    getData(type) {
      // super 超空间, normal 正常空间
      if (type == "super") {
        var params = {
          t: type,
          addr: this.ConnectWalletID,
          page: this.page,
          count: this.count,
        };
      } else {
        var params = {
          addr: this.ConnectWalletID,
          page: this.page,
          count: this.count,
        };
      }
      getAsstesinfo(params).then((res) => {
        this.assetsData = res.data;
        this.total = res.total;
      });
    },
    clickSort(type) {
      this.type = type;
      if (this.ConnectWalletID) {
        this.assetsData = []
        this.getData(type == "Hyperspace" ? "super" : "");
      }
    },
    toedits(item) {
      this.$router.push({
        name: "assetsDetail",
        query: { data: item, type: this.type },
      });
    },
    // 合成检测
    clickCompound() {
      getAsstesinfo({
        t: "normal",
        addr: this.ConnectWalletID,
      }).then((res) => {
        let synthesisX = ""; // 存取可以合并的起始X坐标
        let synthesisY = ""; // 存取可以合并的启始y坐标
        let synthesisNum = ""; // 存取合并方块数量
        if (res.code == 0) {
          // 单独用固定格式存取每个数据的xy坐标用于搜索是否存在
          let newData = res.data.map((item) => {
            return `${item.X},${item.Y}`;
          });
          let tag = false;
          // 检测 9*9 方块
          for (var arr = 0; arr < res.data.length; arr++) {
            var tmpX = res.data[arr].X;
            var tmpY = res.data[arr].Y;
            var num = 0; // 用于计数
            for (var x = 0; x < 9; x++) {
              for (var y = 0; y < 9; y++) {
                if (newData.indexOf(`${tmpX + x},${tmpY + y}`) > -1) {
                  num++;
                } else {
                  break;
                }
              }
            }
            if (num == 81) {
              synthesisX = tmpX;
              synthesisY = tmpY;
              synthesisNum = 81;
              tag = true;
              break;
            }
          }
          if (tag) return false;
          // 检测 7*7 方块
          for (var arr = 0; arr < res.data.length; arr++) {
            var tmpX = res.data[arr].X;
            var tmpY = res.data[arr].Y;
            var num = 0; // 用于计数
            for (var x = 0; x < 7; x++) {
              for (var y = 0; y < 7; y++) {
                if (newData.indexOf(`${tmpX + x},${tmpY + y}`) > -1) {
                  num++;
                } else {
                  break;
                }
              }
            }
            if (num == 49) {
              synthesisX = tmpX;
              synthesisY = tmpY;
              synthesisNum = 49;
              tag = true;
              break;
            }
          }
          if (tag) return false;
          // 检测 5*5 方块
          for (var arr = 0; arr < res.data.length; arr++) {
            var tmpX = res.data[arr].X;
            var tmpY = res.data[arr].Y;
            var num = 0; // 用于计数
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                if (newData.indexOf(`${tmpX + x},${tmpY + y}`) > -1) {
                  num++;
                } else {
                  break;
                }
              }
            }
            if (num == 25) {
              synthesisX = tmpX;
              synthesisY = tmpY;
              synthesisNum = 25;
              tag = true;
              break;
            }
          }
          if (tag) return false;
          // 检测 3*3 方块
          for (var arr = 0; arr < res.data.length; arr++) {
            var tmpX = res.data[arr].X;
            var tmpY = res.data[arr].Y;
            var num = 0; // 用于计数
            for (var x = 0; x < 3; x++) {
              for (var y = 0; y < 3; y++) {
                if (newData.indexOf(`${tmpX + x},${tmpY + y}`) > -1) {
                  num++;
                } else {
                  break;
                }
              }
            }
            if (num == 9) {
              synthesisX = tmpX;
              synthesisY = tmpY;
              synthesisNum = 9;
              tag = true;
              break;
            }
          }
          // 没有可合成的方块
        }
        if (synthesisX != "" && synthesisY != "") {
          this.circulationSpan = [];
          this.tmpArr = [];
          var num = Math.sqrt(synthesisNum);
          for (var x = 0; x < num; x++) {
            for (var y = 0; y < num; y++) {
              this.circulationSpan.push(
                `( ${synthesisX + x} , ${synthesisY + y} , Art ) ,`
              );
              this.tmpArr.push({
                x: synthesisX + x,
                y: synthesisY + y,
              });
            }
          }
          this.dialogVisible = true;
        } else {
          this.$Hint(
            "Insufficient conditions for synthetic hyperspace！",
            "2000",
            hintImg
          );
        }
      });
    },
    // 点击submit
    clickSubmit() {
      getAsstesinfo({
        t: "normal",
        addr: this.ConnectWalletID,
      }).then((res) => {
        if (res.code == 0) {
          let children = [];
          // 对比两组数据坐标相等就获取存取id
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < this.tmpArr.length; j++) {
              if (
                res.data[i].X == this.tmpArr[j].x &&
                res.data[i].Y == this.tmpArr[j].y
              ) {
                children.push(res.data[i].id);
              }
            }
          }
          landConsolidation({
            children,
          }).then((res) => {
            that.$message.success("Merger success ！");
          });
        }
      });
    },
  },
};
</script>
<style   scoped lang='less'>
.mbdy {
  padding-bottom: 40px;
}
.main {
  width: 1200px;
  margin: auto;
  .mhead {
    margin-top: 52px;
    text-align: left;
    span {
      color: #17a1ff;
    }
    font-size: 38px;
    font-weight: 900;
    line-height: 52px;
    color: #ffffff;
  }
  .mMoney {
    margin-top: 16px;
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: 500;
    color: #ffbf36;
    opacity: 1;
    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    .hine {
      margin: 0 25px;
      width: 1px;
      height: 21px;
      border: 1px solid #2a2e34;
      opacity: 1;
    }
    .c {
      margin-left: 10px;
      font-size: 16px;
      font-family: Avenir;
      font-weight: normal;
      color: #17a1ff;
      opacity: 1;
    }
  }
}
.pagination {
  margin-top: 100px;
}
.diatit {
  .aa {
    font-size: 28px;
    color: #ffffff;
    margin-bottom: 19px;
  }
  .aa1 {
    font-size: 28px;
    color: #ffffff;
    margin-bottom: 75px;
  }
  .imgs {
    margin: 27px auto;
    width: 198px;
    height: 178px;
    img {
      width: 100%;
    }
  }
  .imgs1 {
    margin: 27px auto;
    width: 198px;
    height: 178px;
    margin-bottom: 100px;
    img {
      width: 100%;
    }
  }
  .cc {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 24px;
  }
  .cc1 {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 24px;
    width: 350px;
    margin: 0 auto;
    margin-bottom: 35px;
  }
  .dd {
    font-size: 16px;
    color: #84848d;
  }
}

.zuob {
  margin: 0 auto;
  margin-bottom: 31px;
  display: flex;
  // justify-content: space-evenly;
  flex-wrap: wrap;
  width: 350px;
  padding-left: 80px;
}
.zuob span {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 25px;
  color: #ffbf36;
  opacity: 1;
  margin-bottom: 14px;
  padding: 0 15px;
}
.dobtns {
  margin: auto;
  width: 151px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(228deg, #2848ff 0%, #17a1ff 100%);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  border-radius: 10px;
  color: #ffffff;
}
</style>
<style>
.el-pager li,
.btn-next,
.btn-prev {
  background: #252a36 !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #409eff !important;
  color: #fff;
}
.el-dialog {
  width: 500px;
  height: 700px;
  background: #252a36;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  border-radius: 20px;
}
</style>
