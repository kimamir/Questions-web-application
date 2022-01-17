import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statController from "./controllers/statController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", questionController.showQuestions);
router.get("/questions/:id", questionController.showQuestion);
router.get("/auth/register", registrationController.showRegistrationForm);
router.get("/auth/login", loginController.showLoginForm);
router.get("/quiz", quizController.showRandomQuiz);
router.get("/quiz/:id", quizController.showQuiz);
router.get("/quiz/:id/correct", quizController.showCorrectPage);
router.get("/quiz/:id/incorrect", quizController.showIncorrectPage);
router.get("/statistics", statController.showStats);
router.get("/api/questions/random", questionApi.giveRandomQuestion);

router.post("/auth/register", registrationController.registerUser);
router.post("/auth/login", loginController.processLogin);
router.post("/questions", questionController.addQuestion);
router.post("/questions/:id/delete", questionController.deleteQuestion);
router.post("/questions/:id/options", optionController.addOption);
router.post("/questions/:id/options/:optionId", quizController.showCorrect);
router.post("/questions/:questionId/options/:optionId/delete", optionController.deleteOption);
router.post("/api/questions/answer", questionApi.giveAnswer);

export { router };
