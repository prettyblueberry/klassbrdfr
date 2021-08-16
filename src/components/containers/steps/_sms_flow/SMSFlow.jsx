import * as React from "react";
import {
	SMSEditorStep,
	SMSBroadcastingStep,
} from "./steps";
import {StepsAPI} from "../";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./SMSFlow.scss";

class SMSFlowComponent extends React.Component {
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
					component: <SMSEditorStep id="SMSEditor" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <SMSBroadcastingStep id="SMSBroadcastingStep" stepsAPI={this.steps}/>,
					data: null,
				}
			]
		)
	}
	componentDidMount() {
		this.steps.addStep('SMSEditor');
	}
	clearErrorSMSEditor = () => {
		this.setState({
			errorText: ""
		});
	}
	render() {
		return (
			this.steps.renderLastStep()
		);
	}
}
SMSFlowComponent.propTypes = {
	//steps: PropTypes.object.isRequired,
}

export const SMSFlow = withRouter(withTranslation()(SMSFlowComponent))