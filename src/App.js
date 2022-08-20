import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import PollListPage from "./pages/PollListPage";
import CreatePollPage from "./pages/CreatePollPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditPollPage from "./pages/EditPollPage";
import PollLingPage from "./pages/PollLinkPage";
import BasicAlert from "./components/UI/Alert";
import PollDetailsPage from "./pages/PollDetailsPage";
import "../src/App.css";

const App = () => {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/pollList" element={<PollListPage />} />
          <Route path="/createPoll" element={<CreatePollPage />} />
          <Route path="/editPoll/:pollLink" element={<EditPollPage />} />
          <Route path="/pollLink/:pollLink" element={<PollLingPage />} />
          <Route path="/pollDetails/:pollLink" element={<PollDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BasicAlert />
      </main>
      <Footer />
    </>
  );
};

export default App;
