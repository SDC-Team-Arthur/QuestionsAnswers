const request = require('supertest')('http://localhost:3000');
const express = require('express');
const expect = require('chai').expect;

describe('Post question for a product', function() {
  it('should return a status 200 when sending the get request', async function() {
    const response = await request.post('/qa/questions').timeout(60000);
    expect(response.status).to.equal(200);
  });
})