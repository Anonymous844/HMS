import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Pagination, Icon, Modal, Input, Select, message } from 'antd'

class Login extends React.Component{
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <Button type='primary' onClick={() => this.props.changeState()}>Login</Button>
      </div>
    )
  }
}

export default Login