// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import slugify from "slugify";
import shortid from "shortid";
import Header from "./Header";
import ClickOutside from "./ClickOutside";
import "./Home.scss";

type Props = {
  boards: Array<{ title: string, _id: string }>,
  userId: string,
  dispatch: ({ type: string }) => void,
  history: { push: ({ type: string }) => void }
};

class Home extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isBoardAdderOpen: false,
      newBoardTitle: ""
    };
  }

  toggleBoardAdder = () => {
    this.setState({ isBoardAdderOpen: !this.state.isBoardAdderOpen });
  };

  handleBoardTitleChange = event => {
    this.setState({ newBoardTitle: event.target.value });
  };

  handleSubmitBoard = event => {
    event.preventDefault();
    const { newBoardTitle } = this.state;
    if (newBoardTitle === "") {
      return;
    }
    const { dispatch, history, userId } = this.props;
    const boardId = shortid.generate();
    dispatch({
      type: "ADD_BOARD",
      payload: {
        boardTitle: newBoardTitle,
        boardId,
        userId
      }
    });
    history.push(`/b/${boardId}/${slugify(newBoardTitle, { lower: true })}`);

    // Dispatch action to put new empty board in redux store and in db + push history to the board
    this.setState({ isBoardAdderOpen: false, newBoardTitle: "" });
  };

  render = () => {
    const { boards } = this.props;
    const { isBoardAdderOpen, newBoardTitle } = this.state;
    return (
      <>
        <Header />
        <div className="home">
          <Helmet>
            <title>Home | Trello</title>
          </Helmet>
          <div className="main-content">
            <h1>My boards</h1>
            <div className="boards">
              {boards.map(board => (
                <Link
                  key={board._id}
                  className="board-link"
                  to={`/b/${board._id}/${slugify(board.title, {
                    lower: true
                  })}`}
                >
                  {board.title}
                </Link>
              ))}
              {isBoardAdderOpen ? (
                <ClickOutside handleClickOutside={this.toggleBoardAdder}>
                  <form
                    onSubmit={this.handleSubmitBoard}
                    className="board-adder"
                  >
                    <input
                      autoFocus
                      className="submit-board-input"
                      type="text"
                      value={newBoardTitle}
                      onChange={this.handleBoardTitleChange}
                    />
                    <input
                      type="submit"
                      value="Create board"
                      className="submit-board-button"
                      disabled={newBoardTitle === ""}
                    />
                  </form>
                </ClickOutside>
              ) : (
                <button
                  onClick={this.toggleBoardAdder}
                  className="create-board-button"
                >
                  Create a new board...
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById),
  userId: state.user._id
});

export default connect(mapStateToProps)(Home);
