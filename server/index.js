const {url, PORT} = require('../config.js');
const express = require('express');
const path = require('path');
const controllers = require('./controllers')



const app = express();
app.use(express.json());

app.get('/qa/questions', controllers.getQuestions.getQuestions);
app.get('/qa/questions/:question_id/answers', controllers.getAnswers.getAnswers);
// app.get('/products/:product_id', controllers.product_id.get);
app.post('/qa/questions', controllers.addQuestion.addQuestion);
app.post('/qa/questions/:question_id/answers', controllers.addAnswer.addAnswer);
app.put('/qa/answers/:answer_id/report', controllers.reportAnswer.reportAnswer);
app.put('/qa/questions/:question_id/report', controllers.reportQuestion.reportQuestion);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);