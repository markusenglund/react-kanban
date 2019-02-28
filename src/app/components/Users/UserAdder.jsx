import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import AsyncSelect from "react-select/lib/Async";
import { DEFAULT_ROLE } from "../../../constants";
import { loadBoardUsersData } from "../../actions/boardActions";

class UserAdder extends Component {
  state = { selectedUserId: null };

  addUser = () => {
    const { dispatch, boardId, users, toggleModal } = this.props;
    const { selectedUserId } = this.state;

    dispatch({
      type: "ADD_USER",
      payload: {
        boardId,
        userToAdd: { id: selectedUserId, role: DEFAULT_ROLE }
      }
    });
    const newUserIds = new Set([...users.map(user => user.id), selectedUserId]);

    loadBoardUsersData(dispatch, Array.from(newUserIds));
    toggleModal();
  };
  searchUsers = inputValue => {
    if (!inputValue.trim()) {
      return;
    }

    return new Promise((resolve, reject) => {
      fetch("/api/userRegex", {
        method: "POST",
        body: JSON.stringify({ userSearchField: inputValue }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(response => {
        if (response && response.status === 200) {
          response.json().then(jsonData => {
            resolve(jsonData);
          });
        } else {
          reject();
        }
      });
    }).catch(() => reject());
  };

  handleChange = ({ value }) => {
    this.setState({ selectedUserId: value });
  };

  render() {
    const { toggleModal, t } = this.props;

    return (
      <div>
        <AsyncSelect
          onChange={this.handleChange}
          isSearchable={true}
          autoFocus={true}
          loadOptions={this.searchUsers}
          placeholder={t("UserAdder.search_place_holder")}
        />
        <div className="user-picker-buttons">
          <button className="user-picker-save-button" onClick={this.addUser}>
            {t("Save")}
          </button>
          <button onClick={toggleModal}>{t("Cancel")}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentBoardId } = state;

  return {
    boardId: currentBoardId,
    users: state.boardsById[currentBoardId].users
  };
};

export default connect(mapStateToProps)(withTranslation()(UserAdder));
