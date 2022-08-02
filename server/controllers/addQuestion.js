const express = require('express');
const {pool} = require('../../db/index.js');

const addQuestion = (req, res) => {
  const product_id = req.body.product_id;
  const question_body = req.body.question_body;
  const asker_name = req.body.asker_name;
  const asker_email = req.body.asker_email;
  const queryString =
  `
  INSERT INTO questions (product_id, question_body, asker_name, asker_email)
  VALUES ($1, $2, $3, $4)
  `
  pool.query(queryString, [product_id, question_body, asker_name, asker_email])
    .then(
      res.status(200).send('question added')
    )
    .catch((err) => {
      res.status(500).send('error ', err)
    })
}

module.exports = {addQuestion};