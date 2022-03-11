<template>
  <div>
    <div class="main detailUser">
      <div class="zcxq" @click="back">
        <i class="el-icon-arrow-left cursor"></i>
        {{ $t("userdetail.back") }}
      </div>
      <div class="bodysa">
        <div class="ddwa">
          <div class="body-l">
            <el-upload
              class="avatar-uploader"
              :action="'http://192.168.90.122:3342' + '/api/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="data.image" :src="data.image" class="imgs" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="btn" @click="onSubmit">Upload logo</div>
          </div>
          <div class="body-2">
            <div class="divs">
              <img src="../../assets/img/组 25.png" alt="" />
              <div>
                <span class="tit">{{ $t("userdetail.coordinate") }}:</span>
                <span class="com"
                  >({{ data.X }},{{ data.Y }},{{ data.category }})</span
                >
              </div>
            </div>
            <div class="divs">
              <img src="../../assets/img/组 94 (2).png" alt="" />
              <div>
                <span class="tit">{{ $t("userdetail.properties") }}:</span>

                <span class="com"> {{ data.level }}</span>
              </div>
            </div>
            <div
              class="divs"
              v-show="type !== 'Space'"
              style="margin-top: 24px"
            >
              <img src="../../assets/img/组 232.png" alt="" />
              <div>
                <span class="tit">{{ $t("userdetail.combination") }}:</span>
                <span @click="clickView" class="view cursor">{{
                  $t("userdetail.view")
                }}</span>
              </div>
            </div>
          </div>
          <div class="body-3">
            <div class="li">
              <div class="tit">{{ $t("userdetail.contractaddress") }}:</div>
              <div class="com">
                {{ data.owner }}
                <img
                  src="../../assets/img/fuzhilianjiexian.png"
                  alt=""
                  @click="copys(data.owner)"
                />
              </div>
            </div>
            <div class="li">
              <div class="tit tit1">{{ $t("userdetail.tokeniD") }}:</div>
              <div class="com">
                {{ data.tokenid }}
                <img
                  src="../../assets/img/fuzhilianjiexian.png"
                  alt=""
                  @click="copys(data.tokenid)"
                />
              </div>
            </div>
          </div>
        </div>
        <el-form
          ref="form"
          :model="data"
          :rules="rules"
          label-width="80px"
          label-position="top"
        >
          <el-form-item :label="$t('userdetail.names')" prop="name">
            <el-input
              v-model="data.name"
              maxlength="30"
              :placeholder="$t('userdetail.pleaseenter')"
              :disabled="!btntxt"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            :label="$t('userdetail.activityform')"
            prop="description"
          >
            <el-input
              :disabled="!btntxt"
              type="textarea"
              maxlength="150"
              :placeholder="$t('userdetail.pleaseenter')"
              v-model="data.description"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="modify" @click="changeEdit" v-if="!btntxt">
              {{ $t("userdetail.modify") }}
            </div>
            <div class="modify" @click="onSubmit" v-if="btntxt">
              {{ $t("userdetail.submit") }}
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tanchaung" v-show="dialogVisible">
      <div class="tankuang">
        <div class="aa">All composite spaces</div>
        <div class="bb">
          <div v-for="(item, index) in circulationSpan" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
        <div @click="dialogVisible = false" class="cc">Close</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAsstesinfoDetails } from "@/api/assets.js";
