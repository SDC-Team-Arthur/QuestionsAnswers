const mongoose = require("mongoose");

var questionsSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: BOOLEAN,
  answers: {},
})