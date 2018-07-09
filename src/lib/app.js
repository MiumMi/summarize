/*
 * @Author: wwq
 * @Date: 2018-2-24 09:19
 * @Last Modified by: wwq
 * 
 */
import native from './native'

class App {
  // 判断是否是Android机
  initAPP () { 
    let UA = window.navigator.userAgent.toLowerCase()
    if(UA.indexOf('android') > 0){       
      // 需对所有 Android 系统 UA 信息进行判断
      window.localStorage.IsAndroid = 'true'
      this.IsAndroid = true
    }else if(UA.indexOf('iphone') > 0){
      // 需对所有 iOS 系统 UA 信息进行判断
      window.localStorage.IsAndroid = 'false'
      this.IsAndroid = false
    }
  }

  // 设置scheme
  setAppScheme (scheme) {
    native.setScheme(scheme)
  }

  //原生交互：注册方法
  on (type, func) {
    native.on(type, func)
  }

  // 原生交互： 跳转方法
  jump (params) {
    native.emit("jump", params, res => {})
  }
  
  // 原生交互： 设置头信息
  setTitle (params) { 
    native.emit("setTitle", params, res => {})
  }

  // 原生交互： 获取用户登录信息
  getLoginInfo () { 
    return new Promise(judgeUser(resolve, reject))
  }

  // 判断用户登录
  judgeUser (resolve, reject) {
    native.emit("getLoginInfo", null, res => { // 稍微判断一下登录
      if(JSON.stringify(res)!='{}' && res.islogin != '0' && res.accesstoken){
        res = Object.assign(res, { islogin: '1'})
        resolve(res)
      }else{
        resolve({accesstoken: '', islogin: '0'})
      }
    })  
  }

  // 原生交互： 收藏回调
  collectCallBack (params){
    native.emit("collectCallBack", params, res => {})
  }

  //原生交互： 买基金
  buy (fundcode) {
    native.emit('trade', {tradeType: 'Buy', fundCode: fundcode })
  }

  //原生交互： 定投基金
  aip (params) {
    native.emit('trade', {tradeType: 'Aip', fundCode: params.fundcode, fundType: params.fundtype})    
  }

  //原生交互: 分享基金
  shareFund (params) {
    native.emit('shareFund', { url: params.url, title: params.title, desc: params.desc})
  }

  //原生交互: 显示风险等级
  showRisk (isShowRisk) {
    native.emit("showRisk", { isShowRisk }, res => {})
  }

  //原生交互： 
  pop () {
    native.emit('pop', {}, res => {})
  }

  //原生交互：
  getFontSize (callback) {
    native.emit('getFontSize', (res) => {
      callback && callback(res)
    })
  }

  //原生交互: 加载框
  openloadControl () {
    native.emit("loadControl", { type: 'open' }, res => {})
  }  

  //原生交互: 加载框
  closeloadControl () {
    native.emit("loadControl", { type: 'close' }, res => {})
  }
}

// App.prototype.on = native.on

export default new App ()