// @flow
import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import onClickOutside from "react-onclickoutside";

type Props = {
  newCardTitle: string,
  toggleCardComposer: () => void,
  handleSubmitCard: (event: SyntheticEvent<>) => void,
  handleCardComposerChange: (event: SyntheticEvent<>) => void,
  handleKeyDown: (event: SyntheticEvent<>) => void
};

class NewCardForm extends Component<Props> {
  handleClickOutside = () => {
    const { toggleCardComposer } = this.props;
    toggleCardComposer();
  };
  render = () => {
    const {
      handleSubmitCard,
      handleCardComposerChange,
      handleKeyDown,
      newCardTitle
    } = this.props;
    return (
      <form onSubmit={handleSubmitCard}>
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          minRows={3}
          onChange={handleCardComposerChange}
          onKeyDown={handleKeyDown}
          value={newCardTitle}
        />
        <input
          type="submit"
          value="Add"
          className="submit-card-button"
          disabled={newCardTitle === ""}
        />
      </form>
    );
  };
}

export default onClickOutside(NewCardForm);
