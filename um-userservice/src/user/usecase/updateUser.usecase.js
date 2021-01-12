// updateUser.usecase.js

const Videogame = require('../domain/User');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateUser UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, schemaValidator, encrypter, userRepository, dataIN, id) => {
  // IN
  logger.debug(`${MODULE_NAME} (IN)  -> dataIN: ${JSON.stringify(dataIN)}, id: ${id}`);

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = id;
  data.password = encrypter.encrypt(data.password);

  // Create Domain Object
  const objectDO = new Videogame(data, schemaValidator);
  if (objectDO.errors && objectDO.errors.length > 0) {
    return presenter.presentConflict(objectDO.errors);
  }

  // Check if exists the user with the same id
  const objectFound = await userRepository.getById(id);
  if (objectFound == null) {
    return presenter.presentObjectNotFound();
  }

  // Check if exists a previous object with the same loginname and distinct id
  const objectsFound = await userRepository.getByFilter({ loginname: data.loginname });
  if (Array.isArray(objectsFound) && objectsFound.find((x) => x.id !== id)) {
    return presenter.presentConflict('There is a previous User with the same loginname in the system');
  }

  // Persistence
  const innerResult = await userRepository.update(objectDO, id);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Load the updated object
  const updatedObj = await userRepository.getById(id);

  // Delete password from object
  updatedObj.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(updatedObj);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
