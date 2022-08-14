import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="mt-12 md:mt-16 lg:mt-24 bg-gray-100 py-3">
      <h3 className="text-lg text-center text-gray-500 font-normal">
        Folow me
      </h3>
      <div className="flex justify-center mt-2">
        <a href="https://github.com/">
          <EmailIcon className="text-gray-500" />
        </a>
        <a href="https://github.com/AnesHekmat76">
          <GitHubIcon className="text-gray-500 mx-2 lg:mx-3" />
        </a>
        <a href="http://linkedin.com/in/anes-hekmatshoar-837557196">
          <LinkedInIcon className="text-gray-500" />
        </a>
      </div>
      <p className="text-sm text-gray-600 text-center mt-2">
        Made by Anes Hekmatshoar
      </p>
    </footer>
  );
};
export default Footer;
