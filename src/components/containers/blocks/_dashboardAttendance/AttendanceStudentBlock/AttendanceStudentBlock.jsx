import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';
import {YearSelector, CircleProgress, BackButton, AttendanceRegisterListItem} from "presentational";
import {StatsLine} from "blocks";
import {ListAPI} from "lists";
import {KRClient, KRColor} from "@klassroom/klassroom-sdk-js";
import "./AttendanceStudentBlock.scss";

class AttendanceStudentBlockComponent extends React.Component {
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
	getViewsByDates = () => {
		return [
			{name: moment(new Date()).format("l"), value: 50},
			{name: moment(new Date()).format("l"), value: 20},
			{name: moment(new Date()).format("l"), value: 70},
		]
	}
	renderHeader() {
		return (
			<div className="attendance-student-block__header">

				<div className="attendance-student-block__header-left">
					<span className="icon klassicon-students"></span>
					<span className="attendance-student-block__header-title">{this.$t("Students")}</span>
				</div>

				<div className="attendance-student-block__header-right">

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
	renderItems = () => {
		return (
			<>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
				<AttendanceRegisterListItem/>
			</>
		)
	}
	renderDashboard() {
		return (<>
			<div className="attendance-student-block__head-block">
				<div className="attendance-student-block__head-block-left">
					<BackButton onClick={() => {}} absolute/>
				</div>
				<div className="attendance-student-block__head-block-right">
					<div className="attendance-student-block__head-block-right-h1">Thomas <span>Alfort</span></div>
					<div className="attendance-student-block__head-block-right-h2">CP</div>
				</div>
				
			</div>
			
			<div className="attendance-student-block__page-block-first">
				<div className="attendance-student-block__h1" dangerouslySetInnerHTML={{__html: this.$t("Attendance level <b>this year</b>")}}></div>
				<CircleProgress level={5}/>
				<div className="attendance-student-block__h2">
					{this.$t("Very good")}
				</div>
				<div className="attendance-student-block__h3">
					{this.$t("Contact the parents")}
				</div>
				<img className="attendance-student-block__left-unicorn" src="/public/unicorns/unicorn-left.svg"/>
				<img className="attendance-student-block__right-unicorn" src="/public/unicorns/unicorn-right.svg"/>
			</div>

			<div className="attendance-student-block__page-block-second">
				<StatsLine title={this.$t("Absence this year")}  total={40} data={this.getViewsByDates()} label={this.$t("Views")} unit="%" color={KRColor.krRed}/>
				<div></div>
				<StatsLine title={this.$t("Delays this year")}  total={80} data={this.getViewsByDates()} label={this.$t("Views")} unit="%" color={KRColor.krOrange}/>
			</div>

			<div className="attendance-student-block__list">
				{this.renderItems()}
			</div>
		</>
		);
	}
	render() {
		return (
			<div className="attendance-student-block">
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
AttendanceStudentBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(AttendanceStudentBlockComponent);
export const AttendanceStudentBlock = withRouter(props => <TranslatedComponent {...props}/>)
