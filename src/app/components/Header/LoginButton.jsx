import React, { Component } from "react";
import FaSignOut from "react-icons/lib/fa/sign-out";
import FaSignIn from "react-icons/lib/fa/sign-in";
import { withTranslation } from "react-i18next";

class LoginButton extends Component {
  render() {
    const { user, t } = this.props;

    return user ? (
      <a className="signout-link" href="/auth/signout">
        <FaSignOut className="signout-icon" />
        &nbsp; {t("Sign-out")}
      </a>
    ) : (
      <a className="signout-link" href="/">
        <FaSignIn className="signout-icon" />
        &nbsp;{t("Sign-in")}
      </a>
    );
  }
}

export default withTranslation()(LoginButton);
