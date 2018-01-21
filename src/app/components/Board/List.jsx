// @flow
import React, { Component } from "react";

type Props = {
  list: {
    title: string,
    cards: Array<{ title: string, id: string }>
  }
};

class List extends Component<Props> {
  render = () => {
    const { list } = this.props;
    return (
      <div className="list">
        <div className="list-title">{list.title}</div>
        {list.cards.map(card => (
          <div key={card.id} className="card-title">
            {card.title}
          </div>
        ))}
      </div>
    );
  };
}

export default List;
