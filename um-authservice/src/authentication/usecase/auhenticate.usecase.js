// authenticate.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticate UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, userRepository, endpoint, tokenManager, encrypter, loginname, password) => {
  const funcName = 'execute';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN)  -> loginname: ${loginname}, password: ${password}`);

  // Get User by loginname
  const userFound = await userRepository.getByLoginname(loginname, endpoint);

  // Check if user was found in the user repository
  if (!userFound) {
    logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> user not found`);
    return presenter.presentNotAuthenticated();
  }

  // Verify the password
  const passwordIsOK = await encrypter.compare(password, userFound.password);
  if (!passwordIsOK) {
    logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> wrong password`);
    return presenter.presentNotAuthenticated();
  }

  // Generate token
  const token = tokenManager.create({ loginame: userFound.loginname });

  // Build result
  const result = presenter.presentObject({ token });

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT)  -> result: ${JSON.stringify(result)}`);
  return (result);
};
