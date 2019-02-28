import React from "react";
import { connect } from "react-redux";
import {IconButton,Popover,Pane,Text,Position} from 'evergreen-ui'

class Notification extends React.Component {
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
        background: "transparent",
        border: "none",
        outline: "none"
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
        <Popover
        position={Position.BOTTOM_RIGHT}
  content={
    <Pane
      width={240}
      height={240}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text>PopoverContent</Text>
    </Pane>
  }
>
<IconButton
        classNamestring="no-box-shadow"
        isActive={false}
        appearance="minimal"
        height={24}
        icon="notifications"
      />
</Popover>
       
      </div>
    );
  }

}

const mapStateToProps = state => {
  return { cardsById: state.cardsById, currFilter: state.currFilter};
};

export default connect(mapStateToProps)(Notification);
