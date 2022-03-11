import axios from '@/utils/request.js'

// 查询土地列表
export const getAsstesinfo = async (data) => {
    return await axios({
      url: '/api/land/list',
      method: 'get',
      params:data
    })
}


// 查询土地列表
export const getAsstesinfoDetails = async (data) => {
  return await axios({
    url: '/api/tokens/update',
    method: 'post',
    data
  })
}

// 土地合并
export const landConsolidation = async (data) => {
  return await axios({
    url: '/api/land/merge',
    method: 'post',
    data
  })
}
