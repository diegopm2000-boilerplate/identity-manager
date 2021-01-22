// user.usecase.js

const User = require('../domain/User');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[user UseCase]';

let logger;
let presenter;
let repository;
let uniqIdGenerator;
let schemaValidator;
let encrypter;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

function init(loggerIN, presenterIN, repositoryIN, uniqIdGeneratorIN, schemaValidatorIN, encrypterIN) {
  logger = loggerIN;
  presenter = presenterIN;
  repository = repositoryIN;
  uniqIdGenerator = uniqIdGeneratorIN;
  schemaValidator = schemaValidatorIN;
  encrypter = encrypterIN;
}

async function getUserById(id) {
  // IN
  logger.debug(`${MODULE_NAME}:${getUserById.name} (IN)  -> id: ${JSON.stringify(id)}`);

  // Get object from repository
  const innerResult = await repository.getById(id);
  logger.debug(`${MODULE_NAME}:${getUserById.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  if (innerResult == null) {
    logger.debug(`${MODULE_NAME}:${getUserById.name} (OUT) -> object not found`);
    return presenter.presentObjectNotFound();
  }

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getAllUsers() {
  // IN
  logger.debug(`${MODULE_NAME}:${getAllUsers.name} (IN)  -> no params`);

  // Get objects from repository
  const innerResult = await repository.getAll();
  logger.debug(`${MODULE_NAME}:${getAllUsers.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Delete passwords from innerResults
  const innerResultFixed = innerResult.map((element) => {
    // eslint-disable-next-line no-param-reassign
    element.password = undefined;
    return element;
  });

  // Build & Return result
  const result = presenter.presentObject(innerResultFixed);
  logger.debug(`${MODULE_NAME}:${getAllUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUsersByFilter(filter) {
  // IN
  logger.debug(`${MODULE_NAME}:${getUsersByFilter.name} (IN)  -> filter: ${JSON.stringify(filter)}`);

  // Get objects from repository
  const innerResult = await repository.getByFilter(filter);
  logger.debug(`${MODULE_NAME}${getUsersByFilter.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}${getUsersByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(userDataIN) {
  // IN
  logger.debug(`${MODULE_NAME}:${createUser.name} (IN)  -> userDataIN: ${JSON.stringify(userDataIN)}`);

  // Build data
  const data = JSON.parse(JSON.stringify(userDataIN));
  data.id = uniqIdGenerator.generateUniqId();
  data.password = encrypter.encrypt(data.password);

  // Create Domain Object
  const newObjectDO = new User(data, schemaValidator);
  if (newObjectDO.errors && newObjectDO.errors.length > 0) {
    return presenter.presentConflict(newObjectDO.errors);
  }

  // Check if exists a previous User with the same loginname
  const objectsFound = await repository.getByFilter({ loginname: userDataIN.loginname });
  if (Array.isArray(objectsFound) && objectsFound.length > 0) {
    return presenter.presentConflict('There is a previous User with the same loginname in the system');
  }

  // Persistence
  const innerResult = await repository.create(newObjectDO);
  logger.debug(`${MODULE_NAME}:${createUser.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentCreatedObject(innerResult);
  logger.debug(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateUser(dataIN, id) {
  // IN
  logger.debug(`${MODULE_NAME} (IN)  -> dataIN: ${JSON.stringify(dataIN)}, id: ${id}`);

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = id;
  data.password = encrypter.encrypt(data.password);

  // Create Domain Object
  const objectDO = new User(data, schemaValidator);
  if (objectDO.errors && objectDO.errors.length > 0) {
    return presenter.presentConflict(objectDO.errors);
  }

  // Check if exists the user with the same id
  const objectFound = await repository.getById(id);
  if (objectFound == null) {
    return presenter.presentObjectNotFound();
  }

  // Check if exists a previous object with the same loginname and distinct id
  const objectsFound = await repository.getByFilter({ loginname: data.loginname });
  if (Array.isArray(objectsFound) && objectsFound.find((x) => x.id !== id)) {
    return presenter.presentConflict('There is a previous User with the same loginname in the system');
  }

  // Persistence
  const innerResult = await repository.update(objectDO, id);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Load the updated object
  const updatedObj = await repository.getById(id);

  // Delete password from object
  updatedObj.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(updatedObj);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(id) {
  // IN
  logger.debug(`${MODULE_NAME}:${deleteUser.name} (IN)  -> id: ${JSON.stringify(id)}`);

  // Check if the object was found
  const objectFound = await repository.getById(id);
  if (!objectFound) {
    return presenter.presentObjectNotFound();
  }

  // Remove object from repository
  const wasDeleted = await repository.remove(id);
  logger.debug(`${MODULE_NAME}:${deleteUser.name} (MID) -> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Build & Return result
  const result = presenter.presentResultOfDeletion(wasDeleted);
  logger.debug(`${MODULE_NAME}:${deleteUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  init,
  getUserById,
  getUsersByFilter,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
