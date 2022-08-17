import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/alert-slice";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const PollLink = () => {
  const message = useSelector((state) => state.pollLink.message);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const params = useParams();
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate(-1);
  };

  const onCopyButtonClick = () => {
    navigator.clipboard.writeText(pollLink);
    dispatch(
      alertAction.showAlert({
        message: "Poll link copied to clipboard",
        type: "success",
      })
    );
  };

  const dispatch = useDispatch();
  const pollLink = `http://localhost:3000/pollDetails/${params.pollLink}`;
  return (
    <div className="p-6 sm:p-8 border border-gray-300 rounded-lg">
      <Tooltip placement="top" title="Back">
        <button onClick={onBackButtonClick} className="absolute">
          <ArrowBackIosIcon className="text-gray-500 absolute" />
        </button>
      </Tooltip>
      <p className="text-center text-xl text-green-600">{message}</p>
      <h2 className="text-xl text-gray-600 text-center mt-6">Poll Link</h2>
      <div className="mt-4 lg:mt-6 flex items-center justify-between ">
        <div className="w-full relative">
          <TextField
            className="w-full"
            id="outlined-basic"
            variant="outlined"
            value={pollLink}
            aria-readonly
          />
          <div className="flex justify-center items-center absolute top-3.5 w-10 right-2 bg-white z-10">
            <button
              onClick={() => {
                navigator.clipboard.writeText(pollLink);
                dispatch(onCopyButtonClick);
              }}
            >
              <Tooltip placement="top" title="Copy link">
                <ContentCopyIcon className="text-gray-600 hover:text-black transition-all" />
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <div className="text-center mt-6">
          <Button
            onClick={() => {
              navigate("../pollList");
            }}
            variant="contained"
          >
            Back to pollList
          </Button>
        </div>
      )}
    </div>
  );
};
export default PollLink;
