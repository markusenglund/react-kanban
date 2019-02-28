const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId } = action.payload;
      return {
        ...state,
        [cardId]: { text: cardText, _id: cardId, comments: [], labels: [] }
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
    case "ADD_LABEL": {
      const { label, cardId } = action.payload;
      const cardLabels = state[cardId].labels || [];
      return {
        ...state,
        [cardId]: { ...state[cardId], labels: [...cardLabels, label] }
      };
    }
    case "DELETE_LABEL": {
      const { label, cardId } = action.payload;
      const cardLabels = state[cardId].labels || [];
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          labels: cardLabels.filter(currLabel => currLabel !== label)
        }
      };
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
    case "UPDATE_ASSIGNED_USER": {
      const { cardId, assignedUserId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], assignedUserId } };
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
