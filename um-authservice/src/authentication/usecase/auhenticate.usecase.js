// authenticate.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticate UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async(logger, presenter, username, password) => {
   // IN
   logger.debug(`${MODULE_NAME} (IN)  -> username: ${username}, password: ${password}`);

   return new Promise((resolve) => {
     const result = presenter.presentObject({ token: 'ABCDEFGHI' });

     logger.debug(`${MODULE_NAME} (OUT)  -> result: ${JSON.stringify(result)}`);
     resolve(result)
   })
};
