import Alert from "@mui/material/Alert";
import { alertAction } from "../../store/alert-slice";
import { useDispatch, useSelector } from "react-redux";

const BasicAlert = () => {
  const dispatch = useDispatch();
  const isAlertDisplayed = useSelector((state) => state.alert.isDisplayed);
  const alertMessage = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.type);

  if (isAlertDisplayed === true) {
    setTimeout(() => {
      dispatch(alertAction.hideAlert());
    }, 1500);
  }

  if (isAlertDisplayed) {
    return (
      <div className="w-80 fixed right-4 bottom-6 z-40 border border-gray-300 rounded-md overflow-hidden">
        <Alert
          variant="filled"
          severity={alertType}
          onClose={() => {
            dispatch(alertAction.hideAlert());
          }}
        >
          {alertMessage}
        </Alert>
      </div>
    );
  }

  return null;
};
export default BasicAlert;
