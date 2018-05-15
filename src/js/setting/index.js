import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon } from 'antd'

// 客房设置功能（客房信息，实际价格，实际折扣，房间状态，是否可用）
class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '房间号',
        dataIndex: 'roomNum',
        align: 'center'
      },{
        title: '房间类型',
        dataIndex: 'type',
        align: 'center'
      },{
        title: '实际价格',
        dataIndex: 'rPrice',
        align: 'center'
      },{
        title: '实际折扣',
        dataIndex: 'rDiscount',
        align: 'center'
      },{
        title: '房间状态',
        dataIndex: 'status',
        align: 'center'
      },{
        title: '是否可用',
        dataIndex: 'useful',
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
      roomList: []
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>房间信息设置</h1>
          <Button type='primary' className='add mgr20'><Icon type='plus' />新增</Button>
        </div>
        <div className='pd20'>
          <Table dataSource={this.state.roomList} 
                 columns={this.state.columns} 
                 loading={this.state.loading} 
                 style={{minHeight: 400}} 
                 bordered={true}></Table>
        </div>
      </div>
    )
  }
}

export default Setting