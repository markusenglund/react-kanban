import { denormalize, schema } from "normalizr";

// Persist the board to the database after almost every action.
const historyMiddleware = store => next => action => {
    next(action);
    const {
        user,
        currentBoardId: boardId
      } = store.getState();

    if (user) {
        if (!['PUT_BOARD_ID_IN_REDUX', 'UPDATE_FILTER','CHANGE_CARD_FILTER', 'LOAD_BOARD_USERS_DATA','SET_CURRENT_CARD',].includes(action.type)){
            fetch("/api/history", {
                method: "POST",
                body: JSON.stringify({userId: user._id,boardId,action: action.type}),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
              })
        }   
    }
};

export default historyMiddleware;