// @flow
import * as React from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";

type Props = {
  list: {
    title: string
  },
  cards: Array<{ title: string, id: string }>
};

type State = {
  cardComposerIsOpen: boolean,
  newCardTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardTitle: ""
    };
  }

  openCardComposer = () => this.setState({ cardComposerIsOpen: true });
  handleCardComposerChange = (event: { target: { value: string } }): void => {
    this.setState({ newCardTitle: event.target.value });
  };

  handleSubmitCard = event => {
    event.preventDefault();
    const { newCardTitle } = this.state;
    const { list, dispatch } = this.props;
    dispatch({
      type: "ADD_CARD",
      payload: {
        cardId: shortid.generate(),
        cardTitle: newCardTitle,
        listId: list.id
      }
    });
    this.setState({ newCardTitle: "", cardComposerIsOpen: false });
  };

  render = () => {
    const { cards, list } = this.props;
    const { cardComposerIsOpen, newCardTitle } = this.state;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        {cards.map(card => (
          <div key={card.id} className="card-title">
            {card.title}
          </div>
        ))}
        {cardComposerIsOpen ? (
          <form onSubmit={this.handleSubmitCard}>
            <Textarea
              useCacheForDOMMeasurements
              minRows={3}
              onChange={this.handleCardComposerChange}
              value={newCardTitle}
            />
            <input type="submit" value="Add" />
          </form>
        ) : (
          <button
            onClick={this.openCardComposer}
            className="open-composer-button"
          >
            Add a card...
          </button>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    cards: ownProps.list.cards.map(cardId => state.cards[cardId])
  };
};

export default connect(mapStateToProps)(List);
