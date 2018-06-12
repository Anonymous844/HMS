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
    fetch('/api/index.php/Login/sign_in_pass?username=' + this.state.username + '&password=' + this.state.password, {
      method: 'post',
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
        return false
      } else if (res.code !== 1) {
        message.error('用户名或者密码错误')
        return false
      } else {
        message.success('success')
        document.cookie = 'loginEnable=true'
        this.props.changeState()
      }
      // document.cookie = 'loginEnable=true'
      // this.props.changeState()
      // todo 删除上面两行
    })
  }
  render() {
    return (
      <div id='loginContainer'>
        <p className='loginTitle'>Sign in to HMS</p>
        <form className='loginBox mgb30'>
          <strong>username</strong>
          <Input className='mgt10 mgb15' placeholder='username' onChange={e => this.setState({username: e.target.value})}/>
          <strong>password</strong>
          <Input type='password' className='mgt10 mgb15' placeholder='password' onChange={e => this.setState({password: e.target.value})}/>
          <Button className='loginButton' onClick={this.login}>Sign in</Button>
        </form>
        <p className='copyright'>Contant <a href='https://github.com/Anonymous844'>Anonymous844</a></p>
      </div>
    )
  }
}

export default Login