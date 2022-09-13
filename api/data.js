
// 所有接口请求
import axios from 'axios'
// 请求菜单
export const getMenu=(param) =>{
    return axios.request({
        url:'/permission/getMenu',
        method: 'post',
        data: param
    })
}
// 请求首页数据
export const getData=() =>{
    return axios.request({
        url:'/home/getData',
        method:'get',
    })
}

export const getUser=(params) =>{
    return axios.request({
        url:'/user/getUser',
        method: 'get',
        params
    })
}