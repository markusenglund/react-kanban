const currentCardId = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_CARD": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default currentCardId;
