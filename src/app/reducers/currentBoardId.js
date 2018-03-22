const currentBoardId = (state = null, action) => {
  switch (action.type) {
    case "PUT_BOARD_ID_IN_REDUX":
    case "ADD_BOARD": {
      return action.payload.boardId;
    }
    default:
      return state;
  }
};

export default currentBoardId;
