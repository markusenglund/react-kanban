import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./BoardMenu.scss";
import FaAngleRight from "react-icons/lib/fa/angle-double-right";
import FaAngleLeft from "react-icons/lib/fa/angle-double-left";
import { timingSafeEqual } from "crypto";

class BoardMenu extends Component {

    state = {
        open: true,
        close: false
    }

    handleSelection = () => {
        this.setState({close: false})
        document.getElementById("sideNav").style.transition = "1s"
        document.getElementById("sideNav").style.width = "20.5%";
    };

    closeSideBar = () => {
        this.setState({open: false})
        document.getElementById("sideNav").style.transition = "1s"
        document.getElementById("sideNav").style.width = "0";
        document.getElementById("sideNav").addEventListener("transitionend", (event) => {
            this.setState({close: event.currentTarget.style.width == "0px" ? true : false, open: event.currentTarget.style.width != "0px" ? true : false})
        });
    }
    
    render() {
        return(
            <div style={{backgroundColor: "#f5f6f7",
            position: "fixed",
            right: "0%",
            top: "10%",
            width: "20.5%",
            height: "100%",
            padding: "0 6px 0 12px",}}
            ref="sideNav">
            <div>
                <h3 style={{textAlign: "center", color: "black"}}>Menu</h3>
                {this.state.open ? <FaAngleRight className="hamburger-button" style ={{position: "absolute", right:"3%", top: "1%", color: "black"}} onClick={this.closeSideBar}/> : null}
                {this.state.close ? <FaAngleLeft className="hamburger-button" style ={{position: "absolute", right:"95%", top: "0%", color: "black"}} onClick={this.handleSelection}/> : null}
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