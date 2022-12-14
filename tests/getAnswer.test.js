const request = require('supertest')('http://localhost:3000');
const express = require('express');
const expect = require('chai').expect;

describe('Get answers for a question', function() {
  it('should return a status 200 when sending the get request', async function() {
    const response = await request.get('/qa/questions/1/answers').timeout(10000);
    expect(response.status).to.equal(200);
  });
})