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
  cardInEdit: ?string,
  editableCardTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardTitle: "",
      cardInEdit: null,
      editableCardTitle: ""
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

  openCardEditor = card => {
    this.setState({ cardInEdit: card.id, editableCardTitle: card.title });
  };

  handleCardEditorChange = (event: { target: { value: string } }) => {
    this.setState({ editableCardTitle: event.target.value });
  };

  handleEditKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitCardEdit();
    }
  };

  handleSubmitCardEdit = () => {
    const { editableCardTitle, cardInEdit } = this.state;
    const { list, dispatch } = this.props;
    if (editableCardTitle === "") return;
    dispatch({
      type: "EDIT_CARD_TITLE",
      payload: {
        cardId: cardInEdit,
        cardTitle: editableCardTitle,
        listId: list.id
      }
    });
    this.setState({ editableCardTitle: "", cardInEdit: null });
  };

  render = () => {
    const { cards, list } = this.props;
    const {
      cardComposerIsOpen,
      newCardTitle,
      cardInEdit,
      editableCardTitle
    } = this.state;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        <div className="cards">
          {cards.map(card => (
            <div key={card.id}>
              {cardInEdit !== card.id ? (
                <div className="card-title">
                  <span>{card.title}</span>
                  <button
                    onClick={() => this.openCardEditor(card)}
                    className="edit-card-button"
                  >
                    <FaPencil />
                  </button>
                </div>
              ) : (
                <ClickOutside handleClickOutside={this.handleSubmitCardEdit}>
                  <div className="textarea-wrapper">
                    <Textarea
                      autoFocus
                      useCacheForDOMMeasurements
                      minRows={3}
                      value={editableCardTitle}
                      onChange={this.handleCardEditorChange}
                      onKeyDown={this.handleEditKeyDown}
                    />
                  </div>
                </ClickOutside>
              )}
            </div>
          ))}
          {cardComposerIsOpen ? (
            <ClickOutside handleClickOutside={this.toggleCardComposer}>
              <form
                onSubmit={this.handleSubmitCard}
                className="textarea-wrapper"
              >
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
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cards[cardId])
});

export default connect(mapStateToProps)(List);
