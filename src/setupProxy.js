const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            timeout: 600000, // Timeout set to 10 minutes (600,000 milliseconds)
        })
    );
};