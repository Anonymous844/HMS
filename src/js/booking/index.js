import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon } from 'antd'

// 预定中心
class Booking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '客户名字',
        dataIndex: 'userName',
        align: 'center'
      },{
        title: '联系方式',
        dataIndex: 'telNum',
        align: 'center'
      },{
        title: '预定方式',
        dataIndex: 'method',
        align: 'center'
      },{
        title: '房间类型',
        dataIndex: 'type',
        align: 'center'
      },{
        title: '预定结果',
        dataIndex: 'result',
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
      bookingList: []
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>预定信息管理</h1>
          <Button type='primary' className='add mgr20'><Icon type='plus' />新增</Button>
        </div>
        <div className='pd20'>
          <Table dataSource={this.state.bookingList} 
                 columns={this.state.columns}
                 loading={this.state.loading}
                 style={{minHeight: 400}}
                 bordered={true}></Table>
        </div>
      </div>
    )
  }
}

export default Booking