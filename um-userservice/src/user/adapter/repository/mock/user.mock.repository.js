// user.mock.repository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[userMock Repository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line no-unused-vars
exports.getById = async (id) => new Promise((resolve) => {
  const funcName = 'getById';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> id: ${id}`);

  // Prepare result
  const result = {
    id: 1, loginname: 'userTest1', name: 'nameUserTest1', surname: 'surnameUserTest1', email: 'emailUserTest1@email.com', password: 'password',
  };

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  resolve(result);
});

exports.getByFilter = async (filter) => new Promise((resolve) => {
  const funcName = 'getByFilter';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> filter: ${JSON.stringify(filter)}`);

  // Prepare result
  const result = [];

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  resolve(result);
});

exports.getAll = async () => new Promise((resolve) => {
  const funcName = 'getAll';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> no params`);

  // Prepare result
  const result = [
    {
      id: 1, loginname: 'userTest1', name: 'nameUserTest1', surname: 'surnameUserTest1', email: 'emailUserTest1@email.com', password: 'password',
    },
    {
      id: 2, loginname: 'userTest2', name: 'nameUserTest2', surname: 'surnameUserTest2', email: 'emailUserTest2@email.com', password: 'password',
    },
    {
      id: 3, loginname: 'userTest3', name: 'nameUserTest3', surname: 'surnameUserTest3', email: 'emailUserTest3@email.com', password: 'password',
    },
    {
      id: 4, loginname: 'userTest4', name: 'nameUserTest4', surname: 'surnameUserTest4', email: 'emailUserTest4@email.com', password: 'password',
    },
  ];

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  resolve(result);
});

exports.remove = async (id) => new Promise((resolve) => {
  const funcName = 'remove';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> id: ${id}`);

  // Prepare result
  const result = true;

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  resolve(result);
});

exports.create = async (data) => new Promise((resolve) => {
  const funcName = 'create';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> data: ${JSON.stringify(data)}`);

  // Prepare result
  const result = data;

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(data)}`);
  resolve(result);
});

exports.update = async (data, id) => new Promise((resolve) => {
  const funcName = 'update';
  // IN
  logger.debug(`${MODULE_NAME}:${funcName} (IN) -> data: ${JSON.stringify(data)}, id: ${id}`);

  // Prepare result
  const result = data;

  // Return result
  logger.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(data)}`);
  resolve(result);
});
