import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import "./ListAdder.scss";

class ListAdder extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isOpen: false,
      listTitle: ""
    };
  }
  handleFocus = () => {
    document.getElementById("lists").scrollLeft -= 400
  }
  handleBlur = () => {
    this.setState({ isOpen: false });
  };
  handleChange = event => {
    this.setState({ listTitle: event.target.value });
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.setState({ isOpen: false, listTitle: "" });
    }
  };
  handleSubmit = () => {
    const { dispatch, boardId } = this.props;
    const { listTitle } = this.state;
    const listId = shortid.generate();
    if (listTitle === "") return;
    dispatch({
      type: "ADD_LIST",
      payload: { listTitle, listId, boardId }
    });
    this.setState({ isOpen: false, listTitle: "" });
  };
  render = () => {
    const { isOpen, listTitle } = this.state;
    const { t } = this.props;
    if (!isOpen) {
      return (
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="add-list-button"
        >
          {t("ListAdder.add_new_list")}
        </button>
      );
    }
    return (
      <div className="list">
        <Textarea
          autoFocus
          onFocus={this.handleFocus}
          useCacheForDOMMeasurements
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="list-adder-textarea"
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </div>
    );
  };
}

export default connect()(withTranslation()(ListAdder));
