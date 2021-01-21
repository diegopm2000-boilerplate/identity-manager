// refreshtoken.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[verifyToken UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function execute(logger, presenter, tokenManager, token) {
  try {
    // IN
    logger.debug(`${MODULE_NAME}:${execute.name} (IN)  -> token: ${token}`);

    // Verify the token
    const tokenResult = tokenManager.check(token);
    logger.debug(`${MODULE_NAME}:${execute.name} (MID)  -> tokenResult: ${JSON.stringify(tokenResult)}`);

    // Build result
    const result = { message: 'OK' };

    // Return result
    logger.debug(`${MODULE_NAME}:${execute.name} (OUT)  -> result: ${JSON.stringify(result)}`);
    return presenter.presentObject(result);
  } catch (error) {
    if (error.message === tokenManager.ERR_BAD_FORMAT_TOKEN) {
      return presenter.presentBadEntry();
    }
    throw error;
  }
}

module.exports = {
  execute,
};
