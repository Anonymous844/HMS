import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, Input, Select, message } from 'antd'

class RegisterBox extends React.Component {
  constructor () {
    super()
    this.state = {
      nickname: '',
      userPwd: '',
      userName: '',
      gender: '',
      age: '',
      telNum: '',
      isDelete: '1',
      code: '',
      buttonText: '发送验证码',
      buttonEnable: false,
      codeEnable: true
    }
    this.user = {}
    this.clear = this.clear.bind(this)
    this.register = this.register.bind(this)
  }
  clear () {
    this.setState({nickname: ''})
    this.setState({userPwd: ''})
    this.setState({userName: ''})
    this.setState({gender: ''})
    this.setState({age: ''})
    this.setState({telNum: ''})
    this.setState({code: ''})
    this.setState({codeEnable: true})
    setTimeout(() => this.props.showModal())
  }
  register () {
    if (!this.state.nickname) {
      message.error('请输入用户名')
      return true
    } else if (!this.state.userPwd) {
      message.error('请输入密码')
      return true
    } else if (!this.state.userName) {
      message.error('请输入姓名')
      return true
    } else if (!this.state.gender) {
      message.error('请选择性别')
      return true
    } else if (!this.state.age) {
      message.error('请输入年龄')
      return true
    } else if (!this.state.telNum) {
      message.error('请输入联系方式')
      return true
    } else if (!this.state.code) {
      message.error('请输入验证码')
      return true
    }
    let body = 'nickname=' + this.state.nickname
              + '&userPwd=' + this.state.userPwd
              + '&userName=' + this.state.userName
              + '&gender=' + this.state.gender
              + '&age=' + this.state.age
              + '&telNum=' + this.state.telNum
              + '&isDelete=' + this.state.isDelete
              + '&code=' + this.state.code
    fetch('/customer/register?' + body, {
      method: 'post'
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code !== 1) {
        message.error('注册失败请重试！')
        return false
      } else {
        message.success('注册成功！')
        this.props.showModal()
      }
    })
  }
  sendCode () {
    if (this.state.telNum === '') {
      message.error('请输入联系方式')
      return false
    }
    let second = 60
    this.setState({buttonEnable: true})
    this.setState({codeEnable: false})
    let index = setInterval(() => {
      this.setState({buttonText: (second + 'S后重发')})
      second--
      if (second === -2) {
        this.setState({buttonEnable: false})
        this.setState({buttonText: '发送验证码'})
        clearInterval(index)
      }
    }, 1000)
    fetch('/Customer/identifying_code?telNum=' + this.state.telNum, {
      method: 'post'
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
  }
  render () {
    return (
      <Modal visible={this.props.visible}
             title={this.props.title}
             okText={'注册'}
             cancelText={'取消'}
             width={350}
             onCancel={this.clear}
             onOk={this.register}
      >
        <form>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>用户名</span>
            <Input className='pull-right' style={{width: 200}} value={this.state.nickname} 
                   onChange={(e) => this.setState({nickname: e.target.value})}/>
          </div>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>密码</span>
            <Input type='password' className='pull-right' style={{width: 200}} value={this.state.userPwd}
                   onChange={(e) => this.setState({userPwd: e.target.value})}/>
          </div>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>姓名</span>
            <Input className='pull-right' style={{width: 200}} value={this.state.userName}
                   onChange={(e) => this.setState({userName: e.target.value})}/>
          </div>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>性别</span>
            <Select className='pull-right' style={{width: 200}} value={this.state.gender}
                    onChange={(value) => this.setState({gender: value})}>
              <Select.Option value='0'>女</Select.Option>
              <Select.Option value='1'>男</Select.Option>
            </Select>
          </div>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>年龄</span>
            <Input className='pull-right' style={{width: 200}} value={this.state.age}
                   onChange={(e) => this.setState({age: e.target.value})}/>
          </div>
          <div className='clearfix mgb5'>
            <span style={{lineHeight: '32px'}}>联系方式</span>
            <Input className='pull-right' style={{width: 200}} value={this.state.telNum}
                   onChange={(e) => this.setState({telNum: e.target.value})}/>
          </div>
          <div className='clearfix mgb5'>
            <Button className='pull-right' style={{width: 102}} onClick={() => this.sendCode()} disabled={this.state.buttonEnable}>{this.state.buttonText}</Button>
            <Input className='pull-right mgr10' style={{width: 88}} placeholder='验证码' value={this.state.code} disabled={this.state.codeEnable}
                   onChange={(e) => this.setState({code: e.target.value})}/>
          </div>
        </form>
      </Modal>
    )
  }
}

export default RegisterBox