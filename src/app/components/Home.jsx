// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import slugify from "slugify";
import gandalfGif from "../assets/gandalf.gif";

type Props = {
  boards: Array<{ title: string, id: string }>
};

class Home extends Component<Props> {
  render = () => {
    const { boards } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home | Trello</title>
        </Helmet>
        <img src={gandalfGif} alt="laughing gandalf" />
        {boards.map(board => (
          <Link
            key={board.id}
            to={`/b/${board.id}/${slugify(board.title, { lower: true })}`}
          >
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
