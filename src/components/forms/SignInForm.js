import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
        setIsLoading(false);
        if (response.status > 399) {
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
        setIsLoading(false);
        setResponseMessage(err.message);
      }
    };
    signIn();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="px-1 sm:p-8 py-6 lg:pb-4 sm:border sm:border-gray-300 rounded-lg sm:shadow-sm"
    >
      <h2 className="text-2xl text-gray-600 text-center">Sign-in</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div>
          <TextField
            error={isUserNameInvalid}
            className="w-full"
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
            label="Password"
            variant="outlined"
            type="password"
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            value={passwordValue}
            onChange={(e) => {
              setIsPasswordInvalid(false);
              setPasswordValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 lg:mt-8">
          <LoadingButton
            loading={isLoading}
            className="w-full h-11"
            variant="contained"
            type="submit"
          >
            Sing in
          </LoadingButton>
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
