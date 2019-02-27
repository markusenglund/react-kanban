import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import CardBadges from "../CardBadges/CardBadges";
import CardOptions from "./CardOptions";
import Comments from "./Comments/Comments";
import { findCheckboxes } from "../utils";
import "./CardModal.scss";

class CardModal extends Component {
  static propTypes = {
    card: PropTypes.shape({
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      color: PropTypes.string
    }).isRequired,
    listId: PropTypes.string.isRequired,
    cardElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    toggleCardEditor: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    assignedToMe: PropTypes.bool,
    assignedUserName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      newText: props.card.text,
      isColorPickerOpen: false,
      isTextareaFocused: true,
      areCommentsOpen: false
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#app");
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ newText: nextProps.card.text });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { newText } = this.state;
    const { card, listId, dispatch, toggleCardEditor } = this.props;
    if (newText === "") {
      this.deleteCard();
    } else if (newText !== card.text) {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: {
          cardText: newText,
          cardId: card._id,
          listId
        }
      });
    }
    toggleCardEditor();
  };

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  toggleColorPicker = () => {
    this.setState({ isColorPickerOpen: !this.state.isColorPickerOpen });
  };

  handleRequestClose = () => {
    const { isColorPickerOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isColorPickerOpen) {
      toggleCardEditor();
    }
  };

  toggleComments = () => {
    this.setState({ areCommentsOpen: !this.state.areCommentsOpen });
  };

  render() {
    const { newText, isColorPickerOpen, isTextareaFocused } = this.state;
    const {
      t,
      cardElement,
      card,
      listId,
      isOpen,
      assignedToMe,
      assignedUserName
    } = this.props;
    if (!cardElement) {
      return null;
    }

    // Get number of checked and total checkboxes
    const checkboxes = findCheckboxes(newText);

    /*
    Create style of modal in order to not clip outside the edges no matter what device.
    */

    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = cardElement.getBoundingClientRect();

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - boundingRect.right < boundingRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    const isThinDisplay = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
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

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };

    return (
      <Modal
        closeTimeoutMS={150}
        isOpen={isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
        onClick={this.handleRequestClose}
      >
        <CardOptions
          isColorPickerOpen={isColorPickerOpen}
          card={card}
          listId={listId}
          boundingRect={boundingRect}
          isCardNearRightBorder={isCardNearRightBorder}
          isThinDisplay={isThinDisplay}
          toggleColorPicker={this.toggleColorPicker}
        />
        <div id="main-container">
        <div
          className="modal-textarea-wrapper"
          style={{
            minHeight: isThinDisplay ? "none" : boundingRect.height,
            width: isThinDisplay ? "100%" : boundingRect.width,
            boxShadow: isTextareaFocused
              ? "0px 0px 3px 2px rgb(0, 180, 255)"
              : null,
            background: card.color
          }}
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newText}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className="modal-textarea"
            spellCheck={false}
            onFocus={() => this.setState({ isTextareaFocused: true })}
            onBlur={() => this.setState({ isTextareaFocused: false })}
          />
          {(card.date || checkboxes.total > 0 || assignedUserName) && (
            <CardBadges
              date={card.date}
              checkboxes={checkboxes}
              assignedUserName={assignedUserName}
              assignedToMe={assignedToMe}
            />
          )}
        </div>
        <div id="toggle-comments-button">
          <button className="comment-show-button" onClick={this.toggleComments}>
          {t("Comments.toggle")}
          </button>
        </div>
        <div id="comments-container">
          <Comments showForm={this.state.areCommentsOpen} cardId={card._id} />
        </div>
        </div>
       
      </Modal>
    );
  }
}

export default connect()(withTranslation()(CardModal));
