import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./CheckBox.scss";

class CheckBoxComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onToggle = () => {
		if(typeof this.props.onToggle == "function"){
			this.props.onToggle(this.props.checked, this.props.customData || {});
		}
	}
	getRootClasses() {
		let classes = {
			"check-box": true
		}
		if(this.props.checked){
			classes["check-box--checked"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div onClick={this.onToggle} className={this.getRootClasses()}>
				<div className="icon klassicon-check"></div>
			</div>
		);
	}
}
CheckBoxComponent.propTypes = {
	checked: PropTypes.bool,
	customData: PropTypes.object,
	onToggle: PropTypes.func,
}
export const CheckBox = withTranslation()(CheckBoxComponent)