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
        age: '33',
        telNumber: '13112345678',
        gender: 'male',
      },{
        key: '3',
        name: 'adam',
        age: '34',
        telNumber: '13112345678',
        gender: 'male',
      },{
        key: '4',
        name: 'adam',
        age: '35',
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
        render: (text, record, index) => <Button type='danger' onClick={() => this.delFunc(index)}>删除</Button>
      }]
    }
  }
  delFunc (index) {
    this.state.userInfo.splice(index, 1)
    let arr = this.state.userInfo
    this.setState({userInfo: arr})
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