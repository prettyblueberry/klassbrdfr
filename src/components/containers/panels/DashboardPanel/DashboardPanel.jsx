import * as React from "react";
import { withTranslation } from 'react-i18next';
import {SelectSmall, DateRangePicker} from "presentational";
import {ListAPI} from "lists";
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {getQueryParameter} from "utils";
import {withRouter} from 'react-router-dom';
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";
import "./DashboardPanel.scss";

class DashboardPanelComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.list;
		this.range = {
      startDate: moment().subtract(30, 'days').startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
    };
		this.selectedYear = KRClient.getInstance().getPeriod()
		this.class = "all";
	}

	componentDidMount() {
		this.selectedYear = KRClient.getInstance().getPeriod()
			this.list.sendRequest("loadStatistic", {classroom:getQueryParameter("class","all"), range:this.getFilterRangesFromUrl()});

	}


	UNSAFE_componentWillUpdate(nextProps, nextState) {
			if( KRClient.getInstance().getPeriod() != this.selectedYear){
					this.selectedYear = KRClient.getInstance().getPeriod()
					this.list.sendRequest("loadStatistic", {classroom:getQueryParameter("class","all"), range:this.getFilterRangesFromUrl()});

			}

	}


	getClassOptions = () => {

		let result = [
			{
				value: "all",
				title: this.$t("All my classes"),
			}
		];

		KRUtils.each(KRClient.getInstance().getLinkedKlasses(),(classroomID,classroom) => {
				result.push({
					value: classroom.id,
					title: classroom.name,
				});
		});

		return result;
	}
	getFilterRangesFromUrl = () => {
		let query = getQueryParameter("range");

		if(typeof query == "string" && query.indexOf("-") > -1){
			let decoded = decodeURI(query);
			let dates = decoded.split("-");
			if(dates.length == 2){
				this.range = {
					startDate: dates[0],
					endDate: dates[1],
				};
			}
		}
		return this.range;
	}

	onChangeRange = (range) => {
		var tmp = this.getFilterRangesFromUrl();

		if(range && range.startDate && range.endDate){

			this.range = {
					startDate:Math.max(0,moment(range.startDate).startOf("day").unix()),
					endDate:moment(range.endDate).endOf("day").unix()
			}

			if(tmp == null || (tmp != null && (this.range.startDate != tmp.startDate || this.range.endDate != tmp.endDate))){

				this.list.changeQueryURL(
					{"range": this.range.startDate+'-'+this.range.endDate},
					this.props.history,
					"loadStatistic", {classroom:this.class, range:this.range});

			}

		}
	}

	onChangeClass = (value) => {

		if(this.class != value){
			this.class = value;
			this.list.changeQueryURL(
				{class: value},
				this.props.history,
				"loadStatistic",{classroom:this.class, range:this.range})
		}

	}
	render() {
		return (
			<div className="dashboard-panel">

				<div className="dashboard-panel__left">

				</div>
				<div className="dashboard-panel__right">
					<SelectSmall
						style={{width: "200px"}}
						value={getQueryParameter("class","all")}
						onChange={this.onChangeClass}
						label={this.$t("Display")}
						items={this.getClassOptions()}
					/>
					<DateRangePicker
						className="dashboard-panel__range"
						selectionRange={this.getFilterRangesFromUrl()}
						onChange={(range) => this.onChangeRange(range)}
						label={this.$t("Date")}
					/>

				</div>

			</div>
		);
	}
}
DashboardPanelComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DashboardPanelComponent);
export const DashboardPanel = withRouter(props => <TranslatedComponent {...props}/>)
