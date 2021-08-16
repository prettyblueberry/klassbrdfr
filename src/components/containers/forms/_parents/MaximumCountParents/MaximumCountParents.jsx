import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	RoundIconMiddle,
} from "presentational";
import classnames from "classnames";
import {FormAPI} from "forms";
import "./MaximumCountParents.scss";

class MaximumCountParentsComponent extends React.Component {
	static $t;
	static i18n;
	contacts = [];
	class = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.modal = this.props.modalAPI;
		const data = this.steps.getStepData("MaximumCountParents");
		this.modal.disableBackButton();
		console.log(data.countColumns, 'data!');
	}
	componentDidMount() {

	}
	render() {
		return (
			<div className="maximum-count-parents">
				<div className="maximum-count-parents__status">
					<HeaderTextSmall className="maximum-count-parents__status__h1" textJSX={this.$t("Warning")}/>
					<HeaderText className="maximum-count-parents__status__h2" textJSX={this.$t("Maximum count of parents in CSV file is 4000. You can break CSV file to several and load them.")}/>
				</div>
			</div>
		)
	}
}

MaximumCountParentsComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
	modalAPI: PropTypes.object.isRequired,
}
export const MaximumCountParents = withTranslation()(MaximumCountParentsComponent)
