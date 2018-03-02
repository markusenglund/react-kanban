import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "./ReactDayPicker.css";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      date: null
    };
  }
  render() {
    const { date } = this.state;
    return (
      <div className="calendar">
        <DayPicker />
      </div>
    );
  }
}

export default Calendar;
