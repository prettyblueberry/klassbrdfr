import * as React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { withTranslation } from 'react-i18next';
import "./ClassItemSmallClassRoom.scss";

class ClassItemSmallClassRoomComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
  }
  getClass() {
    return this.props.classData;
  }
	render() {
    if(this.getClass()) {
      return (
        <div style={this.props.style || {}} className="class-item-small-class-room">
          <div className="class-item-small-class-room__icon">
            <img src="/public/pages/addClass/class-icon-blue.svg"/>
          </div>
          <div className="class-item-small-class-room__data">
            <div className="class-item-small-class-room__name">{this.getClass().natural_name}</div>
            <div className="class-item-small-class-room__managed"><span>{this.$t("Managed by")}</span> {this.getClass().ownerDisplayName()}</div>
            <div className="class-item-small-class-room__id"><span>{this.$t("Class Key")}:</span> {this.getClass().key}</div>
          </div>
          <div className="class-item-small-class-room__counts">
          </div>
        </div>
      )
    }
    return null;
  }
}
ClassItemSmallClassRoomComponent.propTypes = {
  classData: PropTypes.object.isRequired,
  style: PropTypes.object,
}

export const ClassItemSmallClassRoom = withTranslation()(ClassItemSmallClassRoomComponent);
