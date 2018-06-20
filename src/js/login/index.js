import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, Input, Select, message } from 'antd'
import RegisterBox from './registerBox'

class Login extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      nickname: '',
      password: '',
      adminEnable: false,
      visible: false,
      title: '用户注册'
    }
    this.login = this.login.bind(this)
    this.showModal = this.showModal.bind(this)
  }
  login () {
    if (!this.state.nickname) { 
      message.error('请输入用户名')
      return false
    } else if(!this.state.password) {
      message.error('请输入密码')
      return false
    }
    let urlU = ''
    let urlP = ''
    urlU = (this.state.adminEnable ? '/api/index.php/Login/sign_in_pass?username=' : '/api/index.php/customer/login?nickname=') + this.state.nickname
    urlP = (this.state.adminEnable ? '&password=' : '&userPwd=') + this.state.password
    fetch(urlU + urlP, {
      method: 'post'
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code !== 1) {
        message.error('用户名或者密码错误')
        return false
      } else {
        message.success('success')
        document.cookie = 'nickname=' + this.state.nickname
        this.props.changeState()
      }
    })
  }
  switchState () {
    this.setState({nickname: ''})
    this.setState({password: ''})
    this.setState({adminEnable: !this.state.adminEnable})
  }
  showModal () {
    this.setState({visible: !this.state.visible})
  }
  render() {
    return (
      <div id='loginContainer'>
        <p className='loginTitle'>Sign in to HMS</p>
        <form className='loginBox mgb30'>
          { this.state.adminEnable ?
          <h2 className='text-center mgb0'>管理员登录</h2> : <h2 className='text-center mgb0'>用户登录</h2> }
          <strong>用户名</strong>
          <Input className='mgt10 mgb15' placeholder='用户名' value={this.state.nickname} onChange={e => this.setState({nickname: e.target.value})}/>
          <strong>密码</strong>
          <Input type='password' className='mgt10 mgb15' placeholder='密码' value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <Button className='loginButton mgb10' onClick={this.login}>Sign in</Button>
          { this.state.adminEnable ? 
          <a href="javascript:;" onClick={() => this.switchState()}>用户登录</a> : <a href="javascript:;" onClick={() => this.switchState()}>管理员登录</a> }
          { this.state.adminEnable ?
          '' : <a style={{float: 'right'}} href='javascript:;' onClick={this.showModal}>注册</a>}
        </form>
        <RegisterBox {...this.state} showModal={this.showModal}/>
        <p className='text-center'>Contant <a href='https://github.com/Anonymous844'>Anonymous844</a></p>
      </div>
    )
  }
}

export default Login