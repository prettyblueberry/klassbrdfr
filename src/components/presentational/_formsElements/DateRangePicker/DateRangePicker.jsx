import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import classnames from "classnames";
import { DateRangePicker as _DateRangePicker, createStaticRanges} from 'react-date-range';

import "./DateRangePicker.scss";

class DateRangePickerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.cacheData = this.props.selectionRange;
		this.shownDates = false;
		this.minDate = this.props.minDate || null;

		this.ranges  = createStaticRanges([
  {
    label: this.$t('Today'),
    range: () => ({
      startDate: moment().startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
    }),
  },
	{
    label: this.$t('Yesterday'),
    range: () => ({
      startDate: moment().subtract(1, 'days').startOf("day").toDate(),
      endDate: moment().subtract(1, 'days').endOf("day").toDate(),
    }),
  },
	{
    label: this.$t('Last 7 days'),
    range: () => ({
      startDate: moment().subtract(7, 'days').startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
    }),
  },
	{
    label: this.$t('Last 30 days'),
    range: () => ({
      startDate: moment().subtract(30, 'days').startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
    }),
  },
	{
    label: this.$t('This month'),
    range: () => ({
      startDate: moment().startOf("month").startOf("day").toDate(),
        endDate: moment().endOf("day").toDate(),
    }),
  },
	{
    label: this.$t('Last month'),
    range: () => ({
			startDate: moment().subtract(1, 'months').startOf("month").startOf("day").toDate(),
			endDate: moment().subtract(1, 'months').endOf("month").endOf("day").toDate(),

    }),
  },
	{
    label: this.$t('All time'),
    range: () => ({
      startDate: this.minDate ? moment(this.minDate).startOf("day").toDate() : new Date(0),
      endDate: moment().endOf("day").toDate(),
    }),
  }
]);
	}
	componentDidMount() {

	}

	componentWillUnmount() {

	}
	addEventsListeners(){
		window.addEventListener("click", this.hideDates);
	}
	removeEventsListeners(){
		window.removeEventListener("click", this.hideDates);
	}
	hideDates = () => {
		this.removeEventsListeners();
		this.shownDates = false;
		this.props.onChange(this.convertData());
		this.forceUpdate();
	}
	showDates = (event) => {
		this.addEventsListeners();
		event.stopPropagation();
		this.cacheData = this.props.selectionRange;
		this.shownDates = true;
		this.forceUpdate();
	}
	onChange = () => {
		this.hideDates();
	}
	setCacheData = (ranges) => {
		this.cacheData = ranges.selection;
		this.forceUpdate();
	}
	getResult(){
		const dates = this.getDates();
		let startDate = moment(dates.startDate).locale(this.i18n.language).format("ll");
		let endDate = moment(dates.endDate).locale(this.i18n.language).format("ll");
		if(startDate === endDate){
			return endDate;
		}
		return startDate + " - " + endDate;
	}
	convertData(){
		const data = this.cacheData;
		if(data){
			let startDate = data.startDate;
			let endDate = data.endDate;
			if(typeof startDate == "string"){
				startDate = moment.unix(startDate).toDate()
			}
			if(typeof endDate == "string"){
				endDate = moment.unix(endDate).toDate()
			}
			return {
					startDate,
					endDate,
					key: 'selection',
			}
		}
		return {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		}
	}
	getDates(){
		console.log( this.cacheData);
		const data = this.cacheData;
		if(!data){
			return {
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			}
		}
		let startDate = data.startDate;
		let endDate = data.endDate;
		if(typeof startDate == "string"){
			startDate = moment.unix(startDate).toDate()
		}
		if(typeof endDate == "string"){
			endDate = moment.unix(endDate).toDate()
		}
		return {
			startDate,
			endDate,
			key: 'selection',
		};
	}
	getRootClass() {
		let classes = {
			"date-range-picker": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}

	render() {
		return (
			<div className={this.getRootClass()}>
				<span className="date-range-picker__label">{this.props.label || ""}</span>
				<div onClick={this.showDates} className="date-range-picker__result">
					 {this.getResult()}
				</div>
				{this.shownDates &&
				<div onClick={(event) => {event.stopPropagation()}} className="date-range-picker__dates">
					<_DateRangePicker
						months={1}
						//autoFocus={true}
						ranges={[this.getDates()]}
						onChange={this.setCacheData}
						staticRanges={this.ranges}
						inputRanges={[]}
						maxDate={new Date()}
					/>
					<div className="date-range-picker__buttons"><button onClick={this.onChange}>{this.$t("Save")}</button></div>
				</div>}
			</div>
		);
	}
}
DateRangePickerComponent.propTypes = {
	selectionRange: PropTypes.object,
	onChange: PropTypes.func,
	label: PropTypes.string,
}
export const DateRangePicker = withTranslation()(DateRangePickerComponent)
