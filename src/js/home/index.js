import React from 'react'
import ReactDOM from 'react-dom'
import echarts from 'echarts'
import { Select, message } from 'antd'
const Option = Select.Option

// 业务统计报表（住宿率|柱状图）
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      year: '2018',
      rate: []
    }
    this.getRate()
  }
  getBar () {
    let myChart = echarts.init(document.getElementById('main'))
    let options = {
      title: {
        text: this.state.year + '年每月入住率',
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
  getRate () {
    fetch('/api/index.php/home/rate?year=' + this.state.year, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
    .then(response => response.json())
    .then(res => {
      if (!res.code) {
        message.error('500 Internal Server Error')
      } else if (res.code !== 1) {
        message.error('请重新刷新')
      } else {
        let rate = res.rate.replace('[', '').replace(']', '').split(',')
        for (let x in rate) {
          rate[x] = parseInt(rate[x])
        }
        this.setState({rate: rate})
        setTimeout(() => this.getBar())
      }
    })
  }
  changeYear (value) {
    this.setState({year: value})
    setTimeout(() => this.getRate())
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
            {/* <Option value="2015">2015</Option>
            <Option value="2014">2014</Option> */}
          </Select>
          <div id='main' style={{width: '100%', height: 400}}></div>
        </div>
      </div>
    )
  }
}

export default Home
