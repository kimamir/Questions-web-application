import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    email: params.get("email"),
    password: params.get("password"),
  };

  let [passes, errors] = await validasaur.validate(data, registrationValidationRules,);
  
  if ((await userService.findUserByEmail(data.email)).length != 0) {
    errors.email = {emailTaken: "This email is already taken. Choose a different one!"};
    passes = false;
  }

  if (!passes) {
    console.log(errors);
    data.validationErrors = errors;
    render("registration.eta", data);

  } else {
      await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
      );
      response.redirect("/auth/login");
  }

};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { 
    registerUser,
    showRegistrationForm,
};