// @flow
import * as React from "react";

type Props = {
  list: {
    title: string,
    cards: Array<{ title: string, id: string }>
  }
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
    const { list } = this.props;
    const { cardComposerIsOpen, newCardText } = this.state;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        {list.cards.map(card => (
          <div key={card.id} className="card-title">
            {card.title}
          </div>
        ))}
        {cardComposerIsOpen ? (
          <textarea
            onChange={this.handleCardComposerChange}
            className="card-title"
            value={newCardText}
          />
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

export default List;
