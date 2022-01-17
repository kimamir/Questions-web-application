import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  let data = {}
  let errors = {};

  const userFromDatabase = await userService.findUserByEmail(
  params.get("email"),
  );

  if (userFromDatabase.length != 1) {
    errors.email = {email: "Incorrect email. Try again"};
    data.validationErrors = errors;
    render("login.eta", data);
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    errors.email = {pw: "Incorrect password. Try again"};
    data.validationErrors = errors;
    render("login.eta", data);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/questions");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export {
    showLoginForm,
    processLogin,
};