const express = require('express');
const {pool} = require('../../db/index.js');

const helpfulQuestion = (req, res) => {
  const question_id = req.params.question_id;
  const queryString =
  `
  UPDATE questions
  SET question_helpfulness = question_helpfulness + 1
  WHERE id = ${question_id}
  `
  pool.query(queryString)
    .then(console.log('helpfulness + 1'))
    .catch((err) => {
      console.log(err);
    })
}

module.exports = {helpfulQuestion};