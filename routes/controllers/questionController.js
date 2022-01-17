import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const showQuestions = async ({render, user}) => {
    render("questions.eta", {questions: await questionService.listQuestions(user.id)});
};


const showQuestion = async ({render, params}) => {
    const data = {question: await questionService.listQuestion(params.id)};
    data.options = await optionService.listOptions(params.id);
    render("question.eta", data);
};


const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        title: params.get("title"),
        question_text: params.get("question_text"),
    };
};

const addQuestion = async ({ request, response, render, user}) => {

    const questionData = await getQuestionData(request)
    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules,);

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        render("questions.eta", questionData);
    } else {
        questionService.addQuestion(
            questionData.title,
            questionData.question_text,
            user.id,
    );
    response.redirect("/questions");
    }
};

const deleteQuestion = async ({response, params}) => {
    await questionService.removeQuestion(params.id);
    response.redirect("/questions");
};

export {
    showQuestions,
    addQuestion,
    showQuestion,
    deleteQuestion,
};