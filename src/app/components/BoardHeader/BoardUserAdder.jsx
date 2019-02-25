import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./BoardTitle.scss";

class BoardUserAdd extends Component {
  static propTypes = {
    boardTitle: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newUser: null,
      userSearchField: "add user..."
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = event => {
    this.setState({ userSearchField: event.target.value });
    // let userSearchField= event.target.value;
    // fetch("/api/userRegex", {
    //     method: "POST",
    //     body: JSON.stringify({ userSearchField }),
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include"
    //   }).then(response=>{
    //       if(response){
    //         if(response.status === 200){
    //             response.json().then(users=>{
    //                 this.setState({ userSearchField: users[0] });
    //             })
    //         }
    //       }
    //   })
  };

  submitTitle = () => {
    const { dispatch, boardId } = this.props;
    const { userSearchField } = this.state;
    if (userSearchField === "" || userSearchField === "add user...") return;
    fetch("/api/userId", {
        method: "POST",
        body: JSON.stringify({ userSearchField }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(response=>{
          if(response){
              if(response.status==200){
                  response.json().then(userId=>{
                    dispatch({
                        type: "ADD_USER",
                        payload: {
                            boardId,
                            userToAdd: {userId, role: 'admin'} // TODO: Get role from UI
                        }
                      });
                  })
              }
          }
      });
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ userSearchField: "add user...", isOpen: false });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitTitle();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleFocus = event => {
    event.target.select();
  };

  render() {
    const { isOpen, userSearchField } = this.state;
    const { boardTitle } = this.props;
    return isOpen ? (
      <input
        autoFocus
        value={userSearchField}
        type="text"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.revertTitle}
        onFocus={this.handleFocus}
        className="board-title-input"
        spellCheck={false}
      />
    ) : (
      <button className="board-title-button" onClick={this.handleClick}>
        <h1 className="board-title-text">{userSearchField}</h1>
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(BoardUserAdd));
