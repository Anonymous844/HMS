import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon } from 'antd'

// 客户管理功能
class Customer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '客户名字',
        dataIndex: 'userName',
        width: '20%',
        align: 'center'
      },{
        title: '年龄',
        dataIndex: 'age',
        width: '20%',
        align: 'center'
      },{
        title: '性别',
        dataIndex: 'gender',
        width: '20%',
        align: 'center'
      },{
        title: '手机号码',
        dataIndex: 'telNum',
        width: '20%',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        align: 'center',
        render: (text, record, index) => (
          <div>
            <Button type='primary' className='mgr30' onClick={() => this.updateFunc(index)}><Icon type='edit' />修改</Button>            
            <Button type='danger' onClick={() => this.delFunc(index)}><Icon type='delete' />删除</Button>
          </div>
        )
      }],
      loading: false,
      userInfo: [{
        key: '1',
        userName: 'adam',
        age: '32',
        telNum: '13112345678',
        gender: 'male',
      },{
        key: '2',
        userName: 'adam',
        age: '33',
        telNum: '13112345678',
        gender: 'male',
      },{
        key: '3',
        userName: 'adam',
        age: '34',
        telNum: '13112345678',
        gender: 'male',
      },{
        key: '4',
        userName: 'adam',
        age: '35',
        telNum: '13112345678',
        gender: 'male',
      }]
    }
  }
  delFunc (index) {
    this.state.userInfo.splice(index, 1)
    let arr = this.state.userInfo
    this.setState({userInfo: arr})
  }
  updateFunc (index) {
    
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>客户管理功能</h1>
          <Button type='primary' className='add mgr20'><Icon type='plus' />新增</Button>
        </div>
        <div className='pd20'>
          <Table dataSource={this.state.userInfo} 
                 columns={this.state.columns} 
                 loading={this.state.loading} 
                 style={{minHeight: 400}} 
                 bordered={true}/>
        </div>
      </div>
    )
  }
}

export default Customer