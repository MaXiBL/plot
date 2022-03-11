import msgS from '@/plugins/promptDialogBox.js'
export default {
  install (Vue) {
    Vue.prototype.$Hint = (str, time, imgUrl) => {
      msgS(str, time, imgUrl);
    }
  }
}
