import React from 'react'
import ReactDOM from 'react-dom'
import echarts from 'echarts'

// 业务统计报表（住宿率|柱状图）
class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    let myChart = echarts.init(document.getElementById('main'))
    let options = {
      title: {
        text: '月住宿率',
        left: 'center'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        name: '月份',
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      },
      yAxis: {
        name: '百分比（%）'
      },
      series: [{
        name: '入住率',
        type: 'bar',
        data: [80, 90, 70, 60, 50, 90, 80, 70, 90, 50, 80, 60]
      }]
    }
    this.getBar(myChart, options)
  }
  getBar (myChart, options) {
    myChart.setOption(options)
  }
  render () {
    return (
      <div className='container'>
        <h1 className='title'>业务统计报表</h1>
        <div id='main' className='pd20' style={{width: 600, height: 400}}></div>
      </div>
    )
  }
}

export default Home
