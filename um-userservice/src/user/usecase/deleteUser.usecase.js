// deleteUser.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteUser UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (logger, presenter, userRepository, id) => {
  // IN
  logger.debug(`${MODULE_NAME} (IN)  -> id: ${JSON.stringify(id)}`);

  // Check if the object was found
  const objectFound = await userRepository.getById(id);
  if (!objectFound) {
    return presenter.presentObjectNotFound();
  }

  // Remove object from repository
  const wasDeleted = await userRepository.remove(id);
  logger.debug(`${MODULE_NAME} (MID) -> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Build & Return result
  const result = presenter.presentResultOfDeletion(wasDeleted);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
