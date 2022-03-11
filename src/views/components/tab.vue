<template>
  <div class="tebs">
    <div class="changes">
      <div
        v-for="(item, index) in datas"
        :key="index"
        :class="{ active: type == item.name }"
        @click="clickSort(item.name)"
      >
        {{ $t(["user.space", "user.hyperspace"][index]) }}
      </div>
    </div>
    <div class="shc" v-show="type == 'Hyperspace' && ConnectWalletID">
      <div class="Composite" @click="hecclick">
        {{ $t("user.compositehyperspace") }}
      </div>
    </div>
  </div>
</template> 
<script>
import { mapState } from "vuex";

export default {
  props: {
    datas: Array,
  },
  data() {
    return {
      type: "Space",
    };
  },
  computed: {
    ...mapState(["ConnectWalletID"]),
  },
  methods: {
    clickSort(name) {
      this.type = name;
      this.$emit("clickSort", name);
    },
    hecclick() {
      this.$emit("hecclick");
    },
  },
};
</script>
<style scoped>
.tebs {
  position: relative;
}
.changes {
  width: 1200px;
  margin: 30px auto 52px;
  display: flex;
  color: #ffffff;
}
.Composite:hover {
  width: 260px;
  height: 50px;
  background: linear-gradient(43deg, #702aff 0%, #d443ff 100%);
  opacity: 1;
  border-radius: 25px;
}
.Composite {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  color: #ffffff;
  width: 260px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  border: 1px solid #782cff;
}
.changes div:hover {
  transform: scale(1.1);
}

.changes div {
  font-size: 24px;
  margin-right: 30px;
  cursor: pointer;
  position: relative;
  padding: 0 36px;
  line-height: 50px;
  height: 50px;
  background: rgba(42, 46, 52, 0.39);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 41px;
}
.active {
  background: linear-gradient(72deg, #17a1ff 0%, #2848ff 100%) !important;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16) !important;
}
</style>