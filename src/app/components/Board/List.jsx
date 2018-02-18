// @flow
import * as React from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { Droppable } from "react-beautiful-dnd";
import type { DragHandleProps } from "react-beautiful-dnd";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import Card from "./Card";
import ClickOutside from "../ClickOutside";
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
  editableCardTitle: string,
  isListTitleInEdit: boolean,
  newListTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      cardInEdit: null,
      editableCardTitle: "",
      isListTitleInEdit: false,
      newListTitle: ""
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

  openTitleEditor = () => {
    this.setState({
      isListTitleInEdit: true,
      newListTitle: this.props.list.title
    });
  };

  handleListTitleEditorChange = (event: { target: { value: string } }) => {
    this.setState({ newListTitle: event.target.value });
  };

  handleListTitleKeyDown = (event: SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmitListTitle();
    }
  };

  handleSubmitListTitle = () => {
    const { newListTitle } = this.state;
    const { list, boardId, dispatch } = this.props;
    if (newListTitle === "") return;
    if (newListTitle !== list.title) {
      dispatch({
        type: "EDIT_LIST_TITLE",
        payload: { listTitle: newListTitle, listId: list._id, boardId }
      });
    }
    this.setState({
      isListTitleInEdit: false,
      newListTitle: ""
    });
  };

  deleteList = () => {
    const { list, boardId, dispatch } = this.props;
    dispatch({
      type: "DELETE_LIST",
      payload: { cards: list.cards, listId: list._id, boardId }
    });
  };

  render = () => {
    const { cards, list, boardId, dragHandleProps, i } = this.props;
    const {
      cardComposerIsOpen,
      cardInEdit,
      editableCardTitle,
      isListTitleInEdit,
      newListTitle
    } = this.state;
    return (
      <div className="list">
        {isListTitleInEdit ? (
          <div className="list-title-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              value={newListTitle}
              onChange={this.handleListTitleEditorChange}
              onKeyDown={this.handleListTitleKeyDown}
              className="list-title-textarea"
              onBlur={this.handleSubmitListTitle}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            className="list-title"
            {...dragHandleProps}
            data-react-beautiful-dnd-drag-handle={i}
          >
            <div
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  this.openTitleEditor();
                }
              }}
              role="button"
              tabIndex={0}
              onClick={this.openTitleEditor}
              className="list-title-button"
            >
              {list.title}
            </div>
            <button onClick={this.deleteList} className="delete-list-button">
              <FaTimesCircle />
            </button>
          </div>
        )}
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
