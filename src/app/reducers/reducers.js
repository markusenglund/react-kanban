// @flow
type CardState = {
  [string]: { title: string, id: string }
};

type ListState = {
  [string]: { title: string, id: string, cards: Array<string> }
};

type BoardState = {
  [string]: { title: string, id: string, lists: Array<string> }
};

// type AddCardAction = {
//   type: string,
//   payload: { listId: string, cardId: string, cardTitle: string }
// };

// type EditListTitleAction = {
//   type: string,
//   payload: { listId: string, listTitle: string }
// };

type Action = {
  type: string,
  payload: {
    listId: string,
    listTitle: string,
    cardId: string,
    cardTitle: string,
    boardId: string,
    sourceIndex: number,
    destinationIndex: number,
    sourceId: string,
    destinationId: string
  }
};

const initialCardState = {
  qwer: {
    title: "Inspect how trello deals with loading boards, images",
    id: "qwer"
  },
  asdf: {
    title: "Make skeleton structure of whatever",
    id: "asdf"
  },
  zxcv: {
    title: "Do some stuff",
    id: "zxcv"
  },
  lkjhag: {
    title:
      "Maybe a really really long one: How should I manage board state, and generally state for components that are the same but have different data?",
    id: "lkjhag"
  }
};

const initialListState = {
  lgrnrirgi: {
    title: "TODO Big picture",
    id: "lgrnrirgi",
    cards: ["qwer", "asdf"]
  },
  ogtpokpr: {
    title: "TODO details",
    id: "ogtpokpr",
    cards: ["zxcv", "lkjhag"]
  }
};

const initialBoardState = {
  abc123: {
    title: "Test Board Hejsvejs",
    id: "abc123",
    lists: ["lgrnrirgi", "ogtpokpr"]
  }
};

const cards = (state: CardState = initialCardState, action: Action) => {
  switch (action.type) {
    case "ADD_CARD":
    case "EDIT_CARD_TITLE": {
      const { cardTitle, cardId } = action.payload;
      return { ...state, [cardId]: { title: cardTitle, id: cardId } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    default:
      return state;
  }
};

const lists = (state: ListState = initialListState, action: Action) => {
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
        [listId]: { id: listId, title: listTitle, cards: [] }
      };
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

const boards = (state: BoardState = initialBoardState, action: Action) => {
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
    default:
      return state;
  }
};

const counter = (state: number = 1, action: Action) => {
  switch (action.type) {
    case "INCREMENT": {
      return state + 2;
    }
    default:
      return state;
  }
};

export default { counter, cards, lists, boards };
