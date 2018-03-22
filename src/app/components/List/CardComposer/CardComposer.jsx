import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import ClickOutside from "../../ClickOutside";
import "./CardComposer.scss";

class CardComposer extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    listId: PropTypes.string.isRequired,
    toggleCardComposer: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      newText: ""
    };
  }

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmit(event);
    } else if (event.keyCode === 27) {
      this.props.toggleCardComposer();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { newText } = this.state;
    const { listId, dispatch, toggleCardComposer } = this.props;
    if (newText === "") return;

    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText: newText, cardId, listId }
    });
    toggleCardComposer();
    this.setState({ newText: "" });
  };

  render() {
    const { newText } = this.state;
    const { isOpen, toggleCardComposer } = this.props;
    return (
      isOpen && (
        <ClickOutside handleClickOutside={toggleCardComposer}>
          <form onSubmit={this.handleSubmit} className="textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              minRows={1}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={newText}
              className="list-textarea"
              placeholder="Create new card..."
              spellCheck={false}
              onBlur={toggleCardComposer}
            />
          </form>
        </ClickOutside>
      )
    );
  }
}

export default connect()(CardComposer);
