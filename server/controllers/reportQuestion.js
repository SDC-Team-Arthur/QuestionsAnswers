const express = require('express');
const {pool} = require('../../db/index.js');

const reportQuestion = (req, res) => {
  const question_id = req.params.question_id;
  const queryString =
  `
  UPDATE questions
  SET reported = reported + 1
  WHERE id = ${question_id}
  `
  pool.query(queryString)
    .then(() => {
      res.status(200).send('question reported')
    })
    .catch((err) => {
      res.status(500).send('err: ', err);
    })
}

module.exports = {reportQuestion};