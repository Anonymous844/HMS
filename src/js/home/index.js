import React from 'react'
import ReactDOM from 'react-dom'
import echarts from 'echarts'
import { Select, message, Row, Col } from 'antd'
const Option = Select.Option

// 业务统计报表（住宿率|柱状图）
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      year: '2018',
      rate: [],
      total: 0,
      number: 0,
      useRate: ''
    }
  }
  componentDidMount () {
    this.getRate()
    this.getList()
    this.getGauge()
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
    fetch('/home/rate?year=' + this.state.year, {
      method: 'get',
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
  getList () {
    fetch('/setting/details', {
      method: 'get',
    })
    .then(response => response.json())
    .then(res => {
      let number = 0
      let useRate = ''
      let total = res.details.length
      res.details.forEach(v => {
        if (v.useful === '1') {
          number++
        }
      })
      useRate = number / total
      this.setState({total: total})
      this.setState({number: number})
      this.setState({useRate: useRate})
      setTimeout(() => this.getPie())
    })
  }
  getPie () {
    let myPie = echarts.init(document.getElementById('rate'))
    let options = {
      title: {
        text: '房间可用率',
        subtext: '实时监测'
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {d}%'
      },
      series: [{
        name: '入住率',
        type: 'pie',
        data: [
          {value: (this.state.useRate), name: '房间可用率'},
          {value: (1 - this.state.useRate), name: '房间不可用率'}
        ]
      }]
    }
    myPie.setOption(options)
  }
  getGauge () {
    let myGauge = echarts.init(document.getElementById('electric'))
    let options = {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
          {
              name: '业务指标',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 50, name: '用电压力指数'}]
          }
      ]
    }
    setInterval(function () {
      options.series[0].data[0].value = (Math.random() * 50).toFixed(2) - 0;
      myGauge.setOption(options, true);
    },2000);
  }
  render () {
    return (
      <div className='container'>
        <h1 className='title'>业务统计报表</h1>
        <Row className='pd20'>
          <Col span={12}>
            <Select value={this.state.year} onChange={(value) => this.changeYear(value)} style={{width: 120}}>
              <Option value="2018">2018</Option>
              <Option value="2017">2017</Option>
              <Option value="2016">2016</Option>
            </Select>
            <div id='main' style={{width: '100%', height: 400}}></div>
          </Col>
          <Col span={6}>
            <h2>总房间数：{this.state.total}, 可用房间数：{this.state.number}</h2>
            <div id='rate' style={{width: '100%', height: 400}}></div>
          </Col>
          <Col span={6}>
            <h2>酒店用电压力指数</h2>
            <div id='electric' style={{width: '100%', height: 400}}></div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
