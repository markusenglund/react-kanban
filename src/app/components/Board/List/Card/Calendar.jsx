import React, { Component } from "react";
import DayPicker from "react-day-picker";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      date: null
    };
  }
  render() {
    const { date } = this.state;
    return <h1>Calendar!!</h1>;
  }
}

export default Calendar;
