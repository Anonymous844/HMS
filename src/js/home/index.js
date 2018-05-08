import React from 'react'
import ReactDOM from 'react-dom'
import echarts from 'echarts'
import { Select } from 'antd'
const Option = Select.Option

// 业务统计报表（住宿率|柱状图）
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      year: '2018',
      rate: [80, 90, 70, 60, 50, 90, 80, 70, 90, 50, 80, 60]
    }
  }
  componentDidMount () {
    this.getBar()
  }
  getBar () {
    let myChart = echarts.init(document.getElementById('main'))
    let options = {
      title: {
        text: '月入住率',
        left: 'center'
      },
      tooltip: {
        formatter: '{a}<br/>{b}: {c}%'
      },
      legend: {
        data:['销量']
      },
      xAxis: {
        name: '月份',
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      },
      yAxis: {
        name: '百分比（%）',
        max: 100
      },
      series: [{
        name: '入住率',
        type: 'bar',
        data: this.state.rate
      }]
    }
    myChart.setOption(options)
  }
  changeYear (value) {
    this.setState({year: value})
    // 请求
  }
  render () {
    return (
      <div className='container'>
        <h1 className='title'>业务统计报表</h1>
        <div className='pd20'>
          <Select value={this.state.year} onChange={(value) => this.changeYear(value)} style={{width: 120}}>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
            <Option value="2015">2015</Option>
            <Option value="2014">2014</Option>
          </Select>
          <div id='main' style={{width: 600, height: 400}}></div>
        </div>
      </div>
    )
  }
}

export default Home
