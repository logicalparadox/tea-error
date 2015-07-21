var chai = require('chai');
var should = chai.should();

var error = require('..');
var TestError = error('TestError');

describe('compatibility', function () {
  describe('instance', function () {
    it('should construct an instance of an Error', function () {
      var err = new Error()
        , myerr = new TestError();
      err.should.be.instanceof(Error);
      myerr.should.be.instanceof(Error);
    });
  });

  describe('.name', function () {
    it('should constructe with a `name` property', function () {
      var err = new ReferenceError()
        , myerr = new TestError();
      err.should.have.property('name', 'ReferenceError');
      myerr.should.have.property('name', 'TestError');
    });
  });

  describe('.message', function () {
    it ('should  constructe with `message` as first param', function () {
      var err = new Error('Javascript error occurred')
        , myerr = new TestError('Test error occurred');
      err.should.have.property('message', 'Javascript error occurred');
      myerr.should.have.property('message', 'Test error occurred');
    });
  });

  describe('.stack', function () {

    if (Error.captureStackTrace) {
      it('should provide the stack property', function () {
        var err = new Error()
          , myerr = new TestError();
        err.should.have.property('stack').a('string');
        myerr.should.have.property('stack').a('string');
      });
    } else {
      it('(skipped) should provide the stack property');
    }

  });
});


describe('custom properties', function () {
  it('should merge properties', function () {
    var err = new TestError('message', { hello: 'universe' });
    err.should.have.property('hello', 'universe');
  });

  it('should not overwrite name prop', function () {
    var err = new TestError('message', { name: 'RealError' });
    err.should.have.property('name', 'TestError');
  });

  it('should not overwrite message prop', function () {
    var err = new TestError('hello universe', { message: 'hello world' });
    err.should.have.property('message', 'hello universe');
  });

  if (Error.captureStackTrace) {
    it('should not overwrite stack prop', function () {
      var err = new TestError('message', { stack: 'hello universe' });
      err.should.have.property('stack')
        .and.not.equal('hello universe');
    });
  } else {
    it('(skipped) should not overwrite stack prop');
  }
});

describe('serialization', function () {
  it('should return a json object', function () {
    var err = new TestError('hello errors', { hello: 'universe' })
      , json = err.serialize();

    json.should.have.property('name', 'TestError');
    json.should.have.property('message', 'hello errors');
    json.should.have.property('hello', 'universe');

    // skip next if not captured
    if (!Error.captureStackTrace) return;
    json.should.have.property('stack');
  });

  it('should force not include stack if .serialze(false)', function () {
    var err = new TestError('hello errors', { hello: 'universe' })
      , json = err.serialize(false);
    json.should.not.have.property('stack');
  });
});
