import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, Input, Select, message } from 'antd'

class Login extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }
  login () {
    if (!this.state.username) {
      message.error('请输入用户名')
      return false
    } else if(!this.state.password) {
      message.error('请输入密码')
      return false
    }
    fetch('/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
        // return false
      } else if (res.code === 0) {
        message.error(res.code)
        // return false
      } else if (res.code === 1) {
        message.success('success')
        // document.cookie = 'loginEnable=true'
        // this.props.changeState()
      }
      document.cookie = 'loginEnable=true'
      this.props.changeState()
      // todo 删除上面两行
    })
  }
  render() {
    return (
      <div className='loginContainer'>
        <p className='loginTitle'>Sign in to HMS</p>
        <div className='loginBox mgb30'>
          <strong>username</strong>
          <Input className='mgt10 mgb15' placeholder='username' onChange={e => this.setState({username: e.target.value})}/>
          <strong>password</strong>
          <Input type='password' className='mgt10 mgb15' placeholder='password' onChange={e => this.setState({password: e.target.value})}/>
          <Button className='loginButton' onClick={this.login}>Sign in</Button>
        </div>
        <p className='copyright'>Contant <a href='https://github.com/Anonymous844'>Anonymous844</a></p>
      </div>
    )
  }
}

export default Login