const userChangeMiddleware = store => next => action => {
  next(action);
  const { user, currentBoardId: boardId } = store.getState();

  if (user) {
    if (
      [
        "UPDATE_ASSIGNED_USER",
        "ADD_USER",
        "REMOVE_USER",
        "CHANGE_USER_ROLE"
      ].includes(action.type)
    ) {
      switch (action.type) {
        case "UPDATE_ASSIGNED_USER": {
          let { assignedUserId } = action.payload;
          postWithParams(assignedUserId, boardId, action.type);
          break;
        }
        case "ADD_USER": {
          let { userToAdd: user } = action.payload;
          postWithParams(user.id, boardId, action.payload);
          break;
        }
        case "REMOVE_USER": {
          let { userIdToRemove: userId } = action.payload;
          postWithParams(userId, boardId, action.payload);
          break;
        }
        case "CHANGE_USER_ROLE": {
          let { userId } = action.payload;
          postWithParams(userId, boardId, action.payload);
          break;
        }
      }
    }
  }
};

function postWithParams(userId, boardId, action) {
  fetch("/api/notifications", {
    method: "POST",
    body: JSON.stringify({ userId, boardId, action }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
}

export default userChangeMiddleware;
