import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueKonva from 'vue-konva'
import '@/assets/css/index.css'
import myPlugin from '@/utils/plugin'
import VueClipBoard from 'vue-clipboard2'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import * as filters from './filters/index'

Vue.use(ElementUI, { locale })
Vue.use(myPlugin)
Vue.use(VueClipBoard)
Vue.use(VueKonva)
Vue.use(VueI18n)
// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const i18n = new VueI18n({
  locale: !!localStorage.getItem('lang') || 'EN',    // 语言标识
  messages: {
    'ZH': require('@/language/zh'),   // 中文语言包
    'EN': require('@/language/en')    // 英文语言包
  }
})





Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
