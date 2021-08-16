import * as React from "react";
import {
	ChoosePackageForm,
	BillingInformationForm,
	BillingSuccessful,
} from "forms";
import {StepsAPI} from "steps";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./BuySMSSteps.scss";

class BuySMSStepsComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = new StepsAPI(this);
		this.steps.setAllSteps(
			[
				{
					component: <ChoosePackageForm id="ChoosePackage" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <BillingInformationForm id="BillingInformation" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <BillingSuccessful id="BillingSuccessful" stepsAPI={this.steps}/>,
					data: null,
				},
			]
		)
	}
	componentDidMount() {
		// first step here
		this.steps.addStep('ChoosePackage');
	}
	render() {
		return (
			this.steps.renderLastStep()
		);
	}
}
BuySMSStepsComponent.propTypes = {}

export const BuySMSSteps = withRouter(withTranslation()(BuySMSStepsComponent))