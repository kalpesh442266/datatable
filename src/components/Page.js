import PropTypes from "prop-types";
import { useEffect } from "react";
// @mui

// ----------------------------------------------------------------------

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return <>{children}</>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
