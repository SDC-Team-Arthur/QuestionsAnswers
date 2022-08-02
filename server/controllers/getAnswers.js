const express = require('express');
const {pool} = require('../../db/index.js');

const getAnswers = (req, res) => {
  const question_id = req.params.question_id;
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;
  const offset = count * (numPages - 1);
  console.log('getAnswers!!!')
  const queryString =
  `SELECT
        answers.id AS answer_id,
        answers.body,
        (TO_TIMESTAMP(answers.answer_date/1000)) AS date,
        answers.answerer_name,
        answers.helpfulness,
        (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', photos.id,
          'url', photos.url)) AS photos FROM photos WHERE photos.answer_id = answers.id )
  FROM answers
  WHERE answers.question_id = ${question_id}
  GROUP BY answers.id
  LIMIT ${count} OFFSET ${offset}

  `
  pool.query(queryString)
    .then((result) => {
      const finalObj = {
        question: question_id,
        page: numPages,
        count: count,
        results: result.rows
      }
      res.status(200).send(finalObj);
    })
    .catch((err) => {
      console.log(err);
    })
  // pool.end();
}

module.exports = {getAnswers};