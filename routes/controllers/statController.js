import * as statService from "../../services/statService.js";

const showStats = async ({render, user}) => {
    const data = {
        answer_count: Number((await statService.userAnswerCount(user.id))[0].count),
        correct: Number((await statService.userCorrectAnswerCount(user.id))[0].count),
        answers_given_to_user: Number((await statService.answersToUserQuestions(user.id))[0].count),
        top_five: await statService.topFive(),
    };
    render("stats.eta", data);
};

export {
    showStats,
}