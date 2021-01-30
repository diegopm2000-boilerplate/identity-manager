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

const userMongooseRepository = require('../../user/adapter/repository/mongoose/user.mongoose.repository');

const webSecurity = require('../../shared/infrastructure/util/webSecurity');
const mongoInfra = require('../../shared/infrastructure/database/mongo/mongo.infra');
const uniqIdGenerator = require('../../shared/infrastructure/util/uniqIdGenerator');
const schemaValidator = require('../../shared/infrastructure/util/schemaValidator');
const encrypter = require('../../shared/infrastructure/util/encrypter');

const userUC = require('../../user/usecase/user.usecase');
const healthcheckUC = require('../../healthcheck/usecase/healthcheck.usecase');

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
  config.mongoURL = process.env.MONGO_URL;

  logger.debug(`${MODULE_NAME}:${loadConfig.name} (MID) -> config loaded: ${JSON.stringify(config)}`);

  logger.debug(`${MODULE_NAME}:${loadConfig.name} (OUT) -> Done!`);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.error(`${MODULE_NAME}:${errorHandler.name} (ERROR) --> error: ${err.stack}`);

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
    apiDoc: API_DOCUMENT,
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler,
    operations: {
      healthcheck: healthcheckController.healthcheck,
      getUserById: userController.getUserById,
      getUsersByFilter: userController.getUsersByFilter,
      deleteUser: userController.deleteUser,
      createUser: userController.createUser,
      updateUser: userController.updateUser,
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

  userUC.init(logger, presenter, userMongooseRepository, uniqIdGenerator, schemaValidator, encrypter);

  logger.debug(`${MODULE_NAME}:${initUserUC.name} (OUT) -> Done`);
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  // 1. Init default logger
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

  // 8. Mongo init
  await mongoInfra.init({ mongoURL: config.mongoURL });

  // 9. User UseCases
  initHealthcheckUC();
  initUserUC();
  
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
