// user.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');

const registerUserUC = require('../../usecase/registerUser.usecase');
const authenticateUserUC = require('../../usecase/auhenticateUser.usecase');
const getUserByTokenUC = require('../../usecase/getUserByToken.usecase');

const userRepository = require('../repository/user.remote.repository');

const tokenManager = require('../../../shared/infrastructure/util/jwtManager');
const encrypter = require('../../../shared/infrastructure/util/encrypter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function registerUser(req, res, next) {
  try {
    // IN
    const newUserData = req.body;
    logger.info(`${MODULE_NAME}:${registerUser.name} (IN) -> newUserData: ${JSON.stringify(newUserData)}`);

    // Get the remote endpoint
    const endpoint = process.env.USER_SERVICE_ENDPOINT;
    logger.info(`${MODULE_NAME}:${registerUser.name} (MID) -> endpoint: ${endpoint}`);

    // Execute Business Logic
    const result = await registerUserUC.execute(logger, presenter, userRepository, endpoint, newUserData);

    // Return Result
    logger.info(`${MODULE_NAME}:${registerUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${registerUser.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function authenticateUser(req, res, next) {
  try {
    // IN
    const { username, password } = req.headers;
    logger.info(`${MODULE_NAME}:${authenticateUser.name} (IN) -> username: ${username}, password: ${password}`);

    // Get the remote endpoint
    const endpoint = process.env.USER_SERVICE_ENDPOINT;
    logger.info(`${MODULE_NAME}:${authenticateUser.name} (MID) -> endpoint: ${endpoint}`);

    // Business Logic
    const result = await authenticateUserUC.execute(logger, presenter, userRepository, endpoint, tokenManager, encrypter, username, password);

    // Return result
    logger.info(`${MODULE_NAME}:${authenticateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${authenticateUser.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function getUserByToken(req, res, next) {
  try {
    // IN
    const { token } = req.headers;
    logger.info(`${MODULE_NAME}:${getUserByToken.name} (IN) -> token: ${token}`);

    // Get the remote endpoint
    const endpoint = process.env.USER_SERVICE_ENDPOINT;
    logger.info(`${MODULE_NAME}:${getUserByToken.name} (MID) -> endpoint: ${endpoint}`);

    // Execute Business Logic
    const result = await getUserByTokenUC.execute(logger, presenter, userRepository, endpoint, tokenManager, token);

    // Return Result
    logger.info(`${MODULE_NAME}:${getUserByToken.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${getUserByToken.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

module.exports = {
  registerUser,
  authenticateUser,
  getUserByToken,
};
