// getUsersByFilter.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getUsersByFilter UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, userRepository, filter) => {
  // IN
  logger.debug(`${MODULE_NAME} (IN)  -> filter: ${JSON.stringify(filter)}`);

  // Get objects from repository
  const innerResult = await userRepository.getByFilter(filter);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Delete password from object
  innerResult.password = undefined;

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
