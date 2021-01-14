// refresh.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticate UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, tokenManager, token) => {
  const funcName = 'execute';
  try {
    // IN
    logger.debug(`${MODULE_NAME}:${funcName} (IN)  -> token: ${token}`);

    // Refresh the token
    const tokenResult = tokenManager.refresh(token);

    // Build result
    const result = presenter.presentObject({ token: tokenResult });

    // Return result
    logger.debug(`${MODULE_NAME}:${funcName} (OUT)  -> result: ${JSON.stringify(result)}`);
    return (result);
  } catch (error) {
    if (error.message === tokenManager.ERR_BAD_FORMAT_TOKEN) {
      return presenter.presentBadEntry();
    }
    throw error;
  }
};
