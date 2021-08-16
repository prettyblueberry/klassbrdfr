import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./ColorBar.scss";

class ColorBarComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.colors = [
			{class: "color-bar__purple"},
			{class: "color-bar__coral"},
			{class: "color-bar__blue"},
			{class: "color-bar__orange"},
		];
	}
  getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	getColorBarClass() {
		let colorClass = "color-bar ";
		if(this.props.index === 0 || this.props.index) {
			let colorIndex = this.props.index;

			colorClass += this.colors[colorIndex % this.colors.length].class;
		}
		return colorClass;
	}
	render() {
		return (
			<div className={this.getColorBarClass()}></div>
		);
	}
}
export const ColorBar = withTranslation()(ColorBarComponent)
