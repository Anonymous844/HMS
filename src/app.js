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


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultPath: location.pathname,
      loginEnable: false
    }
    this.logout = this.logout.bind(this)
  }
  changeIndex (path) {
    this.setState({defaultPath: path})
    console.log(document.cookie)
  }
  changeState () {
    this.setState({loginEnable: !this.state.loginEnable})
  }
  logout () {
    document.cookie = 'loginEnable=false'
    this.isLogin()
  }
  isLogin () {
    let str = document.cookie
    if (str && str === 'loginEnable=false') {
      this.setState({loginEnable: false})
    } else if (str && str === 'loginEnable=true') {
      this.setState({loginEnable: true})
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
              {routes.map((value, index) => (
                <li className={this.state.defaultPath === value.path ? 'nav-item active' : 'nav-item'} 
                    key={index} onClick={() => this.changeIndex(value.path)}>
                  <Link to={value.path}>{value.name}</Link>
                </li>
              ))}
              <li className='nav-item logout'><a onClick={this.logout}>退出</a></li>
            </ul>
            {routes.map((value, index) => (
              <Route exact path={value.path} component={value.component} key={index}/>
            ))}
          </div>
        </Router>
        ) : (<Login changeState={() => this.changeState()}/>)}
      </div>
    )
  }
};
export default hot(module)(App);
ReactDOM.render(<App />, document.getElementById("app"));
