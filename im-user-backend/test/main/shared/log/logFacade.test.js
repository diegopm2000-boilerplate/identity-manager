// logFacade.spec.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines-per-function */

const rewire = require('rewire');
const { assert } = require('chai');
const sinon = require('sinon');

const logColorLoggerMock = require('../../../mock/shared/infrastructure/log/logcolorLogger.mock');

const myLogFacade = rewire('../../../../src/shared/infrastructure/log/logFacade');

myLogFacade.__set__('myLogger', logColorLoggerMock);

describe('Application Logger Gateway - Tests', () => {
  describe('defaultInit - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'defaultInit');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('defaultInit - Successfully CASE', () => {
      // Launch Operation
      myLogFacade.defaultInit();
      // Check
      assert(mySpy.called);
    });
  });

  describe('init - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'init');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('init - Successfully CASE', () => {
      // IN
      const module = logColorLoggerMock;
      const options = {};
      // Launch Operation
      myLogFacade.init(module, options);
      // Check
      assert(mySpy.called);
    });
  });

  describe('debug - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'debug');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('debug - Successfully CASE', () => {
      // IN
      myLogFacade.defaultInit();
      // Launch Operation
      myLogFacade.debug();
      // Check
      assert(mySpy.called);
    });
  });

  describe('info - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('info - Successfully CASE', () => {
      // IN
      myLogFacade.defaultInit();
      // Launch Operation
      myLogFacade.info();
      // Check
      assert(mySpy.called);
    });
  });

  describe('warning - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'warning');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('warning - Successfully CASE', () => {
      // IN
      myLogFacade.defaultInit();
      // Launch Operation
      myLogFacade.warning();
      // Check
      assert(mySpy.called);
    });
  });

  describe('error - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(logColorLoggerMock, 'error');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('error - Successfully CASE', () => {
      // IN
      myLogFacade.defaultInit();
      // Launch Operation
      myLogFacade.error();
      // Check
      assert(mySpy.called);
    });
  });
});
