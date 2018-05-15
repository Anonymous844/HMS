import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon } from 'antd'

// 入住登记和结账功能
class CheckIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '客户名字',
        dataIndex: 'userName',
        align: 'center'
      },{
        title: '房间号',
        dataIndex: 'roomNum',
        align: 'center'
      },{
        title: '入住时间',
        dataIndex: 'startTime',
        align: 'center'
      },{
        title: '离店时间',
        dataIndex: 'endTime',
        align: 'center'
      },{
        title: '是否结账',
        dataIndex: 'isPaid',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: () => (
          <div>
            <Button type='primary' className='mgr30'><Icon type='edit' />修改</Button>
            <Button type='danger'><Icon type='delete' />删除</Button>
          </div>
        )
      }],
      loading: true,
      checkinList: []
    }
  }
  addFunc () {
    
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>入住登记管理</h1>
          <Button type='primary' className='add mgr20' onClick={() => this.addFunc()}><Icon type='plus'/>新增</Button>
        </div>
        <div className='pd20'>
          <Table dataSource={this.state.checkinList}
                 columns={this.state.columns}
                 loading={this.state.loading}
                 style={{minHeight: 400}}
                 bordered={true}></Table>
        </div>
      </div>
    )
  }
}

export default CheckIn