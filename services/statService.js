import { executeQuery } from "../database/database.js";

const userAnswerCount = async (user_id) => {
    const res = await executeQuery("SELECT COUNT(*) FROM question_answers WHERE user_id = $1;", user_id);
    return res.rows;
};

const userCorrectAnswerCount = async (user_id) => {
    const res = await executeQuery("SELECT COUNT(*) FROM question_answers WHERE user_id = $1 AND correct = true;", user_id);
    return res.rows;
};

const answersToUserQuestions = async (user_id) => {
    const res = await executeQuery(`SELECT COUNT(*) FROM question_answers WHERE question_id IN
         (SELECT id FROM questions WHERE user_id = $1)`, user_id);
    return res.rows;
}

const topFive = async () => {
    const res = await executeQuery(`SELECT users.email as email, count(*) as count FROM users
    JOIN question_answers ON users.id = question_answers.user_id
    GROUP BY users.email
    ORDER BY count DESC
    LIMIT 5`);
    return res.rows;
};

export {
    userAnswerCount,
    userCorrectAnswerCount,
    answersToUserQuestions,
    topFive,
};
