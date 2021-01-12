// createVideogameUC.js

const User = require('../domain/User');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createUser UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, uniqIdGenerator, schemaValidator, encrypter, userRepository, userDataIN) => {
  // IN
  logger.debug(`${MODULE_NAME} (IN)  -> userDataIN: ${JSON.stringify(userDataIN)}`);

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
  const objectsFound = await userRepository.getByFilter({ loginname: userDataIN.loginname });
  if (Array.isArray(objectsFound) && objectsFound.length > 0) {
    return presenter.presentConflict('There is a previous User with the same loginname in the system');
  }

  // Persistence
  const innerResult = await userRepository.create(newObjectDO);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentCreatedObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
