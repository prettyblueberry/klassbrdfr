import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';
import {DashboardPanel} from "panels";
import {CircleProgress, YearSelector, UserIcon, RoundIconMiddle} from "presentational";
import {StatsLine, StatsBar} from "blocks";
import {ListAPI} from "lists";
import {KRClient, KRColor} from "@klassroom/klassroom-sdk-js";
import "./DashboardAttendanceBlock.scss";
import {ModalManager} from "containers/modals"

class DashboardAttendanceBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);
		this.list.setRequests(
			{
				loadStatistic: (quiresURL, params, data) => {
					return new Promise((resolve, reject) => {
						//here statistic is loaded
						//this.statistic = DashboardStatistic;
						data = Object.assign({},data);
						this.isLoading = true;
						this.statistic = null;
						this.forceUpdate();

						var classroom = (data.classroom) || "all";
						var range = (data.range) || {startDate:moment().startOf("day").unix(),endDate:moment().endOf("day").unix()}

							var start = (range.startDate instanceof Date) ? range.startDate :  new Date(range.startDate * 1000);
							var end = (range.endDate instanceof Date) ? range.endDate :  new Date(range.endDate * 1000);

								KRClient.getInstance().loadStats(classroom == "all" ? null : classroom,start,end).then((stats)=>{

										this.statistic = stats;


								}).catch((err)=>{


									ModalManager.getInstance().alert(this.$t("Error"), err.message);
								}).finally(()=>{

									this.isLoading = false;
									this.forceUpdate();

								});



						this.forceUpdate();
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
				this.setState({
					selectedYear: year
				}, () => {
					this.forceUpdate();
				});
      })
      .catch((error) => {
          if(error.code == 500){
              ModalManager.getInstance().alert(this.$t("Error"), error.message);
          }
      }).finally(()=>hideLoader());
	}
	renderHeader() {
		return (
			<div className="dashboard-block__header">

				<div className="dashboard-block__header-left">
					<img className="dashboard-block__header-img" src="/public/k-img/icons/dashboard-blue.svg"/>
					<span className="dashboard-block__header-title">{this.$t("Dashboard")}</span>
				</div>

				<div className="dashboard-block__header-right">

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
	getViewsByDates = () => {
		return [
			{name: moment(new Date()).format("l"), value: 50},
			{name: moment(new Date()).format("l"), value: 20},
			{name: moment(new Date()).format("l"), value: 70},
		]
	}
	getAttendanceMonitoring = () => {
		return [
			{name: 1, value: 10},
			{name: 2, value: 40},
			{name: 3, value: 70},
			{name: 4, value: 150},
			{name: 5, value: 40},
			{name: 6, value: 30},
			{name: 7, value: 50},
			{name: 8, value: 10},
			{name: 9, value: 10},
			{name: 10, value: 10},
			{name: 11, value: 10},
			{name: 12, value: 10},
			{name: 13, value: 10},
			{name: 14, value: 10},
			{name: 15, value: 10},
			{name: 16, value: 10},
			{name: 17, value: 10},
			{name: 18, value: 70},
			{name: 19, value: 10},
			{name: 20, value: 10},
			{name: 21, value: 90},
			{name: 22, value: 77},
			{name: 23, value: 10},
			{name: 24, value: 10},
			{name: 25, value: 10},
			{name: 26, value: 10},
			{name: 27, value: 10},
			{name: 28, value: 10},
			{name: 29, value: 10},
			{name: 30, value: 10},
		]
	}
	renderClasses = () => {
		return <>
			<div className="dashboard-block-classes">
				<div className="dashboard-block-classes-icon">
					<RoundIconMiddle icon="my-classes" color="blue"/>
				</div>
				<div className="dashboard-block-classes__h2">
					CP
				</div>
				<div className="dashboard-block-classes__h1">
					{this.$t("Most presence")}
				</div>
				<div className="dashboard-block-classes__h3">
					<span className="dashboard-block-classes__h3-absense">1</span>
					<span className="dashboard-block-classes__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-classes__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-classes__h5">
					{this.$t("See detail")}
				</div>
			</div>
			<div className="dashboard-block-classes">
				<div className="dashboard-block-classes-icon">
					<RoundIconMiddle icon="my-classes" color="blue"/>
				</div>
				<div className="dashboard-block-classes__h2">
					CP
				</div>
				<div className="dashboard-block-classes__h1">
					{this.$t("Most presence")}
				</div>
				<div className="dashboard-block-classes__h3">
					<span className="dashboard-block-classes__h3-absense">1</span>
					<span className="dashboard-block-classes__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-classes__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-classes__h5">
					{this.$t("See detail")}
				</div>
			</div>
			<div className="dashboard-block-classes">
				<div className="dashboard-block-classes-icon">
					<RoundIconMiddle icon="my-classes" color="blue"/>
				</div>
				<div className="dashboard-block-classes__h2">
					CP
				</div>
				<div className="dashboard-block-classes__h1">
					{this.$t("Most presence")}
				</div>
				<div className="dashboard-block-classes__h3">
					<span className="dashboard-block-classes__h3-absense">1</span>
					<span className="dashboard-block-classes__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-classes__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-classes__h5">
					{this.$t("See detail")}
				</div>
			</div>
		</>
	}
	renderListStudents = () => {
		return <>
			<div className="dashboard-block-student">
				<div className="dashboard-block-student__user">
					<UserIcon name="Test user"/>
				</div>
				<div className="dashboard-block-student__h1">
					<b>Barantin</b> Grégoire
				</div>
				<div className="dashboard-block-student__h2">
					CP
				</div>
				<div className="dashboard-block-student__h3">
					<span className="dashboard-block-student__h3-absense">1</span>
					<span className="dashboard-block-student__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-student__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-student__h5">
					{this.$t("See detail")}
				</div>
			</div>

			<div className="dashboard-block-student">
				<div className="dashboard-block-student__user">
					<UserIcon name="Test user"/>
				</div>
				<div className="dashboard-block-student__h1">
					<b>Barantin</b> Grégoire
				</div>
				<div className="dashboard-block-student__h2">
					CP
				</div>
				<div className="dashboard-block-student__h3">
					<span className="dashboard-block-student__h3-absense">1</span>
					<span className="dashboard-block-student__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-student__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-student__h5">
					{this.$t("See detail")}
				</div>
			</div>

			<div className="dashboard-block-student">
				<div className="dashboard-block-student__user">
					<UserIcon name="Test user"/>
				</div>
				<div className="dashboard-block-student__h1">
					<b>Barantin</b> Grégoire
				</div>
				<div className="dashboard-block-student__h2">
					CP
				</div>
				<div className="dashboard-block-student__h3">
					<span className="dashboard-block-student__h3-absense">1</span>
					<span className="dashboard-block-student__h3-text">{this.$t("Absence")}</span>
				</div>

				<div className="dashboard-block-student__h4">
					{this.$t("Most present student")}
				</div>
				<div className="dashboard-block-student__h5">
					{this.$t("See detail")}
				</div>
			</div>


		</>
	}
	renderDashboard() {
		return (
		<div className="dashboard-block__page">
			{/*<LevelDashboard level={this.statistic.levelDashboard.level}/>*/}
			<DashboardPanel list={this.list}/>

			<div className="dashboard-block__page-block-first">
				<div className="dashboard-block__h1" dangerouslySetInnerHTML={{__html: this.$t("<b>Attendance level</b> of your classes")}}></div>
				<CircleProgress level={5}/>
				<div className="dashboard-block__h2">
					{this.$t("Very good")}
				</div>
				<div className="dashboard-block__h3">
					{this.$t("How to improve my rating?")}
				</div>
				<img className="dashboard-block__left-unicorn" src="/public/unicorns/unicorn-left.svg"/>
				<img className="dashboard-block__right-unicorn" src="/public/unicorns/unicorn-right.svg"/>
			</div>

			<div className="dashboard-block__page-block-second">
				<StatsLine title={this.$t("Absence this year")}  total={40} data={this.getViewsByDates()} label={this.$t("Views")} unit="%" color={KRColor.krRed}/>
				<div></div>
				<StatsLine title={this.$t("Delays this year")}  total={80} data={this.getViewsByDates()} label={this.$t("Views")} unit="%" color={KRColor.krOrange}/>
			</div>

			<div className="dashboard-block__panel">
				<div className="dashboard-block__page-block-left">
					{this.$t("Student attendance tracking")}
				</div>
				<div className="dashboard-block__page-block-right">
					{this.$t("See all students")}
				</div>
			</div>

			<div className="dashboard-block__list-students">
				{this.renderListStudents()}
			</div>

			<div className="dashboard-block__panel">
				<div className="dashboard-block__page-block-left">
					{this.$t("Attendance monitoring")}
				</div>
				<div className="dashboard-block__page-block-right">
					{this.$t("See all absences")}
				</div>
			</div>

			<div className="dashboard-block__monitoring">
				<StatsBar title={""} total={80} data={this.getAttendanceMonitoring()} label={this.$t("Views")} unit="" color={"rgb(245, 171, 171)"}/>
				<div className="dashboard-block__monitoring-bottom">
					<div className="dashboard-block__monitoring-left"><span className="icon klassicon-back"></span>January 2019</div>
					<div className="dashboard-block__monitoring-center">
						<div className="dashboard-block__monitoring-center-month">February</div>
						<div className="dashboard-block__monitoring-year">2019</div>
					</div>
					<div className="dashboard-block__monitoring-right">March 2019<span className="icon klassicon-back"></span></div>
				</div>
			</div>

			<div className="dashboard-block__panel">
				<div className="dashboard-block__page-block-left">
					{this.$t("Classes attendance tracking")}
				</div>
				<div className="dashboard-block__page-block-right">
					{this.$t("See all my classes")}
				</div>
			</div>

			<div className="dashboard-block__list-classes">
				{this.renderClasses()}
			</div>

		</div>);
	}
	render() {
		return (
			<div className="dashboard-block">
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
DashboardAttendanceBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DashboardAttendanceBlockComponent);
export const DashboardAttendanceBlock = withRouter(props => <TranslatedComponent {...props}/>)
