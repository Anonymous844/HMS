import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, Input, Select, message } from 'antd'

// 客房设置功能（客房信息，实际价格，实际折扣，房间状态，是否可用）
class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '房间号码',
        dataIndex: 'roomNum',
        align: 'center'
      },{
        title: '房间类型',
        dataIndex: 'typeName',
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
        dataIndex: 'status_cn',
        align: 'center'
      },{
        title: '是否可用',
        dataIndex: 'useful_cn',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record, index) => (
          <div>
            <Button type='primary' className='mgr30' onClick={() => this.updateFunc(index)}><Icon type='edit' />修改</Button>
            <Button type='danger' onClick={() => this.delFunc(index)}><Icon type='delete'/>删除</Button>
          </div>
        )
      }],
      loading: true,
      roomList: [],
      roomObj: {}
    }
    this.getList()
  }
  // 获取房间信息
  getList () {
    fetch('/setting/details', {
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
            d.key = d.roomNum
            d.typeName = d.type === 1 ? '标间' : (d.type === 2 ? '大床房' : '总统套房')
            d.status_cn = d.status === 0 ? '不可用' : (d.status === 1 ? '可入住' : '正在打扫')
            d.useful_cn = d.useful === 0 ? '不可用' : '可用'
            details.push(d)
          }
        });
        this.setState({roomList: details})
      }
      this.setState({loading: false})
    })
  }
  // 修改/删除房间信息
  updateList () {
    fetch('/setting/details', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.roomObj)
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
      this.setState({loading: true})
      setTimeout(() => this.getList())
    })
  }
  // 删除函数
  delFunc (index) {
    Modal.confirm({
      title: '提示',
      content: (
        <p>确认删除？</p>
      ),
      onOk: () => {
        let roomObj = this.state.roomList[index]
        roomObj.isDelete = 0
        this.setState({roomObj: roomObj})
        setTimeout(() => this.updateList())
      }
    })
  }
  // 修改/新增
  updateFunc (index) {
    let roomObj = index === undefined ? {isDelete: 1}: this.state.roomList[index]
    this.setState({roomObj: roomObj})
    setTimeout(() => Modal.confirm({
      title: index === undefined ? '新增' : '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>房间号码</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.roomNum} disabled={index !== undefined}
                   onChange={(e) => roomObj.roomNum = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>房间类型</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.type} disabled={index !== undefined}
                   onChange={value => roomObj.type = value}>
              <Select.Option value={1}>标间</Select.Option>
              <Select.Option value={2}>大床房</Select.Option>
              <Select.Option value={3}>总统套房</Select.Option>
            </Select>
          </div>
          <div className='mgb5'>
            <label className='pd5'>实际价格</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.rPrice}
                   onChange={(e) => roomObj.rPrice = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>实际折扣</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.rDiscount}
                   onChange={(e) => roomObj.rDiscount = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>房间状态</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.status}
                   onChange={value => roomObj.status = value}>
              <Select.Option value={0}>不可用</Select.Option>
              <Select.Option value={1}>可入住</Select.Option>
              <Select.Option value={2}>正在打扫</Select.Option>
            </Select>
          </div>
          <div className='mgb5'>
            <label className='pd5'>是否可用</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.roomObj.useful}
                   onChange={value => roomObj.useful = value}>
              <Select.Option value={0}>不可用</Select.Option>
              <Select.Option value={1}>可用</Select.Option>
            </Select>
          </div>
        </div>
      ),
      onOk: () => {
        if (!roomObj.roomNum) {
          message.error('请输入房间号码')
          return true
        } else if (!roomObj.type) {
          message.error('请选择房间类型')
          return true
        } else if (!roomObj.rPrice) {
          message.error('请输入实际价格')
          return true
        } else if (!roomObj.rDiscount) {
          message.error('请输入实际折扣')
          return true
        } else if (!roomObj.status && roomObj.status !== 0) {
          message.error('请选择房间状态')
          return true
        } else if (!roomObj.useful && roomObj.useful !== 0) {
          message.error('请选择房间是否可用')
          return true
        } else {
          this.setState({roomObj: roomObj})
        }
        setTimeout(() => this.updateList())
      }
    }))
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>房间信息设置</h1>
          <Button type='primary' className='add mgr20' onClick={() => this.updateFunc()}><Icon type='plus' />新增</Button>
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