import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FaTrash from "react-icons/lib/fa/trash";
import MdAlarm from "react-icons/lib/md/access-alarm";
import ClickOutside from "../ClickOutside";
import colorIcon from "../../../assets/images/color-icon.png";

class CardOptions extends Component {
  static propTypes = {
    isColorPickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    toggleColorPicker: PropTypes.func.isRequired,
    toggleCalendar: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  deleteCard = () => {
    const { dispatch, listId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  changeColor = color => {
    const { dispatch, card, toggleColorPicker } = this.props;
    if (card.color !== color) {
      dispatch({
        type: "CHANGE_CARD_COLOR",
        payload: { color, cardId: card._id }
      });
    }
    toggleColorPicker();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleColorPicker();
      this.colorPickerButton.focus();
    }
  };

  handleClickOutside = () => {
    const { toggleColorPicker } = this.props;
    toggleColorPicker();
    this.colorPickerButton.focus();
  };

  render() {
    const {
      isCardNearRightBorder,
      isColorPickerOpen,
      toggleColorPicker,
      toggleCalendar
    } = this.props;
    return (
      <div
        className="options-list"
        style={{
          alignItems: isCardNearRightBorder ? "flex-end" : "flex-start"
        }}
      >
        <div>
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="modal-icon">
              <FaTrash />
            </div>&nbsp;Delete
          </button>
        </div>
        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleColorPicker}
            onKeyDown={this.handleKeyDown}
            ref={ref => {
              this.colorPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isColorPickerOpen}
          >
            <img src={colorIcon} alt="colorwheel" className="modal-icon" />
            &nbsp;Color
          </button>
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleClickOutside}
            >
              {/* eslint-disable */}
              <div
                className="modal-color-picker"
                onKeyDown={this.handleKeyDown}
              >
                {/* eslint-enable */}
                {["white", "#6df", "#6f6", "#ff6", "#fa4", "#f66"].map(
                  color => (
                    <button
                      key={color}
                      style={{ background: color }}
                      className="color-picker-color"
                      onClick={() => this.changeColor(color)}
                    />
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
        <div>
          <button onClick={toggleCalendar} className="options-list-button">
            <div className="modal-icon">
              <MdAlarm />
            </div>&nbsp;Due date
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CardOptions);
