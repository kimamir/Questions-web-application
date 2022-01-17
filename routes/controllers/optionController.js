import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};


const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    let corr = true;
    if (params.get("is_correct") == null) {
        corr = false;
    }
    return {
        option_text: params.get("option_text"),
        is_correct: corr,
    };
};

const addOption = async ({render, request, response, params}) => {

    const optionData = await getOptionData(request);
    const [passes, errors] = await validasaur.validate(optionData, optionValidationRules,);
    optionData.question = await questionService.listQuestion(params.id);

    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors;
        render("question.eta", optionData);
    } else {
        optionService.addOption(optionData.question[0].id, optionData.option_text, optionData.is_correct);
        response.redirect(`/questions/${optionData.question[0].id}`);
    }
};

const deleteOption = async ({response, params}) => {
    await optionService.removeOption(params.optionId);
    response.redirect(`/questions/${params.questionId}`);
};

export {
    addOption,
    deleteOption,
};