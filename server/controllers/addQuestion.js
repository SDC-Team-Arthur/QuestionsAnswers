const express = require('express');
const {pool} = require('../../db/index.js');

const addQuestion = (req, res) => {
  const question_id = req.params.question_id;
  const answer_body = req.data.body;
  const answerer_name = req.data.asker_name;
  const answerer_email = req.data.asker_email;
  const queryString =
  `
  INSERT INTO questions (product_id, question_body, asker_name, asker_email)
  VALUES (${product_id}, ${question_body}, ${asker_name}, ${asker_email})
  `
  pool.query(queryString)
    .then(console.log('question added'))
    .catch((err) => {
      console.log(err);
    })
}

module.exports = {addQuestion};