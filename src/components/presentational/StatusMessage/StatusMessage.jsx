import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./StatusMessage.scss";

class StatusMessageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getStatusText(){
		switch(this.props.status){
			case("deleted"):
			return this.$t("Deleted")
			case("draft"):
			return this.$t("draft")
			case("deleted"):
			return this.$t("deleted")
		}
	}
	getRootClass() {
		let classes = {
			"status-message": true
		}
		classes[`status-message__${this.props.status}`] = true;
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClass()}>
				<div className="icon klassicon-back"></div> {this.getStatusText()}
			</div>
		);
	}
}
StatusMessageComponent.propTypes = {
 status: PropTypes.string.isRequired,
}
export const StatusMessage = withTranslation()(StatusMessageComponent)
