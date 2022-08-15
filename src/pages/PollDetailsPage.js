import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const PollDetailsPage = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [isNameInputInvalid, setIsNameInputInvalid] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
    if (nameInputValue.trim().length === 0) {
      setIsNameInputInvalid(true);
      return;
    }
    const reqObject = {
      participantName: nameInputValue,
      selectedOptions: selectedOptions,
    };
    console.log(reqObject);
  };

  const pollDetails = {
    title: "Dinner",
    description: "What should we eat for dinner?",
    link: "54",
    options: [
      {
        id: 1,
        text: "kebab",
        numberOfVotes: 2,
      },
      {
        id: 2,
        text: "sandwich",
        numberOfVotes: 1,
      },
      {
        id: 3,
        text: "pizza peperoni",
        numberOfVotes: 3,
      },
    ],
    participants: [
      {
        id: 1,
        name: "ali",
        selectedOptionsId: [1, 3],
      },
      {
        id: 2,
        name: "mamad",
        selectedOptionsId: [3],
      },
      {
        id: 3,
        name: "hashem",
        selectedOptionsId: [1, 2, 3],
      },
    ],
  };

  const tableHeader = pollDetails.options.map((option) => {
    let limitedTextLength = option.text;
    if (option.text.trim().length > 10) {
      limitedTextLength = option.text.trim().substring(0, 10) + "..";
    }

    return (
      <Tooltip key={option.id} placement="top" title={option.text}>
        <th className="text-center">
          <div className="px-4 py-3 m-0.5 bg-gray-200 rounded-md text-gray-700">
            <p>{limitedTextLength}</p>
          </div>
        </th>
      </Tooltip>
    );
  });

  const tableBody = pollDetails.participants.map((participant, index) => {
    const rowCells = pollDetails.options.map((option, index) => {
      if (participant.selectedOptionsId.includes(option.id)) {
        return (
          <td key={index} className="text-center text-gray-700">
            <div className="m-0.5 py-2 bg-green-200 rounded-md">
              <DoneIcon className="text-green-600" />
            </div>
          </td>
        );
      } else {
        return (
          <td key={index} className="text-center text-gray-700">
            <div className="m-0.5 py-2 bg-red-200 rounded-md">
              <CloseIcon className="text-error-red" />
            </div>
          </td>
        );
      }
    });
    return (
      <tr key={index}>
        <td className="text-gray-700">
          <div className="px-4 m-0.5 py-2 bg-blue-100 rounded-md">
            <p>{participant.name}</p>
          </div>
        </td>
        {rowCells}
      </tr>
    );
  });

  const tableSelectionRow = pollDetails.options.map((option) => {
    return (
      <td key={option.id} className="text-center text-gray-700">
        <div className="m-0.5 bg-gray-50 rounded-md">
          <Checkbox onChange={onCheckBoxClick} value={option.id} />
        </div>
      </td>
    );
  });

  const tableVoteNumberRow = pollDetails.options.map((option, index) => {
    return (
      <td key={option.id} className="text-center text-gray-700">
        <div className="m-0.5 py-2 rounded-md">{option.numberOfVotes}</div>
      </td>
    );
  });

  return (
    <div className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5 overflow-scroll sm:overflow-auto">
      <div>
        <h2 className="text-4xl text-gray-700 font-thin">
          {pollDetails.title}
        </h2>
        <p className="text-lg mt-5 font-normal text-gray-700">
          {pollDetails.description}
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
                  <Button
                    onClick={onSaveButtonClick}
                    type="button"
                    className="w-1/3 h-9"
                    variant="contained"
                  >
                    Save
                  </Button>
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
export default PollDetailsPage;
