import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./RoundIconMiddle.scss";
import "../colors.scss";

class RoundIconMiddleComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.color = "";
		this.setColor();
	}
	setColor() {
		if(this.props.color){
			this.color = this.props.color;
		} else {
			this.color = this.getRandomColor();
		}
	}
	onClick = () => {
		if(typeof this.props.onClick == "function"){
			this.props.onClick();
		}
	}
	getClassIcon() {
		let classes = {
			"icon": true
		}
		if(this.props.icon){
			classes['klassicon-'+this.props.icon] = true;
		}
		return classnames(classes);
	}
	getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	getRandomColor() {
		const colors = [
			"blue",
			"purple",
			"coral",
			"butterscotch",
			"turquoiseblue",
			"green",
		];
		return colors[this.getRandomInt(0, colors.length - 1)];
	}
	getRootClass() {
		let classes = {
			"round-icon": true,
			"round-icon-middle": true
		}
		classes[this.color] = true;
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	renderIcon() {
		if(this.props.icon){
			return <div className={this.getClassIcon()}></div>
		}
		if(this.props.char){
			return <div className="icon-char">{this.props.char}</div>
		}
		return null;
	}
	render() {
		return (
			<div style={this.props.style || {}} className={this.getRootClass()}>
				{this.renderIcon()}
			</div>
		);
	}
}
RoundIconMiddleComponent.propTypes = {
	style: PropTypes.object,
	color: PropTypes.string,
	icon: PropTypes.string,
	char: PropTypes.string,
}
export const RoundIconMiddle = withTranslation()(RoundIconMiddleComponent)