import * as React from "react";
import { withTranslation } from 'react-i18next';
import {RechargeHistoryItem} from "presentational";
import {SMSCreditsData} from "../../../../../mockupData";
import {deepClone} from "utils";
import {ListAPI} from "lists";
import PropTypes from 'prop-types';
import "./RechargeHistoryList.scss";

class RechargeHistoryListComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);
		this.list.setRequests(
			{
				loadHistory: (quiresURL, params) => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							if(SMSCreditsData[params.page]) {
								let items = deepClone(SMSCreditsData[params.page].items);
								// filter. Recommend use on server.
								resolve(items);
							}
							resolve(null);
						}, 100);
					});
				},
			}
		);
	}
	componentDidMount() {
		this.addEventsListeners();
		this.list.sendRequest("loadHistory");
	}
	componentWillUnmount() {
		this.removeEventsListeners();
	}
	addEventsListeners(){
		window.addEventListener("scrollBottom", this.onScrollBottom);
	}
	removeEventsListeners(){
		window.removeEventListener("scrollBottom", this.onScrollBottom);
	}
	onScrollBottom = () => {
		this.list.sendRequest("loadHistory");
	}
	renderItems() {
		return this.list.getList().map((item, index) => {
			return <RechargeHistoryItem item={item} key={"history"+index}/>
		});
	}
	render() {
		return (
			<div className="recharge-history-list">
				<div className="recharge-history-header">
					<div>{this.$t("Selected Package")}</div>
					<div>{this.$t("Date")}</div>
					<div>{this.$t("Credits")}</div>
					<div>{this.$t("Price")}</div>
					<div></div>
				</div>
				{this.renderItems()}
			</div>
		);
	}
}
RechargeHistoryListComponent.propTypes = {

}
export const RechargeHistoryList = withTranslation()(RechargeHistoryListComponent)