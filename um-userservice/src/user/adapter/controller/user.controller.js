// user.controller.js

const uniqIdGenerator = require('../../../shared/infrastructure/util/uniqIdGenerator');
const schemaValidator = require('../../../shared/infrastructure/util/schemaValidator');

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');

const getUserByIdUC = require('../../usecase/getUserById.usecase');
const getAllUsersUC = require('../../usecase/getAllUsers.usecase');
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
  try {
    const funcName = 'getUserById';
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await getUserByIdUC.execute(logger, presenter, userRepository, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:getUserById (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const funcName = 'getAll';
    // IN
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> no params`);

    // Execute Business Logic
    const result = await getAllUsersUC.execute(logger, presenter, userRepository);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:getUserById (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const funcName = 'deleteUser';
    // IN
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> userId: ${userId}`);

    // Execute Business Logic
    const result = await deleteUserUC.execute(logger, presenter, userRepository, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:getUserById (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const funcName = 'createUser';
    // IN
    const newUserData = req.body;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> newUserData: ${JSON.stringify(newUserData)}`);

    // Execute Business Logic
    const result = await createUserUC.execute(logger, presenter, uniqIdGenerator, schemaValidator, userRepository, newUserData);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:getUserById (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const funcName = 'updateUser';
    // IN
    const newUserData = req.body;
    const { userId } = req.params;
    logger.info(`${MODULE_NAME}:${funcName} (IN) -> newUserData: ${JSON.stringify(newUserData)}, userId: ${userId}`);

    // Execute Business Logic
    const result = await updateUserUC.execute(logger, presenter, schemaValidator, userRepository, newUserData, userId);

    // Return Result
    logger.info(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME}:getUserById (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
