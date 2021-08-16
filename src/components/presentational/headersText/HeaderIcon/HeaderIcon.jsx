import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./HeaderIcon.scss";

class HeaderIconComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassIcon() {
		let classes = {
			"icon": true
		}
		if(this.props.icon){
			classes['klassicon-'+this.props.icon] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className="header-icon">
				<div className={this.getClassIcon()}></div>{this.props.text}
			</div>
		);
	}
}
HeaderIconComponent.propTypes = {
	icon: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
}
export const HeaderIcon = withTranslation()(HeaderIconComponent)