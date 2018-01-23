// @flow
import * as React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import Textarea from "react-textarea-autosize";
import FaPencil from "react-icons/lib/fa/pencil";
import ClickOutside from "./ClickOutside";

type Props = {
  list: {
    title: string,
    id: string
  },
  cards: Array<{ title: string, id: string }>,
  dispatch: ({ type: string }) => void
};

type State = {
  cardComposerIsOpen: boolean,
  newCardTitle: string,
  cardInEdit: ?string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardTitle: "",
      cardInEdit: null
    };
  }

  toggleCardComposer = () =>
    this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

  handleCardComposerChange = (event: { target: { value: string } }) => {
    this.setState({ newCardTitle: event.target.value });
  };

  handleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      this.handleSubmitCard(event);
    }
  };

  handleSubmitCard = event => {
    event.preventDefault();
    const { newCardTitle } = this.state;
    const { list, dispatch } = this.props;
    if (newCardTitle === "") return;
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

  openCardEditor = id => {
    this.setState({ cardInEdit: id });
  };

  render = () => {
    const { cards, list } = this.props;
    const { cardComposerIsOpen, newCardTitle, cardInEdit } = this.state;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        {cards.map(card => (
          <div key={card.id} className="card-title">
            {cardInEdit !== card.id ? (
              <>
                <span>{card.title}</span>
                <button
                  onClick={() => this.openCardEditor(card.id)}
                  className="edit-card-button"
                >
                  <FaPencil />
                </button>
              </>
            ) : (
              <Textarea
                autoFocus
                useCacheForDOMMeasurements
                minRows={3}
                value="hej"
              />
            )}
          </div>
        ))}
        {cardComposerIsOpen ? (
          <ClickOutside handleClickOutside={this.toggleCardComposer}>
            <form onSubmit={this.handleSubmitCard}>
              <Textarea
                autoFocus
                useCacheForDOMMeasurements
                minRows={3}
                onChange={this.handleCardComposerChange}
                onKeyDown={this.handleKeyDown}
                value={newCardTitle}
              />
              <input
                type="submit"
                value="Add"
                className="submit-card-button"
                disabled={newCardTitle === ""}
              />
            </form>
          </ClickOutside>
        ) : (
          <button
            onClick={this.toggleCardComposer}
            className="open-composer-button"
          >
            Add a card...
          </button>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cards[cardId])
});

export default connect(mapStateToProps)(List);
