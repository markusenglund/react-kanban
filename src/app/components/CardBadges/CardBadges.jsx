import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import MdAlarm from "react-icons/lib/md/access-alarm";
import MdLabel from "react-icons/lib/md/label";
import MdDoneAll from "react-icons/lib/fa/check-square-o";
import FaUser from "react-icons/lib/fa/user";
import "./CardBadges.scss";
import { withTranslation } from "react-i18next";
import { colorsWithLabels } from "../utils";

class CardBadges extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    checkboxes: PropTypes.shape({
      total: PropTypes.number.isRequired,
      checked: PropTypes.number.isRequired
    }).isRequired,
    assignedToMe: PropTypes.bool,
    assignedUserName: PropTypes.string,
    labels: PropTypes.array
  };

  renderDueDate = () => {
    const { date } = this.props;
    if (!date) {
      return null;
    }
    const dueDateFromToday = differenceInCalendarDays(date, new Date());

    let dueDateString;
    if (dueDateFromToday < -1) {
      dueDateString = `${Math.abs(dueDateFromToday)} days ago`;
    } else if (dueDateFromToday === -1) {
      dueDateString = "Yesterday";
    } else if (dueDateFromToday === 0) {
      dueDateString = "Today";
    } else if (dueDateFromToday === 1) {
      dueDateString = "Tomorrow";
    } else {
      dueDateString = format(date, "D MMM");
    }

    let dueDateColor;
    if (dueDateFromToday < 0) {
      dueDateColor = "red";
    } else if (dueDateFromToday === 0) {
      dueDateColor = "#d60";
    } else {
      dueDateColor = "green";
    }

    return (
      <div className="badge" style={{ background: dueDateColor }}>
        <MdAlarm className="badge-icon" />
        &nbsp;
        {dueDateString}
      </div>
    );
  };

  // Render badge showing amoung of checkboxes that are checked
  renderTaskProgress = () => {
    const { total, checked } = this.props.checkboxes;
    if (total === 0) {
      return null;
    }
    return (
      <div
        className="badge"
        style={{ background: checked === total ? "green" : "#444" }}
      >
        <MdDoneAll className="badge-icon" />
        &nbsp;
        {checked}/{total}
      </div>
    );
  };

  renderAssigned = () => {
    const { assignedToMe, assignedUserName } = this.props;

    if (!assignedUserName) {
      return null;
    }

    return (
      <div
        className="badge"
        style={{ background: assignedToMe ? "green" : "#444" }}
      >
        <FaUser className="badge-icon" />
        &nbsp;
        {assignedUserName}
      </div>
    );
  };

  renderLabels = () => {
    const { labels, t } = this.props;
    const colorsWithLabelsMap = new Map(colorsWithLabels);
    console.log(colorsWithLabelsMap);

    if (!labels) {
      return null;
    }

    return labels.map(label => (
      <div
        key={label}
        className="badge"
        style={{ background: colorsWithLabelsMap.get(label) }}
      >
        <MdLabel className="badge-icon" />
        &nbsp;
        {t(`Labels.${label}`)}
      </div>
    ));
  };

  render() {
    return (
      <div className="card-badges">
        {this.renderDueDate()}
        {this.renderTaskProgress()}
        {this.renderAssigned()}
        {this.renderLabels()}
      </div>
    );
  }
}

export default connect()(withTranslation()(CardBadges));
