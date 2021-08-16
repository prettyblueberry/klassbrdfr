import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {RegisterAttendancePanel} from "panels";
import {YearSelector, AttendanceRegisterListItem} from "presentational";
import {} from "blocks";
import {ListAPI} from "lists";
import {KRClient, KRColor} from "@klassroom/klassroom-sdk-js";
import "./DashboardRegisterBlock.scss";

class DashboardRegisterBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);
		this.list.setRequests(
			{
				loadList: (quiresURL, params, data) => {
					return new Promise((resolve, reject) => {

						resolve(null);
					})
				}
			}
		)
	}
	getSelectedYear() {
		return KRClient.getInstance().getPeriod();
	}
	onSelectYear = (year) => {
		KRClient.getInstance().setPeriod(year)
		showLoader(this.$t("Loading school year {{year1}}-{{year2}}",{year1:year,year2:(year+1)}))
		KRClient.getInstance().connect()
      .then(()=> {
		this.forceUpdate();
      })
      .catch((error) => {
          if(error.code == 500){

          }
      }).finally(()=>hideLoader());
	}
	renderHeader() {
		return (
			<div className="dashboard-attendance-register-block__header">

				<div className="dashboard-attendance-register-block__header-left">
					<span className="icon klassicon-attendance-register"></span>
					<span className="dashboard-attendance-register-block__header-title">{this.$t("Attendance Register")}</span>
				</div>

				<div className="dashboard-attendance-register-block__header-right">

					{/*<div className="actions">
						<div className="actions__title">{this.$t("Actions")} <span className="actions_arrow"></span></div>
					</div>*/}

				</div>

			</div>
		)
	}
	renderEmptyDashboard() {
		return null;
	}
	renderItem = () => {
		return (
			<AttendanceRegisterListItem/>
		)
	}
	renderkDateBlock = () => {
		return (
			<div className="dashboard-attendance-register-block__list-items">
				<div className="dashboard-attendance-register-block__header">
					<span>Today</span> <span className="dashboard-attendance-register-block__header-count">1</span>
				</div>
				<div className="dashboard-attendance-register-block__data">

					{this.renderItem()}
					{this.renderItem()}
					{this.renderItem()}
					{this.renderItem()}
					{this.renderItem()}
					{this.renderItem()}

				</div>

			</div>
		)
	}
	renderList = () => {
		return (<>
			{this.renderkDateBlock()}
			{this.renderkDateBlock()}
			{this.renderkDateBlock()}
			{this.renderkDateBlock()}
		</>)
	}
	renderDashboard() {
		return (
		<div className="dashboard-attendance-register-block__page">
			<RegisterAttendancePanel list={this.list}/>
			{this.renderList()}

		</div>);
	}
	render() {
		return (
			<div className="dashboard-attendance-register-block">
				{this.renderHeader()}
				<YearSelector
					selectedYear={this.getSelectedYear()}
					callbackSelectYear={this.onSelectYear}
				/>
				{KRClient.getInstance().getLinkedKlassesCount() == 0 && this.renderEmptyDashboard()}
				{KRClient.getInstance().getLinkedKlassesCount() > 0 && this.renderDashboard()}
			</div>
		);
	}
}
DashboardRegisterBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DashboardRegisterBlockComponent);
export const DashboardRegisterBlock = withRouter(props => <TranslatedComponent {...props}/>)
