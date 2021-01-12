// authenticate.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const authenticateUC = require('../../usecase/auhenticate.usecase');

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
    const { username, password} = req.headers
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> username: ${username}, password: ${password}`);

    // Business Logic
    const result = await authenticateUC.execute(logger, presenter, username, password);

    // Return result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
