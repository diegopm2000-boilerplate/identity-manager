// app.js

const express = require('express');
const expressOpenapi = require('express-openapi');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const logger = require('../../shared/infrastructure/log/logFacade');
const presenter = require('../../shared/adapter/presenter/httpPresenter');

const healthcheckController = require('../../healthcheck/adapter/controller/healthcheck.controller');
const userController = require('../../user/adapter/controller/user.controller');
const tokenController = require('../../token/adapter/controller/token.controller');

const userRemoteRepository = require('../../user/adapter/repository/user.remote.repository');

const jwtTokenManager = require('../../shared/infrastructure/util/jwtManager');
const webSecurity = require('../../shared/infrastructure/util/webSecurity');
const encrypter = require('../../shared/infrastructure/util/encrypter');

const healthcheckUC = require('../../healthcheck/usecase/healthcheck.usecase');
const userUC = require('../../user/usecase/user.usecase');
const tokenUC = require('../../token/usecase/token.usecase');

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES & CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

const API_DOCUMENT = './src/app/infrastructure/openapi.yaml';

const DEFAULT_PORT = 8080;

const config = {};

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function loadConfig() {
  logger.debug(`${MODULE_NAME}:${loadConfig.name} (IN) -> no params`);

  logger.debug(`${MODULE_NAME}:${loadConfig.name} (MID) -> loading config from environment...`);

  config.expressPort = process.env.EXPRESS_PORT;
  config.userServiceEndpoint = process.env.USER_SERVICE_ENDPOINT;

  logger.debug(`${MODULE_NAME}:${loadConfig.name} (MID) -> config loaded: ${JSON.stringify(config)}`);

  logger.debug(`${MODULE_NAME}:${loadConfig.name} (OUT) -> Done!`);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.error(`${MODULE_NAME}:${errorHandler.name} (ERROR) --> error: ${err.stack}, message: ${err.details[0].message}`);

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message: err.message };
  res.status(status).json(errorObj);
}

// eslint-disable-next-line no-unused-vars
function routeNotFoundErrorHandler(req, res, next) {
  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
}

function initExpress(portIN) {
  logger.debug(`${MODULE_NAME}:${initExpress.name} (IN) -> portIN: ${portIN}`);
  const expressApp = express();

  const port = portIN || DEFAULT_PORT;

  expressApp.listen(port);

  logger.debug(`${MODULE_NAME}:${initExpress.name} (OUT) -> expressApp: <<expressApp>>`);
  return expressApp;
}

function initExpressOpenAPI(expressApp) {
  logger.debug(`${MODULE_NAME}:${initExpressOpenAPI.name} (IN) -> expressApp: <<expressApp>>`);

  const options = {
    app: expressApp,
    apiDoc: './src/app/infrastructure/openapi.yaml',
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler,
    operations: {
      healthcheck: healthcheckController.healthcheck,
      registerUser: userController.registerUser,
      authenticateUser: userController.authenticateUser,
      getUserByToken: userController.getUserByToken,
      verifyToken: tokenController.verifyToken,
      refreshToken: tokenController.refreshToken,
    },
  };

  expressOpenapi.initialize(options);
  logger.debug(`${MODULE_NAME}:${initExpressOpenAPI.name} (OUT) -> Done`);
}

function initSwaggerUI(expressApp) {
  const swaggerDocument = YAML.load(API_DOCUMENT);
  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

function initHealthcheckUC() {
  logger.debug(`${MODULE_NAME}:${initHealthcheckUC.name} (IN) -> no params`);

  healthcheckUC.init(logger, presenter);

  logger.debug(`${MODULE_NAME}:${initHealthcheckUC.name} (OUT) -> Done`);
}

function initUserUC() {
  logger.debug(`${MODULE_NAME}:${initUserUC.name} (IN) -> no params`);

  userUC.init(logger, presenter, userRemoteRepository, jwtTokenManager, encrypter);

  logger.debug(`${MODULE_NAME}:${initUserUC.name} (OUT) -> Done`);
}

function initTokenUC() {
  logger.debug(`${MODULE_NAME}:${initUserUC.name} (IN) -> no params`);

  tokenUC.init(logger, presenter, jwtTokenManager);

  logger.debug(`${MODULE_NAME}:${initUserUC.name} (OUT) -> Done`);
}

function initUserRemoteRepository(userServiceEndpoint) {
  logger.debug(`${MODULE_NAME}:${initUserRemoteRepository.name} (IN) -> userServiceEndpoint: ${userServiceEndpoint}`);

  userRemoteRepository.init(userServiceEndpoint);

  logger.debug(`${MODULE_NAME}:${initUserRemoteRepository.name} (OUT) -> Done`);
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  // 1. Init default log
  logger.defaultInit();
  logger.debug(`${MODULE_NAME}:init (IN) --> no params`);

  // 2. Load Config from environment
  loadConfig();

  // 3. Init Express
  const expressApp = initExpress(config.expressPort);

  // 4. Init Web Security
  webSecurity.init(expressApp);

  // 5. Init ExpressOpenApi
  await initExpressOpenAPI(expressApp);

  // 6. Expose documentation using swagger-ui-express
  initSwaggerUI(expressApp);

  // 7. Route for handle the 404 route not found
  expressApp.use(routeNotFoundErrorHandler);

  // 8. Init JWT Manager
  jwtTokenManager.init('mysecret', 600, jwtTokenManager.HS256);

  // 9. User UseCases & Repositories
  initHealthcheckUC();
  initUserUC();
  initTokenUC();
  initUserRemoteRepository(config.userServiceEndpoint);

  // 10. App Start Result
  const result = true;
  logger.debug(`${MODULE_NAME}:init (OUT) -> App started: ${JSON.stringify(result)}`);
  return result;
};

process.on('unhandledRejection', (err, p) => {
  logger.error(`${MODULE_NAME} (ERROR) --> An unhandledRejection occurred...`);
  logger.error(`${MODULE_NAME} (ERROR) --> Rejected Promise: ${p}`);
  logger.error(`${MODULE_NAME} (ERROR) --> Rejection: ${err}`);
});

require('make-runnable/custom')({
  printOutputFrame: false,
});
