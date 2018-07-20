/*
 * @Author: wwq
 * @Date: 2018-7-08
 * @Last Modified by: wwq
 * 
 */
class Chart {
  constructor () {
    this.highcharts = window.Highcharts
    this.baseOptions = {
      chart: {
        marginRight: 16
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
        lineWidth: 0,
        tickWidth: 0,
        tickmarkPlacement: 'on',
        crosshair: {
          width: 1,
          color: '#FF8F7F'
        },
        labels: {
          formatter () {
            return this.value.substr(5)
          }
        }
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        tickAmount: 5,
        title: {
          text: ''
        },
        gridLineColor: '#e8e8e8',
        gridLineDashStyle: 'dash',
        labels: {
          formatter () {
            return this.value.toFixed(2) + '%'
          }
        }
      },
      tooltip: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadow: false,
        formatter: function () {
          return ''
        }
      },
      series: [
        {
          name: '',
          color: '#FF5941',
          marker: { enabled: false },
          lineWidth: 2,
          connectNulls: true
        }
      ]
    }
    this.pieOptions = {
      chart: {
        spacing: [0, 0, 0, 0]
      },
      colors: ['#FEF114', '#FF2C3C', '#FF8841', '#FEBF14'],
      title: {
        align: 'center',
        verticalAlign: 'middle',
        text: '资产配置比例',
        style: {
          'fontFamily': 'PingFangSC-Regular',
          'fontStyle': 'normal',
          'color': '#666',
          'fontSize': '12px',
          'letterSpacing': ' -0.15px'
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false,
        pointFormat: ''
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        pie: {
          center: ['50%', '50%'],
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: false
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        name: '资产配置比例'
      }]
    }
  }

  bulidArea (drawId, {xAxisArray = [], yAxisArray = []}, options = {}) {
    let min = this.isPlainObject(yAxisArray[0]) ? yAxisArray[0].y : yAxisArray[0]
    let max = this.isPlainObject(yAxisArray[0]) ? yAxisArray[0].y : yAxisArray[0]
    let tick = xAxisArray.length <= 3 ? 1 : xAxisArray.length - 1
    yAxisArray.forEach((item) => {
      console.log(item)
      if (this.isPlainObject(item)) {
        max = item.y > max ? item.y : max
        min = item.y < min ? item.y : min
      } else {
        max = item > max ? item : max
        min = item < min ? item : min
      }
    })
    let maxTick = ''
    let minTick = ''
    if (min === max && max === 0) {
      maxTick = 6
      minTick = -1
    } else {
      maxTick = parseFloat((Number(max) - Number(min)) / 4 + Number(max))
      minTick = parseFloat(min - (max - min) / 4)
    }
    const intervalTick = (maxTick - minTick) / 5.0
    let threshold = 0
    if (min) {
      threshold = min
    }
    const dataOptions = {
      xAxis: {
        categories: xAxisArray,
        tickInterval: tick
      },
      yAxis: {
        max: maxTick,
        min: minTick,
        tickInterval: intervalTick
      },
      series: [
        {
          data: yAxisArray,
          threshold: threshold
        }
      ]
    }
    let option = this.mergeData(this.baseOptions, dataOptions)
    option = this.mergeData(option, options)
    console.log(option)
    // eslint-disable-next-line
    $(`#${drawId}`).highcharts(option)
  }

  buildAreaOfTwo (drawId, {xAxisArray = [], yAxisArray = [], blueAxisArray = []}, options = {}) {
    const tick = xAxisArray.length <= 2 ? 1 : xAxisArray.length - 1
    let max = yAxisArray[0]
    let min = yAxisArray[0]
    yAxisArray.forEach((item) => {
      max = item > max ? item : max
      min = item < min ? item : min
    })
    blueAxisArray.forEach((item) => {
      max = item > max ? item : max
      min = item < min ? item : min
    })
    let maxTick = ''
    let minTick = ''
    if (min === max && max === 0) {
      maxTick = 6
      minTick = -1
    } else {
      maxTick = parseFloat((Number(max) - Number(min)) / 4 + Number(max))
      minTick = parseFloat((min - (max - min) / 4))
    }
    const intervalTick = (maxTick - minTick) / 5.0
    let threshold = 0
    if (min) {
      threshold = min
    }
    const dataOptions = {
      xAxis: {
        categories: xAxisArray,
        tickInterval: tick
      },
      yAxis: {
        max: maxTick,
        min: minTick,
        tickInterval: intervalTick
      },
      series: [
        {
          data: yAxisArray,
          lineWidth: 1.5,
          threshold: threshold,
          connectNulls: true
        },
        {
          type: 'spline',
          color: '#5196FF',
          blueyAxis: 'blueyAxis',
          marker: { enabled: false },
          data: blueAxisArray,
          lineWidth: 1.5,
          threshold: threshold,
          connectNulls: true
        }
      ]
    }
    let option = this.mergeData(this.baseOptions, dataOptions)
    option = this.mergeData(option, options)
    // eslint-disable-next-line
    $(`#${drawId}`).highcharts(option)
  }

  bulidPie (drawId, options) {
    let option = this.mergeData(this.pieOptions, options)
    console.log(option)
    // eslint-disable-next-line
    $(`#${drawId}`).highcharts(option)
  }

  mergeData (to, from) {
    if (!from) return to
    let key, toVal, fromVal
    const keys = Object.keys(from)
    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      toVal = to[key]
      fromVal = from[key]
      if (!this.hasOwn(to, key)) {
        this.set(to, key, fromVal)
      } else if (this.isPlainObject(toVal) && this.isPlainObject(fromVal)) {
        this.mergeData(toVal, fromVal)
      } else if (this.isPlainArray(toVal) && this.isPlainArray(fromVal)) {
        fromVal.forEach((val, index) => {
          if (toVal[index] && this.isPlainObject(toVal[index]) && this.isPlainObject(val)) {
            this.mergeData(toVal[index], val)
          } else {
            toVal[index] = val
          }
        })
      } else {
        this.set(to, key, fromVal)
      }
    }
    return to
  }

  set (to, key, fromVal) {
    to[key] = fromVal
    return false
  }

  hasOwn (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

  isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  isPlainArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }
}
export default new Chart()
