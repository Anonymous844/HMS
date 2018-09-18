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
      title: '用户注册',
      Tvisible: false,
      TtelNum: '',
      Tcode: '',
      buttonText: '发送验证码',
      buttonEnable: false,
      codeEnable: true
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
    urlU = (this.state.adminEnable ? '/Login/sign_in_pass?username=' : '/customer/login?nickname=') + this.state.nickname
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
        document.cookie = (this.state.adminEnable ? 'a' : 'c') + 'nickname=' + (res.data.userName || this.state.nickname)
        if (!this.state.adminEnable) {
          history.pushState({type: 'customer', id: res.data.userId, userName: res.data.userName}, '', '/booking')
          this.props.changeIndex("/booking")
          this.props.changeState('c')
        } else {
          this.props.changeState()
        }
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
  loginModal () {
    this.setState({Tvisible: !this.state.Tvisible})
  }
  sendCode () {
    if (this.state.TtelNum === '') {
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
    fetch('/Customer/identifying_code?telNum=' + this.state.TtelNum, {
      method: 'post'
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
  }
  TLogin () {
    fetch('/Customer/sms_login?telNum=' + this.state.TtelNum + '&code=' + this.state.Tcode, {
      method: 'post'
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        return false
      } else if (res.code !== 1) {
        message.error('验证码错误')
        return false
      } else {
        message.success('success')
        history.pushState({type: 'customer', id: res.data.userId, userName: res.data.userName}, '', '/booking')
        this.props.changeIndex("/booking")
        document.cookie = 'cnickname=' + res.data.userName
        this.props.changeState('c')
      }
    })
  }
  render() {
    return (
      <div id='loginContainer'>
        <p className='loginTitle'>Sign in to HMS</p>
        <form className='loginBox mgb30'>
          { this.state.adminEnable ?
          <h2 className='text-center mgb0'>管理员登录</h2> : <h2 className='text-center mgb0'>用户登录</h2> }
          <strong>用户名</strong>{ this.state.adminEnable ? '' : <a className='pull-right' href="javascript:;" onClick={() => this.loginModal()}>快捷登录</a>}
          <Input className='mgt10 mgb15' placeholder='用户名' value={this.state.nickname} onChange={e => this.setState({nickname: e.target.value})}/>
          <strong>密码</strong>
          <Input type='password' className='mgt10 mgb15' placeholder='密码' value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <Button className='loginButton mgb10' onClick={this.login}>Sign in</Button>
          { this.state.adminEnable ? 
          <a href="javascript:;" onClick={() => this.switchState()}>用户登录</a> : <a href="javascript:;" onClick={() => this.switchState()}>管理员登录</a> }
          { this.state.adminEnable ?
          '' : <a style={{float: 'right'}} href='javascript:;' onClick={this.showModal}>注册</a>}
        </form>
        <Modal visible={this.state.Tvisible}
               title='短信验证登录'
               width={350}
               okText='登录'
               cancelText='取消'
               onCancel={() => this.loginModal()}
               onOk={() => this.TLogin()}>
          <form>
            <div className='clearfix mgb5'>
              <span style={{lineHeight: '32px'}}>联系方式</span>
              <Input className='pull-right' style={{width: 200}} value={this.state.TtelNum}
                    onChange={(e) => this.setState({TtelNum: e.target.value})}/>
            </div>
            <div className='clearfix mgb5'>
              <span style={{lineHeight: '32px'}}>验证码</span>
              <Button className='pull-right' style={{width: 102}} onClick={() => this.sendCode()} disabled={this.state.buttonEnable}>{this.state.buttonText}</Button>
              <Input className='pull-right mgr10' style={{width: 88}} placeholder='验证码' value={this.state.Tcode} disabled={this.state.codeEnable}
                    onChange={(e) => this.setState({Tcode: e.target.value})}/>
            </div>
          </form>
        </Modal>
        <RegisterBox {...this.state} showModal={this.showModal}/>
        <p className='text-center' style={{color: '#fff'}}>Contant <a href='https://github.com/Anonymous844'>Anonymous844</a></p>
      </div>
    )
  }
}

export default Login