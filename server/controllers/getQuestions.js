const express = require('express');
const {pool} = require('../../db/index.js');

const getQuestions = (req, res) => {
  console.log('ran get questions')
  const product_id = req.params.product_id;
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;

  const queryString =
  `
  SELECT
    question.id AS question_id,
    question.question_body,
    question.question_date,
    question.asker_name,
    question.question_helpfulness,
    question.reported,
    (SELECT JSON_BUILD_OBJECT('answers', (JSON_BUILD_OBJECT answers.id)))
  `
  pool.query('SELECT * FROM questions')
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })

  // pool.end();
}

module.exports = {getQuestions};