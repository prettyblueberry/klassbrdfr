import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';
import {RegisterAttendancePanel} from "panels";
import {Button, YearSelector, UserIcon, RoundIconMiddle} from "presentational";
import {} from "blocks";
import {ListAPI} from "lists";
import {KRClient, KRColor} from "@klassroom/klassroom-sdk-js";
import "./AttendanceStudentsBlock.scss";

class AttendanceStudentsBlockComponent extends React.Component {
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
			<div className="dashboard-attendance-students-block__header">

				<div className="dashboard-attendance-students-block__header-left">
					<span className="icon klassicon-students"></span>
					<span className="dashboard-attendance-students-block__header-title">{this.$t("Students")}</span>
				</div>

				<div className="dashboard-attendance-students-block__header-right">

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
	renderStatistic = () => {
		return (
			<div className="attendance-students__list-item--statistic">
				<div className="attendance-students__list-item--statistic__h1">78%</div>
				<div className="attendance-students__list-item--statistic__h2">{this.$t("attendance")}</div>
			</div>
		)
	}
	renderItem = () => {
		return (
			<div className="attendance-students__list-item">
	
				<div className="attendance-students__list-item-left">
					<div className="attendance-students__list-item-left__top">
						<UserIcon name="Test user"/>
					</div>
					<div className="attendance-students__list-item-left__bottom">
						<div className="attendance-students__list-item-left-h1">Alfort</div>
						<div className="attendance-students__list-item-left-h2">Thomas</div>
						<div className="attendance-students__list-item-left-h3">CE1 A</div>
					</div>
				</div>

				<div className="attendance-students__list-item-center">
					<div className="attendance-students__list-item-center_top">
						{this.renderStatistic()}
						<div className="attendance-students__list-item--separator"></div>
					</div>

					<div className="attendance-students__list-item-center__center">
						<div className="attendance-students__list-item-center__center-h1">9</div>
						<div className="attendance-students__list-item-center__center-h2">{this.$t("absences")}</div>
					</div>
					<div className="attendance-students__list-item-center__bottom">
						<div className="attendance-students__list-item-center__botom-h1">9</div>
						<div className="attendance-students__list-item-center__botom-h2">{this.$t("delays")}</div>
					</div>
				</div>

				<div className="attendance-students__list-item-right">
					<span className="icon klassicon-options"></span>
				</div>

			</div>
		)
	}
	renderList = () => {
		return (
		<div className="dashboard-attendance-students-block__list">
			{this.renderItem()}
			{this.renderItem()}
			{this.renderItem()}
			{this.renderItem()}
			{this.renderItem()}
			{this.renderItem()}
		</div>)
	}
	renderDashboard() {
		return (
		<div className="dashboard-attendance-students-block__page">
			<RegisterAttendancePanel list={this.list}/>
			{this.renderList()}

		</div>);
	}
	render() {
		return (
			<div className="dashboard-attendance-students-block">
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
AttendanceStudentsBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(AttendanceStudentsBlockComponent);
export const AttendanceStudentsBlock = withRouter(props => <TranslatedComponent {...props}/>)
