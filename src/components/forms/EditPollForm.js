import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux/es/exports";
import { alertAction } from "../../store/alert-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { authAction } from "../../store/auth-slice";

const EditPollForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const pollLink = params.pollLink;
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState("");
  const [isTitleInputInValid, setIsTitleInputInValid] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isDescriptionInputInvalid, setIsDescriptionInputInvalid] =
    useState(false);
  const [isSpinnerDisplayed, setIsSpinnerDisplayed] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [titleHelperText, setTitleHelperText] = useState(" ");
  const [descriptionHelperText, setDescriptionHelperText] = useState(" ");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getPollByLink = async () => {
      try {
        const response = await fetch(
          `http://${BASED_URL}/poll/find-by-link/${pollLink}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsSpinnerDisplayed(false);
        if (response.status > 399) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();
        setTitleInput(data.title);
        setDescriptionInput(data.description);
      } catch (error) {
        setResponseMessage(error.message);
      }
    };
    getPollByLink();
  }, [pollLink]);

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (
      titleInput.trim().length === 0 ||
      descriptionInput.trim().length === 0
    ) {
      if (titleInput.trim().length === 0) {
        setTitleHelperText("Can not be empty");
        setIsTitleInputInValid(true);
      }
      if (descriptionInput.trim().length === 0) {
        setDescriptionHelperText("Can not be empty");
        setIsDescriptionInputInvalid(true);
      }

      return;
    }

    const editPoll = async () => {
      const reqBody = {
        title: titleInput,
        description: descriptionInput,
      };

      try {
        const response = await fetch(
          `http://${BASED_URL}/poll/edit/${pollLink}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(reqBody),
          }
        );

        if (response.status > 399) {
          if (response.status === 403) {
            dispatch(authAction.logoutHandler());
            navigate("../");
          }
          const responseMessage = await response.text();
          if (responseMessage.includes("title")) {
            setTitleHelperText("Title length should be between 3 and 20");
            setIsTitleInputInValid(true);
          }
          if (responseMessage.includes("description")) {
            setDescriptionHelperText(
              "Description length should be between 3 and 20"
            );
            setIsDescriptionInputInvalid(true);
          }
          throw new Error("Some thing went wrong");
        }
        const reponseMessage = await response.text();
        dispatch(
          alertAction.showAlert({
            message: reponseMessage,
            type: "success",
          })
        );
        navigate("/pollList");
      } catch (error) {
        dispatch(
          alertAction.showAlert({
            message: error.message,
            type: "error",
          })
        );
      }
    };
    editPoll();
  };

  if (isSpinnerDisplayed) {
    return <LoadingSpinner />;
  }

  if (responseMessage) {
    return (
      <h1 className="text-center text-gray-600 text-xl">{responseMessage}</h1>
    );
  }

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="p-6 pb-6 lg:pb-8 sm:p-8 border border-gray-300 rounded-lg"
    >
      <Tooltip placement="top" title="Back to poll list">
        <Link to="../pollList">
          <ArrowBackIosIcon className="text-gray-500 absolute" />
        </Link>
      </Tooltip>

      <h2 className="text-2xl text-gray-600 text-center">Edit poll</h2>
      <div className="flex flex-col mt-6 lg:mt-10">
        <div>
          <TextField
            error={isTitleInputInValid}
            className="w-full"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            helperText={isTitleInputInValid ? titleHelperText : " "}
            value={titleInput}
            onChange={(e) => {
              setIsTitleInputInValid(false);
              setTitleInput(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <TextField
            error={isDescriptionInputInvalid}
            className="w-full"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            helperText={isDescriptionInputInvalid ? descriptionHelperText : " "}
            multiline
            rows={4}
            value={descriptionInput}
            onChange={(e) => {
              setIsDescriptionInputInvalid(false);
              setDescriptionInput(e.target.value);
            }}
          />
        </div>
        <div className="mt-5 lg:mt-6">
          <Button className="w-full h-11" variant="contained" type="submit">
            Edit
          </Button>
        </div>
        <p className="mt-5 text-error-red hidden">This is status message ...</p>
        &nbsp;
      </div>
    </form>
  );
};
export default EditPollForm;
