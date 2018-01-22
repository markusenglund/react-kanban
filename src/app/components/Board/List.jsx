// @flow
import * as React from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";

type Props = {
  list: {
    title: string
  },
  cards: Array<{ title: string, id: string }>
};

type State = {
  cardComposerIsOpen: boolean,
  newCardText: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardText: ""
    };
  }

  openCardComposer = () => this.setState({ cardComposerIsOpen: true });
  handleCardComposerChange = (event: { target: { value: string } }): void => {
    this.setState({ newCardText: event.target.value });
  };

  render = () => {
    const { cards, list } = this.props;
    const { cardComposerIsOpen, newCardText } = this.state;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        {cards.map(card => (
          <div key={card.id} className="card-title">
            {card.title}
          </div>
        ))}
        {cardComposerIsOpen ? (
          <form>
            <Textarea
              useCacheForDOMMeasurements
              minRows={3}
              onChange={this.handleCardComposerChange}
              value={newCardText}
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
