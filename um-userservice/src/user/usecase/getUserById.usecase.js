// getUserById.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getUserById UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, userRepository, id) => {
  const funcName = 'execute';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN)  -> id: ${JSON.stringify(id)}`);

  // Get object from repository
  const innerResult = await userRepository.getById(id);
  logger.debug(`${MODULE_NAME}:${funcName} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  if (innerResult == null) {
    logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> object not found`);
    return presenter.presentObjectNotFound();
  }

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
