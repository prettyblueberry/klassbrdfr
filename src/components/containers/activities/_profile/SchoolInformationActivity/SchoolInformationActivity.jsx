import * as React from "react";
import {ThreeGridLayout} from "../../../layouts";
import {
	HeaderBlock,
	LeftMenuProfileBlock,
} from '../../../blocks';
import {SchoolInformation} from "forms";
import { withTranslation } from 'react-i18next';
import "./SchoolInformationActivity.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class SchoolInformationActivityComponent extends React.Component {
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
		this.data = data;
		const org = KRClient.getInstance().organization;
		org.name =  this.data.schoolName;
		org.is_public = this.data.schoolType == "public";
		org.countryID = this.data.country;
		org.street = this.data.address;
		org.city = this.data.city;
		org.zipcode = this.data.zipcode;
		org.students_count = this.data.studentsNumber;
		org.classes_count = this.data.classesNumber;
		org.start_month = this.data.startMonth;
		org.position = this.data.schoolPosition;
		org.contact_phone = this.data.schoolPhone;
		org.contact_email = this.data.schoolEmail;
		org.contact_name = this.data.schoolContact;

		showLoader(this.$t("Updating school..."));

		org.save()
		.then(() => {

		})
		.catch((err) => {
					ModalManager.getInstance().alert(this.$t("Error"), err.message);
		})
		.finally(()=>hideLoader());
	}

	render() {
		return (
			<ThreeGridLayout
				className="profile-activity__layout"
				//showShapes={true}
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuProfileBlock/>}
				centerJSX={<SchoolInformation
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
export const SchoolInformationActivity = withTranslation()(SchoolInformationActivityComponent);
