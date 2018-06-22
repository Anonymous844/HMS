import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, message, Modal, Input, Select } from 'antd'

// 预定中心
class Booking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '订单编号',
        dataIndex: 'bookingId',
        align: 'center'
      },{
        title: '客户名字',
        dataIndex: 'userName',
        align: 'center',
        render: (text, record) => (
          <a href="javascript:;" onClick={() => this.showUser(record.userId)}>{text}</a>
        )
      },{
        title: '联系方式',
        dataIndex: 'telNum',
        align: 'center'
      },{
        title: '预定方式',
        dataIndex: 'method_cn',
        align: 'center'
      },{
        title: '房间类型',
        dataIndex: 'typeName',
        align: 'center'
      },{
        title: '预定结果',
        dataIndex: 'result_cn',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record, index) => (
          <div>
            <Button type='primary' className='mgr30' onClick={() => this.updateFunc(index)}><Icon type='edit' />修改</Button>
            <Button type='danger' onClick={() => this.delFunc(index)}><Icon type='delete' />删除</Button>
          </div>
        )
      }],
      loading: true,
      bookingList: [],
      bookingObj: {},
      user: {},
      type: history.state.type
    }
  }
  componentDidMount () {
    if (this.state.type) {
      this.getList(history.state.id)
    } else {
      this.getList()
    }
  }
  getList (id = '') {
    fetch('/api/index.php/booking/details?userId=' + id, {
      method: 'get',
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
      } else if (res.code !== 1) {
        message.error(res.code)
      } else {
        let details = []
        res.details.forEach(d => {
          d.key = d.bookingId
          d.method_cn = d.method === '1' ? '电话预定' : (d.method === '2' ? '总台面约' : (d.method === '3' ? '网上预定' : '领导安排'))
          d.typeName = d.type === '1' ? '标间': (d.type === '2' ? '大床房' : '总统套房')
          d.result_cn = d.result === '0' ? '失败' : (d.result === '1' ? '预约中' : '成功')
          details.push(d)
        })
        this.setState({bookingList: details})
      }
      this.setState({loading: false})
    })
  }
  updateList () {
    let body = 'bookingId=' + this.state.bookingObj.bookingId
              + '&method=' + this.state.bookingObj.method
              + '&result=' + this.state.bookingObj.result
              + '&userId=' + this.state.bookingObj.userId
              + '&userName=' + this.state.bookingObj.userName
              + '&telNum=' + this.state.bookingObj.telNum
              + '&type=' + this.state.bookingObj.type
              + '&isDelete=' + this.state.bookingObj.isDelete
    fetch('/api/index.php/booking/details?' + body, {
      method: 'post'
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
      setTimeout(() => this.getList(history.state.id))
    })
  }
  delFunc (index) {
    Modal.confirm({
      title: '提示',
      content: (
        <p>确认删除？</p>
      ),
      onOk: () => {
        let bookingObj = this.state.bookingList[index]
        bookingObj.isDelete = '0'
        this.setState({bookingObj: bookingObj})
        setTimeout(() => this.updateList())
      }
    })
  }
  updateFunc (index) {
    let bookingObj = index === undefined ? {isDelete: '1', userId: history.state.id, userName: history.state.userName, result: '1'}: this.state.bookingList[index]
    this.setState({bookingObj: bookingObj})
    setTimeout(() => Modal.confirm({
      title: index === undefined ? '新增' : '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>客户姓名</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.bookingObj.userName} disabled/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>联系方式</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.bookingObj.telNum} disabled={index !== undefined}
                   onChange={(e) => bookingObj.telNum = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>预定方式</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.bookingObj.method}
                   onChange={(value) => bookingObj.method = value}>
              <Select.Option value='1'>电话预定</Select.Option>
              <Select.Option value='2'>总台面约</Select.Option>
              <Select.Option value='3'>网上预定</Select.Option>
              <Select.Option value='4'>领导安排</Select.Option>
            </Select>
          </div>
          <div className='mgb5'>
            <label className='pd5'>房间类型</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.bookingObj.type}
                   onChange={(value) => bookingObj.type = value}>
              <Select.Option value='1'>标间</Select.Option>
              <Select.Option value='2'>大床房</Select.Option>
              <Select.Option value='3'>总统套房</Select.Option>
            </Select>
          </div>
          { history.state.type !== 'customer' ?
          <div className='mgb5'>
            <label className='pd5'>预定结果</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.bookingObj.result}
                   onChange={(value) => bookingObj.result = value}>
              <Select.Option value='0'>失败</Select.Option>
              <Select.Option value='1'>预约中</Select.Option>
              <Select.Option value='2'>成功</Select.Option>
            </Select>
          </div> : ''
          }
        </div>
      ),
      onOk: () => {
        if (!bookingObj.telNum) {
          message.error('请输入联系方式')
          return true
        } else if (!bookingObj.method) {
          message.error('请选择预定方式')
          return true
        } else if (!bookingObj.type) {
          message.error('请选择房间类型')
          return true
        } else if (!bookingObj.result) {
          message.error('请选择预定结果')
          return true
        } else {
          this.setState({bookingObj: bookingObj})
        }
        setTimeout(() => this.updateList())
      }
    }))
  }
  showUser (id) {
    fetch('/api/index.php/customer/details?userId=' + id, {
      method: 'get',
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
      } else if (res.code !== 1) {
        message.error('请重新刷新')
      } else {
        let user = res.details
        this.setState({user: user})
        Modal.info({
          title: '客户信息',
          content: (
            <div>
              <label>客户ID：{this.state.user.userId}</label><br />
              <label>姓名：{this.state.user.userName}</label><br />
              <label>电话：{this.state.user.telNum}</label><br />
              <label>性别：{this.state.user.gender === '0' ? '女性' : '男性'}</label><br />
              <label>年龄：{this.state.user.age}</label>
            </div>
          )
        })
      }
    })
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>预定信息管理</h1>
          {this.state.type ? <Button type='primary' className='add mgr20' onClick={() => this.updateFunc()}><Icon type='plus'/>新增</Button> : ''}
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