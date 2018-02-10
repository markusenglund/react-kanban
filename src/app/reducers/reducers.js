const user = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD":
    case "EDIT_CARD_TITLE": {
      const { cardTitle, cardId } = action.payload;
      return { ...state, [cardId]: { title: cardTitle, _id: cardId } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    case "DELETE_LIST": {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
      };
    }
    case "DELETE_CARD": {
      const { cardId: newCardId, listId } = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(cardId => cardId !== newCardId)
        }
      };
    }
    case "ADD_LIST": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] }
      };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case "EDIT_LIST_TITLE": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle }
      };
    }
    case "REORDER_LIST": {
      const {
        sourceIndex,
        destinationIndex,
        sourceId,
        destinationId
      } = action.payload;
      // Reorder within the same list
      if (sourceId === destinationId) {
        const newCards = Array.from(state[sourceId].cards);
        const [removedCard] = newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, removedCard);
        return {
          ...state,
          [sourceId]: { ...state[sourceId], cards: newCards }
        };
      }
      // Switch card from one list to another
      const sourceCards = Array.from(state[sourceId].cards);
      const [removedCard] = sourceCards.splice(sourceIndex, 1);
      const destinationCards = Array.from(state[destinationId].cards);
      destinationCards.splice(destinationIndex, 0, removedCard);
      return {
        ...state,
        [sourceId]: { ...state[sourceId], cards: sourceCards },
        [destinationId]: { ...state[destinationId], cards: destinationCards }
      };
    }
    default:
      return state;
  }
};

const boardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { boardId, listId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...state[boardId].lists, listId]
        }
      };
    }
    case "DELETE_LIST": {
      const { listId: newListId, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter(listId => listId !== newListId)
        }
      };
    }
    case "REORDER_BOARD": {
      const { sourceIndex, destinationIndex, sourceId } = action.payload;
      const newLists = Array.from(state[sourceId].lists);
      const [removedList] = newLists.splice(sourceIndex, 1);
      newLists.splice(destinationIndex, 0, removedList);
      return {
        ...state,
        [sourceId]: { ...state[sourceId], lists: newLists }
      };
    }
    case "ADD_BOARD": {
      const { boardTitle, boardId, userId } = action.payload;
      return {
        ...state,
        [boardId]: {
          _id: boardId,
          title: boardTitle,
          lists: [],
          users: [userId]
        }
      };
    }
    default:
      return state;
  }
};

export default { user, cardsById, listsById, boardsById };
