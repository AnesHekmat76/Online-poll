import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { alertAction } from "../../store/alert-slice";
import { useDispatch } from "react-redux/es/exports";

const PollLink = () => {
  const [copyLinkIconToolTipMsg, setCopyLinkIconToolTipMsg] =
    useState("Copy link");
  const message = useSelector((state) => state.pollLink.message);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const params = useParams();
  const dispatch = useDispatch();
  const pollLink = `http://www.aneshekmatshoar.xyz/pollDetails/${params.pollLink}`;
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate(-1);
  };

  const onCopyButtonClick = () => {
    setCopyLinkIconToolTipMsg("Copied!");
    setTimeout(() => {
      setCopyLinkIconToolTipMsg("Copy link");
    }, 2000);
    dispatch(
      alertAction.showAlert({
        message: "Poll link copied",
        type: "success",
      })
    );
  };

  return (
    <div className="py-6 px-4 md:p-8 border border-gray-300 rounded-lg shadow-sm">
      <Tooltip placement="top" title="Back">
        <button onClick={onBackButtonClick} className="absolute">
          <ArrowBackIosIcon className="text-gray-500 absolute" />
        </button>
      </Tooltip>
      <p className="mx-9 text-center text-xl text-green-600">{message}</p>
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
            <CopyToClipboard text={pollLink}>
              <button onClick={onCopyButtonClick}>
                <Tooltip placement="top" title={copyLinkIconToolTipMsg}>
                  <ContentCopyIcon className="text-gray-600 hover:text-black transition-all" />
                </Tooltip>
              </button>
            </CopyToClipboard>
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
