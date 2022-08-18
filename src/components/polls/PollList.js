import PollItem from "../polls/PollItem";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { modalAction } from "../../store/modal-slice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import LoadingSpinner from "../UI/LoadingSpinner";
import { alertAction } from "../../store/alert-slice";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { authAction } from "../../store/auth-slice";

const PollList = () => {
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false);
  const [isEditModalDisplayed, setIsEditModalDisplayed] = useState();
  const [selectedPollForDelete, setSelectedPollForDelete] = useState(null);
  const [selectedPollForEdit, setSelectedPollForEdit] = useState(null);
  const [fetchedPolls, setFetchedPolls] = useState([]);
  const [isSpinnerDisplayed, setIsSpinnerDisplayed] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllPolls = useCallback(async () => {
    setIsSpinnerDisplayed(true);
    try {
      const response = await fetch(`http://${BASED_URL}/poll/find-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setIsSpinnerDisplayed(false);
      if (response.status > 399) {
        if (response.status === 403) {
          dispatch(authAction.logoutHandler());
          navigate("../");
        }
        throw new Error("Some thing went wrong");
      }

      const data = await response.json();
      if (data.length === 0) {
        setResponseMessage("No polls found");
        return;
      }
      setResponseMessage("");
      setFetchedPolls(data);
    } catch (err) {
      setIsSpinnerDisplayed(false);
      setResponseMessage(err.message);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    getAllPolls();
  }, [getAllPolls]);

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

  const deletePoll = async () => {
    try {
      const response = await fetch(
        `http://${BASED_URL}/poll/delete/${selectedPollForDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status > 399) {
        if (response.status === 403) {
          dispatch(authAction.logoutHandler());
          navigate("../");
        }
        throw new Error("Some thing went wrong");
      }
      dispatch(
        alertAction.showAlert({
          message: "Poll successFully deleted",
          type: "success",
        })
      );
      await getAllPolls();
    } catch (error) {
      dispatch(
        alertAction.showAlert({
          message: error.message,
          type: "error",
        })
      );
    }
  };

  const pollsList = fetchedPolls.map((poll, index) => {
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

  if (isSpinnerDisplayed) {
    return <LoadingSpinner />;
  }

  if (responseMessage) {
    return (
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16 px-5">
        <h2 className="text-center text-gray-600 text-xl mt-4">
          {responseMessage}
        </h2>
      </div>
    );
  }

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
            deletePoll();
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
