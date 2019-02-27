export function loadBoardUsersData(dispatch, ids) {
  fetch("/api/users/getByIds", {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  }).then(response => {
    if (response) {
      if (response.status === 200) {
        response.json().then(jsonData => {
          dispatch({
            type: "LOAD_BOARD_USERS_DATA",
            payload: jsonData
          });
        });
      }
    }
  });
}
