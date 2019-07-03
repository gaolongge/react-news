
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy("/cfm", { 
        target: "http://172.16.10.24:8083" ,
        // target: 'https://news.ssp.qq.com',
        changeOrigin: true,
        pathRewrite: {
        },
        // cookieDomainRewrite: "http://localhost:3000"
      }));
}