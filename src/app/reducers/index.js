import { combineReducers } from "redux";
import cardsById from "./cardsById";
import filteredCardsById from "./filteredCardsById";
import listsById from "./listsById";
import boardsById from "./boardsById";
import user from "./user";
import isGuest from "./isGuest";
import currFilter from "./currFilter";
import currentBoardId from "./currentBoardId";
import currentCardId from "./currentCardId";
import commentsById from "./commentsById";
import boardUsersData from "./boardUsersData";

export default combineReducers({
  cardsById,
  filteredCardsById,
  listsById,
  boardsById,
  user,
  isGuest,
  currentBoardId,
  currentCardId,
  commentsById,
  currFilter,
  boardUsersData
});
