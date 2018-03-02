import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import "./ReactDayPicker.css";

class Calendar extends Component {
  static propTypes = {
    selectedDay: PropTypes.instanceOf(Date),
    handleDayClick: PropTypes.func.isRequired
  };

  render() {
    const { selectedDay, handleDayClick } = this.props;
    return (
      <div className="calendar">
        <DayPicker
          onDayClick={handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
      </div>
    );
  }
}

export default Calendar;
