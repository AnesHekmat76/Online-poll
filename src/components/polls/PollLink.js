import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/alert-slice";
import { useParams } from "react-router-dom";

const PollLink = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const Link = `http://localhost:3000/pollLink/${params.pollLink}`;
  return (
    <div className="p-6 sm:p-8 border border-gray-300 rounded-lg">
      <p className="text-center text-xl text-green-600">
        Poll successfully created
      </p>
      <h2 className="text-xl text-gray-600 text-center mt-6">Poll Link</h2>
      <div className="mt-4 lg:mt-6 flex items-center justify-between relative">
        <div className="w-full">
          <TextField
            className="w-full"
            id="outlined-basic"
            variant="outlined"
            value={Link}
            aria-readonly
          />
        </div>
        <div className="flex justify-center items-center absolute w-10 right-2 bg-white z-10">
          <button
            onClick={() => {
              navigator.clipboard.writeText(Link);
              dispatch(
                alertAction.showAlert({
                  message: "Poll link copied to clipboard",
                  type: "success",
                })
              );
            }}
          >
            <ContentCopyIcon className="text-gray-600 hover:text-black transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PollLink;
