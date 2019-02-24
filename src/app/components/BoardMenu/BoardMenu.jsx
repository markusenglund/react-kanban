import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BoardMenu.scss";
import FaTrash from "react-icons/lib/fa/trash";

class BoardMenu extends Component {

    render() {
        return(
            <div style={{backgroundColor: "#f5f6f7",
            position: "fixed",
            right: "0%",
            top: "10%",
            width: "20.5%",
            height: "100%",
            padding: "0 6px 0 12px"}}
            id="sideNav">
            <div>
                <h3 style={{textAlign: "center" }}>Menu</h3>
                <FaTrash style ={{position: "absolute", right:"3%", top: "2%"}} onClick={(e) => {document.getElementById("sideNav").style.display = "none"}}/>
            </div>
            <hr style={{
            margin: 0,
            backgroundColor: "rgba(9,45,66,.13)",
            border: 0,
            height: "1px",
            margin: "16px 0",
            padding: 0,
            width: "100%"}}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { board } = ownProps;
    return {

    };
};
  
export default connect(mapStateToProps)(BoardMenu);  