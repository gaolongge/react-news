import configUrl from './config.js'
/**
 *  基于fetch 在浏览器中发送请求库的封装
 */
// export const
export let fetchAjxax = {
    // 弹出"正在加载"效果
    showLoading: function () {
    },
    // 关闭 "正在加载" 效果
    hideLoading: function () {
    },
    // 在header中添加token
    setTokenInHeader: function () {
    },
    // json 转为 get请求的字符串
    json_to_get: function (jsonObj) {
        return Object.keys(jsonObj).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
        }).join("&");
    },
    // get 请求字符串转为json
    get_to_json: function (sstr) {
        sstr = sstr.replace(/&/g, '","').replace(/=/g, '":"');
        sstr = '{"' + sstr + '"}';
    },
    fetchAction: function (url, fetchConfig) {
        var that = this;
        return new Promise(function (resolve, reject) {
            fetch(configUrl.baseUrl + url, fetchConfig)
            // then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
            // 第一个then的response返回的是 服务器响应的信息 —— 包括 header content-type body 等信息
            // 只要不是后台报错，响应都是成功的，比如 404 ，403， 500等是成功返回
            .then(function (response) {
                // 如果是成功返回
                if (response.ok) {
                    // 这个函数返回的是接口响应的值，执行后面的then 方法
                    return response.json();
                } else {
                    // 后台报错，执行后面的catch方法
                    reject(response)
                }
            }).then(function (response) {
                resolve(response);
            }).catch (function (err) {
                reject({
                    status: -1
                });
            }).finally(function () {
                // 无论成功和失败，都需要执行该方法，用来关闭菊花效果
                that.hideLoading();
            })
        });
    },
    /**
     * 基于 fetch 封装的 GET请求
     * @param url
     * @param params {}
     * @param headers
     * @returns {Promise}
     */
    get: function (url, params, headers) {
        var that = this;
        this.showLoading();
        var headerObj = {};
        if (params) {
            var paramsArray = [];
            //encodeURIComponent
            Object.keys(params).forEach(function (key) {
                paramsArray.push(key + '=' + params[key])
            });
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        // 判断用户是否添加了值
        if (headers === undefined) {
            headerObj = {};
        } else {
            headerObj = headers;
        }
        // 设置token在header中
        this.setTokenInHeader(headerObj);

        var fetchConfig = {
            method: 'GET',
            headers: headerObj,
        }
        return that.fetchAction(url, fetchConfig);
    },
    /**
     * 基于 fetch 封装的 POST请求  FormData 表单数据
     * @param url
     * @param formData
     * @param headers
     * @returns {Promise}
     */
    post: function (url, params, headers) {
        var that = this;
        this.showLoading();
        var formDataObj = null; // 传递的参数
        var headerObj = {}; // 设置请求头对象
        if (params === undefined) {
            formDataObj = "";
        } else {
            // 判断传递过来的是否是对象，如果是JSON 对象，需要序列化JSON数据，后台才能接受的到
            if (params instanceof Object) {
                formDataObj = that.json_to_get(params)
            } else { // 如果不是JSON，则直接使用用户传递过来的值
                formDataObj = params;
            }
        }
        // 判断用户是否添加了值
        if (headers === undefined) {
            headerObj['Content-type'] = 'application/x-www-form-urlencoded';
        } else {
            headerObj = headers;
        }
        // 设置token在header中
        this.setTokenInHeader(headerObj);
        var fetchConfig = {
            method: 'POST',
            mode: 'cors',
            headers: headerObj,
            body: formDataObj,
        };
        return that.fetchAction(url, fetchConfig);
    },
    postUpload: function (url, formdata, headers) {
        var that = this;
        this.showLoading();
        var uploadReq = new Request(configUrl.baseUrl + url, { //url为服务器接口URL
            method: "POST",
            body: formdata
        });
        return new Promise(function (resolve, reject) {
            fetch(uploadReq)
            // then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
            // 第一个then的response返回的是 服务器响应的信息 —— 包括 header content-type body 等信息
            // 只要不是后台报错，响应都是成功的，比如 404 ，403等是成功返回
                .then(function (response) {
                    // 如果是成功返回
                    if (response.ok) {
                        // response.json读取服务器发来的JSON数据，response.json返回Promise，所以可以链式调用.then方法
                        return response.json();
                    } else {
                        // 后台报错，执行后面的catch方法
                        reject({
                            status: response.status
                        })
                    }
                })
                .then(function (response) {
                    resolve(response);
                })
                .catch (function (err) {
                    reject({
                        status: -1
                    });
                })
                // 无论成功和失败，都需要执行该方法，用来关闭菊花效果
                .finally(function () {
                    that.hideLoading();
                })
        });
    }
};
