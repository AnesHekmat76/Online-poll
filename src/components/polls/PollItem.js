import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const PollItem = ({
  showDeleteModal,
  showEditModal,
  poll,
  setSelectedPollForEdit,
  setSelectedPollForDelete,
}) => {
  const [shareLinkToolTipMsg, setShareLinkToolTipMsg] =
    useState("Copy poll link");
  const { title, description, participants, link } = poll;

  const onShareIconClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/pollDetails/${link}`);
    setShareLinkToolTipMsg("Copied!");
    setTimeout(() => {
      setShareLinkToolTipMsg("Copy poll link");
    }, 2000);
  };

  return (
    <div className="border-b border-gray-300 py-3 lg:py-4 px-1">
      <div className="flex justify-between">
        <Link
          to={`../pollDetails/${link}`}
          className="text-xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
        >
          {title}
        </Link>
        <div>
          <button onClick={onShareIconClick}>
            <Tooltip placement="top" title={shareLinkToolTipMsg}>
              <ShareIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
          <button
            onClick={() => {
              setSelectedPollForEdit(link);
              showEditModal(link);
            }}
            className="mx-3 lg:mx-5"
          >
            <Tooltip placement="top" title="Edit poll">
              <EditIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
          <button
            onClick={() => {
              setSelectedPollForDelete(link);
              showDeleteModal();
            }}
          >
            <Tooltip placement="top" title="Delete poll">
              <DeleteIcon className="text-gray-500 hover:text-gray-600" />
            </Tooltip>
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-500">{description} </p>
      <div className="mt-2 flex items-center">
        <PeopleIcon className="text-gray-500" />
        <p className="ml-2 text-gray-500">
          {participants ? participants.length : 0}
        </p>
      </div>
    </div>
  );
};
export default PollItem;
