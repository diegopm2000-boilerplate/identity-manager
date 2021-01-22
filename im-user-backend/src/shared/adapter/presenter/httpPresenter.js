// httpPresenter.js

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const DATA_NOT_AUTHORIZED = { code: 401, message: 'User not authorized to resource' };
const DATA_NOT_AUTHENTICATED = { code: 403, message: 'User not authenticated in the system' };
const DATA_OBJECT_NOT_FOUND = { code: 404, message: 'Object not found in the system' };
const DATA_RELATIONSHIP_NOT_FOUND = { code: 404, message: 'Relationship not found in the system' };
const BAD_ENTRY_FORMAT = { code: 400, message: 'Bad entry format' };

const getFirstErrorMessage = (errorObj) => {
  if (Array.isArray(errorObj) && errorObj.length > 0) {
    return errorObj[0];
  }
  return errorObj;
};

const buildDataWithMessage = (code, message) => ({ code, message });

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.presentObject = (object) => ({ status: 200, data: object });

exports.presentCreatedObject = (object) => ({ status: 201, data: object });

exports.presentNotAuthorized = () => ({ status: 401, data: DATA_NOT_AUTHORIZED });

exports.presentNotAuthenticated = () => ({ status: 403, data: DATA_NOT_AUTHENTICATED });

exports.presentObjectNotFound = () => ({ status: 404, data: DATA_OBJECT_NOT_FOUND });

exports.presentBadEntry = () => ({ status: 400, data: BAD_ENTRY_FORMAT });

exports.presentObjectIfFound = (object) => {
  const result = (object) ? exports.presentObject(object) : exports.presentObjectNotFound();
  return result;
};

exports.presentResultOfDeletion = (wasDeleted) => {
  const result = (wasDeleted) ? ({ status: 204, data: null }) : exports.presentObjectNotFound();
  return result;
};

exports.presentResultOfRelationshipDeletion = (wasDeleted) => {
  const result = (wasDeleted) ? ({ status: 204, data: null }) : ({ status: 404, data: DATA_RELATIONSHIP_NOT_FOUND });
  return result;
};

exports.presentConflict = (errorObj) => {
  const message = getFirstErrorMessage(errorObj);
  return { status: 409, data: buildDataWithMessage(409, message) };
};
