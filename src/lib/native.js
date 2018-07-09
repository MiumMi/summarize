/*
 * @Author: li 
 * @Date: 2017-11-30 14:05:50 
 * @Last Modified by: li
 * @Last Modified time: 2017-12-07 13:56:42
 */
class Native {
    constructor() {
        this.platform = this.ua()
        window['JSInterface'] = {}
    }

    setScheme (scheme) {
        this.scheme = Object.assign({}, scheme)
    }

    ua() {
        let uaType
        if (typeof window !== 'undefined') {
            uaType = 'navigator' in window && 'userAgent' in navigator &&
                navigator.userAgent.toLowerCase() || ''
        }
        const iPad = uaType.match(/ipad/),// null or ['mac os x', index: 30, input: 'xx']
            //some wp platform fake uaType to android
            Android = uaType.match(/android/) && !uaType.match(/windows phone/),
            iOS = uaType.match(/iphone/),
            WinPhone = uaType.match(/windows phone/),
            Mac = uaType.match(/mac os x/),
            Windows = uaType.match(/window/),
            Linux = uaType.match(/linux/),
            Blackberry = uaType.match(/blackberry/),
            Tablet = /ipad|android(?!.*mobile)/i.test(uaType),
            AndroidTablet = /android/.test(uaType) && !/mobile/.test(uaType);
        const device = [
            iPad, Android, iOS, WinPhone, Mac, Windows, Linux, Blackberry, Tablet, AndroidTablet
        ];
        const arrDevice = [
            "iPad", "android", "ios", "windowsPhone", "mac", "windows",
            "linux", "blackBerry", "tablet", "androidTablet"
        ];
        for (let k = 0; k < device.length; k++) {
            if (device[k]) {
                return arrDevice[k];
            }
        }
        return "unknow";
    }

    connectWebViewJavascriptBridge(callback) { //桥接
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    on(type, func) {
        this.platform = this.ua()
        if (this.platform === 'android') {
            window['JSInterface'][type] = func
        } else if (this.platform === 'ios') {
            this.connectWebViewJavascriptBridge((bridge) => {
                bridge.registerHandler(type, func)
            });
        }
    }
    
    emit(type, params, callback) {
        const category = this.scheme[type]
        if (typeof params === 'function') {
            callback = params
            params = undefined
        }
        // this.platform = 'ios'
        if (this.platform === 'android') {
            if (!window[category]) return
            let res = params ? window[category][type](JSON.stringify(params)) : window[category][type]()
            callback && callback(typeof res === 'string' ? JSON.parse(res): res)
        } else if (this.platform === 'ios') {
            this.connectWebViewJavascriptBridge((bridge) => {
                bridge.callHandler(type, params,(response) => { callback && callback(response) })
            })
        }
    }
}
export default new Native()