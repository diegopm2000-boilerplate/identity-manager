// user.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[user UseCase]';

let logger;
let presenter;
let repository;
let tokenManager;
let encrypter;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

function init(loggerIN, presenterIN, repositoryIN, tokenManagerIN, encrypterIN) {
  logger = loggerIN;
  presenter = presenterIN;
  repository = repositoryIN;
  tokenManager = tokenManagerIN;
  encrypter = encrypterIN;
}

async function registerUser(userData) {
  // IN
  logger.debug(`${MODULE_NAME}:${registerUser.name} (IN)  -> userData: ${JSON.stringify(userData)}`);

  // Get User by loginname
  const innerResult = await repository.registerUser(userData);

  if (innerResult.error) {
    return presenter.presentConflict(innerResult.error.message);
  }

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${registerUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function authenticateUser(loginname, password) {
  // IN
  logger.debug(`${MODULE_NAME}:${authenticateUser.name} (IN)  -> loginname: ${loginname}, password: ${password}`);

  // Get User by loginname
  const userFound = await repository.getUserByLoginname(loginname);

  // Check if user was found in the user repository
  if (!userFound) {
    logger.debug(`${MODULE_NAME}:${authenticateUser.name} (OUT) -> user not found`);
    return presenter.presentNotAuthenticated();
  }

  // Verify the password
  const passwordIsOK = await encrypter.compare(password, userFound.password);
  if (!passwordIsOK) {
    logger.debug(`${MODULE_NAME}:${authenticateUser.name} (OUT) -> wrong password`);
    return presenter.presentNotAuthenticated();
  }

  // Generate token
  const token = tokenManager.create({ loginname: userFound.loginname });

  // Build inner result
  const innerResult = { token };

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${authenticateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserByToken(token) {
  // IN
  logger.debug(`${MODULE_NAME}:${getUserByToken.name} (IN)  -> token: ${token}`);

  // Decode Token
  const tokenData = tokenManager.getData(token);
  logger.debug(`${MODULE_NAME}:${getUserByToken.name} (MID) -> tokenData: ${JSON.stringify(tokenData)}`);

  // Get User by loginname
  const userFound = await repository.getUserByLoginname(tokenData.loginname);

  // Check if user was found in the user repository
  if (!userFound) {
    logger.debug(`${MODULE_NAME}:${getUserByToken.name} (OUT) -> user not found`);
    return presenter.presentNotAuthenticated();
  }

  // Build & Return result
  const result = presenter.presentObject(userFound);
  logger.debug(`${MODULE_NAME}:${getUserByToken.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  init,
  registerUser,
  authenticateUser,
  getUserByToken,
};
