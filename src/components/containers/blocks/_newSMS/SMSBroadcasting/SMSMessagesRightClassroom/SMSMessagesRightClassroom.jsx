import * as React from "react";
import { withTranslation } from 'react-i18next';
import {RoundIconMiddle} from "../../../../../presentational";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SMSMessagesRightClassroom.scss";

class SMSMessagesRightClassroomComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderCheck() {
		if(this.props.checked) {
			return <div className="sms-messages-right__checked">
				<div className="icon klassicon-check"></div>
			</div>
		}
		return null;
	}
	getClassRoot() {
		let classes = {
			"sms-messages-right": true,
		}
		if(this.props.checked) {
			classes["sms-messages-right-checked"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={this.getClassRoot()}>

				<div className="sms-messages-right__icon">
					<RoundIconMiddle color="purple" icon="multimedia-campaign"/>
				</div>

				<div className="sms-messages-right__text">
					<div className="sms-messages-right__h1" dangerouslySetInnerHTML={{__html: this.$t("Klassroom message")}}></div>
					<div className="sms-messages-right__h2"><div className="icon klassicon-back"></div> CE2 B</div>
				</div>

			</div>
		);
	}
}
SMSMessagesRightClassroomComponent.propTypes = {
}
export const SMSMessagesRightClassroom = withTranslation()(SMSMessagesRightClassroomComponent)