import shortid from "shortid";
import slugify from "slugify";
/* eslint-disable no-console */
export const addCard = (cardTitle, listId, boardId) => dispatch => {
  const cardId = shortid.generate();
  dispatch({
    type: "ADD_CARD",
    payload: { cardTitle, cardId, listId, boardId }
  });
};

export const editCardTitle = (cardTitle, cardId, list, boardId) => dispatch => {
  dispatch({
    type: "EDIT_CARD_TITLE",
    payload: {
      cardTitle,
      cardId,
      listId: list._id,
      boardId
    }
  });
};

export const deleteCard = (cardId, listId, boardId) => dispatch => {
  dispatch({ type: "DELETE_CARD", payload: { cardId, listId, boardId } });
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
      destinationIndex,
      boardId
    }
  });
};

export const addList = (listTitle, boardId) => dispatch => {
  const listId = shortid.generate();
  dispatch({
    type: "ADD_LIST",
    payload: { listTitle, listId, boardId }
  });
};

export const editListTitle = (listTitle, listId, boardId) => dispatch => {
  dispatch({
    type: "EDIT_LIST_TITLE",
    payload: {
      listTitle,
      listId,
      boardId
    }
  });
};

export const deleteList = (cards, listId, boardId) => dispatch => {
  dispatch({
    type: "DELETE_LIST",
    payload: { cards, listId, boardId }
  });
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
      destinationIndex,
      boardId: sourceId
    }
  });
};

export const addBoard = (boardTitle, history) => (dispatch, getState) => {
  const boardId = shortid.generate();
  const { user } = getState();
  dispatch({
    type: "ADD_BOARD",
    payload: { boardTitle, boardId, userId: user._id }
  });
  history.push(`/b/${boardId}/${slugify(boardTitle, { lower: true })}`);
};
