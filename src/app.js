import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader'

const App = () => {
  return (
    <h1>HMS</h1>
  );
};
export default hot(module)(App);
ReactDOM.render(<App />, document.getElementById("app"));
