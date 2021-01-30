// jwtManager.js

const jwt = require('jwt-simple');
const moment = require('moment');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const HS256 = 'HS256';
const H384 = 'HS384';
const HS512 = 'HS512';

const ERR_BAD_FORMAT_TOKEN = 'Token with bad format';
const ERR_NO_TOKEN_SUPPLIED = 'No token supplied';

let tokenSecret;
let tokenExpirationTime; // in seconds
let tokenAlgorithm;

// TODO Add easy support to RS512 (certificate required)

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function handleTokenError(error) {
  if (error.message.includes('Not enough or too many segments')) {
    throw new Error(ERR_BAD_FORMAT_TOKEN);
  } else if (error.message.includes('No token supplied')) {
    throw new Error(ERR_NO_TOKEN_SUPPLIED);
  }
  throw error;
}

function removeBearer(token) {
  return (token.startsWith('Bearer ')) ? token.replace('Bearer ', '') : token;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

const init = (secret, expirationTime, algorithm) => {
  tokenSecret = secret;
  tokenExpirationTime = expirationTime;
  tokenAlgorithm = algorithm;
};

const create = (data) => {
  const payload = {
    sub: data,
    iat: moment().unix(),
    exp: moment().add(tokenExpirationTime, 'seconds').unix(),
  };

  return jwt.encode(payload, tokenSecret, tokenAlgorithm);
};

const check = (tokenIN) => {
  try {
    const token = removeBearer(tokenIN);
    return jwt.decode(token, tokenSecret, tokenAlgorithm);
  } catch (error) {
    return handleTokenError(error);
  }
};

const refresh = (tokenIN) => {
  try {
    const token = removeBearer(tokenIN);
    const payload = jwt.decode(token, tokenSecret, tokenAlgorithm);
    payload.iat = moment().unix();
    payload.exp = moment().add(tokenExpirationTime, 'seconds').unix();
    return jwt.encode(payload, tokenSecret, tokenAlgorithm);
  } catch (error) {
    return handleTokenError(error);
  }
};

const getData = (tokenIN) => {
  try {
    const token = removeBearer(tokenIN);
    return jwt.decode(token, tokenSecret, tokenAlgorithm).sub;
  } catch (error) {
    return handleTokenError(error);
  }
};

module.exports = {
  HS256,
  H384,
  HS512,
  ERR_BAD_FORMAT_TOKEN,
  ERR_NO_TOKEN_SUPPLIED,
  init,
  create,
  check,
  refresh,
  getData,
};
