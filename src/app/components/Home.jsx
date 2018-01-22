import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import gandalfGif from "../assets/gandalf.gif";

class Home extends Component {
  render = () => {
    const { boards } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home | Trello</title>
        </Helmet>
        <img src={gandalfGif} alt="laughing gandalf" />
        {boards.map(board => (
          <Link key={board.id} to={`/b/${board.id}`}>
            {board.title}
          </Link>
        ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boards)
});

export default connect(mapStateToProps)(Home);
