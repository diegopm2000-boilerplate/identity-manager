// authenticateUser.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticateUser UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

// TODO el endpoint no debería pasarse como parametro...ver que opciones hay

async function execute(logger, presenter, userRepository, endpoint, tokenManager, encrypter, loginname, password) {
  // IN
  logger.debug(`${MODULE_NAME}:${execute.name} (IN)  -> loginname: ${loginname}, password: ${password}`);

  // Get User by loginname
  const userFound = await userRepository.getUserByLoginname(loginname, endpoint);

  // Check if user was found in the user repository
  if (!userFound) {
    logger.debug(`${MODULE_NAME}:${execute.name} (OUT) -> user not found`);
    return presenter.presentNotAuthenticated();
  }

  // Verify the password
  const passwordIsOK = await encrypter.compare(password, userFound.password);
  if (!passwordIsOK) {
    logger.debug(`${MODULE_NAME}:${execute.name} (OUT) -> wrong password`);
    return presenter.presentNotAuthenticated();
  }

  // Generate token
  const token = tokenManager.create({ loginname: userFound.loginname });

  // Build result
  const result = { token };

  // Return result
  logger.debug(`${MODULE_NAME}:${execute.name} (OUT)  -> result: ${JSON.stringify(result)}`);
  return presenter.presentObject(result);
}

module.exports = {
  execute,
};
