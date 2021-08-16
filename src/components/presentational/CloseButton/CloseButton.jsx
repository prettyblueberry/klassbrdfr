import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./CloseButton.scss";

class CloseButtonComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div onClick={() => this.props.onClick()} style={this.props.style || {}} className="icon close-button klassicon-close"></div>
		);
	}
}
CloseButtonComponent.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func.isRequired,
}
export const CloseButton = withTranslation()(CloseButtonComponent)