// @flow
import React, { Component } from "react";

type Props = {
  list: {
    title: string,
    cards: Array<{ title: string }>
  }
};

class List extends Component<Props> {
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
