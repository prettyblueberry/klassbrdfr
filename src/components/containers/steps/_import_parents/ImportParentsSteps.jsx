import * as React from "react";
import {
	ImportParentsChooseClassForm,
	ChooseImportMethodForm,
	ImportParentsManualForm,
	CSV_Step1Form,
	CSV_Step2Form,
	CSV_Step3Form,
	ImportParentsSuccess,
	MaximumCountParents,
} from "./../../forms";
import {StepsAPI} from "../";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./ImportParentsSteps.scss";

class ImportParentsStepsComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.modal = this.props.modalAPI;
		this.steps = new StepsAPI(this);
		this.steps.setAllSteps(
			[
				{
					component: <ImportParentsChooseClassForm modalAPI={this.modal} id="ChooseClassStep" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <ChooseImportMethodForm modalAPI={this.modal} id="ChooseImportMethod" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <ImportParentsManualForm modalAPI={this.modal} id="ManualImport" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <CSV_Step1Form modalAPI={this.modal} id="CSV_Step1" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <CSV_Step2Form modalAPI={this.modal} id="CSV_Step2" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <CSV_Step3Form modalAPI={this.modal} id="CSV_Step3" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <ImportParentsSuccess modalAPI={this.modal} id="ImportParentsSuccess" stepsAPI={this.steps}/>,
					data: null,
				},
				{
					component: <MaximumCountParents modalAPI={this.modal} id="MaximumCountParents" stepsAPI={this.steps}/>,
					data: null,
				}
			]
		)
	}
	componentDidMount() {
		// first step here
		this.steps.addStep('ChooseClassStep');
	}
	render() {
		return (
			this.steps.renderLastStep()
		);
	}
}
ImportParentsStepsComponent.propTypes = {}

export const ImportParentsSteps = withRouter(withTranslation()(ImportParentsStepsComponent))