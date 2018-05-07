import React from 'react'
import ReactDOM from 'react-dom'

// 客房设置功能（客房信息，实际价格，实际折扣，房间状态，是否可用）
class Setting extends React.Component {
  render () {
    return (
      <div>
        <h1>设置酒店的所有客房信息</h1>
        <h1>不同房间的实际价格、实际折扣的设置</h1>
        <h1>房间的状态以及是否可用进行设置</h1>
      </div>
    )
  }
}

export default Setting