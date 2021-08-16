import * as React from "react";
import {
	AddClassCreateYourClassesForm,
	AddClassAddNewClassForm,
	AddClassConfirmForm,
	AddClassFinishForm
} from "../../../forms";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./AddClassRightBlock.scss";
import {KRUser} from '@klassroom/klassroom-sdk-js';


class AddClassRightBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ""
		};
	}
	clearError = () => {
		this.setState({
			errorText: ""
		});
	}
	onSubmitStep1 = () => {
		this.props.callbackChangeData(null, 'step1');
	}
	onSubmitClassData = (classData) => {
		this.props.callbackChangeData(classData, 'classData');
	}
	onSubmitStep3 = () => {
		this.props.callbackChangeData(null, 'step3');
	}
	onSubmitStep4 = () => {
		this.props.callbackChangeData(null, 'step4');
	}
	getDataByStep(typeStep) {
		return this.props.userData[typeStep] ? this.props.userData[typeStep] : {};
	}
	addNewClass = () => {
		this.props.callbackChangeData(null, 'classData');
		this.props.callbackOnBack(2);
	}
	render() {
		switch(this.props.step) {
			case 1:
			return <AddClassCreateYourClassesForm
				callbackSubmit={this.onSubmitStep1}
				callbackClearError={this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				year={this.props.year}
			/>
			case 2:
			return <AddClassAddNewClassForm
				initFormValue={this.props.class || {}}
				callbackSubmit={this.onSubmitClassData}
				callbackClearError={this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				year={this.props.year}
			/>
			case 3:
			return <AddClassConfirmForm
				class={this.props.class}
				callbackSubmit={this.onSubmitStep3}
				callbackClearError={this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				year={this.props.year}
			/>
			case 4:
			return <AddClassFinishForm
				class={this.props.class}
				callbackClearError={this.clearError}
				callbackOnBack={this.addNewClass}
				year={this.props.year}
			/>
		}
	}
}
AddClassRightBlockComponent.propTypes = {
	step: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	class: PropTypes.object,
	callbackOnBack: PropTypes.func,
	callbackChangeData: PropTypes.func,
}
const TranslatedComponent = withTranslation()(AddClassRightBlockComponent);
export const AddClassRightBlock = withRouter(props => <TranslatedComponent {...props}/>)
