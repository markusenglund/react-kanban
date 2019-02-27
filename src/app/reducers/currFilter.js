const currFilter = (state = "", action) => {
    switch (action.type) {
      case "CHANGE_CARD_FILTER": {
        return action.payload;
      }
      default:
        return state;
    }
  };
  
  export default currFilter;
  