import * as React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { withTranslation } from 'react-i18next';
import "./ClassItemSmall.scss";

class ClassItemSmallComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
  }
  getClass() {
    return this.props.classroom;
  }
	render() {
    if(this.getClass()) {
      return (
        <div style={this.props.style || {}} className="class-item-small">
          <div className="class-item-small__icon">
            <img src="/public/pages/addClass/class-icon-blue.svg"/>
          </div>
          <div className="class-item-small__data">
            <div className="class-item-small__name">{this.getClass().name}</div>
            <div className="class-item-small__managed"><span>{this.$t("Managed by")}</span> {this.getClass().teacher}</div>
            {this.getClass().externalID && <div className="class-item-small__id"><span>{this.$t("Internal ID")}:</span> {this.getClass().externalID}</div>}
          </div>
          <div className="class-item-small__counts">
            <div className="class-item-small__count">{this.getClass().students_count}</div>
            <div className="class-item-small__students">{this.$t("Students")}</div>
          </div>
        </div>
      )
    }
    return null;
  }
}
ClassItemSmallComponent.propTypes = {
  classData: PropTypes.object,
  style: PropTypes.object,
}

export const ClassItemSmall = withTranslation()(ClassItemSmallComponent);
