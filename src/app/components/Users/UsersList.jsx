import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Modal from "react-modal";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { ADMIN_ROLE } from "../../../constants";
import UserAdder from "./UserAdder";
import UserAvatar from "./UserAvatar";
import "./UsersList.scss";

class UsersList extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };
  state = { isModalOpen: false };

  isCurrentUserAdmin = () => {
    const { boardUsers, user } = this.props;
    const currentUserBoardData = boardUsers.find(
      curUser => curUser.id === user._id
    );
    return (currentUserBoardData || {}).role === ADMIN_ROLE;
  };

  _usersNames = () => {
    const { users, currentBoardId, boardUsers, user } = this.props;
    const currentUser = user;
    const isCurrentUserAdmin = this.isCurrentUserAdmin();

    return Object.values(users).map((user, i) => {
      return (
        <UserAvatar
          user={user}
          currentBoardId={currentBoardId}
          boardUsers={boardUsers}
          isCurrentUserAdmin={isCurrentUserAdmin}
          currentUser={currentUser}
          key={i}
        />
      );
    });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { t } = this.props;
    const { isModalOpen } = this.state;
    const window = window;
    const modalStyle = {
      content: {
        background: "white",
        padding: 5,
        borderRadius: 4
      }
    };

    return (
      <div className="user-list-wrapper">
        <h4>{t("UsersList.title")}</h4>
        <div className="name-holder">
          {this._usersNames()}
          {this.isCurrentUserAdmin() && (
            <div>
              <span
                onClick={this.toggleModal}
                data-tip={t("UsersList.add_user_tip")}
                className="dot add-user"
              >
                +
              </span>
              <ReactTooltip />
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.toggleModal}
          overlayClassName="modal-underlay"
          className="user-add-modal"
          style={modalStyle}
        >
          <UserAdder toggleModal={this.toggleModal} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.boardUsersData,
    currentBoardId: state.currentBoardId,
    boardUsers: (state.boardsById[state.currentBoardId] || {}).users || []
  };
};

export default connect(mapStateToProps)(withTranslation()(UsersList));
