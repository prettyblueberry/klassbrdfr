import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ListStep3Item} from "presentational";
import {uniqueId, deepClone} from "../../../../../../lib/Utils";
import PropTypes from 'prop-types';
import "./ListStep3.scss";
import {KRClient,KRUtils} from "@klassroom/klassroom-sdk-js";

class ListStep3Component extends React.Component {
	static translate;
	static i18n;
	columns = null;
	class = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.form = this.props.formAPI;
		const step2Data = this.steps.getStepData("CSV_Step2");
		const stepClass = this.steps.getStepData("ChooseClassStep");

		if(step2Data && step2Data.data && step2Data.data.columns) {
			this.columns = step2Data.data.columns;
		}
		if(stepClass && stepClass.data && stepClass.data.class) {
			this.class = KRClient.getInstance().classrooms[stepClass.data.class];
		}
	}
	componentDidMount() {
		this.form.updateValueForm('contacts', this.convertColumnsToRows());
	}
	convertColumnsToRows() {
		let rows = [];
		Object.keys(this.columns).forEach((key) => {
			if(this.columns[key] && Array.isArray(this.columns[key].columnItems)){
				this.columns[key].columnItems.forEach((item, index) => {
					if(!rows[index]){
						rows[index] = {};
						rows[index]['id'] = uniqueId();
					}
					if(key == "phone" && item){
						let p = KRUtils.formatLogin(item,KRClient.getInstance().organization.countryID);
						rows[index][key] = p
					}else{
						rows[index][key] = item;
					}


				})
			}
		});
		return rows.filter((row) => {
			return row.phone || row.email
		});
	}
	getContacts() {
		return this.form.getValueInputForm('contacts');
	}
	getCount() {
		return this.getContacts().length;
	}
	onDelete = (contact) => {
		let contacts = deepClone(this.getContacts());
		contacts = contacts.filter((_contact) => {
			return contact.id != _contact.id;
		});
		this.form.updateValueForm('contacts', contacts);
	}
	renderContacts() {
		return this.getContacts().slice(0, 25).map((contact, index) => {
			return (<ListStep3Item
					key={"contact_"+index}
					contact={contact}
					class={this.class}
					onDelete={this.onDelete}
				/>)
		});
	}
	render() {
		return (
			<>
				<div className="csv-panel">
					<div className="csv-panel-left">
						<div className="csv-panel-left-text">{this.$t("Contact uploaded")}</div>
						<div className="csv-panel-left-count">{this.getCount()}</div>
					</div>
					<div className="csv-panel--right">

					</div>
				</div>
				<div className="list-step3">
					<div className="list-step3__shadow"></div>
					<div className="list-step3__wrapper">
						{this.renderContacts()}
					</div>
				</div>
			</>
		);
	}
}
ListStep3Component.propTypes = {
	formAPI: PropTypes.object.isRequired,
	stepsAPI: PropTypes.object.isRequired,
}
export const ListStep3 = withTranslation()(ListStep3Component)
