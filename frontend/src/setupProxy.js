const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/oauth',
    createProxyMiddleware({
      target: 'https://api-uat145.phillipbank.com.kh:8441',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug', // Add logging for troubleshooting
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-uat145.phillipbank.com.kh:8441',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
    })
  );
};