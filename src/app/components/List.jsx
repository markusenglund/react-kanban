import React, { Component } from "react";

class List extends Component {
  render = () => {
    const { list } = this.props;
    return (
      <div className="list">
        <span className="list-title">{list.title}</span>
      </div>
    );
  };
}

export default List;
