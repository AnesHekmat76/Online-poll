import PollLink from "../components/polls/PollLink";
import { pollLinkAction } from "../store/pollLink-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PollLingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPollLinkDisplayed = useSelector(
    (state) => state.pollLink.isDisplayed
  );
  useEffect(() => {
    if (!isPollLinkDisplayed) {
      navigate(-1);
    }

    return () => {
      dispatch(pollLinkAction.hidePollLinkPage());
    };
  }, [dispatch, isPollLinkDisplayed, navigate]);

  return (
    <div className="max-w-md md:max-w-xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 md:px-8">
      {isPollLinkDisplayed && <PollLink />}
    </div>
  );
};
export default PollLingPage;
