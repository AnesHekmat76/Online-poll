import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Footer = () => {
  const [isEmailToolTipDisplayed, setIsEmailToolTipDisplayed] = useState(false);
  const displayEmailToolTip = () => {
    setIsEmailToolTipDisplayed(true);
    setTimeout(() => {
      setIsEmailToolTipDisplayed(false);
    }, 2000);
  };

  return (
    <footer className="mt-12 md:mt-16 lg:mt-20 bg-gray-100 py-3">
      <h3 className="text-lg text-center text-gray-500 font-normal">
        Follow me
      </h3>
      <div className="flex justify-center mt-2">
        <CopyToClipboard text="anes.hekmatshoar@gmail.com">
          <button onClick={displayEmailToolTip} href="https://github.com/">
            <Tooltip
              placement="top"
              title="Email address copied"
              disableFocusListener
              disableHoverListener
              disableTouchListener
              open={isEmailToolTipDisplayed}
            >
              <EmailIcon className="text-gray-500" />
            </Tooltip>
          </button>
        </CopyToClipboard>
        <Tooltip placement="top" title="Git Hub">
          <a target="blank" href="https://github.com/AnesHekmat76">
            <GitHubIcon className="text-gray-500 mx-3 lg:mx-4" />
          </a>
        </Tooltip>
        <Tooltip placement="top" title="Linked in">
          <a
            target="blank"
            href="http://linkedin.com/in/anes-hekmatshoar-837557196"
          >
            <LinkedInIcon className="text-gray-500" />
          </a>
        </Tooltip>
      </div>
      <p className="text-sm text-gray-600 text-center mt-2.5">
        Made by Anes Hekmatshoar
      </p>
    </footer>
  );
};
export default Footer;
