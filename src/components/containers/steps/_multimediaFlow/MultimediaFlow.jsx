import * as React from "react";
import {MultimediaEditorStep} from "./steps"
import {
	StepsAPI
} from "steps";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./MultimediaFlow.scss";

class MultimediaFlowComponent extends React.Component {
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
					component: <MultimediaEditorStep id="MultimediaEditorStep" stepsAPI={this.steps}/>,
					data: null,
				},
			]
		)
	}
	componentDidMount() {
		this.steps.addStep('MultimediaEditorStep');
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
MultimediaFlowComponent.propTypes = {
	//steps: PropTypes.object.isRequired,
}

export const MultimediaFlow = withRouter(withTranslation()(MultimediaFlowComponent))