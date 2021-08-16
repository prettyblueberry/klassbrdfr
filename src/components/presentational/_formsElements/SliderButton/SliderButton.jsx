import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SliderButton.scss";

class SliderButtonComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getRootClass() {
		let classes = {
			"slider-button": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		if(this.props.isActive){
			classes["slider-button__active"] = true;
		}
		if(this.props.subLabel){
			classes["slider-button__container--with-sublabel"] = true;
		}
		if(this.props.useSmallSize){
			classes["slider-button__container--small-size"] = true;
		}
		return classnames(classes);
	}
	onClick = () => {
		this.props.onClick(!this.props.isActive);
	}
	render() {
		return (
			<div onClick={this.onClick} className={this.getRootClass()}>
				<div className="slider-button__label">{this.props.label}</div>
				<div className="slider-button__container">
					<div className="slider-button-circle"></div>
				</div>
				{this.props.subLabel && <div className={"slider-button__sublabel"}>{this.props.subLabel}</div>}
			</div>
		);
	}
}
SliderButtonComponent.propTypes = {
	isActive: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string,
	subLabel: PropTypes.string,
	useSmallSize: PropTypes.bool,
}
export const SliderButton = withTranslation()(SliderButtonComponent)