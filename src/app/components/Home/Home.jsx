import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Title } from "react-head";
import { withTranslation } from "react-i18next";
import slugify from "slugify";
import classnames from "classnames";
import Header from "../Header/Header";
import BoardAdder from "./BoardAdder";
import "./Home.scss";

class Home extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    listsById: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  render = () => {
    const { boards, listsById, history, t } = this.props;
    return (
      <>
        <Title>
          {t("Home")} | {t("project_name")}
        </Title>
        <Header />
        <div className="home">
          <div className="main-content">
            <h1>{t("Home.boards")}</h1>
            <div className="boards">
              {boards.map(board => (
                <Link
                  key={board._id}
                  className={classnames("board-link", board.color)}
                  style={{backgroundImage: `url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x319/e29564dc62742097a4cb32dc259a383e/photo-1549989476-69a92fa57c36.jpg")`}}
                  to={`/b/${board._id}/${slugify(board.title, {
                    lower: true
                  })}`}
                >
                  <div className="board-link-title">{board.title}</div>
                  <div className="mini-board">
                    {board.lists.map(listId => (
                      <div
                        key={listId}
                        className="mini-list"
                        style={{
                          height: `${Math.min(
                            (listsById[listId].cards.length + 1) * 18,
                            100
                          )}%`
                        }}
                      />
                    ))}
                  </div>
                </Link>
              ))}
              <BoardAdder history={history} />
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({ boardsById, listsById }) => ({
  boards: Object.keys(boardsById).map(key => boardsById[key]),
  listsById
});

export default connect(mapStateToProps)(withTranslation()(Home));
