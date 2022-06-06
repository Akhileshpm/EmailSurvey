const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/survey/surveys','/auth','/auth/google','survey/auth','/survey/surveyCollections'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
