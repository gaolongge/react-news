
const proxy = require('http-proxy-middleware');
// 配置跨域代理
module.exports = function (app) {
    app.use(proxy("/cfm", { 
        target: "http://172.16.10.24:8083" ,
        changeOrigin: true,
        pathRewrite: {
        },
      }));
}