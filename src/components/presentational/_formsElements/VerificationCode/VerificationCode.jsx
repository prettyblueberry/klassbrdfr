import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./VerificationCode.scss";

class VerificationCodeComponent extends React.Component {
	static $t;
	static i18n;
	invalidChars = [
		"-",
		"+",
		"e",
	];

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onChange = (event) => {
		if(event.target.value.length <= 6){
			this.props.onChange(event.target.value);
		}

	}
	onKeydown = (event) => {

		if (this.invalidChars.includes(event.key)) {
			event.preventDefault();
		}
	}
	render() {
		return (
			<div className="verification-code">
				<p><label>{this.props.label}</label></p>
				<input
					onChange={this.onChange}
					onKeyDown={this.onKeydown}
					className="verification-code__input"
					maxLength={6}
					max={999999}
					type="number"
					value={this.props.value}
					required="required"
				/>
			</div>
		);
	}
}

VerificationCodeComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}
export const VerificationCode = withTranslation()(VerificationCodeComponent)
