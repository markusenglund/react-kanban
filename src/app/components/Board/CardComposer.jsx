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

  handleCardComposerChange = event => {
    this.setState({ newCardTitle: event.target.value });
  };

  handleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmitCard(event);
    } else if (event.keyCode === 27) {
      this.props.toggleCardComposer();
    }
  };

  handleSubmitCard = event => {
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
      <form onSubmit={this.handleSubmitCard} className="textarea-wrapper">
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          minRows={3}
          onChange={this.handleCardComposerChange}
          onKeyDown={this.handleKeyDown}
          value={newCardTitle}
          className="list-textarea"
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
