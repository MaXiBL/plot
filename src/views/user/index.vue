<template>
  <div class="pC">
    <div class="main">
      <div class="title"><span><!-- {{ $t("user.titleUser1") }} --></span> {{ $t("user.titleUser1") }}{{ $t("user.titleUser2") }}</div>
      <div class="box">
        <div class="avter">
          <el-upload
            class="avatar-uploader"
            :action="'http://192.168.90.122:3342' + '/api/upload'"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="userData['avatar']"
              :src="userData['avatar']"
              class="avatar"
            />
            <img
              v-else
              class="avatar"
              src="../../assets/img/x_头像@2x.png"
              alt=""
            />
          </el-upload>
          <div class="modify" @click="nicknameInput">
            {{ $t("user.modify") }}
          </div>
        </div>
        <div class="font">
          <div class="fonta">
            <div class="ff">{{ $t("user.name") }}</div>
            <div class="rightf">
              <el-input
                v-model="userData.nickname"
                placeholder="Please input"
                maxlength="18"
              ></el-input>
              <div
                class="modify"
                @click="nicknameInput"
                v-clipboard:copy="userData.address"
                v-clipboard:success="userData.address"
              >
                {{ $t("user.modify") }}
              </div>
            </div>
          </div>
          <div class="fontb">
            <div class="ff">{{ $t("user.Address") }}</div>
            <div class="rightf">
              <div class="fbg">
                {{ userData.address }}
              </div>

              <img
                v-clipboard:copy="userData.address"
                v-clipboard:success="clipboardSuccess"
                class="fuzhi"
                src="../../assets/img/fuzhilianjiexian@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserinfo, userinfoUpdate } from "@/api/user.js";
import clipboard from "../../directives/clipboard/index.js";
import headTop from "../components/header.vue";
import tab from "../components/tab.vue";
import cards from "../components/cards.vue";
import { mapState } from "vuex";

export default {
  components: {
    headTop,
    tab,
    cards,
  },
  data() {
    return {
      baseURL: "http://192.168.90.122:3342",
      userData: { avatar: "" },
    };
  },
  directives: {
    clipboard,
  },
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  watch: {
    ConnectWalletID(val) {
      console.log("sadg");
      if (!this.ConnectWalletID) {
        this.userData = {
          avatar: "",
        };
      } else {
        getUserinfo().then((res) => {
          this.userData = res.data;
        });
      }
    },
  },

  mounted() {
    getUserinfo().then((res) => {
      this.userData = res.data;
    });
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: "Copy successfully",
        type: "success",
        duration: 1500,
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是JPEG和PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过5MB!");
      }
      return isJPG && isLt2M;
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
      this.sumbitData();
    },
    nicknameInput() {
      if (!this.userData.nickname && !this.userData.avatar) {
        this.$message({
          message: "Avatar or nickname cannot be empty",
          type: "warning",
        });
        return;
      }
      if (this.ConnectWalletID) {
        this.getSign();
      }
    },
    async sumbitData() {
      var params = {
        nickname: this.userData["nickname"],
        avatar: this.userData["avatar"],
      };
      await userinfoUpdate(params).then((res) => {
        this.$message({
          message: this.$t('user.modifySuccess'),
          type: "success",
        });
        this.$emit("modifyUser", params);
      });
    },
    handleAvatarSuccess(res, file) {
      console.log();
      this.userData["avatar"] = res.data[0] || URL.createObjectURL(file.raw);
    },
  },
};
</script>
<style   scoped lang="less">
.main {
  width: 1368px;
  margin: auto;

  .title {
    display: flex;
    margin: 64px 0 46px 0;
    font-size: 38px;
    font-weight: 900;
    line-height: 52px;
    color: #ffffff;
    opacity: 1;
    text-align: left;
    span {
      color: #17a1ff;
    }
  }
  .box {
    display: flex;
    width: 100%;
    height: 335px;
    box-sizing: border-box;
    padding: 50px 90px;
    background: rgba(37, 42, 54, 0.39);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
    opacity: 1;
    border-radius: 20px;
    .avter {
      position: relative;
      display: inline-block;
      width: 150px;
      height: 150px;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      img {
        border: 1px solid #17a1ff;
        width: 150px;
        height: 150px;
        overflow: hidden;
        border-radius: 50%;
      }

      .modify {
        position: absolute;
        bottom: -50px;
        font-size: 16px;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(72deg, #17a1ff 0%, #2848ff 100%);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        width: 118px;
        height: 30px;
        // border: 1px solid #17a1ff;
        border-radius: 15px;
      }
    }
    .font {
      // background-color: chartreuse;
      margin-left: 90px;
      text-align: left;
      .fonta {
        position: relative;
        display: flex;
        align-items: center;
        height: 46px;
        margin-top: 18px;
        .rightf {
          display: flex;
          align-items: center;
          margin-left: 16px;
          .fbg {
            margin-top: 8px;
            font-size: 20px;
            color: #c1c1cc;
          }

          .modify {
            cursor: pointer;
            position: absolute;
            right: 0;
            font-size: 16px;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            width: 118px;
            height: 30px;
            border: 1px solid #17a1ff;
            border-radius: 20px;
          }
        }
      }
      .fontb {
        display: flex;
        align-items: center;
        margin-top: 45px;
        .rightf {
          display: flex;
          align-items: center;
          padding: 10px 26px;
          border-radius: 10px;
          background: #282e36;
          .fbg {
            display: flex;
            align-items: center;
            display: block;
            width: 629px;
            font-size: 20px;
            font-family: Avenir;
            font-weight: normal;
            color: #c1c1cc;
            opacity: 1;
            border-radius: 10px;
          }
          .fuzhi {
            width: 20px;
            height: 20px;
            float: right;
            cursor: pointer;
          }
        }
      }

      .ff {
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .imgBtn {
    }
  }
}
</style>
<style>
.pC .el-input__inner {
  background: transparent !important;
  /* border: none !important; */
  border: 1px solid #2f3441 !important;
  margin-top: 8px;
  font-size: 20px;
  color: #c1c1cc;
  /* padding: 0; */
}
</style>
