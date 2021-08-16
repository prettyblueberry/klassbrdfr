import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./TextInput2.scss";

export class TextInput2Component extends React.Component {
	static $t;
	static i18n;
	focused = false;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.inputRef = React.createRef();
	}
	invalidChars = [
		"-",
		"+",
		"e",
	];

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
	onFocus = () => {
		this.focused = true;
		this.forceUpdate();
	}
	onBlur = () => {
		this.focused = false;
		this.forceUpdate();
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
	onKeydown = (event) => {
		if (this.invalidChars.includes(event.key) && this.props.type == "number") {
			event.preventDefault();
		}
	}
	getCountChars(){
		if(this.inputRef.current && this.inputRef.current.value){
			return this.inputRef.current.value.length;
		}
		return 0;
	}
	getMaxCountChars() {
		return this.props.maxCountChars || 0;
	}
	getValue(){
		const value = this.props.value;
		if(!value && value !== 0){
			return "";
		} else {
			return value;
		}
	}
	renderCountChars() {
		if(this.props.maxCountChars){
			return (
			<div className="form-input-text2__count">
				{this.$t("{{count}}/{{max}} characters", {
					max: this.props.maxCountChars,
					count: this.getCountChars(),
				})}
			</div>
			)
		}
		return null;
	}
	renderLabel() {
		if(this.props.label){
			return <label className="form-input2-text__label">{this.props.label} {this.props.required && "*"}{this.props.optional && this.$t("(optional)")}</label>
		}
		return null;
	}
	render() {
		return (
			<div className={classnames({
				"form-input-text2": true,
				"focused": this.focused || this.getValue() !== "",
				"form-input-text2__not-labeled": (!this.props.label || this.props.label == ""),
			})}>
				{this.renderCountChars()}
				{this.renderLabel()}
				<div className="form-input-text2__input-container">
					<input
						disabled={this.props.disabled}
						autoFocus={this.props.autofocus}
						ref={this.inputRef}
						className="form-input-text2__input"
						onKeyDown={this.onKeydown}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						onChange={this.onChange}
						type={this.props.type}
						value={this.props.value}
						placeholder={(this.props.label ? null : this.props.placeholder)}
					/>
				</div>
			</div>
		);
	}
}

TextInput2Component.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	type: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	maxCountChars: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	autofocus: PropTypes.bool,
	disabled: PropTypes.bool,
}
export const TextInput2 = withTranslation()(TextInput2Component)
