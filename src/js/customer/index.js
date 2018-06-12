import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, message, Modal, Input, Select } from 'antd'

// 客户管理功能
class Customer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '客户姓名',
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
        dataIndex: 'gender_cn',
        width: '20%',
        align: 'center'
      },{
        title: '联系方式',
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
      loading: true,
      userList: [],
      user: {}
    }
    this.getList()
  }
  // 获取客户信息
  getList () {
    fetch('/api/index.php/customer/details', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
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
            d.key = d.userId
            d.gender_cn = d.gender === '0' ? '女性' : '男性'
            details.push(d)
          }
        })
        this.setState({userList: details})
      }
      this.setState({loading: false})
    })
  }
  // 修改/删除客户信息
  updateList () {
    fetch('/api/index.php/customer/details', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(this.state.user)
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
  // 删除函数
  delFunc (index) {
    Modal.confirm({
      title: '提示',
      content: (
        <p>确认删除？</p>
      ),
      onOk: () => {
        let user = this.state.userList[index]
        user.isDelete = '0'
        this.setState({user: user})
        setTimeout(() => this.updateList())
      }
    })
  }
  // 修改函数
  updateFunc (index) {
    let user = index === undefined ? {isDelete: '1'}: this.state.userList[index]
    this.setState({user: user})
    setTimeout(() => Modal.confirm({
      title: index === undefined ? '新增' : '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>客户姓名</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.user.userName}
                   onChange={(e) => user.userName = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>客户年龄</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.user.age}
                   onChange={(e) => user.age = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>客户性别</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.user.gender}
                   onChange={(value) => user.gender = value}>
              <Select.Option value='0'>女</Select.Option>
              <Select.Option value='1'>男</Select.Option>
            </Select>
          </div>
          <div className='mgb5'>
            <label className='pd5'>联系方式</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.user.telNum}
                   onChange={(e) => user.telNum = e.target.value}/>
          </div>
        </div>
      ),
      onOk: () => {
        if (!user.userName) {
          message.error('请输入客户姓名')
          return true
        } else if (!user.age) {
          message.error('请输入客户年龄')
          return true
        } else if (!user.gender) {
          message.error('请选择客户性别')
          return true
        } else if (!user.telNum) {
          message.error('请输入联系方式')
          return true
        } else {
          this.setState({user: user})
        }
        setTimeout(() => this.updateList())
      }
    }))
  }
  render () {
    return (
      <div className='container'>
        <div className='clearfix'>
          <h1 className='title'>客户管理功能</h1>
          <Button type='primary' className='add mgr20' onClick={() => this.updateFunc()}><Icon type='plus' />新增</Button>
        </div>
        <div className='pd20'>
          <Table dataSource={this.state.userList} 
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