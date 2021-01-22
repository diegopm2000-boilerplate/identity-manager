// user.controller.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const userUC = require('../../usecase/user.usecase');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[user Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function getUserById(req, res, next) {
  try {
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${getUserById.name} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await userUC.getUserById(userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${getUserById.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function getUsersByFilter(req, res, next) {
  try {
    // IN
    const filter = req.query || {};
    logger.info(`${MODULE_NAME}:${getUsersByFilter.name} (IN) -> filter: ${filter}`);

    // Execute Business Logic
    const result = await userUC.getUsersByFilter(filter);

    // Return Result
    logger.info(`${MODULE_NAME}:${getUsersByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${getUsersByFilter.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function createUser(req, res, next) {
  try {
    // IN
    const newUserData = req.body;
    logger.info(`${MODULE_NAME}:${createUser.name} (IN) -> newUserData: ${JSON.stringify(newUserData)}`);

    // Execute Business Logic
    const result = await userUC.createUser(newUserData);

    // Return Result
    logger.info(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${createUser.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function updateUser(req, res, next) {
  try {
    // IN
    const newUserData = req.body;
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${updateUser.name} (IN) -> newUserData: ${JSON.stringify(newUserData)}, userId: ${userId}`);

    // Execute Business Logic
    const result = await userUC.updateUser(newUserData, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${updateUser.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

async function deleteUser(req, res, next) {
  try {
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${deleteUser.name} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await userUC.deleteUser(userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${deleteUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${deleteUser.name} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
}

module.exports = {
  getUserById,
  getUsersByFilter,
  createUser,
  updateUser,
  deleteUser,
};
