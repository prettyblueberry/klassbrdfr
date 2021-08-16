import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';


import {Button, YearSelector} from "presentational";
import {DashboardPanel} from "panels";
import {DashboardStatistic} from "mockup-data";
import { DotLoader } from 'react-spinners';
import {
	LevelDashboard,
	StatsNumber,
	StatsBar,
	StatsLine,
	PublicationsShared,
	ViewsNumber,
	ReactionsNumber,
} from "blocks";
import {ListAPI} from "lists";
import "./DashboardBlock.scss";
import {KRClient, KRUtils, KRColor, KREvent} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class DashboardBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);
		this.statistic = null;
		this.isLoading = true;
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

componentDidMount() {
	KRClient.getInstance().addListener(this,(event, options)=>{
			if(event == KREvent.app_connect){
					this.forceUpdate()
			}
	});
}

componentWillUnmount(){
	KRClient.getInstance().removeListener(this);
}



	createClass = (event) => {
		event.preventDefault();
		this.props.history.push('/add-class')
	}

	linkClass = (event) => {
		event.preventDefault();
		this.props.history.push('/my-classes')
	}

	getSelectedYear() {
		return KRClient.getInstance().getPeriod();
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

		if(Object.values(KRClient.getInstance().classrooms).length == 0){

			return (
				<>
					<div className="dashboard-block__epmty">
						<img className="dashboard-block__epmty-img" src="/public/k-img/icons/dashboard-empty.svg"/>
						<p className="dashboard-block__epmty-title" dangerouslySetInnerHTML={{__html: this.$t("You haven't created <b>any classes</b>!")}}></p>
						<p className="dashboard-block__epmty-desc">{this.$t("It's empty! It seems like you have not added any classes this year.")}</p>
					</div>
					<Button name={this.$t("Start my school year")} iconType="add-white" iconSide="left" typeDesign="primary" onClick={this.createClass}/>
				</>
			)

		}else{

			return (
				<>
					<div className="dashboard-block__epmty">
						<img className="dashboard-block__epmty-img" src="/public/k-img/icons/dashboard-empty.svg"/>
						<p className="dashboard-block__epmty-title" dangerouslySetInnerHTML={{__html: this.$t("You haven't linked <b>any classes</b> to Klasroom classes!")}}></p>
						<p className="dashboard-block__epmty-desc">{this.$t("To see your data, you need to link your school classes to Klassroom classes.")}</p>
					</div>
					<Button name={this.$t("Link my classes")} iconType="add-white" iconSide="left" typeDesign="primary" onClick={this.linkClass}/>
				</>
			)


		}

	}

	getViewsByKlass = ()=>{
			var data = [];

			if(this.statistic && this.statistic.postKlass){
				KRUtils.each(this.statistic.postKlass,(key,value)=>{
					 var classroom  = KRClient.getInstance().findClassroomFromKlassID(key);
					 if(classroom){
						 data.push({name:classroom.name, value:KRUtils.round(value.viewsAvg*100,2)})
					 }
				});
			}

			return data;
	}


	getReactionsByKlass = ()=>{
			var data = [];

			if(this.statistic && this.statistic.postKlass){
					KRUtils.each(this.statistic.postKlass,(key,value)=>{
					 var classroom  = KRClient.getInstance().findClassroomFromKlassID(key);
					 if(classroom){
						 data.push({name:classroom.name, value:value.reactionsCount})
					 }
				});
			}


			return data;
	}
	getReactionsByDates = ()=>{
			var data = [];

			if(this.statistic && this.statistic.postKlass){
				KRUtils.each(this.statistic.postDate,(key,value)=>{
						let val = value.reactionsCount?value.reactionsCount:0;
						 if(val) data.push({name:moment(key).locale(this.i18n.language).locale(this.i18n.language).format("l"), value:value.reactionsCount?value.reactionsCount:0})
				});
			}

			data.sort((a,b)=>{
				return moment(a.name).unix() > moment(b.name).unix() ? 1 : -1;
			})

			return data;
	}

	getViewsByDates = ()=>{
			var data = [];

			if(this.statistic && this.statistic.postKlass){
				KRUtils.each(this.statistic.postDate,(key,value)=>{
					let val = value.viewsAvg?value.viewsAvg:0;

						 if(val) data.push({name:moment(key).format("l"), value:KRUtils.round((value.viewsAvg?value.viewsAvg:0)*100,2)})
				});
			}

			data.sort((a,b)=>{
				return moment(a.name).unix() > moment(b.name).unix() ? 1 : -1;
			})

			return data;
	}


	renderDashboard(){

		return <div className="dashboard-block__page">
			{/*<LevelDashboard level={this.statistic.levelDashboard.level}/>*/}
			<DashboardPanel list={this.list}/>

			{this.isLoading && <><br/><br/>
				<DotLoader
							sizeUnit={"px"}
							size={50}
							color={'#1f9aff'}
							loading={true}
							css={{"display":"inline-block"}}
						/></>}


			{!this.isLoading && this.statistic &&
			<>
			<div className="dashboard-block__page-statistic">
				<StatsNumber title={this.$t("Members")} number={this.statistic.total.members || 0}/>
				<StatsNumber title={this.$t("Students")} number={this.statistic.total.students || 0}/>
			</div>
			<div className="dashboard-block__page-statistic">
				<StatsBar title={this.$t("% Avg Views by Classes")} total={KRUtils.round((this.statistic.total.viewsAvg || 0)*100,2)} data={this.getViewsByKlass()} label={this.$t("Views")} unit="%" color={KRColor.krBlue}/>
				<StatsLine title={this.$t("% Avg Views by Dates")}  total={KRUtils.round((this.statistic.total.viewsAvg || 0)*100,2)} data={this.getViewsByDates()} label={this.$t("Views")} unit="%" color={KRColor.krOrange}/>

			</div>
			<PublicationsShared documents={this.statistic.documents}/>
			<div className="dashboard-block__page-statistic">
			<StatsBar title={this.$t("Reactions by Classes")}  total={this.statistic.total.reactionsCount} data={this.getReactionsByKlass()} label={this.$t("Reactions")} color={KRColor.krRed}/>
			<StatsLine title={this.$t("Reactions by Dates")}  total={this.statistic.total.reactionsCount} data={this.getReactionsByDates()} label={this.$t("Reactions")} color={KRColor.krTurquoise}/>

			</div>
			{/*<div className="dashboard-block__page-statistic">
				<StatsBar statistic={this.statistic.StatsBar}/>
				<StatsLine statistic={this.statistic.StatsLine}/>
			</div>
			<PublicationsShared statistic={this.statistic.publicationsShared}/>
			<div className="dashboard-block__page-statistic">
				<ViewsNumber statistic={this.statistic.viewsNumber}/>
				<ReactionsNumber statistic={this.statistic.reactionsNumber}/>
			</div>*/}
			</>}
		</div>
	}
	render() {
		return (
			<div className="dashboard-block">

				{this.renderHeader()}
				<YearSelector
					selectedYear={this.getSelectedYear()}
				/>
				{KRClient.getInstance().getLinkedKlassesCount() == 0 && this.renderEmptyDashboard()}
				{KRClient.getInstance().getLinkedKlassesCount() > 0 && this.renderDashboard()}
			</div>
		);
	}
}
DashboardBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DashboardBlockComponent);
export const DashboardBlock = withRouter(props => <TranslatedComponent {...props}/>)
