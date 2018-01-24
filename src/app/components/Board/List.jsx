// @flow
import * as React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
    const { list, dispatch } = this.props;
    if (newListTitle === "") return;
    dispatch({
      type: "EDIT_LIST_TITLE",
      payload: {
        listTitle: newListTitle,
        listId: list.id
      }
    });
    this.setState({
      isListTitleInEdit: false,
      newListTitle: ""
    });
  };

  handleDragEnd = ({ source, destination }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, list } = this.props;
    dispatch({
      type: "REORDER_LIST",
      payload: {
        listId: list.id,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }
    });
  };

  render = () => {
    const { cards, list } = this.props;
    const {
      cardComposerIsOpen,
      newCardTitle,
      cardInEdit,
      editableCardTitle,
      isListTitleInEdit,
      newListTitle
    } = this.state;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
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
            <button
              onFocus={this.openTitleEditor}
              onClick={this.openTitleEditor}
              className="list-title-button"
            >
              {list.title}
            </button>
          )}
          <Droppable droppableId={list.id}>
            {({ innerRef, placeholder }) => (
              <div className="cards" ref={innerRef}>
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {provided => (
                      <div>
                        {cardInEdit !== card.id ? (
                          <div
                            className="card-title"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{card.title}</span>
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
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
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
                {placeholder}
              </div>
            )}
          </Droppable>
          {cardComposerIsOpen || (
            <button
              onClick={this.toggleCardComposer}
              className="open-composer-button"
            >
              Add a card...
            </button>
          )}
        </div>
      </DragDropContext>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cards[cardId])
});

export default connect(mapStateToProps)(List);
