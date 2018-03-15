import * as Q from 'q';

declare var wx: any;

export class WxJSSDKService {
    public static config(appId: string, timestamp: string, nonceStr: string, signature: string, jsApiList: string[]) {
        const deferred = Q.defer();
        wx.config({
            debug: false,            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId,              // 必填，公众号的唯一标识
            timestamp: timestamp,          // 必填，生成签名的时间戳
            nonceStr: nonceStr,           // 必填，生成签名的随机串
            signature: signature,          // 必填，签名
            jsApiList: jsApiList           // 必填，需要使用的JS接口列表
        });
        deferred.resolve();
        return deferred.promise;
    }

    /**
     * 通过ready接口处理成功验证
     *  config信息验证后会执行ready方法
     *  所有接口调用都必须在config接口获得结果之后
     *  config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
     *  对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
     */
    public static ready() {
        const deferred = Q.defer();
        wx.ready(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    /**
     * 通过error接口处理失败验证
     * config信息验证失败会执行error函数
     * 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
     */
    public static error() {
        wx.error(function (err) {
            console.log('=================== error ===================');
            console.log(err);
        });
    }

    public static getLocation() {
        const deferred = Q.defer();
        wx.getLocation({
            type: 'wgs84',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (response) {
                deferred.resolve(response);
            },
            fail: function (error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }
}
