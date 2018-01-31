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
    .then(res => console.log(res));
};

export const deleteList = "hej";
