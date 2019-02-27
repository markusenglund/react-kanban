const boardUsersData = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_BOARD_USERS_DATA":
      return { ...action.payload };
    default:
      return state;
  }
};

export default boardUsersData;
