const userChangeMiddleware = store => next => action => {
    next(action);
    const {
        user,
        currentBoardId: boardId,
        boardsById
      } = store.getState();

    if (user) {
        if (['UPDATE_ASSIGNED_USER', 'ADD_USER','REMOVE_USER','CHANGE_USER_ROLE'].includes(action.type)){
            switch (action.type){
                case "UPDATE_ASSIGNED_USER": {
                    let {assignedUserId} = action.payload;
                    const {title} = boardsById[boardId];
                    postWithParams(assignedUserId, boardId,action.type,title)
                }
                case 'ADD_USER': {
                    let{userToAdd} = action.payload;
                    const {title} = boardsById[boardId];
                    postWithParams(userToAdd.id, boardId, action.type,title);
                }
                case 'REMOVE_USER': {
                    let{userIdToRemove: userId} = action.payload;
                    const {title} = boardsById[boardId];
                    postWithParams(userId, boardId, action.type,title);
                }
                case 'CHANGE_USER_ROLE': {
                    let{userId} = action.payload;
                    const {title} = boardsById[boardId];
                    postWithParams(userId, boardId, action.type,title);
                }
            }
        }   
    }
};

function postWithParams(userId,boardId,action, title){
    fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify({userId,boardId,action,title}),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
}

export default userChangeMiddleware;