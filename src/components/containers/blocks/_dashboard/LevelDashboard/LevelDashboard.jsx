import * as React from "react";
import { withTranslation } from 'react-i18next';
import {CircleProgress, HeaderTextSmall,} from "presentational";
import PropTypes from 'prop-types';
import "./LevelDashboard.scss";

class LevelDashboardComponent extends React.Component {
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
		return null;
		return (
			<div className="level-dashboard">
				<HeaderTextSmall className="level-dashboard__h1" textJSX={this.$t("Your Dashboard Level")}/>
				<div className="level-dashboard__statistic">
					<CircleProgress level={this.props.level}/>
				</div>
				<div className="level-dashboard__level">{this.getText()}</div>
				<button className="level-dashboard__button">{this.$t("How to improve my rating?")}</button>
				<img className="level-dashboard__u1" src="/public/images/unicorn-3.svg"/>
				<img className="level-dashboard__u2" src="/public/images/unicorn-4.svg"/>
			</div>
		);
	}
}
LevelDashboardComponent.propTypes = {
	level: PropTypes.number.isRequired,
}
export const LevelDashboard = withTranslation()(LevelDashboardComponent)
