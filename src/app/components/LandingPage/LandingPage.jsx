import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Title } from "react-head";
import { withTranslation } from "react-i18next";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
import background1920 from "../../../assets/images/postits-1920.jpg";
import background1366 from "../../../assets/images/postits-1366.jpg";
import "./LandingPage.scss";

class LandingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  enterAsGuest = () => {
    this.props.dispatch({ type: "ENTER_AS_GUEST" });
  };

  render = () => {
    const { t } = this.props;
    return (
      <div className="landing-page">
        <Title>
          {t("Sign-in")} | {t("project_name")}
        </Title>
        <div className="landing-page-background">
          <img
            srcSet={`${background1920} 1920w, ${background1366} 1366w`}
            src={background1920}
            alt="background"
          />
        </div>
        <div className="landing-page-info-wrapper">
          <div className="landing-page-info">
            <div className="landing-page-heading">
              <img
                src={kanbanLogo}
                alt="React Kanban logo"
                className="landing-page-logo"
              />
              &nbsp;
              <h1>React Kanban</h1>
            </div>
            <p className="landing-page-description">Awesome Kanban King</p>
            <div className="signin-buttons">
              <div>
                <form action="/auth/local" method="post">
                  <input type="text" name="username" />
                  <input type="password" name="password" />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default connect()(withTranslation()(LandingPage));
