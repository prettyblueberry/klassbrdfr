import * as React from "react";
import {ThreeGridLayout} from "../../../layouts";
import {
	HeaderBlock,
	LeftMenuProfileBlock,
} from '../../../blocks';
import {PersonalInformationForm} from "../../../forms";
import { withTranslation } from 'react-i18next';
import "./PersonalInformationActivity.scss";
import {KRUser, KRClient} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class PersonalInformationActivityComponent extends React.Component {
	static $t;
	static i18n;

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ''
		}
	}
	clearErrorForm = () => {
		this.setState({
			errorText: ""
		});
	}
	onSubmit = (data) => {
		if(data.phoneInput.countryData) {

		}

		let user = KRClient.getInstance().user;
		user.first_name = data.firstName;
		user.last_name = data.lastName;
		user.email = data.email

		showLoader(this.$t("Saving account..."));
		user.save(user.first_name,user.last_name, user.email )
		.then(() => {

		})
		.catch((err) => {
					ModalManager.getInstance().alert(self.$t("Error"), err.message);
		})
		.finally(()=>hideLoader());
	}

	render() {
		return (
			<ThreeGridLayout
				className="profile-activity__layout"
				showShapes={true}
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuProfileBlock/>}
				centerJSX={<PersonalInformationForm
					initFormValue={{}}
					errorText = {this.state.errorText}
					callbackSubmit = {this.onSubmit}
					callbackClearError = {this.clearErrorForm}
				/>}
				rightJSX={null}
			/>
		);
	}
}
export const PersonalInformationActivity = withTranslation()(PersonalInformationActivityComponent);
