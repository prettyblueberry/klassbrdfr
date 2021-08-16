import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./CountWithLabel.scss";

class CountWithLabelComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="count-with-label">
				<div className="count-with-label-text">{this.props.label}</div>
				<div className="count-with-label-count">{this.props.count}</div>
			</div>
		);
	}
}
CountWithLabelComponent.propTypes = {
	count: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	label: PropTypes.string,
}
export const CountWithLabel = withTranslation()(CountWithLabelComponent)