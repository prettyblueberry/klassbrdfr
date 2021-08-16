import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import "./TextInput.scss";

export class TextInputComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderLink() {
		if(this.props.linkName && this.props.link) {
			return <Link className="input-link" to={this.props.link}>{this.$t(this.props.linkName)}</Link>
		}
		return null;
	}
	onChange = (event) => {
		this.props.onChange(event.target.value);
	}
	onKeyPress = (event) => {
		if (event.key == 'Enter') {
			this.props.onChange(event.target.value, true);
		}
	}
	// fixed translation bug (value not be translated)
	getValue(){
		return this.props.value;
	}
	render() {
		return (
			<div className="text-input block clearfix">
				<span className="block form-group">
					<p>
						<label>{this.props.label ? this.$t(this.props.label): ""}</label>
						{this.renderLink()}
					</p>
					<input
						value={this.getValue()}
						type={this.props.type || "text"} 
						className="form-control k-input"
						onChange={this.onChange}
						onKeyPress={this.onKeyPress}
						placeholder={this.props.placeholder || ""}
					/>
				</span>
			</div>
		);
	}
}

TextInputComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	type: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	// link for right side
	link: PropTypes.string,
	// link name for right side
	linkName: PropTypes.string,
}
export const TextInput = withTranslation()(TextInputComponent)