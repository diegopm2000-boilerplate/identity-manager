// user.remote.repository.js

const axios = require('axios');

const log = require('../../../shared/infrastructure/log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[userRemote Repository]';

let endpoint;

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

function handleAxiosError(funcName, error) {
  if (error.response) {
    log.debug(`${MODULE_NAME}:${funcName} (ERROR) -> error.response.data: ${JSON.stringify(error.response.data)}, error.response.status: ${error.response.status}`);
    const result = {
      error: error.response.data,
    };
    return result;
  }
  throw error;
}

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

function init(endpointIN) {
  endpoint = endpointIN;
}

async function getUserByLoginname(loginname) {
  try {
    // IN
    log.debug(`${MODULE_NAME}:${getUserByLoginname.name} (IN) -> loginname: ${loginname}`);

    // Call Endpoint
    const innerAxiosData = await axios.get(`${endpoint}?loginname=${loginname}`);
    const innerResult = innerAxiosData.data;
    log.debug(`${MODULE_NAME}:${getUserByLoginname.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

    // Build result
    let result;
    if (Array.isArray(innerResult) && innerResult.length > 0) {
      result = innerResult.find((x) => x.loginname === loginname);
    }

    // Return result
    log.debug(`${MODULE_NAME}:${getUserByLoginname.name} (OUT) -> result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    return handleAxiosError(getUserByLoginname.name, error);
  }
}

async function registerUser(dataUser) {
  try {
    // IN
    log.debug(`${MODULE_NAME}:${registerUser.name} (IN) -> dataUser: ${JSON.stringify(dataUser)}`);

    // Call Endpoint
    const innerAxiosData = await axios.post(endpoint, dataUser);
    const result = innerAxiosData.data;

    // Return result
    log.debug(`${MODULE_NAME}:${registerUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    return handleAxiosError(registerUser.name, error);
  }
}

module.exports = {
  init,
  getUserByLoginname,
  registerUser,
};
