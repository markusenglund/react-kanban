// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import type { DragHandleProps } from "react-beautiful-dnd";
import Textarea from "react-textarea-autosize";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import ClickOutside from "../ClickOutside";
import {
  addCard,
  editCardTitle,
  deleteCard,
  editListTitle,
  deleteList
} from "../../actionCreators";

type Props = {
  boardId: string,
  list: {
    title: string,
    _id: string,
    cards: Array<string>
  },
  cards: Array<{ title: string, _id: string }>,
  dispatch: ({ type: string }) => void,
  dragHandleProps: DragHandleProps
};

type State = {
  cardComposerIsOpen: boolean,
  newCardTitle: string,
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
      newCardTitle: "",
      cardInEdit: null,
      editableCardTitle: "",
      isListTitleInEdit: false,
      newListTitle: ""
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
    const { list, boardId, dispatch } = this.props;
    if (newCardTitle === "") return;
    dispatch(addCard(newCardTitle, list._id, boardId));
    this.setState({ newCardTitle: "", cardComposerIsOpen: false });
  };

  openCardEditor = card => {
    this.setState({ cardInEdit: card._id, editableCardTitle: card.title });
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
    const { list, boardId, dispatch } = this.props;
    if (editableCardTitle === "") {
      this.deleteCard(cardInEdit);
    } else {
      dispatch(editCardTitle(editableCardTitle, cardInEdit, list, boardId));
    }
    this.setState({ editableCardTitle: "", cardInEdit: null });
  };

  deleteCard = cardId => {
    const { dispatch, list, boardId } = this.props;
    dispatch(deleteCard(cardId, list._id, boardId));
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
    dispatch(editListTitle(newListTitle, list._id, boardId));
    this.setState({
      isListTitleInEdit: false,
      newListTitle: ""
    });
  };

  deleteList = () => {
    const { list, boardId, dispatch } = this.props;
    dispatch(deleteList(list.cards, list._id, boardId));
  };

  render = () => {
    const { cards, list, dragHandleProps } = this.props;
    const {
      cardComposerIsOpen,
      newCardTitle,
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
            />
          </div>
        ) : (
          <div
            className="list-title"
            {...dragHandleProps}
            // data-react-beautiful-dnd-drag-handle="0"
          >
            <button
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  this.openTitleEditor();
                }
              }}
              onClick={this.openTitleEditor}
              className="list-title-button"
            >
              {list.title}
            </button>
            <button onClick={this.deleteList} className="delete-list-button">
              <FaTimesCircle />
            </button>
          </div>
        )}
        <Droppable droppableId={list._id}>
          {provided => (
            <div className="cards" ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card._id} draggableId={card._id} index={index}>
                  {({
                    innerRef,
                    draggableProps,
                    dragHandleProps: handleProps,
                    placeholder
                  }) => (
                    <div>
                      {cardInEdit !== card._id ? (
                        <div
                          className="card-title"
                          ref={innerRef}
                          {...draggableProps}
                          {...handleProps}
                          data-react-beautiful-dnd-draggable="0"
                          data-react-beautiful-dnd-drag-handle="0"
                        >
                          <span>{card.title}</span>
                          <button
                            onClick={() => this.deleteCard(card._id)}
                            className="delete-card-button"
                          >
                            <FaTimesCircle />
                          </button>
                          <button
                            onClick={() => this.openCardEditor(card)}
                            className="edit-card-button"
                          >
                            <FaPencil />
                          </button>
                        </div>
                      ) : (
                        <div className="textarea-wrapper">
                          <Textarea
                            autoFocus
                            useCacheForDOMMeasurements
                            minRows={3}
                            value={editableCardTitle}
                            onChange={this.handleCardEditorChange}
                            onKeyDown={this.handleEditKeyDown}
                            className="list-textarea"
                            onBlur={this.handleSubmitCardEdit}
                          />
                        </div>
                      )}
                      {placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {cardComposerIsOpen && (
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
                      className="list-textarea"
                    />
                    <input
                      type="submit"
                      value="Add"
                      className="submit-card-button"
                      disabled={newCardTitle === ""}
                    />
                  </form>
                </ClickOutside>
              )}
              {cardComposerIsOpen || (
                <button
                  onClick={this.toggleCardComposer}
                  className="open-composer-button"
                >
                  Add a card...
                </button>
              )}
            </div>
          )}
        </Droppable>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
