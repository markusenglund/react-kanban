import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import ClickOutside from "../../ClickOutside";
import CardComposer from "./CardComposer";
import CardWrapper from "./CardWrapper";

class Cards extends Component {
  render() {
    const {
      list,
      cards,
      i,
      cardComposerIsOpen,
      toggleCardComposer,
      boardId
    } = this.props;
    return (
      <Droppable droppableId={list._id}>
        {provided => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((card, index) => (
                <CardWrapper
                  key={card._id}
                  card={card}
                  index={index}
                  i={i}
                  listId={list._id}
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
              <div style={{ padding: "6px" }} />
              {cardComposerIsOpen && (
                <ClickOutside handleClickOutside={toggleCardComposer}>
                  <CardComposer
                    toggleCardComposer={toggleCardComposer}
                    boardId={boardId}
                    list={list}
                  />
                </ClickOutside>
              )}
            </div>
          </>
        )}
      </Droppable>
    );
  }
}

export default Cards;
