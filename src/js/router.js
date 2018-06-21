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
  c: false,
  a: true,
  component: () => <Home/>
},{
  path: '/price',
  name: '价格管理',
  c: false,
  a: true,
  component: () => <Price/>
},{
  path: '/setting',
  name: '信息设置',
  c: false,
  a: true,
  component: () => <Setting/>
},{
  path: '/checkin',
  name: '入住登记',
  c: false,
  a: true,
  component: () => <CheckIn/>
},{
  path: '/booking',
  name: '预定中心',
  c: true,
  a: true,
  component: () => <Booking/>
},{
  path: '/customer',
  name: '客户管理',
  c: false,
  a: true,
  component: () => <Customer/>
}]

export default routes
