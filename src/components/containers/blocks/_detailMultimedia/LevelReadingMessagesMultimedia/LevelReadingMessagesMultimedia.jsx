import * as React from "react";
import { withTranslation } from 'react-i18next';
import {CircleProgress, HeaderTextSmall,} from "presentational";
import PropTypes from 'prop-types';
import "./LevelReadingMessagesMultimedia.scss";

class LevelReadingMessagesMultimediaComponent extends React.Component {
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
			<div className="level-reading-messages-multimedia">
				<HeaderTextSmall className="level-reading-messages-multimedia__h1" textJSX={this.$t("<b>Engagement level</b> for this message")}/>
				<div className="level-reading-messages-multimedia__statistic">
					<CircleProgress level={this.props.level}/>
				</div>
				<div className="level-reading-messages-multimedia__level">{this.getText()}</div>
				<div className="level-reading-messages-multimedia__h2">{(this.props.level !== 9) && this.$t("Mhhh…Several parents didn't see your message")}</div>
				<button className="level-reading-messages-multimedia__button">{this.$t("Optimize my message")}</button>
				<img className="level-reading-messages-multimedia__u1" src="/public/images/unicorn-3.svg"/>
				<img className="level-reading-messages-multimedia__u2" src="/public/images/unicorn-4.svg"/>
			</div>
		);
	}
}
LevelReadingMessagesMultimediaComponent.propTypes = {
	level: PropTypes.number.isRequired,
}
export const LevelReadingMessagesMultimedia = withTranslation()(LevelReadingMessagesMultimediaComponent)