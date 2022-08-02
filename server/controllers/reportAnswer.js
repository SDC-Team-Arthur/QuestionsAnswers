const express = require('express');
const {pool} = require('../../db/index.js');

const reportAnswer = (req, res) => {
  const answer_id = req.params.answer_id;
  const queryString =
  `
  UPDATE answers
  SET reported = reported + 1
  WHERE id = ${answer_id}
  `
  pool.query(queryString)
    .then(() => {
      res.status(200).send('answer reported')
    })
    .catch((err) => {
      res.status(500).send('err: ', err);
    })
}

module.exports = {reportAnswer};