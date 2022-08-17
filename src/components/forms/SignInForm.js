import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userNameValue, setUserNameValue] = useState("");
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (
      userNameValue.trim().length === 0 ||
      passwordValue.trim().length === 0
    ) {
      if (userNameValue.trim().length === 0) {
        setUserNameErrorMessage("Can not be empty");
        setIsUserNameInvalid(true);
      }
      if (passwordValue.trim().length === 0) {
        setIsPasswordInvalid(true);
        setPasswordErrorMessage("Can not be empty");
      }
      return;
    }

    const signIn = async () => {
      try {
        const response = await fetch(
          `http://${BASED_URL}/user/signing?username=${userNameValue}&password=${passwordValue}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status > 399) {
          let x = await response.text();
          console.log(x);
          setUserNameErrorMessage("Incorrect username");
          setPasswordErrorMessage("Incorrect password");
          setIsUserNameInvalid(true);
          setIsPasswordInvalid(true);
          throw new Error("Username or password is incorrect");
        }

        const data = await response.text();
        dispatch(authAction.loginHandler(data));
        setIsUserNameInvalid(false);
        setIsPasswordInvalid(false);
        setResponseMessage("");
        navigate("../pollList");
      } catch (err) {
        setResponseMessage(err.message);
      }
    };
    signIn();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="p-6 lg:pb-4 sm:p-8 border border-gray-300 rounded-lg"
    >
      <h2 className="text-2xl text-gray-600 text-center">Sign-in</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div>
          <TextField
            error={isUserNameInvalid}
            className="w-full"
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            helperText={isUserNameInvalid ? userNameErrorMessage : " "}
            value={userNameValue}
            onChange={(e) => {
              setIsUserNameInvalid(false);
              setUserNameValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <TextField
            error={isPasswordInvalid}
            className="w-full"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            value={passwordValue}
            onChange={(e) => {
              setIsPasswordInvalid(false);
              setPasswordValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 lg:mt-8">
          <Button type="submit" className="w-full h-11" variant="contained">
            Sign in
          </Button>
        </div>
        <p className="text-error-red mt-4">
          {responseMessage}
          &nbsp;
        </p>
      </div>
    </form>
  );
};
export default SignInForm;
