const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardTitle, cardId } = action.payload;
      return { ...state, [cardId]: { title: cardTitle, _id: cardId } };
    }
    case "EDIT_CARD_TITLE": {
      const { cardTitle, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], title: cardTitle } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    case "EDIT_CARD_DATE": {
      const { date, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], date } };
    }
    case "EDIT_CARD_COLOR": {
      const { color, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], color } };
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

export default cardsById;
