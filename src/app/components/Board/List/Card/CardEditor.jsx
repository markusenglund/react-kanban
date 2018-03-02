import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

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
      newTitle: props.card.title
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

  render() {
    const { newTitle } = this.state;
    const { toggleCardEditor, boundingRect } = this.props;
    const top = Math.min(
      boundingRect.top,
      window.innerHeight - boundingRect.height - 18
    );
    const style = {
      content: {
        top,
        left: boundingRect.left
      }
    };
    return (
      <Modal
        isOpen
        onRequestClose={toggleCardEditor}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="card-editor-modal"
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
            className="list-textarea"
            spellCheck={false}
          />
        </div>
        <div className="options-list">
          <button onClick={this.deleteCard} className="options-list-button">
            <FaTimesCircle style={{ marginBottom: 2 }} />&nbsp;Delete card
          </button>
        </div>
      </Modal>
    );
  }
}

export default connect()(CardEditor);
