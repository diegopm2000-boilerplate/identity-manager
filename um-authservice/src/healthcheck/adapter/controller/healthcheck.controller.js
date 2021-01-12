// healthcheck.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const healthcheckUC = require('../../usecase/healthcheck.usecase');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[healthcheck Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.healthcheck = async (req, res, next) => {
  try {
    const funcName = 'healthcheck';
    // IN
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> no params`);

    // Business Logic
    const result = await healthcheckUC.execute(logger, presenter);

    // Return result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
