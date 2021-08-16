import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./AlertForm.scss";

export class AlertFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassesAlert() {
		let classes = {
			alert: true,
		}
		classes[`alert-${this.props.typeAlert || 'danger'}`] = true;
		return classnames(classes);
	}
	render() {
		return this.props.error ? (
			<div className={this.getClassesAlert()}>
			<p dangerouslySetInnerHTML={{__html: this.props.error}} />
				<button onClick={this.props.callbackClose} type="button" className="close">
					<i className="ace-icon fas fa-times"/>
				</button>
			</div>
		) : null;
	}
}

AlertFormComponent.propTypes = {
	typeAlert: PropTypes.string,
	callbackClose: PropTypes.func.isRequired,
	error: PropTypes.string,
}
export const AlertForm = withTranslation()(AlertFormComponent)