const {url, PORT} = require('../config.js');
const express = require('express');
const path = require('path');
const controllers = require('./controllers')



const app = express();
app.use(express.json());

app.get('qa/questions', controllers.getQuestions.getQuestions);
app.get('qa/questions/:question_id/answers', controllers.getAnswers.getAnswers);
// app.get('/products/:product_id', controllers.product_id.get);


app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);