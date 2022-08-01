const express = require('express');
const {pool} = require('../../db/index.js');

const helpfulAnswer = (req, res) => {
  const answer_id = req.params.answer_id;
  const queryString =
  `
  UPDATE answers
  SET helpfulness = helpfulness + 1
  WHERE id = ${answer_id}
  `
  pool.query(queryString)
    .then(console.log('helpfulness + 1'))
    .catch((err) => {
      console.log(err);
    })
}

module.exports = {helpfulAnswer};