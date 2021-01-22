// token.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[token UseCase]';

let logger;
let presenter;
let tokenManager;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

function init(loggerIN, presenterIN, tokenManagerIN) {
  logger = loggerIN;
  presenter = presenterIN;
  tokenManager = tokenManagerIN;
}

async function refreshToken(token) {
  try {
    // IN
    logger.debug(`${MODULE_NAME}:${refreshToken.name} (IN)  -> token: ${token}`);

    // Refresh the token
    const tokenResult = tokenManager.refresh(token);

    // Build result
    const result = presenter.presentObject({ token: tokenResult });

    // Return result
    logger.debug(`${MODULE_NAME}:${refreshToken.name} (OUT)  -> result: ${JSON.stringify(result)}`);
    return (result);
  } catch (error) {
    if (error.message === tokenManager.ERR_BAD_FORMAT_TOKEN) {
      return presenter.presentBadEntry();
    }
    throw error;
  }
}

async function verifyToken(token) {
  try {
    // IN
    logger.debug(`${MODULE_NAME}:${verifyToken.name} (IN)  -> token: ${token}`);

    // Verify the token
    const tokenResult = tokenManager.check(token);
    logger.debug(`${MODULE_NAME}:${verifyToken.name} (MID)  -> tokenResult: ${JSON.stringify(tokenResult)}`);

    // Build result
    const result = { message: 'OK' };

    // Return result
    logger.debug(`${MODULE_NAME}:${verifyToken.name} (OUT)  -> result: ${JSON.stringify(result)}`);
    return presenter.presentObject(result);
  } catch (error) {
    if (error.message === tokenManager.ERR_BAD_FORMAT_TOKEN) {
      return presenter.presentBadEntry();
    }
    throw error;
  }
}

module.exports = {
  init,
  refreshToken,
  verifyToken,
};
