import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { executeQuery } from "../../database/database.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    questionId: [validasaur.required],
    optionId: [validasaur.required],
};

const giveRandomQuestion = async ({ response }) => {
    const question = (await questionService.chooseRandomQuestion())[0];
    const options = await optionService.listOptions(question.id);
    if (question) {
        let data = { 
            questionId: question.id,
            questionTitle: question.title,
            questionText: question.question_text,
            answerOptions: [],
        };
        for (let i = 0; i < options.length; i++) {
            delete options[i].question_id;
            delete options[i].is_correct;
            data.answerOptions.push({optionId: options[i].id, optionText: options[i].option_text});
    
        }
        response.body = data;
        response.status = 200;

    } else {
        response.body = {};
    }

    
};

const giveAnswer = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const document = await body.value;
    const [passes, errors] = await validasaur.validate(document, validationRules);

    if (passes) {
        const res = await executeQuery("SELECT is_correct FROM question_answer_options WHERE question_id = $1 AND id = $2",document.questionId, document.optionId);
        response.body = res.rows[0] ? {correct: true} : {correct: false};
    } else {
        response.body = {status: "Faulty json file!"};
    }
};

export {
    giveRandomQuestion,
    giveAnswer,
};