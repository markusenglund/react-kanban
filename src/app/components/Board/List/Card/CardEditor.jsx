import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import { Button, Wrapper, Menu, closeMenu } from "react-aria-menubutton";
import FaTrash from "react-icons/lib/fa/trash";
import MdAlarm from "react-icons/lib/md/access-alarm";
import Calendar from "./Calendar";
import CardDetails from "./CardDetails";
import ClickOutside from "../../../ClickOutside";
import colorIcon from "../../../../../assets/images/color-icon.png";

class CardEditor extends Component {
  static propTypes = {
    card: PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      color: PropTypes.string
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
      isTextareaFocused: true
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

  editColor = color => {
    const { dispatch, card, boardId } = this.props;
    if (card.color !== color) {
      dispatch({
        type: "EDIT_CARD_COLOR",
        payload: { color, cardId: card._id, boardId }
      });
    }
    closeMenu("color-picker");
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  render() {
    const { newTitle, isCalendarOpen, isTextareaFocused } = this.state;
    const { toggleCardEditor, boundingRect, card, boardId } = this.props;
    // const distanceFromRightEdge
    const isCardNearRightBorder =
      window.innerWidth - boundingRect.right < boundingRect.left;
    const isThinDisplay = window.innerWidth < 550;

    const style = {
      content: {
        top: Math.min(
          boundingRect.top,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };

    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)"
      }
    };

    return (
      <Modal
        isOpen
        onRequestClose={toggleCardEditor}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
      >
        <div
          className="modal-textarea-wrapper"
          style={{
            minHeight: isThinDisplay ? "none" : boundingRect.height,
            width: boundingRect.width,
            boxShadow: isTextareaFocused
              ? "0px 0px 3px 2px rgb(0, 180, 255)"
              : null,
            background: card.color
          }}
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className="modal-textarea"
            spellCheck={false}
            onFocus={() => this.setState({ isTextareaFocused: true })}
            onBlur={() => this.setState({ isTextareaFocused: false })}
          />
          {card.date && <CardDetails date={card.date} />}
        </div>
        <div className="options-list">
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="modal-icon">
              <FaTrash />
            </div>&nbsp;Delete
          </button>
          <button onClick={this.toggleCalendar} className="options-list-button">
            <div className="modal-icon">
              <MdAlarm />
            </div>&nbsp;Due date
          </button>
          <Wrapper className="modal-color-picker-wrapper" id="color-picker">
            <Button className="options-list-button">
              <img src={colorIcon} alt="colorwheel" className="modal-icon" />
              &nbsp;Color
            </Button>
            <Menu className="modal-color-picker">
              {[
                "white",
                "powderblue",
                "pink",
                "tomato",
                "yellow",
                "aquamarine"
              ].map(color => (
                <button
                  key={color}
                  style={{ background: color }}
                  className="color-picker-color"
                  onClick={() => this.editColor(color)}
                />
              ))}
            </Menu>
          </Wrapper>
        </div>
        {isCalendarOpen && (
          <ClickOutside handleClickOutside={this.toggleCalendar}>
            <Calendar
              boardId={boardId}
              cardId={card._id}
              date={card.date}
              toggleCalendar={this.toggleCalendar}
            />
          </ClickOutside>
        )}
      </Modal>
    );
  }
}

export default connect()(CardEditor);
