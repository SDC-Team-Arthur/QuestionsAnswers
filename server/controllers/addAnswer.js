const express = require('express');
const { pool } = require('../../db/index.js');

const addAnswer = (req, res) => {
  const question_id = req.body.question_id;
  const answer_body = req.body.body;
  const answerer_name = req.body.answerer_name;
  const answerer_email = req.body.answerer_email;

  let photos = req.body.photos;
  let queryString = req.body.photos.length === 0 ?

    `
  INSERT INTO answers(question_id, body, answerer_name, answerer_email)
  VALUES ($1, $2, $3, $4)
  `
    :
    `
  WITH addAnswer AS (
    INSERT INTO answers (question_id, body, answerer_name, answerer_email)
    VALUES ($1, $2, $3, $4)
    RETURNING id as answer_id
  )
  INSERT INTO photos (answer_id, url)
  SELECT (SELECT answer_id from addAnswer), UNNEST($5::text[])
  `;

  let values = req.body.photos.length === 0
  ?
  [question_id, answer_body, answerer_name, answerer_email]
  :
  [question_id, answer_body, answerer_name, answerer_email, photos];

  pool.query(queryString, values)
    .then(() => {
      res.status(200).send('answer added')
    }
    )
    .catch((err) => {
      res.status(500).send('error: ', err)
    })
}

module.exports = { addAnswer };

  // let queryString =
  //   `
  //   INSERT INTO answers(question_id, body, answerer_name, answerer_email)
  //   VALUES ($1, $2, $3, $4)
  // `
  // const photoVal = photos.map(photo => {
  //   return `((SELECT answer_id FROM addAnswer), '${photo}')`
  // })

//   let queryString =
//     `
//     WITH addAnswer AS (INSERT INTO answers(question_id, body, answerer_name, answerer_email)
//     VALUES ($1, $2, $3, $4)
//     RETURNING answer_id),
//     addPhotos AS (
//    INSERT INTO photos(answer_id, url)
//    SELECT (answer_id from addAnswer), UNNEST ($5::text[])
//  )`