import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./YearSelector.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js"
import {ModalManager} from "containers/modals"

export class YearSelectorComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	gerCurrentYear() {
		let date = new Date();
		return date.getFullYear();
	}
	getSelectedYear() {
		return this.props.selectedYear ? this.props.selectedYear : this.gerCurrentYear();
	}
	getNextYear(year) {
		return new Date(new Date().setFullYear(year + 1)).getFullYear();
	}
	getPreviousYear(year) {
		return new Date(new Date().setFullYear(year - 1)).getFullYear();
	}
	getSelectedYearLabel() {
		return `${this.getSelectedYear()}-${this.getNextYear(this.getSelectedYear())}`;
	}
	getPreviousYearLabel() {
		return `${this.getPreviousYear(this.getSelectedYear())}-${this.getSelectedYear()}`;
	}
	getNextYearLabel() {
		return `${this.getNextYear(this.getSelectedYear())}-${this.getNextYear(this.getNextYear(this.getSelectedYear()))}`;
	}
	selectPrevYear = () => {
		const prevYear = this.getPreviousYear(this.getSelectedYear());
		this.actionSelectYear(prevYear);
		//this.props.callbackSelectYear(prevYear);
	}
	selectNextYear = () => {
		const nextYear = this.getNextYear(this.getSelectedYear());
		this.actionSelectYear(nextYear);
		//this.props.callbackSelectYear(nextYear);
	}

	actionSelectYear = (year) => {

		KRClient.getInstance().setPeriod(year)
		window.showLoader(this.$t("Loading school year {{year1}}-{{year2}}",{year1:year,year2:(year+1)}))
		KRClient.getInstance().connect()
			.then(()=> {
				this.setState({
					selectedYear: year
				});
			})
			.catch((error) => {
					if(error.code == 500){
							ModalManager.getInstance().alert(this.$t("Error"), error.message);
					}
			})
			.finally(()=>window.hideLoader());

	}

	render() {
		return (
			<div className="year-selector">
				<div onClick={this.selectPrevYear} className="year-selector__left"><img className="year-selector__arrow" src="/public/k-img/icons/back-left-gray.svg"/> {this.getPreviousYearLabel()}</div>
				<div className="year-selector__center">
					<div className="year-selector__year">{this.$t("SCHOOL YEAR")}</div>
					<div className="year-selector__selected-year">{this.getSelectedYearLabel()}</div>
				</div>
				<div onClick={this.selectNextYear} className="year-selector__right">{this.getNextYearLabel()} <img className="year-selector__arrow" src="/public/k-img/icons/back-right-gray.svg"/></div>
			</div>
		);
	}
}
YearSelectorComponent.propTypes = {
	selectedYear: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),

}
export const YearSelector = withTranslation()(YearSelectorComponent)
