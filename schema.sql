DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body TEXT NOT NULL,
  question_date bigint,
  asker_name TEXT NOT NULL,
  asker_email TEXT,
  reported INTEGER,
  question_helpfulness INTEGER
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES questions (id),
  body TEXT NOT NULL,
  answer_date bigint,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported INTEGER,
  helpfulness INTEGER
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL REFERENCES answers (id),
  url TEXT
);

COPY questions FROM '/Users/peterphan/Downloads/SDC QnA/questions.csv' DELIMITER ',' CSV HEADER;
SELECT setval('questions_id_seq', max(id)) FROM questions;

COPY answers FROM '/Users/peterphan/Downloads/SDC QnA/answers.csv' DELIMITER ',' CSV HEADER;
SELECT setval('answers_id_seq', max(id)) FROM answers;

COPY photos FROM '/Users/peterphan/Downloads/SDC QnA/answers_photos.csv' DELIMITER ',' CSV HEADER;
SELECT setval('photos_id_seq', max(id)) FROM photos;
