CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body TEXT NOT NULL,
  question_date TEXT NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT,
  reported INTEGER,
  question_helpfulness INTEGER
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES questions (id),
  body TEXT NOT NULL,
  answer_date TEXT NOT NULL,
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

COPY answers FROM '/Users/peterphan/Downloads/SDC QnA/answers.csv' DELIMITER ',' CSV HEADER;

COPY photos FROM '/Users/peterphan/Downloads/SDC QnA/answers_photos.csv' DELIMITER ',' CSV HEADER;