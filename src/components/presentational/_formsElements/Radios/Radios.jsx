import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import classnames from "classnames";
import "./Radios.scss";

class RadiosComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onChange = (value) => {
		this.props.onChange(value);
	}
	renderOptions() {
		return this.props.options.map((option, index) => {
			return (
				<div
					onClick={() => this.onChange(option.value)}
					className={classnames({
						"radios__item": true,
						"radios__item--selected": this.props.selectedOption == option.value
					})} 
					key={index}
				>
					<div className={classnames({
							"radios__input-container": true
						})
					}></div>

					<label className="radios__label">{option.name}</label>
				</div>
			)
		});
	}
	renderLabel() {
		if(this.props.label){
			return (<p>{this.props.label}</p>)
		}
		return null;
	}
	render() {
		return (
			<div className="radios">
				{this.renderLabel()}
				{this.renderOptions()}
			</div>
		);
	}
}

RadiosComponent.propTypes = {
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.any,
	label: PropTypes.string,
	isInline: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}
export const Radios = withTranslation()(RadiosComponent)
