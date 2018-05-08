import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination } from 'antd'

// 客户管理功能
class Customer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: [{
        key: '1',
        name: 'adam',
        age: '32',
        telNumber: '13112345678',
        gender: 'male',
      },{
        key: '2',
        name: 'adam',
        age: '32',
        telNumber: '13112345678',
        gender: 'male',
      },{
        key: '3',
        name: 'adam',
        age: '32',
        telNumber: '13112345678',
        gender: 'male',
      },{
        key: '4',
        name: 'adam',
        age: '32',
        telNumber: '13112345678',
        gender: 'male',
      }],
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },{
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },{
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      },{
        title: '手机号码',
        dataIndex: 'telNumber',
        key: 'telNumber'
      },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => <Button type='danger'>删除</Button>
      }]
    }
  }
  render () {
    return (
      <div className='container'>
        <h1 className='title'>客户管理功能</h1>
        <div className='pd20'>
          <Table dataSource={this.state.userInfo} columns={this.state.columns}/>
        </div>
      </div>
    )
  }
}

export default Customer