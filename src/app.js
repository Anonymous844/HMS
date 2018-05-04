import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Button type="primary">HMS</Button>
  );
};
export default hot(module)(App);
ReactDOM.render(<App />, document.getElementById("app"));
