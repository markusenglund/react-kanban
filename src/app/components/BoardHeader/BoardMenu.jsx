import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BoardMenu.scss";
import FaAngleRight from "react-icons/lib/fa/angle-double-right";
import FaAngleLeft from "react-icons/lib/fa/angle-double-left";
import UsersList from "../Users/UsersList";
import { timingSafeEqual } from "crypto";

class BoardMenu extends Component {
  state = {
    open: true,
  };

  openSideBar = () => {
    this.setState({ open: true });
    this.refs.sideNav.style.position = "absolute";
    this.refs.sideNav.style.transition = "width 1s";
    this.refs.sideNav.style.width = "339px";
    this.refs.sideNav.style.display = "block";
   // document.getElementById("lists").style.marginLeft = "339px";
    this.setState({ open: true });
  };

  closeSideBar = () => {
    this.setState({ open: false });
    // document.getElementById("lists").style.marginLeft = "0px";
    this.refs.sideNav.style.transition = "width 1s";
    this.refs.sideNav.style.position = "absolute";
    this.refs.sideNav.style.width = "0px";
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "rgb(245, 246, 247)",
            width: "339px",
            transition: "all 1s ease 1s",
            bottom: "0%",
            position: "absolute",
            borderTopRightRadius: "6px",
            left: "0px",
            top: "8%"
          }}
          ref="sideNav"
        >
          <div>
            <h3 style={{ textAlign: "center", color: "black" }}>Menu</h3>
            {this.state.open ? (
              <FaAngleLeft
                className="hamburger-button"
                style={{
                  position: "absolute",
                  right: "0%",
                  top: "1.5%",
                  color: "black"
                }}
                onClick={this.closeSideBar}
              />
            ) : null}
          </div>
          <hr
            style={{
              backgroundColor: "rgba(9,45,66,.13)",
              border: 0,
              height: "1px",
              margin: "16px 0",
              padding: 0,
              width: "100%"
            }}
          />
          <UsersList />
        </div>
        {!this.state.open ? (
          <FaAngleRight
            className="hamburger-button"
            style={{
              position: "absolute",
              left: "0%",
              top: "9.5%",
              color: "black"
            }}
            onClick={this.openSideBar}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { board } = ownProps;
  return {};
};

export default connect(mapStateToProps)(BoardMenu);
