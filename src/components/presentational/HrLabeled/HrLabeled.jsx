import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./HrLabeled.scss";

class HrLabeledComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="hr-labeled">
				<div className="hr-labeled__label">{this.props.label}</div>
				<hr/>
			</div>
		);
	}
}
HrLabeledComponent.propTypes = {
	label: PropTypes.string.isRequired,
}
export const HrLabeled = withTranslation()(HrLabeledComponent)