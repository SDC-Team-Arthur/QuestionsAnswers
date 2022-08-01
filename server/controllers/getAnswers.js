const express = require('express');
const {pool} = require('../../db/index.js');

const getAnswers = (req, res) => {
  const question_id = req.params.question_id;
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;
  console.log('getAnswers!!!')
  const queryString =
  `SELECT
        answers.id AS answer_id,
        answers.body,
        answers.answer_date AS date,
        answers.answerer_name,
        answers.helpfulness,
        (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', photos.id,
          'url', photos.url)) AS photos FROM photos WHERE photos.answer_id = answers.id )
  FROM answers
  WHERE answers.question_id = ${question_id}
  GROUP BY answers.id

  `
  pool.query(queryString)
    .then((result) => {
      const finalObj = {
        question: question_id,
        page: numPages,
        count: count,
        results: result.rows[0]
      }
      console.log(finalObj);
    })
    .catch((err) => {
      console.log(err);
    })
  // pool.end();
}

module.exports = {getAnswers};