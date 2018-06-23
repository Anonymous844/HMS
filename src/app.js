import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import routes from './js/router'
import { hot } from 'react-hot-loader'
import 'antd/dist/antd.css'
import './css/main.css'
import Login from './js/login/index'
import logo from './logo.png'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultPath: location.pathname,
      loginEnable: false,
      nickname: '',
      type: 'a'
    }
    this.logout = this.logout.bind(this)
  }
  componentDidMount () {
    this.getNickname()
  }
  getNickname () {
    let str = document.cookie
    str = str.slice(str.indexOf('nickname=') + 9)
    this.setState({nickname: str})
  }
  changeIndex (path) {
    this.setState({defaultPath: path})
  }
  changeState (type) {
    this.setState({loginEnable: !this.state.loginEnable})
    this.getNickname()
    if (type) {
      this.setState({type: type})
    }
  }
  logout () {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if (keys) {  
      for(var i = keys.length; i--;)  
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }
    setTimeout(() => {
      this.isLogin()
      history.pushState(null, '', '/')
      this.setState({defaultPath: '/'})
      this.setState({type: 'a'})
    })
  }
  isLogin () {
    let str = document.cookie
    if (str && str.indexOf('nickname=') > -1) {
      this.setState({loginEnable: true})
      if (str.indexOf('anickname=') > -1) {
        this.setState({type: 'a'})
      } else {
        this.setState({type: 'c'})
      }
    } else {
      this.setState({loginEnable: false})
    }
  }
  componentWillMount () {
    this.isLogin()
  }
  render () {
    return (
      <div>
        {this.state.loginEnable ? (
        <Router>
          <div>
            <ul className='nav'>
              <li className='nav-item pdt10 mgr20'><img src={logo}/></li>
              {routes.filter(route => route[this.state.type] === true).map((value, index) => (
                <li className={this.state.defaultPath === value.path ? 'nav-item active' : 'nav-item'} 
                    key={index} onClick={() => this.changeIndex(value.path)}>
                  <Link to={value.path}>{value.name}</Link>
                </li>
              ))}
              <li className='nav-item pull-right'><a onClick={this.logout}>退出</a></li>
              <li className='nav-item pull-right'><a>欢迎您，{this.state.nickname}</a></li>
            </ul>
            {routes.map((value, index) => (
              <Route exact path={value.path} component={value.component} key={index}/>
            ))}
          </div>
        </Router>
        ) : (<Login changeState={(type) => this.changeState(type)} changeIndex={() => this.changeIndex()}/>)}
      </div>
    )
  }
};
export default hot(module)(App);
ReactDOM.render(<App />, document.getElementById("app"));
