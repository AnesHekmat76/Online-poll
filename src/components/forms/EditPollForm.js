import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const EditPollForm = () => {
  const location = useLocation();
  const params = useParams();
  console.log(params, location);
  const [titleInput, setTitleInput] = useState("");
  const [isTitleInputInValid, setIsTitleInputInValid] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isDescriptionInputInvalid, setIsDescriptionInputInvalid] =
    useState(false);

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (
      titleInput.trim().length === 0 ||
      descriptionInput.trim().length === 0
    ) {
      if (titleInput.trim().length === 0) setIsTitleInputInValid(true);
      if (descriptionInput.trim().length === 0)
        setIsDescriptionInputInvalid(true);
      return;
    }
    console.log("submitted");
    //send a request and if was success full redirect to poll link page
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="p-6 pb-6 lg:pb-8 sm:p-8 border border-gray-300 rounded-lg"
    >
      <h2 className="text-2xl text-gray-600 text-center">Edit poll</h2>
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
