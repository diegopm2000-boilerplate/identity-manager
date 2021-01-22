// healthcheck.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const healthcheckUC = require('../../usecase/healthcheck.usecase');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[healthcheck Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function healthcheck(req, res, next) {
  try {
    // IN
    logger.info(`${MODULE_NAME}:${healthcheck.name} (IN) -> no params`);

    // Business Logic
    const result = await healthcheckUC.healthcheck();

    // Return result
    logger.info(`${MODULE_NAME}:${healthcheck.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${healthcheck.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

module.exports = {
  healthcheck,
};
