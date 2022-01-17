DOCUMENTATION

Link to the application: https://question-manager-app.herokuapp.com/

---------------------------------------------------------------------------------------------------

DATABASE SETUP

Navigate to ./database/database.js and create a connection pool, you may use this template:

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "hostname-possibly-at-elephantsql.com",
  database: "database-name",
  user: "user-name-typically-same-as-database-name",
  password: "password",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

The database requires you to initiate the following tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

---------------------------------------------------------------------------------------------------------------------------

RUNNING LOCALLY

Now that the database has been set up, you can run the application locally via the command:

deno run --unstable --allow-all run-locally.js

Now just open the web page http://localhost:7777/ on your browser.

---------------------------------------------------------------------------------------------------------------------------


TESTING

Testing is fully automated, you do not need to create any test accounts. It does require a connection pool to a database though.
Once you have setup your database, you can run the unit tests via the command: 

deno test --allow-all --unstable tests 


---------------------------------------------------------------------------------------------------------------------------

USING THE API
In the following example, we use the api locally. Choose the values of questionId and optionId yourself.

Example of a POST request:

curl -X POST -d '{\"questionId\": 15, \"optionId\": 40}' http://localhost:7777/api/questions/answer


Example of a GET request:

curl http://localhost:7777/api/questions/random 

---------------------------------------------------------------------------------------------------------------------------