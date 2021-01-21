// getUserByToken.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getUserByToken UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function execute(logger, presenter, userRepository, endpoint, tokenManager, token) {
  // IN
  logger.debug(`${MODULE_NAME}:${execute.name} (IN)  -> token: ${token}`);

  // Decode Token
  const tokenData = tokenManager.getData(token);
  logger.debug(`${MODULE_NAME}:${execute.name} (MID)  -> tokenData: ${JSON.stringify(tokenData)}`);

  // Get User by loginname
  const userFound = await userRepository.getUserByLoginname(tokenData.loginname, endpoint);

  // Check if user was found in the user repository
  if (!userFound) {
    logger.debug(`${MODULE_NAME}:${execute.name} (OUT) -> user not found`);
    return presenter.presentNotAuthenticated();
  }

  // Result
  const result = userFound;

  // Return result
  logger.debug(`${MODULE_NAME}:${execute.name} (OUT)  -> result: ${JSON.stringify(result)}`);
  return presenter.presentObject(result);
}

module.exports = {
  execute,
};
