import * as React from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
	AddSchoolNameForm,
	AddSchoolLocalizationForm,
	AddSchoolClassInfoForm,
	AddSchoolContactInfoForm,
	AddSchoolSuccessForm
} from "../../../forms";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./AddSchoolRightBlock.scss";
import {KRUser} from '@klassroom/klassroom-sdk-js';


class AddSchoolRightBlockComponent extends React.Component {
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
	onSubmitSchoolNameDataForm = (schoolNameData) => {
		this.props.callbackChangeData(schoolNameData, 'schoolNameData');
	}
	onSubmitLocalizationForm = (localizationData) => {
		this.props.callbackChangeData(localizationData, 'localizationData');
	}
	onSubmitClassInfoForm = (classesInfoData) => {
		this.props.callbackChangeData(classesInfoData, 'classesInfoData');
	}
	onSubmitContactInfoData = (contactInfoData) => {
		this.props.callbackChangeData(contactInfoData, 'contactInfoData');
	}
	onSubmitSuccessForm = (successData, toNextStep) => {
		this.props.callbackChangeData(successData, 'successData', toNextStep);
	}
	getDataByStep(typeStep) {
		return this.props.schoolData[typeStep] ? this.props.schoolData[typeStep] : {};
	}
	render() {
		switch(this.props.step) {
			case 1:
			return (<AddSchoolNameForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitSchoolNameDataForm}
				callbackClearError = {this.clearError}
				initFormValue={this.getDataByStep('schoolNameData')}
			/>)
			case 2:
			return (<AddSchoolLocalizationForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitLocalizationForm}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				initFormValue={this.getDataByStep('localizationData')}
			/>)
			case 3:
			return (<AddSchoolClassInfoForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitClassInfoForm}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				initFormValue={this.getDataByStep('classesInfoData')}
			/>)
			case 4:
			return (<AddSchoolContactInfoForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitContactInfoData}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				initFormValue={this.getDataByStep('contactInfoData')}
			/>)
			case 5:
			return (
			<AddSchoolSuccessForm
				callbackSubmit = {this.onSubmitSuccessForm}
				schoolData={this.props.schoolData}
				userData={this.props.userData}
			/>);
		}
	}
}
AddSchoolRightBlockComponent.propTypes = {
	callbackOnBack: PropTypes.func.isRequired,
	callbackChangeData: PropTypes.func.isRequired,
	schoolData: PropTypes.object,
	userData: PropTypes.object,
	step: PropTypes.number.isRequired,
}
const TranslatedComponent = withTranslation()(AddSchoolRightBlockComponent);
export const AddSchoolRightBlock = withRouter(props => <TranslatedComponent {...props}/>)
