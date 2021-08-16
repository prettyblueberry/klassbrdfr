import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./Button2.scss";

class Button2Component extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onClick = () => {
		this.props.onClick();
	}
	render() {
		return (
			<div className="button2" onClick={this.onClick}><img src="/public/pages/addClass/addbtn-round-blue.svg"/>{this.props.title}</div>
		);
	}
}
Button2Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
export const Button2 = withTranslation()(Button2Component)