import React from "react"
import Home from './home/index'
import Price from './price/index'
import Setting from './setting/index'
import CheckIn from './checkin/index'
import Booking from './booking/index'
import Customer from './customer/index'


const routes = [{
  path: '/',
  name: '首页',
  component: () => <Home/>
},{
  path: '/price',
  name: '价格管理',
  component: () => <Price/>
},{
  path: '/setting',
  name: '信息设置',
  component: () => <Setting/>
},{
  path: '/checkin',
  name: '入住登记',
  component: () => <CheckIn/>
},{
  path: '/booking',
  name: '预定中心',
  component: () => <Booking/>
},{
  path: '/customer',
  name: '客户管理',
  component: () => <Customer/>
}]

export default routes
