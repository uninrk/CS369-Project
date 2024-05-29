const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('Proxy configuration loaded');
    app.use(
        '/api/*',
        createProxyMiddleware({
            target: 'http://localhost:8080',  // Ensure this points to your backend server
            changeOrigin: true,
            timeout: 600000, // Timeout set to 10 minutes (600,000 milliseconds)
        })
    );
};
