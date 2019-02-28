import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./HistoryList.scss";

class HistoryList extends Component {
    state = {
        history: []
    }

    componentWillMount() { 
        fetch("/api/history/getByBoardId", {
            method: "POST",
            body: JSON.stringify({id:this.props.currentBoardId}),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          }).then(res=>{
              if(res.status===200){
                  res.json().then(history=>{
                      this.history = history;
                  })
              }
          })
    }

    userId
:
"2"
boardId
:
"SyHPq4NI4"
action
:
"ADD_BOARD"
    
    render() {
        return(
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { currentBoardId } = state;
};
  
export default connect(mapStateToProps)(HistoryList); 