import * as React from "react";
import { withTranslation } from 'react-i18next';
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./CurrentYear.scss";

class CurrentYearComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getYear() {
		let nextYear = KRClient.getInstance().getPeriod() + 1;
		return `${KRClient.getInstance().getPeriod()}-${nextYear}`;
	}
	render() {
		return (
			<div style={this.props.style || {}} className="current-year">
				<div className="current-year__h1">{this.props.title || ""}</div>
				<div className="current-year__year">{this.getYear()}</div>
			</div>
		);
	}
}
export const CurrentYear = withTranslation()(CurrentYearComponent)