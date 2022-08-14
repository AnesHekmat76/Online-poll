import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OptionList from "./OptionsList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPollForm = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [isOptionInputInValid, setIsOptionInputInValid] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [isTitleInputInValid, setIsTitleInputInValid] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isDescriptionInputInvalid, setIsDescriptionInputInvalid] =
    useState(false);
  const [isOptionsInvalid, setIsOptionsInvalid] = useState(false);

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
      if (titleInput.trim().length === 0) setIsTitleInputInValid(true);
      if (descriptionInput.trim().length === 0)
        setIsDescriptionInputInvalid(true);
      if (options.length === 0) setIsOptionsInvalid(true);
      return;
    }
    console.log("submitted");
    const pollLink = "1";
    navigate(`../pollLink/${pollLink}`);
    //send a request and if was success full redirect to poll link page
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="p-6 pb-6 lg:pb-8 sm:p-8 border border-gray-300 rounded-lg"
    >
      <h2 className="text-2xl text-gray-600 text-center">Create poll</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div>
          <TextField
            error={isTitleInputInValid}
            className="w-full"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            helperText={isTitleInputInValid ? "Can not be empty" : " "}
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
            helperText={isDescriptionInputInvalid ? "Can not be empty" : " "}
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
          <Button className="w-full h-11" variant="contained" type="submit">
            Create
          </Button>
        </div>
        <p className="mt-5 text-error-red hidden">This is status message ...</p>
        &nbsp;
      </div>
    </form>
  );
};
export default NewPollForm;
