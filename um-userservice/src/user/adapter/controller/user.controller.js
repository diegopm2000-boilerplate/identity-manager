// user.controller.js

const uniqIdGenerator = require('../../../shared/infrastructure/util/uniqIdGenerator');
const schemaValidator = require('../../../shared/infrastructure/util/schemaValidator');
const encrypter = require('../../../shared/infrastructure/util/encrypter');

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');

const getUserByIdUC = require('../../usecase/getUserById.usecase');
const getUsersByFilterUC = require('../../usecase/getUsersByFilter.usecase');
const deleteUserUC = require('../../usecase/deleteUser.usecase');
const createUserUC = require('../../usecase/createUser.usecase');
const updateUserUC = require('../../usecase/updateUser.usecase');

// const userRepository = require('../repository/mock/user.mock.repository');
const userRepository = require('../repository/mongoose/user.mongoose.repository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[user Controller]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.getUserById = async (req, res, next) => {
  const funcName = 'getUserById';
  try {
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await getUserByIdUC.execute(logger, presenter, userRepository, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.getUsersByFilter = async (req, res, next) => {
  const funcName = 'getUsersByFilter';
  try {
    // IN
    const filter = req.query || {};
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> filter: ${filter}`);

    // Execute Business Logic
    const result = await getUsersByFilterUC.execute(logger, presenter, userRepository, filter);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.deleteUser = async (req, res, next) => {
  const funcName = 'deleteUser';
  try {
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await deleteUserUC.execute(logger, presenter, userRepository, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.createUser = async (req, res, next) => {
  const funcName = 'createUser';
  try {
    // IN
    const newUserData = req.body;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> newUserData: ${JSON.stringify(newUserData)}`);

    // Execute Business Logic
    const result = await createUserUC.execute(logger, presenter, uniqIdGenerator, schemaValidator, encrypter, userRepository, newUserData);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.updateUser = async (req, res, next) => {
  const funcName = 'updateUser';
  try {
    // IN
    const newUserData = req.body;
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> newUserData: ${JSON.stringify(newUserData)}, userId: ${userId}`);

    // Execute Business Logic
    const result = await updateUserUC.execute(logger, presenter, schemaValidator, encrypter, userRepository, newUserData, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
