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

  // Delete passwords from innerResults
  const innerResultFixed = innerResult.map((element) => {
    // eslint-disable-next-line no-param-reassign
    element.password = undefined;
    return element;
  });

  // Build & Return result
  const result = presenter.presentObject(innerResultFixed);
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
