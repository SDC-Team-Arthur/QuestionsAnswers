const express = require('express');
const {pool} = require('../../db/index.js');

const getQuestions = (req, res) => {
  const product_id = req.query.product_id;
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;
  const offset = count * (numPages - 1);
  const queryString =
  `
  SELECT
    questions.id AS question_id,
    questions.question_body,
    (TO_TIMESTAMP(questions.question_date/1000))AS question_date,
    questions.asker_name,
    questions.question_helpfulness,
    questions.reported,
    (SELECT (JSON_OBJECT_AGG(answers.id, JSON_BUILD_OBJECT( 'id', answers.id, 'body', answers.body, 'date', answers.answer_date, 'answerer_name', answers.answerer_name, 'helpfulness', answers.helpfulness, 'photos',
    (SELECT (ARRAY_AGG(JSON_BUILD_OBJECT('id', photos.id, 'url', photos.url))) FROM photos WHERE answers.id = photos.answer_id))))
  FROM answers WHERE answers.question_id = questions.id)
  AS answers
  FROM questions
  WHERE questions.product_id = ${product_id} AND questions.reported = 0
  LIMIT ${count} OFFSET ${offset}
  `;

  pool.query(queryString)
    .then(result => {
      const finalObj = {
        product: product_id,
        results: result.rows
      }
      res.status(200).send(finalObj);
    })
    .catch(err => {
      console.log(err);
    })

  // pool.end();
}

module.exports = {getQuestions};