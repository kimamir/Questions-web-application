import { executeQuery } from "../database/database.js";

const addQuestion = async (title, question_text, id) => {
    await executeQuery("INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3);", id, title, question_text );
};

const listQuestions = async (id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE user_id = $1;", id );
    return res.rows;
};

const listQuestion = async (id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id = $1;", id );
    return res.rows;
};

const removeQuestion = async (id) => {
    await executeQuery("DELETE FROM questions WHERE id = $1;", id);
};

const chooseRandomQuestion = async () => {
    const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;");
    return res.rows;
};

const postAnswer = async (user_id, question_id, question_answer_option_id, correct) => {
    await executeQuery(`INSERT INTO question_answers
     (user_id, question_id, question_answer_option_id, correct)
     VALUES ($1, $2, $3, $4);`,user_id, question_id, question_answer_option_id, correct);
};

export {
    addQuestion,
    listQuestions,
    listQuestion,
    removeQuestion,
    chooseRandomQuestion,
    postAnswer,
};