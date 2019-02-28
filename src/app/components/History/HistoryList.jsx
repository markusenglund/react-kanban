import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./HistoryList.scss";

class HistoryList extends Component {
  static propTypes = {};
  state = {
    history: []
  };

  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    fetch("/api/history/getByBoardId", {
      method: "POST",
      body: JSON.stringify({ id: boardId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(res => {
      if (res.status === 200) {
        res.json().then(history => {
          this.setState({ history });
        });
      }
    });
  }


  render() {
    const { history } = this.state;
    const { t } = this.props;
    return (
      <div id="history-list-container">
        <p id="title">{t("History")}</p>
        <div id="history-container">
          {history.map((historyItem, key) => (
            <div id="history-item" key={key}>
              <p>{historyItem.userId}</p>
              <p>{t(historyItem.action)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentBoardId: state.currentBoardId
});

export default withRouter(
  connect(mapStateToProps)(withTranslation()(HistoryList))
);
