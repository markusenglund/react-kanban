const commentsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT": {
      const { commentText, user, id: commentId } = action.payload;
      return {
        ...state,
        [commentId]: {
          text: commentText,
          user,
          date: new Date().toString(),
          _id: commentId
        }
      };
    }

    case "DELETE_COMMENT": {
      const { commentId } = action.payload;
      const { [commentId]: deletedComment, ...restOfComments } = state;
      return restOfComments;
    }

    default:
      return state;
  }
};

export default commentsById;
