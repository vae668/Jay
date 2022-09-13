import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// 拦截url 这个方法接受(url, 请求类型, 模板数据||指定的回调函数)
// 这里我们通过模块的方式将回调函数引入
Mock.mock('/home/getData',homeApi.getStatisticalData)
// Mock.mock(/user\/add/,'post',userApi.createUser)
// Mock.mock(/user\/edit/,'post',userApi.updateUser)

Mock.mock(/user\/getUser/,'get',userApi.getUserList)
// Mock.mock(/user\/del/,'get',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)


