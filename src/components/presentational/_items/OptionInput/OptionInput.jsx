import * as React from "react";
import { withTranslation } from 'react-i18next';
import {TextInput2} from "presentational";
import {deepClone} from "utils";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./OptionInput.scss";

class OptionInputComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onChange = (value) => {
		if(typeof this.props.onChange == 'function'){
			this.props.onChange(this.getOption(), value);
		}
	}
	removeOption = () => {
		if(typeof this.props.onDelete == 'function'){
			this.props.onDelete(this.getOption());
		}
	}

	getOption = () => {
		return this.props.option;
	}
	getParent = () => {
		return this.getOption().parent;
	}
	getRootClass() {
		let classes = {
			"option-input": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClass()}>
				<div onClick={this.removeOption} className="icon klassicon-close"></div>
				<TextInput2
					onChange={this.onChange}
					value={this.getOption().value}
					label={this.getOption().label}
					placeholder={this.getOption().placeholder}
					disabled={this.props.disableInputs}
				/>
				<div className="option-input__reorder icon klassicon-reorder"></div>
			</div>
		);
	}
}
OptionInputComponent.propTypes = {
	option: PropTypes.object.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onDelete: PropTypes.func,
	onChange: PropTypes.func,
	disableInputs: PropTypes.bool, 
}
export const OptionInput = withTranslation()(OptionInputComponent)