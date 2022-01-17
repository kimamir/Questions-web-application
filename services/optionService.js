import { executeQuery } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
    await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct)
                        VALUES($1, $2, $3);`,question_id, option_text, is_correct);
};

const listOptions = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1;", question_id);
    return res.rows;
};

const removeOption = async (option_id) => {
    await executeQuery("DELETE FROM  question_answers WHERE question_answer_option_id = $1;", option_id);
    await executeQuery("DELETE FROM question_answer_options WHERE id = $1;", option_id);
};

const listOptionById = async (id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE id = $1;", id);
    return res.rows;
};

const listCorrectOption = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true;", question_id);
    return res.rows;
};

export {
    addOption,
    listOptions,
    removeOption,
    listOptionById,
    listCorrectOption,
};
