const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    '/',
    createProxyMiddleware({
      target: "https://assets.coingecko.com",
      changeOrigin: true,
    })
  );
};