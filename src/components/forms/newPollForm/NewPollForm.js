import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OptionList from "./OptionsList";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASED_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../store/alert-slice";
import { Tooltip } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { authAction } from "../../../store/auth-slice";
import { pollLinkAction } from "../../../store/pollLink-slice";
import LoadingButton from "@mui/lab/LoadingButton";

const NewPollForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [isOptionInputInValid, setIsOptionInputInValid] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [isTitleInputInValid, setIsTitleInputInValid] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isDescriptionInputInvalid, setIsDescriptionInputInvalid] =
    useState(false);
  const [isOptionsInvalid, setIsOptionsInvalid] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState(" ");
  const [descriptionHelperText, setDescriptionHelperText] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const deleteOption = (id) => {
    setOptions((options) => {
      const newOptionsArr = options.filter((option) => {
        return option.id !== id;
      });
      return newOptionsArr;
    });
  };

  const addOption = (optionText) => {
    if (optionInput.trim() === "") {
      setIsOptionInputInValid(true);
      return;
    }
    setOptionInput("");
    setIsOptionsInvalid(false);
    const option = {
      id: new Date().getTime(),
      text: optionText,
    };
    setOptions((options) => [option, ...options]);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (
      titleInput.trim().length === 0 ||
      descriptionInput.trim().length === 0 ||
      options.length === 0
    ) {
      if (titleInput.trim().length === 0) {
        setTitleHelperText("Can not be empty");
        setIsTitleInputInValid(true);
      }

      if (descriptionInput.trim().length === 0) {
        setDescriptionHelperText("Can not be empty");
        setIsDescriptionInputInvalid(true);
      }

      if (options.length === 0) setIsOptionsInvalid(true);
      return;
    }

    const optionsArr = options.map((option) => {
      return { optionName: option.text };
    });

    const createPoll = async () => {
      const reqBody = {
        title: titleInput,
        description: descriptionInput,
        options: optionsArr,
      };
      setIsLoading(true);
      try {
        const response = await fetch(`http://${BASED_URL}/poll/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(reqBody),
        });
        setIsLoading(false);
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
            setDescriptionHelperText("Description length should be at least 5");
            setIsDescriptionInputInvalid(true);
          }
          throw new Error("Some thing went wrong");
        }
        const pollLink = await response.text();
        dispatch(
          pollLinkAction.showPollLinkPage("The poll successfully created")
        );
        navigate(`../pollLink/${pollLink}`);
      } catch (error) {
        setIsLoading(false);
        dispatch(
          alertAction.showAlert({
            message: error.message,
            type: "error",
          })
        );
      }
    };
    createPoll();
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="px-5 py-6 lg:pb-8 sm:p-8 border border-gray-300 rounded-lg shadow-sm"
    >
      <Tooltip placement="top" title="Back to poll list">
        <Link to="../pollList">
          <ArrowBackIosIcon className="text-gray-500 absolute" />
        </Link>
      </Tooltip>
      <h2 className="text-2xl text-gray-600 text-center">Create poll</h2>
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
        <div className="flex justify-between items-center mt-2">
          <TextField
            error={isOptionInputInValid}
            className="w-8/12"
            id="outlined-basic"
            label="Add Option"
            variant="outlined"
            helperText={isOptionInputInValid ? "Can not be empty" : " "}
            value={optionInput}
            onChange={(e) => {
              setOptionInput(e.target.value);
              setIsOptionInputInValid(false);
            }}
          />
          <div className="w-3/12 mb-5">
            <Button
              onClick={() => {
                addOption(optionInput);
              }}
              className="w-full h-11"
              variant="outlined"
            >
              Add
            </Button>
          </div>
        </div>
        <div
          style={
            isOptionsInvalid
              ? { border: "1px solid #d32f2f" }
              : { border: "1px solid lightGray" }
          }
          className="border border-gray-300 bg-gray-100 p-2.5 sm:p-4 rounded-md text-gray-600 mt-2"
        >
          {options.length === 0 && (
            <h3
              className={
                !isOptionsInvalid
                  ? "text-gray-400 my-2 text-center"
                  : "text-error-red my-2 text-center"
              }
            >
              No option added!
            </h3>
          )}

          <OptionList options={options} deleteOption={deleteOption} />
        </div>
        <p className="font-normal text-xs text-left mt-1 ml-3 mb-0 text-error-red">
          {isOptionsInvalid ? "Can not be empty" : null}
          &nbsp;
        </p>
        <div className="mt-5 lg:mt-6">
          <LoadingButton
            loading={isLoading}
            className="w-full h-11"
            variant="contained"
            type="submit"
          >
            Create
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
export default NewPollForm;
