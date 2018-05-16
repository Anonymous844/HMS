import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, message, Input, Select } from 'antd'

// 入住登记和结账功能
class CheckIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '客户姓名',
        dataIndex: 'userName',
        align: 'center'
      },{
        title: '房间号码',
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
        dataIndex: 'isPaid_cn',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record, index) => (
          <div>
            <Button type='primary' onClick={() => this.updateFunc(index)} className='mgr30'><Icon type='edit' />修改</Button>
            <Button type='danger' onClick={() => this.delFunc(index)}><Icon type='delete' />删除</Button>
          </div>
        )
      }],
      loading: true,
      checkinList: [],
      checkinObj: {

      }
    }
    this.getList()
  }
  // 获取入住信息
  getList () {
    fetch('/checkin/details', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
      } else if (res.code === 0) {
        message.error(res.code)
      } else if (res.code === 1) {
        let details = []
        res.details.forEach(d => {
          if (d.isDelete) {
            d.key = d.checkId
            d.isPaid_cn = d.isPaid === 0 ? '未结账' : '已结账'
            details.push(d)
          }
        })
        this.setState({checkinList: details})
      }
      this.setState({loading: false})
    })
  }
  // 修改/删除入住信息
  updateList () {
    fetch('/checkin/details', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.checkinObj)
    })
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code === 0) {
        message.error(res.code)
        return false
      } else if (res.code === 1) {
        message.success('success')
      }
      this.setState({loading: false})
      setTimeout(() => this.getList())
    })
  }
  delFunc (index) {
    Modal.confirm({
      title: '提示',
      content: (
        <p>确认删除？</p>
      ),
      onOk: () => {
        let checkinObj = this.state.checkinList[index]
        checkinObj.isDelete = 0
        this.setState({checkinObj: checkinObj})
        setTimeout(() => this.updateList())
      }
    })
  }
  updateFunc (index) {
    let checkinObj = index === undefined ? {isDelete: 1}: this.state.checkinList[index]
    this.setState({checkinObj: checkinObj})
    setTimeout(() => Modal.confirm({
      title: index === undefined ? '新增' : '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>客户姓名</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.userName}
                   onChange={(e) => checkinObj.userName = e.target.value}/>
          </div>
        </div>
      )
    }))
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>入住登记管理</h1>
          <Button type='primary' className='add mgr20' onClick={() => this.updateFunc()}><Icon type='plus'/>新增</Button>
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