// registerUser.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[registerUser UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

// TODO el endpoint no debería pasarse como parametro...ver que opciones hay (mejor inicializarlo en el arranque)

async function execute(logger, presenter, userRepository, endpoint, userData) {
  // IN
  logger.debug(`${MODULE_NAME}:${execute.name} (IN)  -> endpoint: ${endpoint}, userData: ${userData}`);

  // Get User by loginname
  const result = await userRepository.registerUser(userData, endpoint);

  if (result.error) {
    return presenter.presentConflict(result.error.message);
  }

  // Return result
  logger.debug(`${MODULE_NAME}:${execute.name} (OUT)  -> result: ${JSON.stringify(result)}`);
  return presenter.presentObject(result);
}

module.exports = {
  execute,
};
