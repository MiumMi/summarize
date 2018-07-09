class BaseMethods {
  sort (list, key, type) {
    type = type || 'desc'
    return type === 'desc' ? this.sortDesc(list, key) : this.sortAsc(list, key)
  }

  sortDesc (list, key) {
    return list.sort((a, b) => (b[key] - a[key]).slice(0))
  }

  sortAsc (list, key) {
    return list.sort((a, b) => (a[key] - b[key]).slice(0))
  }

  // 本地化资产数据
  assetsChange (target, replaceStr) {
    target = Number(target)
    if (Object.is(NaN, target)) {
      let nullStr = replaceStr || '0.00'
      return nullStr
    }
    let handle = Number(target.toFixed(2)).toFixed(2)
    let flag = ''
    if (handle.includes('-')) {
      flag = '-'
    }
    let tempInt = Number(handle.split('.')[0]).toLocaleString().replace(/\.\d{2}$/, '')
    tempInt = flag ? tempInt.includes('-') ? tempInt : `-${tempInt}` : tempInt
    return `${tempInt}.${handle.split('.')[1]}`
  }

  // 资金有单位 
  assetsScale(money) {
    money = String(money)
    if (money === '0' || money === '' || Object.is(NaN, money) {
      return '0.00元'
    }
    let arr = money.split('.')
    let str = ''
    arr[0] = arr[0].split('').reverse().join('')
    let amount = ''
    if (arr[0].length < 4) {
      str = '元'
      amount = arr[0] + '.' + arr[1]
    } else if (arr[0].length >= 4 && arr[0].length < 9) {
      str = '万元'
      amount = arr[0].substr(4, 4).split('').reverse().join('') + '.' + arr[0].substr(2, 2).split('').reverse().join('')
    } else {
      str = '亿元'
      amount = arr[0].substr(8).split('').reverse().join('') + '.' + arr[0].substr(6, 2).split('').reverse().join('')
    }
    amount = this.fixedNum(amount, 2)
    return amount + str
  }

  // 保留了几位小数
  fixedNum(num, decimal, str) {
    var num = Number(num)
    var str = str || ''
    if (!num || Object.is(num, NaN)) {
      return '0.'.padEnd(decimal * 1 + 2, 0) + str
    }
    return num.toFixed(decimal) + str
  }

  // 格式化日期
  // 将日期格式化成你想要的标准格式（不能转化成年月日）
  formatDate (date, placeholder) {
    if (!date) {
      return false
    }
    // || 操作符赋值一定要使用var
    let dateStr = date
    var placeholder = placeholder || ''
    dateStr = dateStr.replace(/(\d+)(\D+)/g, ($0, $1) => $1.padStart(2, '0') + ' ')
    dateStr =  dateStr.split(' ')
    dateStr[dateStr.length - 1] = dateStr[dateStr.length - 1].padStart(2, '0')
    return dateStr.join(placeholder)
  }
}

export default new BaseMethods()