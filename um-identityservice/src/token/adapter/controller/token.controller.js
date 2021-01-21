// token.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');

const verifyTokenUC = require('../../usecase/verifytoken.usecase');
const refreshTokenUC = require('../../usecase/refreshtoken.usecase');

const tokenManager = require('../../../shared/infrastructure/util/jwtManager');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Token Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function verifyToken(req, res, next) {
  try {
    // IN
    const { token } = req.headers;
    logger.info(`${MODULE_NAME}:${verifyToken.name} (IN) -> token: ${token}`);

    // Execute Business Logic
    const result = await verifyTokenUC.execute(logger, presenter, tokenManager, token);

    // Return Result
    logger.info(`${MODULE_NAME}:${verifyToken.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${verifyToken.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function refreshToken(req, res, next) {
  try {
    // IN
    const { token } = req.headers;
    logger.info(`${MODULE_NAME}:${refreshToken.name} (IN) -> token: ${token}`);

    // Business Logic
    const result = await refreshTokenUC.execute(logger, presenter, tokenManager, token);

    // Return result
    logger.info(`${MODULE_NAME}:${refreshToken.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${refreshToken.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

module.exports = {
  verifyToken,
  refreshToken,
};
