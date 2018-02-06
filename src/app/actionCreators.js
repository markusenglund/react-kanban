import axios from "axios";
import shortid from "shortid";

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

export const editCardTitle = (cardTitle, cardId, list, boardId) => dispatch => {
  dispatch({
    type: "EDIT_CARD_TITLE",
    payload: {
      cardTitle,
      cardId,
      listId: list._id
    }
  });

  const cardIndex = list.cards.indexOf(cardId);
  axios
    .put("/api/card", { cardTitle, cardIndex, listId: list._id, boardId })
    .then(({ data }) => console.log(data));
};

export const deleteCard = (cardId, listId, boardId) => dispatch => {
  dispatch({ type: "DELETE_CARD", payload: { cardId, listId } });
  axios
    .delete("/api/card", { data: { cardId, listId, boardId } })
    .then(({ data }) => console.log(data));
};

export const reorderList = (
  cardId,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex,
  boardId
) => dispatch => {
  dispatch({
    type: "REORDER_LIST",
    payload: {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    }
  });

  axios
    .put("/api/reorder-list", {
      cardId,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
      boardId
    })
    .then(({ data }) => console.log(data));
};

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

export const reorderBoard = (
  listId,
  sourceId,
  sourceIndex,
  destinationIndex
) => dispatch => {
  dispatch({
    type: "REORDER_BOARD",
    payload: {
      sourceId,
      sourceIndex,
      destinationIndex
    }
  });

  axios
    .put("/api/reorder-board", {
      listId,
      sourceId,
      sourceIndex,
      destinationIndex
    })
    .then(({ data }) => console.log(data));
};
