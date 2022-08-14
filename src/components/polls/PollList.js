import PollItem from "../polls/PollItem";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { modalAction } from "../../store/modal-slice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pollsArray = [
  {
    title: "title here",
    description: "some text for description here",
    numberOfParticipant: "10",
    link: "1",
  },
  {
    title: "title here",
    description: "some text for description here",
    numberOfParticipant: "10",
    link: "2",
  },
  {
    title: "title here",
    description: "some text for description here",
    numberOfParticipant: "10",
    link: "3",
  },
];

const PollList = () => {
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false);
  const [isEditModalDisplayed, setIsEditModalDisplayed] = useState();
  const [selectedPollForDelete, setSelectedPollForDelete] = useState(null);
  const [selectedPollForEdit, setSelectedPollForEdit] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDeleteModal = () => {
    dispatch(
      modalAction.showModal({
        title: "Are you sure you want to delete this poll?",
        content:
          "All data related to this poll includes participants and options will be lost",
        isOpen: true,
      })
    );
    setIsDeleteModalDisplayed(true);
  };

  const showEditModal = () => {
    dispatch(
      modalAction.showModal({
        title: "Are you sure you want to edit this poll?",
        content: "You can edit title and description of this poll",
        isOpen: true,
      })
    );
    setIsEditModalDisplayed(true);
  };

  const pollsList = pollsArray.map((poll, index) => {
    return (
      <PollItem
        key={index}
        showDeleteModal={showDeleteModal}
        showEditModal={showEditModal}
        poll={poll}
        setSelectedPollForDelete={setSelectedPollForDelete}
        setSelectedPollForEdit={setSelectedPollForEdit}
      />
    );
  });

  return (
    <>
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <div>
          <Link
            to="/createPoll"
            className="mb-2 text-gray-600 hover:text-black hover:border-gray-600 hover:bg-gray-50 transition-all border border-gray-300 px-4 py-2 rounded-lg"
          >
            Create poll
          </Link>
        </div>
        <div className="mt-4">{pollsList}</div>
      </div>

      {isDeleteModalDisplayed && (
        <Modal
          handleYes={() => {
            console.log(selectedPollForDelete);
          }}
          hideModal={() => {
            setIsDeleteModalDisplayed(false);
          }}
        />
      )}

      {isEditModalDisplayed && (
        <Modal
          handleYes={() => {
            navigate(`../editPoll/${selectedPollForEdit}`);
          }}
          hideModal={() => {
            setIsEditModalDisplayed(false);
          }}
        />
      )}
    </>
  );
};
export default PollList;
