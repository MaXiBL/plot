import axios from '@/utils/request.js'

// 查询土地列表
export const getUserinfo = async (data) => {
    return await axios({
      url: '/api/userinfo',
      method: 'get',
      data
    })
}


// 查询土地列表
export const userinfoUpdate = async (data) => {
  return await axios({
    url: '/api/userinfo/update',
    method: 'post',
    data
  })
}