import cards from "../components/cards.vue";
import { mapState } from "vuex";
export default {
  components: {
    cards,
  },
  data() {
    return {
      btntxt: false,
      fileList: [],
      rules: {
        name: [
          {
            required: true,
            message: this.$t("userdetail.nametit"),
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: this.$t("userdetail.nametit2"),
            trigger: "blur",
          },
        ],
      },

      type: "",
      data: {},
      datacard: [],
      dialogVisible: false,
      circulationSpan: [],
    };
  },
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  watch: {
    ConnectWalletID(val) {
      if (!this.ConnectWalletID) {
        this.data = {};
      }
    },
  },
  mounted() {
    this.data = this.$route.query.data;
    this.type = this.$route.query.type;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.data["image"] = res.data[0] || URL.createObjectURL(file.raw);
    },
    updateData() {
      console.log(this.data, "res");
      getAsstesinfoDetails({
        tokenid: this.data.tokenid,
        name: this.data.name,
        description: this.data.description,
        img: this.data.image,
      }).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    async getSign() {
      const { ethers } = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const domain = {
        name: "Update profile",
        version: "1",
        chainId: 1012,
      };
      const types = {
        Msg: [{ name: "message", type: "string" }],
      };
      const value = {
        message:
          'You are going to update the profile, accept the terms of service by "sign" this message, this nerver cost any of your balance',
      };
      let signature = await signer._signTypedData(domain, types, value);
      let encoder = ethers.utils._TypedDataEncoder;
      let hash = encoder.hash(domain, types, value);
      this.$store.dispatch("setHash", { signature, hash });
      this.updateData();
    },

    onSubmit() {
      if (!this.ConnectWalletID) return;
      this.btntxt = false;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.getSign();
        } else {
          return false;
        }
      });
    },
    changeEdit() {
      this.btntxt = true;
    },
    copys(i) {
      let oInput = document.createElement("input");
      oInput.value = i;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.remove();
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 点击view
    clickView() {
      this.dialogVisible = true;
      this.circulationSpan = [];
      for (let i = 0; i < Math.sqrt(this.data.volume); i++) {
        for (let j = 0; j < Math.sqrt(this.data.volume); j++) {
          this.circulationSpan.push(
            `( ${this.data.X + i}, ${this.data.Y + j}, art )`
          );
        }
      }
    },
  },
};
</script>
<style   scoped lang="less">
.main {
  .avatar {
    width: 100px;
  }
  margin: 40px auto;
  width: 1200px;
  // height: 860px;
  background: rgba(28, 35, 43, 0.39);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  border-radius: 10px;
  .zcxq {
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
    color: #17a1ff;
    opacity: 1;
    width: 100%;
    height: 74px;
    line-height: 74px;
    text-align: left;
    border-bottom: 1px solid #171b21;
    .el-icon-arrow-left {
      padding: 0 0 0 20px;
    }
  }
  .bodysa {
    position: relative;
    padding: 44px 84px;
    .ddwa {
      display: flex;
      align-items: center;
      width: 1031px;
      height: 300px;
      border-radius: 10px;
      border: 1px solid #17a1ff;
      .body-l {
        margin-left: 45px;
        text-align: center;
        .imgs {
          width: 153px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          margin: 20px auto;
          cursor: pointer;
          // margin-top: 10px;
          text-align: center;
          width: 120px;
          height: 30px;
          line-height: 30px;
          background: linear-gradient(72deg, #17a1ff 0%, #2848ff 100%);
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          opacity: 1;
          border-radius: 15px;
          color: #ffffff;
        }
      }
      .body-2 {
        height: 100%;
        padding-top: 68px;
        margin-left: 50px;
        margin-right: 100px;
        img {
          margin-right: 10px;
        }
        div:first-child {
          margin-bottom: 24px;
        }
        .divs {
          display: flex;
          align-items: start;
          div {
            display: flex;
            align-items: start;
            flex-direction: column;
          }
          .view {
            font-size: 16px;
            font-family: Avenir;
            font-weight: normal;
            color: #ffffff;
            opacity: 1;
            width: 120px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #9243ff;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 15px;
          }
          .view:hover {
            background: linear-gradient(43deg, #702aff 0%, #d443ff 100%);
          }
        }
        .tit {
          font-size: 24px;
          color: #ffffff;
          // padding: 0 5px;
          margin-bottom: 10px;
        }
        .com {
          margin-top: 5px;
          font-size: 18px;
          color: #17a1ff;
        }
      }
      .body-3 {
        height: 100%;
        padding-top: 48px;
        .tit {
          line-height: 2;
          text-align: left;
          font-size: 24px;
          color: #ffffff;
        }
        .tit1 {
          margin-top: 6px;
        }
        .com {
          line-height: 2;
          display: flex;
          align-items: center;
          font-size: 18px;
          color: #aeafba;
          img {
            cursor: pointer;
            margin-left: 20px;
          }
        }
      }
    }
    .modify {
      position: absolute;
      right: 0;
      font-size: 16px;
      color: #ffffff;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      width: 118px;
      height: 30px;
      border: 1px solid #17a1ff;
      border-radius: 15px;
    }
    .modify:hover {
      background: linear-gradient(72deg, #17a1ff 0%, #2848ff 100%);
    }
  }
}
.tanchaung {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  .tankuang {
    width: 590px;
    height: 640px;
    background: rgba(37, 42, 54, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    opacity: 1;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .aa {
      width: 100%;
      height: 38px;
      font-size: 28px;
      font-family: Avenir;
      font-weight: 500;
      line-height: 38px;
      color: #ffffff;
      opacity: 1;
      padding: 20px 0;
      border-bottom: 1px solid #171b21;
    }
    .bb {
      // width: 100%;
      height: 395px;
      padding: 20px 0;
      padding-left: 25px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
      div {
        float: left;
        width: 130px;
        height: 53px;
        // border: 1px solid;
        opacity: 1;
        display: inline-block;
        font-size: 20px;
        line-height: 51px;
        color: #fff;
        margin: 0 25px;
        margin-bottom: 35px;
        overflow: hidden;
        border-radius: 5px;
      }
      span {
        // float: left;
        width: 128px;
        height: 50px;
        border: 1px solid;
        opacity: 1;
        display: inline-block;
        font-size: 20px;
        line-height: 51px;
        color: #fff;
        // border-right:1px transparent solid;
        border-image: linear-gradient(to right, #f851be, #8252fb) 1 10;
      }
    }
    .cc {
      width: 120px;
      height: 30px;
      background: linear-gradient(43deg, #702aff 0%, #d443ff 100%);
      opacity: 1;
      border-radius: 25px;
      font-size: 16px;
      color: #fff;
      line-height: 30px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 43px;
      cursor: pointer;
    }
  }
}
</style>
<style >
.detailUser .el-input__inner,
.detailUser .el-textarea__inner {
  border: 1px solid #2f3441 !important;
}
.detailUser .el-form-item__label {
  float: left !important;
  color: #ffffff;
  font-size: 24px;
  margin: 24px 0 10px 0;
}
.el-input__inner,
.el-textarea__inner {
  color: #ffffff;
  background: rgba(28, 35, 43, 0.39) !important;
  border: 1px solid #2f3441;
  opacity: 1;
  border-radius: 4px;
}
.el-textarea__inner {
  height: 157px;
}
.btn .el-upload--text {
  width: 100% !important;
}
.btn span {
  width: 100%;
  display: block;
}
.el-form-item__label:before {
  content: none !important;
}
</style>
