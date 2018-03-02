import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import format from "date-fns/format";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import MdAlarm from "react-icons/lib/md/access-alarm";
import Calendar from "./Calendar";

class CardEditor extends Component {
  static propTypes = {
    card: PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    boundingRect: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired,
    toggleCardEditor: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newTitle: props.card.title,
      isCalendarOpen: false,
      selectedDay: null
    };
    Modal.setAppElement("#app");
  }

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { newTitle } = this.state;
    const { card, listId, boardId, dispatch, toggleCardEditor } = this.props;
    if (newTitle === "") {
      this.deleteCard();
    } else if (newTitle !== card.title) {
      dispatch({
        type: "EDIT_CARD_TITLE",
        payload: {
          cardTitle: newTitle,
          cardId: card._id,
          listId,
          boardId
        }
      });
    }
    toggleCardEditor();
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  deleteCard = () => {
    const { dispatch, listId, boardId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId, boardId }
    });
  };

  openDatePicker = () => {
    this.setState({ isCalendarOpen: true });
  };

  handleDayClick = (selectedDay, { selected }) => {
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay });
  };

  render() {
    const { newTitle, isCalendarOpen, selectedDay } = this.state;
    const { toggleCardEditor, boundingRect } = this.props;
    const isCardNearRightBorder = boundingRect.right + 90 > window.innerWidth;

    const top = Math.min(
      boundingRect.top,
      window.innerHeight - boundingRect.height - 18
    );
    const style = {
      content: {
        top,
        left: isCardNearRightBorder ? null : boundingRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };
    return (
      <Modal
        isOpen
        onRequestClose={toggleCardEditor}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        style={style}
        includeDefaultStyles={false}
      >
        <div className="modal-textarea-wrapper">
          <Textarea
            style={{
              minHeight: boundingRect.height,
              width: boundingRect.width
            }}
            autoFocus
            useCacheForDOMMeasurements
            value={newTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className="modal-textarea"
            spellCheck={false}
          />
          {selectedDay && (
            <div className="card-details">
              <div className="due-date">
                <MdAlarm className="due-date-icon" />&nbsp;
                {format(selectedDay, "D MMM")}
              </div>
            </div>
          )}
        </div>
        <div className="options-list">
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="options-list-button-icon">
              <FaTimesCircle />
            </div>&nbsp;Delete
          </button>
          <button onClick={this.openDatePicker} className="options-list-button">
            <div className="modal-icon">
              <MdAlarm />
            </div>&nbsp;Due date
          </button>
        </div>
        {isCalendarOpen && (
          <Calendar
            selectedDay={selectedDay}
            handleDayClick={this.handleDayClick}
          />
        )}
      </Modal>
    );
  }
}

export default connect()(CardEditor);
