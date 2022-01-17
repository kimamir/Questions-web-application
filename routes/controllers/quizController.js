import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const getQuizData = (question, questionOptions) => {
    return {
        question: question,
        options: questionOptions,
    };
};

const showRandomQuiz = async ({render, response}) => {
    const question = await questionService.chooseRandomQuestion();
    const data = {validationErrors: 1};
    if (question.length != 1) {
        render("quiz.eta", data)
    } else {
        response.redirect(`/quiz/${question[0].id}`);
    }
};

const showQuiz = async ({params, render}) => {
    const question = (await questionService.listQuestion(params.id))[0];
    const questionOptions = await optionService.listOptions(params.id);
    const quizData = getQuizData(question, questionOptions);
    render("quiz.eta", quizData);
};

const showCorrect = async ({response, params, user }) => {
    const chosenOption = (await optionService.listOptionById(params.optionId))[0];
    
    await questionService.postAnswer(user.id, params.id, params.optionId, chosenOption.is_correct);

    if (chosenOption.is_correct) {
        response.redirect(`/quiz/${params.id}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/incorrect`);
    }
};

const showCorrectPage = async ({render}) => {
    render("answer.eta", {correctness: true});
};

const showIncorrectPage = async ({render, params}) => {
    const data = {correctness: false, answer: (await optionService.listCorrectOption(params.id))[0] };
    render("answer.eta", data);
};

export {
    showRandomQuiz,
    showQuiz,
    showCorrect,
    showCorrectPage,
    showIncorrectPage,
}