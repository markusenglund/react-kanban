import axios from "axios";
import shortid from "shortid";

export const addList = (listTitle, boardId) => (dispatch, getState) => {
  const listId = shortid.generate();
  dispatch({
    type: "ADD_LIST",
    payload: { listTitle, listId, boardId }
  });
  const { boardsById } = getState();
  const listIndex = boardsById[boardId].lists.length - 1;
  console.log(listIndex);
  axios
    .post("/api/list", { listTitle, listId, listIndex, boardId })
    .then(({ data }) => console.log(data));
};

export const deleteList = "hej";
