import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import "./UserPicker.scss";

class UserPicker extends Component {
  static propTypes = {
    toggleAssign: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      chosenUserId: props.assignedUserId
    };
  }

  componentDidMount() {
    this.setState({ chosenUserId: this.props.assignedUserId });
  }

  handleSave = () => {
    const { chosenUserId } = this.state;
    const { dispatch, cardId, toggleAssign } = this.props;

    dispatch({
      type: "UPDATE_ASSIGNED_USER",
      payload: { cardId, assignedUserId: chosenUserId }
    });

    toggleAssign();
  };

  handleChange = event => {
    this.setState({ chosenUserId: event.target.value });
  };

  render() {
    const { toggleAssign, boardUsersData, t } = this.props;
    const { chosenUserId } = this.state;
    const usersList = Object.values(boardUsersData).map((userData, i) => (
      <option value={userData._id} key={i}>
        {userData.name}
      </option>
    ));

    return (
      <div className="user-picker">
        <label>{t("Choose-User")}</label>
        <select defaultValue={chosenUserId} onChange={this.handleChange}>
          <option value="">{t("Choose-Option")}</option>
          {usersList}
        </select>
        <div className="user-picker-buttons">
          <button onClick={this.handleSave} className="user-picker-save-button">
            {t("Save")}
          </button>
          <button onClick={toggleAssign}>{t("Cancel")}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardUsersData, cardsById } = state;
  const { assignedUserId } = cardsById[ownProps.cardId] || {};

  return { boardUsersData, assignedUserId };
};

export default connect(mapStateToProps)(withTranslation()(UserPicker));
