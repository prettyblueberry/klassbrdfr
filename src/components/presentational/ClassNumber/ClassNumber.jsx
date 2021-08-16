import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./ClassNumber.scss";

class ClassNumberComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="class-number">
				<div className="class-number__left">
					<span className="class-number__title">{this.$t("Number of Classes")}</span>
					<span className="class-number__count">{this.props.count}</span>
				</div>
				<img className="class-number__right" src="/public/pages/addClass/class-icon-blue.svg"/>
			</div>
		);
	}
}
ClassNumberComponent.propTypes = {
  count: PropTypes.number.isRequired
}
export const ClassNumber = withTranslation()(ClassNumberComponent)
