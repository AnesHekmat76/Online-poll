import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useState } from "react";

const PollDetailsPage = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [isNameInputInvalid, setIsNameInputInvalid] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([
    {
      id: 1,
      isSelected: false,
    },
    {
      id: 2,
      isSelected: false,
    },
    {
      id: 3,
      isSelected: false,
    },
  ]);
  //You should update selectedOptions state after getting poll details response.

  const onCheckBoxClick = (event) => {
    const changedOptionId = +event.target.value;
    const checkBoxValue = event.target.checked;
    setSelectedOptions((state) => {
      const clonedState = [...state];
      const selectedOptionIndex = clonedState.findIndex((option) => {
        return option.id === changedOptionId;
      });
      const clonedSelectedOption = { ...clonedState[selectedOptionIndex] };
      clonedSelectedOption.isSelected = checkBoxValue;
      clonedState[selectedOptionIndex] = clonedSelectedOption;
      return clonedState;
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
        choices: [
          {
            optionId: 1,
            optionText: "kebab",
            isSelected: true,
          },
          {
            optionId: 2,
            optionText: "sandwich",
            isSelected: false,
          },
          {
            optionId: 3,
            optionText: "pizza peperoni",
            isSelected: true,
          },
        ],
      },
      {
        id: 2,
        name: "mamad",
        choices: [
          {
            optionId: 1,
            optionText: "kebab",
            isSelected: false,
          },
          {
            optionId: 2,
            optionText: "sandwich",
            isSelected: false,
          },
          {
            optionId: 3,
            optionText: "pizza peperoni",
            isSelected: true,
          },
        ],
      },
      {
        id: 3,
        name: "hashem",
        choices: [
          {
            optionId: 1,
            optionText: "kebab",
            isSelected: true,
          },
          {
            optionId: 2,
            optionText: "sandwich",
            isSelected: true,
          },
          {
            optionId: 3,
            optionText: "pizza peperoni",
            isSelected: true,
          },
        ],
      },
    ],
  };

  const tableHeader = pollDetails.options.map((option) => {
    return (
      <th key={option.id} className="text-center">
        <div className="px-4 py-3 m-0.5 bg-gray-200 rounded-md text-gray-700">
          <p>{option.text}</p>
        </div>
      </th>
    );
  });

  const tableBody = pollDetails.participants.map((participant, index) => {
    const rowCells = participant.choices.map((choice, index) => {
      if (choice.isSelected) {
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
