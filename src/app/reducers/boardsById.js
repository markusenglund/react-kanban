import { ADMIN_ROLE } from '../../constants';

const boardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { boardId, listId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...state[boardId].lists, listId]
        }
      };
    }
    case "ADD_USER": {
      const {boardId, userToAdd} = action.payload;
      return {
        ...state,
        [boardId] : {
          ...state[boardId],
          users: [...state[boardId]["users"], userToAdd]
        }
      }
    }
    case "CHANGE_USER_ROLE" : {
      const {boardId, userId, role} = action.payload;
      
      // Finds the user (by userId) and change only it's role
      const newUsers = state[boardId].users.map(user => user.id === userId ? {...user, role} : user);
      
      return {
        ...state,
        [boardId] : {
          ...state[boardId],
          users: newUsers
        }
      }
    }
    case "REMOVE_USER": {
      const {boardId, userIdToRemove} = action.payload;
      const newUsers = state[boardId].users.filter(user => user.id !== userIdToRemove);

      return {
        ...state,
        [boardId] : {
          ...state[boardId],
          users: newUsers
        }
      }
    }
    case "MOVE_LIST": {
      let  { oldListIndex, newListIndex, boardId } = action.payload;
      oldListIndex = state[boardId].lists.length - 1 - oldListIndex;
      newListIndex = state[boardId].lists.length - 1 - newListIndex;
      const newLists = Array.from(state[boardId].lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return {
        ...state,
        [boardId]: { ...state[boardId], lists: newLists }
      };
    }
    case "DELETE_LIST": {
      const { listId: newListId, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter(listId => listId !== newListId)
        }
      };
    }
    case "ADD_BOARD": {
      const { boardTitle, boardId, userId } = action.payload;
      return {
        ...state,
        [boardId]: {
          _id: boardId,
          title: boardTitle,
          lists: [],
          users: [{id: userId, role: ADMIN_ROLE}],
          color: "blue"
        }
      };
    }
    case "CHANGE_BOARD_TITLE": {
      const { boardTitle, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          title: boardTitle
        }
      };
    }
    case "CHANGE_BOARD_COLOR": {
      const { boardId, color } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          color
        }
      };
    }
    case "DELETE_BOARD": {
      const { boardId } = action.payload;
      const { [boardId]: deletedBoard, ...restOfBoards } = state;
      return restOfBoards;
    }
    default:
      return state;
  }
};

export default boardsById;
