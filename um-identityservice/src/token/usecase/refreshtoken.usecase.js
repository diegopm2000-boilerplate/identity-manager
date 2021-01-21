// refreshtoken.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[refreshToken UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

async function execute(logger, presenter, tokenManager, token) {
  try {
    // IN
    logger.debug(`${MODULE_NAME}:${execute.name} (IN)  -> token: ${token}`);

    // Refresh the token
    const tokenResult = tokenManager.refresh(token);

    // Build result
    const result = presenter.presentObject({ token: tokenResult });

    // Return result
    logger.debug(`${MODULE_NAME}:${execute.name} (OUT)  -> result: ${JSON.stringify(result)}`);
    return (result);
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
