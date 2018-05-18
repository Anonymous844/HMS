import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, message, Modal, Input, Select } from 'antd'

// 价格设置（预定价格，预定折扣，计时最低价格）
class Price extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeNameList: ['', '标间', '大床房', '总统套房'],
      columns: [{
        title: '房间类型',
        dataIndex: 'typeName',
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
        dataIndex: 'timeLeft_cn',
        width: '20%',
        align: 'center'
      },{
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        align: 'center',
        render: (text, record, index) => (
          <Button type='primary' onClick={() => this.modify(index)}><Icon type='edit' />修改</Button>
        )
      }],
      loading: true,
      typeList: [],
      typeObj: {}
    }
    this.getList()
  }
  getList () {
    fetch('/price/details', {
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
        message.error(res.msg)
      } else if (res.code === 1) {
        let details = res.details
        details.forEach(d => {
          d.key = d.type
          d.timeLeft_cn = d.timeLeft + '秒'
          d.typeName = d.type === 1 ? '标间' : (d.type === 2 ? '大床房' : '总统套房')
        })
        this.setState({typeList: details})
      }
      this.setState({loading: false})
    })
  }
  updateList () {
    fetch('/price/details', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.typeObj)
    })
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code === 0) {
        message.error(res.msg)
        return false
      } else if (res.code === 1) {
        message.success('success')
      }
      this.setState({loading: true})
      setTimeout(() => this.getList())
    })
  }
  modify (index) {
    let typeObj = this.state.typeList[index]
    this.setState({typeObj: typeObj})
    setTimeout(() => Modal.confirm({
      title: '修改',
      content: (
        <div>
          <div className='mgb5'>
            <label className='pd5'>房间类型</label>
            <Select size='small' style={{width: '60%'}} defaultValue={this.state.typeObj.type} disabled>
              <Select.Option value={1}>标间</Select.Option>
              <Select.Option value={2}>大床房</Select.Option>
              <Select.Option value={3}>总统套房</Select.Option>
            </Select>
          </div>
          <div className='mgb5'>
            <label className='pd5'>预定价格</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.typeObj.bPrice}
                   onChange={(e) => typeObj.bPrice = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>预定折扣</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.typeObj.bDiscount}
                   onChange={(e) => typeObj.bDiscount = e.target.value}/>
          </div>
          <div className='mgb5'>
            <label className='pd5'>计时最低价格</label>
            <Input size='small' style={{width: '60%'}} defaultValue={this.state.typeObj.timeLeft}
                   onChange={(e) => typeObj.timeLeft = e.target.value}/>
          </div>
        </div>
      ),
      onOk: () => {
        if (!typeObj.bPrice) {
          message.error('请输入预定价格')
          return true
        } else if (!typeObj.bDiscount) {
          message.error('请输入预定折扣')
          return true
        } else if (!typeObj.bDiscount) {
          message.error('请输入预定折扣')
          return true
        } else {
          this.setState({typeObj: typeObj})
        }
        setTimeout(() => this.updateList())
      }
    }))
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