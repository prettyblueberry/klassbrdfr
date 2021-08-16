import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./TextArea.scss";

class TextAreaComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.textareaRef = React.createRef();
	}
	onChange = (event) => {
		const value = event.target.value;
		const maxCount = this.getMaxCountChars();
		if(maxCount && maxCount > 0){
			if(value.length > maxCount){
				return false;
			}
		}
		this.props.onChange(value);
	}
	onKeyPress = (event) => {
		if (event.key == 'Enter') {
			const value = event.target.value;
			const maxCount = this.getMaxCountChars();
			if(maxCount && maxCount > 0){
				if(value.length > maxCount){
					return false;
				}
			}
			this.props.onChange(value, true);
		}
	}
	getMaxCountChars() {
		return this.props.maxCountChars || 0;
	}
	getValue(){
		return this.props.value;
	}
	getCountChars(){
		if(this.textareaRef.current && this.textareaRef.current.value){
			return this.textareaRef.current.value.length;
		}
		return 0;
	}
	getClasses() {
		let classes = {
			"text-area": true,
		}	
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	renderCountChars() {
		if(this.props.maxCountChars){
			return (
			<div className="text-area__count">
				{this.$t("{{count}}/{{max}} characters", {
					max: this.props.maxCountChars,
					count: this.getCountChars(),
				})}
			</div>
			)
		}
		return null;
	}
	render() {
		return (
			<div className={this.getClasses()}>
				{this.renderCountChars()}
				<div className="text-area__label">{this.props.label || ""}</div>
				<textarea value={this.props.value} onChange={this.onChange} ref={this.textareaRef} className="text-area__input"></textarea>
			</div>
		);
	}
}

TextAreaComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	label: PropTypes.string,
	maxCountChars: PropTypes.number,
	onChange: PropTypes.func.isRequired
}
export const TextArea = withTranslation()(TextAreaComponent)