import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./BackButton.scss";

class BackButtonComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClasses() {
		let classes = {
			"back-button": true,
		}	
		if(this.props.absolute){
			classes["back-button__absolute"] = true;
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	onClick = () => {
		if(typeof this.props.onClick == "function"){
			this.props.onClick();
		}
	}
	getText() {
		return this.props.text || this.$t("Back");
	}
	render() {
		return (
			<div onClick={this.onClick} className={this.getClasses()}>
				<div className="icon klassicon-back "></div> <span className="back-button__label">{this.getText()}</span>
			</div>
		);
	}
}
BackButtonComponent.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	className: PropTypes.string,
}
export const BackButton = withTranslation()(BackButtonComponent)
