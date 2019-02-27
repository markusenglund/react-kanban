const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId } = action.payload;
      return {
        ...state,
        [cardId]: { text: cardText, _id: cardId, comments: [] }
      };
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case "CHANGE_CARD_DATE": {
      const { date, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], date } };
    }
    case "CHANGE_CARD_COLOR": {
      const { color, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], color } };
    }
    case "ADD_COMMENT": {
      const { cardId, id: commentId } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          comments: [...(state[cardId].comments || []), commentId]
        }
      };
    }
    case "DELETE_COMMENT": {
      const { commentId: newCommentId, cardId } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          comments: state[cardId].comments.filter(
            commentId => commentId !== newCommentId
          )
        }
      };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it (actually unnecessary since they will be removed from db on next write anyway)
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
