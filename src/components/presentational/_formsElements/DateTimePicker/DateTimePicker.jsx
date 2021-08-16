import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import Datetime from "react-datetime";
import * as moment from 'moment';
import "./DateTimePicker.scss";

class DateTimePickerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.previousValue = null;
		this.wrangFormat = false;
	}
	onChange = (date) => {
		if(typeof date === 'object') {
			this.previousValue = date;
			this.wrangFormat = false;
			this.props.onChange(date);
		} else {
			this.wrangFormat = true;
		}
	}
	onBur = (data) => {
		if(this.wrangFormat){
			this.props.onChange(null);
			setTimeout(() => {
				this.props.onChange(this.previousValue);
				this.wrangFormat = false;
			}, 50);
		}
	}
	getRootClasses() {
		let classes = {
			"date-time-picker": true
		}
		if(this.props.useSmallSize){
			classes["date-time-picker--small-size"] = true;
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	onClear = () => {
		if(this.props.onClear){
			this.props.onClear();
		}
	}
	render() {
		return (
			<div className={this.getRootClasses()}>
				<div className="date-time-picker__label">{this.props.placeholder}</div>
				<Datetime
					strictParsing={true}
					onBlur={this.onBur}
					dateFormat={this.props.dateFormat || "ll"}
					value={this.props.value}
					onChange={this.onChange}
					locale={this.i18n.language}
				/>
				{this.props.showClearButton && <span onClick={this.onClear} className="icon klassicon-close"></span>}
			</div>
		);
	}
}
DateTimePickerComponent.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	className: PropTypes.string,
	showClearButton: PropTypes.bool,
	onClear: PropTypes.func,
	useSmallSize: PropTypes.bool,
}
export const DateTimePicker = withTranslation()(DateTimePickerComponent)
