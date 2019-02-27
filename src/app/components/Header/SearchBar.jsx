import React from "react";
import { connect } from "react-redux";
import SearchIcon from "../../../assets/images/search_icon.svg";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const cardsById = this.props.cardsById;

    this.props.dispatch({
      type: "CHANGE_CARD_FILTER",
      payload: this.props.currFilter
    });
  }

  render() {
    const styles = {
      container: {
        display: "flex",
        alignItems: "center",
        padding: 4,
        background: "#fbfbfb",
        borderRadius: 3
      },
      text: {
        display: "flex",
        background: "transparent",
        border: "none",
        outline: "none"
      },
      icon: {
        height: "25px"
      }
    };

    return (
      <div style={styles.container}>
        <input placeholder="Search something..." style={styles.text} onChange={this._onChangeText} value={this.props.currFilter}/>
        <img style={styles.icon} src={SearchIcon} />
      </div>
    );
  }

  _onChangeText = e => {
    const text = e.target.value;
    this.props.dispatch({
      type: "CHANGE_CARD_FILTER",
      payload: text
    });
  };
}

const mapStateToProps = state => {
  return { cardsById: state.cardsById, currFilter: state.currFilter};
};

export default connect(mapStateToProps)(SearchBar);
