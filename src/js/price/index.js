import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon } from 'antd'

// 价格设置（预定价格，预定折扣，计时最低价格）
class Price extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '房间类型',
        dataIndex: 'type',
        width: '20%',
        align: 'center'
      },{
        title: '预定价格',
        dataIndex: 'bPrice',
        width: '20%',
        align: 'center'
      },{
        title: '预定折扣',
        dataIndex: 'bDiscount',
        width: '20%',
        align: 'center'
      },{
        title: '计时最低价格',
        dataIndex: 'timeLeft',
        width: '20%',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        align: 'center',
        render: () => (
          <Button type='primary'><Icon type='edit' />修改</Button>
        )
      }],
      loading: true,
      typeList: []
    }
  }
  render () {
    return (
      <div className='container'>
        <h1 className='title'>房型价格管理</h1>
        <div className='pd20'>
          <Table dataSource={this.state.typeList} 
                 columns={this.state.columns}
                 loading={this.state.loading}
                 style={{minHeight: 400}} 
                 bordered={true}></Table>
        </div>
      </div>
    )
  }
}

export default Price