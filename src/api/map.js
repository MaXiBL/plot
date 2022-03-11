import axios from '@/utils/request.js'

// 查询土地列表
export const selMapList = async (data) => {
    return await axios({
      url: '/api/land/list',
      method: 'get',
      params: data
    })
}

// 查询用户信息
export const selUserinfo = async (data) => {
  return axios({
    url: '/api/userinfo',
    method: 'get',
    params: data
  })
}

// 预售时间跟数量查询
export const selPresell = async (data) => {
  return axios({
    url: '/media/config.json',
    method: 'get',
    params: data
  })
}

// 更新土地信息
export const ediMapinfo = async (data) => {
  return axios({
    url: '/api/tokens/update',
    method: 'post',
    data
  })
}
