// consoleLogger.infra.test.js

/* global describe, it, before, after */

const { assert } = require('chai');
const sinon = require('sinon');

const myConsoleLogger = require('../../../../src/shared/infrastructure/log/consoleLogger');

describe('ConsoleLogger Infra - Tests', () => {
  describe('defaultInit - Successfully CASE', () => {
    it('defaultInit - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.defaultInit();
    });
  });
  describe('init - Successfully CASE', () => {
    it('init - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.init();
    });
  });
  describe('debug - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'debug');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('debug - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.debug('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });

  describe('info - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('info - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.info('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });

  describe('warning - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'warn');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('warning - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.warning('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });

  describe('error - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'error');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('error - Successfully CASE', () => {
      // Launch Operation
      myConsoleLogger.error('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });
});
