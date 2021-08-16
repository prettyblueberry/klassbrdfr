import * as React from "react";
import { withTranslation } from 'react-i18next';
import {CircleProgress, HeaderTextSmall,} from "presentational";
import PropTypes from 'prop-types';
import "./LevelReadingMessagesSMS.scss";

class LevelReadingMessagesSMSComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getText(){
		const level = this.props.level;
		if(level <= 3){
			return this.$t("Low");
		}
		if(level > 3 && level <= 6){
			return this.$t("Medium");
		}
		if(level > 6){
			return this.$t("Hight");
		}
	}
	render() {
		return (
			<div className="level-reading-messages-sms">
				<HeaderTextSmall className="level-reading-messages-sms__h1" textJSX={this.$t("<b>Engagement level</b> for this message")}/>
				<div className="level-reading-messages-sms__statistic">
					<CircleProgress level={this.props.level}/>
				</div>
				<div className="level-reading-messages-sms__level">{this.getText()}</div>
				<div className="level-reading-messages-sms__h2">{(this.props.level !== 9) && this.$t("Mhhh…Several parents didn't open their SMS")}</div>
				<button className="level-reading-messages-sms__button">{this.$t("Send a reminder")}</button>
				<img className="level-reading-messages-sms__u1" src="/public/images/unicorn-3.svg"/>
				<img className="level-reading-messages-sms__u2" src="/public/images/unicorn-4.svg"/>
			</div>
		);
	}
}
LevelReadingMessagesSMSComponent.propTypes = {
	level: PropTypes.number.isRequired,
}
export const LevelReadingMessagesSMS = withTranslation()(LevelReadingMessagesSMSComponent)