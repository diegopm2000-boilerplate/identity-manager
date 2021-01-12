// getAllUsers.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getAllUsers UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, userRepository) => {
  const funcName = 'execute';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN)  -> no params`);

  // Get objects from repository
  const innerResult = await userRepository.getAll();
  logger.debug(`${MODULE_NAME}:${funcName} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
