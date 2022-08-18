import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import OptionCell from "./pollTable/OptionCell";
import SelectedCell from "./pollTable/SelectedCell";
import UnSelectedCell from "./pollTable/UnSelectedCell";
import NameCell from "./pollTable/NameCell";
import CheckBoxCell from "./pollTable/CheckBoxCell";
import { BASED_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux/es/exports";
import { alertAction } from "../../store/alert-slice";
import { pollLinkAction } from "../../store/pollLink-slice";
import LoadingButton from "@mui/lab/LoadingButton";

const PollDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pollLink = params.pollLink;
  const [nameInputValue, setNameInputValue] = useState("");
  const [isNameInputInvalid, setIsNameInputInvalid] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSpinnerDisplayed, setIsSpinnerDisplayed] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [fetchedPollDetails, setFetchedPollDetails] = useState(null);
  const [sendingVoteIsLoading, setSendingVoteIsLoading] = useState(false);

  useEffect(() => {
    const getAllPolls = async () => {
      setIsSpinnerDisplayed(true);
      try {
        const response = await fetch(
          `http://${BASED_URL}/poll/find-by-link/${params.pollLink}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status > 399) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();
        setIsSpinnerDisplayed(false);
        setFetchedPollDetails(data);
        setResponseMessage("");
      } catch (err) {
        setIsSpinnerDisplayed(false);
        setResponseMessage(err.message);
      }
    };
    getAllPolls();
  }, [params]);

  const onCheckBoxClick = (event) => {
    const selectedOptionId = +event.target.value;
    const checkBoxValue = event.target.checked;
    setSelectedOptions((state) => {
      let updatedState = [];
      if (checkBoxValue) {
        if (state.includes(selectedOptionId)) return state;
        return [...state, selectedOptionId];
      } else {
        updatedState = state.filter((optionId) => {
          return optionId !== selectedOptionId;
        });
        return updatedState;
      }
    });
  };

  const onSaveButtonClick = () => {
    if (nameInputValue.trim().length === 0 || selectedOptions.length === 0) {
      if (nameInputValue.trim().length === 0) {
        setIsNameInputInvalid(true);
      }
      if (selectedOptions.length === 0) {
        dispatch(
          alertAction.showAlert({
            message: "No option selected",
            type: "error",
          })
        );
        return;
      }
    }

    const registerVote = async () => {
      const reqBody = {
        name: nameInputValue,
      };
      setSendingVoteIsLoading(true);
      try {
        const response = await fetch(
          `http://${BASED_URL}/participant/create?selectedOptionsId=${selectedOptions.toString()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }
        );
        setSendingVoteIsLoading(false);
        if (response.status > 399) {
          throw new Error("Some thing went wrong");
        }
        dispatch(
          pollLinkAction.setPollLinkState("The vote successfully registered")
        );
        navigate(`../pollLink/${pollLink}`);
      } catch (error) {
        setSendingVoteIsLoading(false);
        dispatch(
          alertAction.showAlert({
            message: error.message,
            type: "error",
          })
        );
      }
    };
    registerVote();
  };

  if (isSpinnerDisplayed) {
    return <LoadingSpinner />;
  }

  if (responseMessage) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <h2 className="text-center text-gray-600 text-xl">{responseMessage}</h2>
      </div>
    );
  }

  if (!fetchedPollDetails) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <h2 className="text-center text-gray-600 text-xl"> No data </h2>
      </div>
    );
  }

  const tableHeader = fetchedPollDetails.options.map((option) => {
    let limitedTextLength = option.optionName;
    if (option.optionName.trim().length > 10) {
      limitedTextLength = option.optionName.trim().substring(0, 10) + "..";
    }
    return (
      <OptionCell
        key={option.id}
        option={option}
        limitedTextLength={limitedTextLength}
      />
    );
  });

  const tableBody = fetchedPollDetails.participants.map(
    (participant, index) => {
      const choicesRow = fetchedPollDetails.options.map((option, index) => {
        const filteredChoices = participant.choices.filter((choice) => {
          return choice.id === option.id;
        });
        if (filteredChoices.length > 0) {
          return <SelectedCell key={index} />;
        } else {
          return <UnSelectedCell key={index} />;
        }
      });

      return (
        <tr key={index}>
          <NameCell key={index} participant={participant} />
          {choicesRow}
        </tr>
      );
    }
  );

  const tableSelectionRow = fetchedPollDetails.options.map((option) => {
    return (
      <CheckBoxCell
        key={option.id}
        option={option}
        onCheckBoxClick={onCheckBoxClick}
      />
    );
  });

  const tableVoteNumberRow = fetchedPollDetails.options.map((option, index) => {
    return (
      <td key={option.id} className="text-center text-gray-700">
        <div className="m-0.5 py-2 rounded-md">
          {option.participants.length}
        </div>
      </td>
    );
  });

  return (
    <div className="max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5 overflow-scroll sm:overflow-auto">
      <div>
        <h2 className="text-4xl text-gray-700 font-thin">
          {fetchedPollDetails.title}
        </h2>
        <p className="text-lg mt-5 font-normal text-gray-700">
          {fetchedPollDetails.description}
        </p>
      </div>
      <div className="mt-6">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="p-4 w-48"></th>
              {tableHeader}
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
          <tfoot>
            <tr>
              <td className="text-gray-700">
                <div className="m-0.5 py-1 rounded-md">
                  <TextField
                    error={isNameInputInvalid}
                    className="w-full"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={nameInputValue}
                    onChange={(e) => {
                      setIsNameInputInvalid(false);
                      setNameInputValue(e.target.value);
                    }}
                  />
                </div>
              </td>
              {tableSelectionRow}
            </tr>
            <tr>
              <td className="text-gray-700">
                <div className="m-0.5 py-1 rounded-md">
                  <LoadingButton
                    loading={sendingVoteIsLoading}
                    onClick={onSaveButtonClick}
                    type="button"
                    className="w-1/3 h-9"
                    variant="contained"
                  >
                    Save
                  </LoadingButton>
                </div>
              </td>
              {tableVoteNumberRow}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default PollDetails;
