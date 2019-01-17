var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

var app=require('.././server.js')
var request = require('request')
var expect = require('expect')

var base_url = "http://localhost:3000/tasklist"
describe('GET /tasklist', function() {
    it('should return status code 200', function(done) {
        request.get(base_url, function(err,response,body){
            expect(response.statusCode).toBe(200);
            done();
        })
    })
});

describe('GET /endtask', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/endtask"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /adduser', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/adduser"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /addproject', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/addproject"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /editproject', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/editproject"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /edituser', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/edituser"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /edittask', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/edittask"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /addtask', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/addtask"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /parenttasks', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/parenttasks"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(200);
          done();
      })
  })
});

describe('GET /userlist', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/userlist"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(200);
          done();
      })
  })
});

describe('GET /projectlist', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/projectlist"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(200);
          done();
      })
  })
});

describe('GET /tasksByproject', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/tasksByproject"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});

describe('GET /tasksByID', function() {
  it('should return status code 404', function(done) {
    var base_url = "http://localhost:3000/tasksByID"
      request.get(base_url, function(err,response,body){
          expect(response.statusCode).toBe(404);
          done();
      })
  })
});