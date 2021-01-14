// app.js

const express = require('express');
const expressOpenapi = require('express-openapi');
const bodyParser = require('body-parser');

const log = require('../../shared/infrastructure/log/logFacade');

const healthcheckController = require('../../healthcheck/adapter/controller/healthcheck.controller');
const authController = require('../../authentication/adapter/controller/authenticate.controller');

const jwtManager = require('../../shared/infrastructure/util/jwtManager');
const webSecurity = require('../../shared/infrastructure/util/webSecurity');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES & CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  log.error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message: err.message };
  res.status(status).json(errorObj);
};

// eslint-disable-next-line no-unused-vars
const routeNotFoundErrorHandler = (req, res, next) => {
  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
};

const initExpress = (expressConfig) => {
  log.debug(`${MODULE_NAME}:${initExpress.name} (IN) -> expressConfig: ${JSON.stringify(expressConfig)}`);
  const expressApp = express();

  expressApp.listen(expressConfig.port);

  return expressApp;
};

const initExpressOpenAPI = (expressApp) => {
  log.debug(`${MODULE_NAME}:${initExpressOpenAPI.name} (IN) -> expressApp: <<expressApp>>`);

  const options = {
    app: expressApp,
    apiDoc: './src/app/infrastructure/openapi.yaml',
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler,
    operations: {
      healthcheck: healthcheckController.healthcheck,
      authenticate: authController.authenticate,
      refresh: authController.refresh,
    },
  };

  expressOpenapi.initialize(options);
};

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  // 1. Init default log
  log.defaultInit();
  log.debug(`${MODULE_NAME}:init (IN) --> no params`);

  // 2. Load Config from environment
  const expressPort = process.env.EXPRESS_PORT;
  log.debug(`${MODULE_NAME}:init (MID) --> expressPort: ${expressPort}`);

  // 3. Init Express
  const expressConfig = { port: expressPort };
  const expressApp = initExpress(expressConfig);

  // 4. Init Web Security
  webSecurity.init(expressApp);

  // 5. Init ExpressOpenApi
  await initExpressOpenAPI(expressApp);

  // 6. Route for handle the 404 route not found
  expressApp.use(routeNotFoundErrorHandler);

  // 7. Init JWT Manager
  jwtManager.init('mysecret', 600, jwtManager.HS256);

  // 8. App Start Result
  const result = true;
  log.debug(`${MODULE_NAME}:init (OUT) -> App started: ${JSON.stringify(result)}`);
  return result;
};

process.on('unhandledRejection', (err, p) => {
  log.error(`${MODULE_NAME} (ERROR) --> An unhandledRejection occurred...`);
  log.error(`${MODULE_NAME} (ERROR) --> Rejected Promise: ${p}`);
  log.error(`${MODULE_NAME} (ERROR) --> Rejection: ${err}`);
});

require('make-runnable/custom')({
  printOutputFrame: false,
});
