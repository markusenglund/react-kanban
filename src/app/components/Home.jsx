// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import slugify from "slugify";
import "./Home.scss";

type Props = {
  boards: Array<{ title: string, _id: string }>
};

class Home extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isBoardAdderOpen: false
    };
  }

  openBoardAdder = () => {
    this.setState({ isBoardAdderOpen: true });
  };

  render = () => {
    const { boards } = this.props;
    const { isBoardAdderOpen } = this.state;
    return (
      <div className="home">
        <Helmet>
          <title>Home | Trello</title>
        </Helmet>
        <div className="boards">
          <h1>My boards</h1>
          {boards.map(board => (
            <Link
              key={board._id}
              className="board-link"
              to={`/b/${board._id}/${slugify(board.title, { lower: true })}`}
            >
              {board.title}
            </Link>
          ))}
          {isBoardAdderOpen ? (
            <div>Board adder!</div>
          ) : (
            <button
              onClick={this.openBoardAdder}
              className="create-board-button"
            >
              Create a new board...
            </button>
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
