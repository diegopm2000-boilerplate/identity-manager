// authenticate.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const authenticateUC = require('../../usecase/auhenticate.usecase');
const refreshUC = require('../../usecase/refresh.usecase');

const userRepository = require('../repository/remote/user.remote.repository');
const tokenManager = require('../../../shared/infrastructure/util/jwtManager');
const encrypter = require('../../../shared/infrastructure/util/encrypter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticate Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.authenticate = async (req, res, next) => {
  try {
    const funcName = 'authenticate';
    // IN
    const { username, password } = req.headers;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> username: ${username}, password: ${password}`);

    // Get the remote endpoint
    const endpoint = process.env.USER_SERVICE_ENDPOINT;
    logger.info(`${MODULE_NAME}:${funcName} (MID) -> endpoint: ${endpoint}`);

    // Business Logic
    const result = await authenticateUC.execute(logger, presenter, userRepository, endpoint, tokenManager, encrypter, username, password);

    // Return result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const funcName = 'refresh';
    // IN
    const { token } = req.headers;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> token: ${token}`);

    // Business Logic
    const result = await refreshUC.execute(logger, presenter, tokenManager, token);

    // Return result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
