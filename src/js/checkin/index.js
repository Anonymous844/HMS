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
      checkinObj: {}
    }
    this.getList()
  }
  // 获取入住信息
  getList () {
    fetch('/api/index.php/checkin/details', {
      method: 'get'
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
      } else if (res.code !== 1) {
        message.error('请重新刷新')
      } else {
        let details = []
        res.details.forEach(d => {
          if (d.isDelete === '1') {
            d.key = d.checkId
            d.isPaid_cn = d.isPaid === '0' ? '未结账' : '已结账'
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
    fetch('/api/index.php/checkin/details', {
      method: 'post',
      body: JSON.stringify(this.state.checkinObj)
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code !== 1) {
        message.error('请重试')
        return false
      } else {
        message.success('success')
      }
      this.setState({loading: true})
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
        checkinObj.isDelete = '0'
        this.setState({checkinObj: checkinObj})
        setTimeout(() => this.updateList())
      }
    })
  }
  updateFunc (index) {
    let checkinObj = index === undefined ? {isDelete: '1'}: this.state.checkinList[index]
    this.setState({checkinObj: checkinObj})
    setTimeout(() => Modal.confirm({
      title: index === undefined ? '新增' : '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>客户姓名</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.userName} disabled={index===undefined?false:true}
                   onChange={(e) => checkinObj.userName = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>房间号码</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.roomNum}
                   onChange={(e) => checkinObj.roomNum = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>入住时间</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.startTime}
                   onChange={(e) => checkinObj.startTime = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>离店时间</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.endTime}
                   onChange={(e) => checkinObj.endTime = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>是否结账</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.checkinObj.isPaid}
                   onChange={(value) => checkinObj.isPaid = value}>
              <Select.Option value='0'>未结账</Select.Option>
              <Select.Option value='1'>已结账</Select.Option>
            </Select>
          </div>
        </div>
      ),
      onOk: () => {
        if (!checkinObj.userName) {
          message.error('请输入用户名字')
          return true
        } else if (!checkinObj.roomNum) {
          message.error('请输入房间号码')
          return true
        } else if (!checkinObj.startTime) {
          message.error('请输入入住时间')
          return true
        } else if (!checkinObj.endTime) {
          message.error('请输入离店时间')
          return true
        } else if (!checkinObj.isPaid) {
          message.error('请选择是否结账')
          return true
        } else {
          this.setState({checkinObj: checkinObj})
        }
        setTimeout(() => this.updateList())
      }
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