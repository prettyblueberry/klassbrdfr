import * as React from "react";
import {
	LinkClassPathsForm,
	LinkClassKeyForm,
	LinkConfirmForm,
	LinkConfirmSuccessForm,
	LinkClassRequestForm,
	LinkClassRequestSentForm
} from "../../../forms";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./LinkClassRightBlock.scss";
import {KROrgKlassRequest, KRClient,KRUtils} from "@klassroom/klassroom-sdk-js";


class LinkClassRightBlockComponent extends React.Component {
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
	onSubmitPath = (selectedPathData) => {


		this.props.callbackChangeData(selectedPathData, 'selectedPathData');

	}
	onSubmitKeyForm = (keyData) => {
		showLoader();
		KROrgKlassRequest.checkKlassKey(keyData.classKey)
			.then((klass) => {
					if(!klass){
						this.setState({errorText:this.$t("This Class key is invalid")});
					}else{
						  keyData.klass = klass
							this.props.callbackChangeData(keyData, 'keyData');
					}
		}).catch((err) =>{
			this.setState({
				errorText: err.message
			});
		})
		.finally(()=> hideLoader())

	}
	onSubmitRequestForm = (requestData) => {
		let login = KRUtils.formatLogin(requestData.teacherPhone.phone,requestData.teacherPhone.countryData.iso2);
		requestData.login = login;
		this.props.callbackChangeData(requestData, 'requestData');
	}
	onSubmitConfirm = (linkClassData) => {
			this.props.callbackChangeData(linkClassData, 'linkClassData');
	}
	onSubmitConfirmSuccess = (LinkSuccessData) => {
		this.props.callbackChangeData(LinkSuccessData, 'LinkSuccessData');
	}
	onSubmitRequestSent = (requestSentData) => {
		this.props.callbackChangeData(requestSentData, 'requestSentData');
	}
	getDataByStep(typeStep) {
		return this.props.stepsData[typeStep] ? this.props.stepsData[typeStep] : {};
	}
	userHasKey() {
		return this.props.stepsData.selectedPathData.userHasKey;
	}
	render() {
		switch(this.props.step) {
			case 1:
			return <LinkClassPathsForm
				callbackSubmit = {this.onSubmitPath}
				callbackOnBack={this.props.callbackOnBack}
				classroom={this.props.classroom}
			/>
			case 2:
			if(this.userHasKey()){
				return <LinkClassKeyForm
					errorText = {this.state.errorText}
					callbackSubmit = {this.onSubmitKeyForm}
					callbackClearError = {this.clearError}
					callbackOnBack={this.props.callbackOnBack}
					initFormValue={this.getDataByStep('keyData')}
					classroom={this.props.classroom}
				/>
			} else {
				return <LinkClassRequestForm
					errorText = {this.state.errorText}
					callbackSubmit = {this.onSubmitRequestForm}
					callbackClearError = {this.clearError}
					callbackOnBack={this.props.callbackOnBack}
					initFormValue={this.getDataByStep('requestData')}
					classroom={this.props.classroom}
				/>
			}
			case 3:
			if(this.userHasKey()){
				return <LinkConfirmForm
					callbackSubmit = {this.onSubmitConfirm}
					callbackOnBack={this.props.callbackOnBack}
					classroom={this.props.classroom}
					data={this.props.data}
				/>
			} else {
				return <LinkClassRequestSentForm
					callbackSubmit = {this.onSubmitRequestSent}
					callbackOnBack={this.props.callbackOnBack}
					classroom={this.props.classroom}
					data={this.props.data}
				/>
			}
			case 4:
			if(this.userHasKey()) {
				return <LinkConfirmSuccessForm
					callbackSubmit = {this.onSubmitConfirmSuccess}
					callbackOnBack={this.props.callbackOnBack}
					classroom={this.props.classroom}
					data={this.props.data}
				/>
			}
			default:
			return null;
		}
	}
}
LinkClassRightBlockComponent.propTypes = {
	step: PropTypes.number.isRequired,
	stepsData: PropTypes.object.isRequired,
	callbackOnBack: PropTypes.func,
	callbackChangeData: PropTypes.func,
}
const TranslatedComponent = withTranslation()(LinkClassRightBlockComponent);
export const LinkClassRightBlock = withRouter(props => <TranslatedComponent {...props}/>)
