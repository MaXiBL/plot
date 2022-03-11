import axios from 'axios'
import store from '@/store'
import { baseURL } from '@/utils/auth.js'

const instance = axios.create({
  baseURL: 'http://192.168.90.122:3342',
  withCredentials: true,
  transformResponse: [(data) => {
    return data
  }]
})
instance.interceptors.request.use((function(config){
  config.headers.common['x-wallet-addr'] = store.state.ConnectWalletID;
  config.headers.common['x-sign'] = store.state.signature;
  config.headers.common['x-hash'] = store.state.hash;
  return config
}))



instance.interceptors.response.use((data) => {
  return JSON.parse(data.data)
}, (err) => {
  return Promise.reject(err)
})

export default instance
