import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    const { toggleAssign, boardUsersData } = this.props;
    const { chosenUserId } = this.state;
    const usersList = Object.values(boardUsersData).map((userData, i) => (
      <option value={userData._id} key={i}>
        {userData.name}
      </option>
    ));

    return (
      <div className="user-picker">
        <label>Choose a user:</label>
        <select defaultValue={chosenUserId} onChange={this.handleChange}>
          <option value="">--Please choose an option--</option>
          {usersList}
        </select>
        <div className="user-picker-buttons">
          <button onClick={this.handleSave} className="user-picker-save-button">
            Save
          </button>
          <button onClick={toggleAssign}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardUsersData, cardsById } = state;
  const { assignedUserId } = cardsById[ownProps.cardId] || {};
  console.log(state);

  return { boardUsersData, assignedUserId };
};

export default connect(mapStateToProps)(UserPicker);
