// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";

type Props = {
  boardId: string,
  list: { _id: string },
  toggleCardComposer: () => void,
  dispatch: () => void
};

class CardComposer extends Component<Props> {
  constructor() {
    super();
    this.state = {
      newCardTitle: ""
    };
  }

  componentDidMount = () => {
    setTimeout(() => this.el.scrollIntoView());
  };

  handleChange = event => {
    this.setState({ newCardTitle: event.target.value });
  };

  handleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmit(event);
    } else if (event.keyCode === 27) {
      this.props.toggleCardComposer();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { newCardTitle } = this.state;
    const { list, boardId, dispatch, toggleCardComposer } = this.props;
    if (newCardTitle === "") return;

    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardTitle: newCardTitle, cardId, listId: list._id, boardId }
    });
    this.setState({ newCardTitle: "" });
    toggleCardComposer();
  };

  render() {
    const { newCardTitle } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="textarea-wrapper">
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          minRows={3}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={newCardTitle}
          className="list-textarea"
          spellCheck={false}
        />
        <input
          ref={el => {
            this.el = el;
          }}
          type="submit"
          value="Add"
          className="submit-card-button"
          disabled={newCardTitle === ""}
        />
      </form>
    );
  }
}

export default connect()(CardComposer);
