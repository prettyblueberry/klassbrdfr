import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./UserIcon.scss";

class UserIconComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	getLetter = ()=>{

			if(this.props.name){
				return this.props.name.substring(0,1);
			}
			return null;
	}

	getRootClass() {
		let classes = {
			"user-icon": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		classes[this.getRandomColor()] = true;
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
		return "user-icon__leter-"+colors[this.getRandomInt(0, colors.length - 1)];
	}
	render() {
		return (
			<div className={this.getRootClass()} style={{width:(this.props.size || 40)+"px", height:(this.props.size || 40)+"px"}}>
				{this.getLetter() && (this.props.src == "" || !this.props.src) && <span className="user-icon__leter">{this.getLetter()}</span>}
				{(this.props.src !== "" && this.props.src) && <img src={this.props.src || "/images/img_profile.svg"}/>}
			</div>
		);
	}
}
UserIconComponent.propTypes = {
	src: PropTypes.string,
	letter: PropTypes.string
}
export const UserIcon = withTranslation()(UserIconComponent)
