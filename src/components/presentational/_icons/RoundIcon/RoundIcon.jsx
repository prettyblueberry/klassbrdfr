import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import "./RoundIcon.scss";
import "../colors.scss";

class RoundIconComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
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
	getRootClass() {
		let classes = {
			"round-icon": true,
			"round-icon-large": true
		}
		if(this.props.color){
			classes[this.props.color] = true;
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClass()}>
				<div className={this.getClassIcon()}></div>
			</div>
		);
	}
}
export const RoundIcon = withTranslation()(RoundIconComponent)