import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    ConnectWalletID: localStorage.getItem('ConnectWalletID') || '',
    WalletName: localStorage.getItem('WalletName') || '',
    AllNftList: localStorage.getItem('AllNftList') || '',
    signature: localStorage.getItem('signature') || '',
    hash: localStorage.getItem('hash') || '',
  },
  mutations: {
    setConnectWallet: (state, info) => {
      state.ConnectWalletID = info.address;
      state.WalletName = info.name;
      localStorage.setItem('ConnectWalletID', info.address);
      localStorage.setItem('WalletName', info.name);
    },
    setHashValue: (state, info) => {
      state.signature = info.signature;
      state.hash = info.hash;
      localStorage.setItem("signature", info.signature);
      localStorage.setItem("hash", info.hash);
    },
    Logout: (state) => {
      state.ConnectWalletID = '';
      state.WalletName = '';
      localStorage.clear();
    },
    // getAllNftList: (state: permissionStateTypes, data) => {
    //   state.AllNftList = data;
    //   localStorage.setItem('AllNftList', data);
    // },
  },
  actions: {
    connectWallet({ commit }, info) {
      commit('setConnectWallet', info);
    },
    setHash({ commit }, info) {
      commit('setHashValue', info);
    },
    Logout({ commit }) {
      commit('Logout');
    },
    // async getAllNftList({ commit }) {
    //   var data = (await getNftList()).data;
    //   commit('getAllNftList', JSON.stringify(data));
    // },
  },
  getters: {
    getConnectWalletID(state) {
      return state.ConnectWalletID;
    },
    getWalletName(state) {
      return state.WalletName;
    },
    // getAllNftList(state: permissionStateTypes) {
    //   return state.AllNftList;
    // },
    getSignature(state) {
      return state.signature;
    },
    getHash(state) {
      return state.hash;
    },
  },
});

