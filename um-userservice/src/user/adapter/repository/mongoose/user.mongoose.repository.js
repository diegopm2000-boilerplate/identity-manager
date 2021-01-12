// user.mongoose.repository.js

const log = require('../../../../shared/infrastructure/log/logFacade');
const { User } = require('./user.mongoose.schema'); // User Schema

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[userMongoose Repository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.getById = async (id) => {
  const funcName = 'getById';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> id: ${id}`);

  const result = await User.findOne({ id });

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};

exports.getAll = async () => {
  const funcName = 'getAll';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> no params`);

  const result = await User.find();

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};

exports.getByFilter = async (filter) => {
  const funcName = 'getByFilter';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await User.find(filter);

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};

exports.create = async (data) => {
  const funcName = 'create';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> data: ${JSON.stringify(data)}`);

  const result = await User.create(data);

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};

exports.update = async (data, id) => {
  const funcName = 'update';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> data: ${JSON.stringify(data)}, id: ${id}`);

  const result = await User.findOneAndUpdate(
    { id },
    { $set: data },
    { new: true },
  );

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};

exports.remove = async (id) => {
  const funcName = 'remove';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> id: ${id}`);

  const innerResult = await User.deleteOne({ id });
  log.debug(`${MODULE_NAME}:${funcName} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  const result = (innerResult.ok === 1 && innerResult.deletedCount === 1);

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
