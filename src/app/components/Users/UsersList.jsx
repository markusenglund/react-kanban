import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./UsersList.scss";

class UsersList extends Component {

    state = {
    }
    
    render() {
        return(
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { board } = ownProps;
    return {

    };
};
  
export default connect(mapStateToProps)(UsersList); 