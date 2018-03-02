import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import "./ReactDayPicker.css";

class Calendar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    toggleCalendar: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      selectedDay: null
    };
  }

  handleDayClick = (selectedDay, { selected }) => {
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay });
  };

  handleSave = () => {
    const { selectedDay } = this.state;
    const { dispatch, cardId, boardId, toggleCalendar } = this.props;
    if (selectedDay) {
      dispatch({
        type: "EDIT_CARD_DATE",
        payload: { date: selectedDay, cardId, boardId }
      });
      toggleCalendar();
    }
  };

  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className="calendar">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className="calendar-buttons">
          <button onClick={this.handleSave}>Save</button>
          <button onClick={toggleCalendar}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default connect()(Calendar);
