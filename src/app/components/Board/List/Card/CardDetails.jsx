import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import MdAlarm from "react-icons/lib/md/access-alarm";

function CardDetails({ date }) {
  const dueDateFromToday = differenceInCalendarDays(date, new Date());

  let dueDateString;
  if (dueDateFromToday < -1) {
    dueDateString = `${Math.abs(dueDateFromToday)} days ago`;
  } else if (dueDateFromToday === -1) {
    dueDateString = "Yesterday";
  } else if (dueDateFromToday === 0) {
    dueDateString = "Today";
  } else if (dueDateFromToday === 1) {
    dueDateString = "Tomorrow";
  } else {
    dueDateString = format(date, "D MMM");
  }

  let dueDateColor;
  if (dueDateFromToday < 0) {
    dueDateColor = "red";
  } else if (dueDateFromToday === 0) {
    dueDateColor = "darkorange";
  } else {
    dueDateColor = "green";
  }

  return (
    <div className="card-details">
      <div className="due-date" style={{ color: dueDateColor }}>
        <MdAlarm className="due-date-icon" />&nbsp;
        {dueDateString}
      </div>
    </div>
  );
}
CardDetails.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
};

export default CardDetails;
