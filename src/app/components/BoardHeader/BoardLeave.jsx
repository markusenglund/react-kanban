import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { withTranslation } from "react-i18next";
import FaSignOut from "react-icons/lib/fa/sign-out";
import "./BoardLeave.scss";

class BoardLeave extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelection = () => {
    const { dispatch, match, user } = this.props;
    const { boardId } = match.params;

    dispatch({
      type: "REMOVE_USER",
      payload: { boardId, userIdToRemove: user._id }
    });
    document.location.href = "/";
  };

  render = () => {
    const { t } = this.props;
    return (
      <Wrapper
        className="board-leave-wrapper"
        onSelection={this.handleSelection}
      >
        <Button className="board-leave-button">
          <div className="modal-icon">
            <FaSignOut />
          </div>
          <div className="board-header-right-text">
            &nbsp;{t("BoardLeave.Leave")}
          </div>
        </Button>
        <Menu className="board-leave-menu">
          <div className="board-leave-header">{t("are_you_sure")}</div>
          <MenuItem className="board-leave-confirm">
            {t("BoardLeave.Leave")}
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  };
}
const mapStateToProps = state => ({ user: state.user });

export default withRouter(
  connect(mapStateToProps)(withTranslation()(BoardLeave))
);
