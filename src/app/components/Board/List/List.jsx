// @flow
import * as React from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { Droppable } from "react-beautiful-dnd";
import type { DragHandleProps } from "react-beautiful-dnd";
import ListTitle from "./ListTitle";
import Card from "./Card";
import ClickOutside from "../../ClickOutside";
import CardComposer from "./CardComposer";

type Props = {
  boardId: string,
  list: {
    title: string,
    _id: string,
    cards: Array<string>
  },
  cards: Array<{ title: string, _id: string }>,
  dispatch: ({ type: string }) => void,
  dragHandleProps: DragHandleProps,
  i: number
};

type State = {
  cardComposerIsOpen: boolean,
  cardInEdit: ?string,
  editableCardTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      cardInEdit: null,
      editableCardTitle: ""
    };
  }

  toggleCardComposer = () =>
    this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

  openCardEditor = card => {
    this.setState({ cardInEdit: card._id, editableCardTitle: card.title });
  };

  handleCardEditorChange = (event: { target: { value: string } }) => {
    this.setState({ editableCardTitle: event.target.value });
  };

  handleEditKeyDown = (event: SyntheticEvent<>, cardTitle) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.handleSubmitCardEdit(cardTitle);
    }
  };

  handleSubmitCardEdit = cardTitle => {
    const { editableCardTitle, cardInEdit } = this.state;
    const { list, boardId, dispatch } = this.props;
    if (editableCardTitle === "") {
      this.deleteCard(cardInEdit);
    } else if (editableCardTitle !== cardTitle) {
      dispatch({
        type: "EDIT_CARD_TITLE",
        payload: {
          cardTitle: editableCardTitle,
          cardId: cardInEdit,
          listId: list._id,
          boardId
        }
      });
    }
    this.setState({ editableCardTitle: "", cardInEdit: null });
  };

  deleteCard = cardId => {
    const { dispatch, list, boardId } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, listId: list._id, boardId }
    });
  };

  render = () => {
    const { cards, list, boardId, dragHandleProps, i } = this.props;
    const { cardComposerIsOpen, cardInEdit, editableCardTitle } = this.state;
    return (
      <div className="list">
        <ListTitle
          dragHandleProps={dragHandleProps}
          i={i}
          listTitle={list.title}
          listId={list._id}
          cards={list.cards}
          boardId={boardId}
        />
        <div className="cards-wrapper">
          <Droppable droppableId={list._id}>
            {provided => (
              <>
                <div className="cards" ref={provided.innerRef}>
                  {cards.map(
                    (card, index) =>
                      cardInEdit !== card._id ? (
                        <Card
                          key={card._id}
                          card={card}
                          index={index}
                          i={i}
                          deleteCard={this.deleteCard}
                          openCardEditor={this.openCardEditor}
                        />
                      ) : (
                        <div key={card._id} className="textarea-wrapper">
                          <Textarea
                            autoFocus
                            useCacheForDOMMeasurements
                            value={editableCardTitle}
                            onChange={this.handleCardEditorChange}
                            onKeyDown={event =>
                              this.handleEditKeyDown(event, card.title)
                            }
                            className="list-textarea"
                            onBlur={() => this.handleSubmitCardEdit(card.title)}
                            spellCheck={false}
                          />
                        </div>
                      )
                  )}
                  {provided.placeholder}
                  <div style={{ padding: "6px" }} />
                  {cardComposerIsOpen && (
                    <ClickOutside handleClickOutside={this.toggleCardComposer}>
                      <CardComposer
                        toggleCardComposer={this.toggleCardComposer}
                        boardId={boardId}
                        list={list}
                      />
                    </ClickOutside>
                  )}
                </div>
              </>
            )}
          </Droppable>
        </div>
        {cardComposerIsOpen || (
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
  cards: ownProps.list.cards.map(cardId => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
