import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import {CheckBox} from "../../../presentational";
import "./CheckBoxLabeled.scss";

class CheckBoxLabeledComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getRootClasses() {
		let classes = {
			"check-box-labeled": true
		}
		if(this.props.reverseSide){
			classes['check-box-labeled__reverse'] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClasses()}>
				{this.props.label && <div className="check-box-labeled__label">{this.props.label}</div>}
				<CheckBox
					checked={this.props.checked}
					customData={this.props.customData}
					onToggle={this.props.onToggle}
				/>
				{this.props.description && <div className="check-box-labeled__description">{this.props.description}</div>}
			</div>
		);
	}
}
CheckBoxLabeledComponent.propTypes = {
	checked: PropTypes.bool,
	customData: PropTypes.object,
	onToggle: PropTypes.func,
	label: PropTypes.string,
	reverseSide: PropTypes.bool,
	description: PropTypes.string,
}
export const CheckBoxLabeled = withTranslation()(CheckBoxLabeledComponent)