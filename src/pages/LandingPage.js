import Button from "@mui/material/Button";
import mainImg from "../assets/main2.webp";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <div className="max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-24">
      <div className="px-6 sm:px-8 flex flex-col md:flex-row">
        <div className="md:w-7/12 md:px-10 lg:px-14 md:pt-12 lg:pt-16">
          <h1 className="text-2xl sm:text-3xl font-semibold md:text-left lg:text-4xl">
            Some text here to intru
          </h1>
          <p className="mt-4 sm:mt-6 text-gray-500 leading-6 font-normal lg:w-9/12">
            Description about this Feature lorem something should placed here In
            publishing and graphic design, Lorem ipsum is a placeholder text
          </p>
          <div className="mt-5 sm:mt-6 lg:mt-8 md:w-48 lg:w-60">
            <Button
              className="w-full lg:h-11"
              variant="contained"
              onClick={() => {
                navigate("/signIn");
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 md:w-5/12">
          <img
            className="h-60 w-60 mx-auto sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            alt="mainImg"
            src={mainImg}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
