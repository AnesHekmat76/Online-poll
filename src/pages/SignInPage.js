import SignInForm from "../components/forms/SignInForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignInPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("../pollList");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="max-w-lg mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6">
      {!isLoggedIn && <SignInForm />}
    </div>
  );
};
export default SignInPage;
