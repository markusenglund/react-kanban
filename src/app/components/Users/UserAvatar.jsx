import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { loadBoardUsersData } from "../../actions/boardActions";
import "./UsersList.scss";

const COLORS = ["red", "orange", "green", "blue", "purple", "black"];

class UserAvatar extends Component {
  handleSelection = () => {
    const { dispatch, user, currentBoardId, boardUsers } = this.props;

    dispatch({
      type: "REMOVE_USER",
      payload: { boardId: currentBoardId, userIdToRemove: user._id }
    });

    const newUserIds = new Set([
      ...(boardUsers || [])
        .map(curUser => curUser.id)
        .filter(userId => userId !== user._id)
    ]);

    loadBoardUsersData(dispatch, Array.from(newUserIds));
  };

  render() {
    const { user, t, isCurrentUserAdmin, currentUser } = this.props;

    const words = user.name.split(" ");
    const randomStyle = {
      background: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    const deleteButton = (
      <div>
        <div className="board-leave-header">{t("are_you_sure")}</div>
        <MenuItem className="board-leave-confirm">{t("Delete")}</MenuItem>
      </div>
    );

    return (
      <div>
        <Wrapper
          className="board-leave-wrapper"
          onSelection={this.handleSelection}
        >
          <Button>
            <span className="dot" style={randomStyle} data-tip={user.name}>
              {words[0][0]}
              {words.length > 1 && words[words.length - 1][0]}
            </span>
          </Button>

          <ReactTooltip />

          <Menu className="board-leave-menu">
            {isCurrentUserAdmin && currentUser._id !== user._id && deleteButton}
          </Menu>
        </Wrapper>
      </div>
    );
  }
}

export default connect()(withTranslation()(UserAvatar));
