import axios from "axios";
import shortid from "shortid";

export const addList = (listTitle, boardId) => dispatch => {
  const listId = shortid.generate();
  dispatch({
    type: "ADD_LIST",
    payload: { listTitle, listId, boardId }
  });

  axios
    .post("/api/list", { listTitle, listId, boardId })
    .then(({ data }) => console.log(data));
};

export const addCard = (cardTitle, listId, boardId) => dispatch => {
  const cardId = shortid.generate();
  dispatch({
    type: "ADD_CARD",
    payload: { cardTitle, cardId, listId }
  });

  axios
    .post("/api/card", { cardTitle, cardId, listId, boardId })
    .then(({ data }) => console.log(data));
};
