import React from "react";
import PropTypes from "prop-types";

let i = -1;

function Checkbox() {
  i += 1;
  return <input type="checkbox" id={`checkbox-${i}`} />;
}
// Checkbox.propTypes = {
//   checked: PropTypes.bool.isRequired
// };

export default Checkbox;
