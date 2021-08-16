import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import "./RechargeHistoryItem.scss";

class RechargeHistoryItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	/**
	 *   package: "Basic Package",
        date: new Date(),
        credits: 100,
				price: 500,
				priceCurrency: €,
	 *
	 */
	render() {
		const item = this.props.item;
		const _date = moment(item.date)
		.locale(this.i18n.language)
		.format('MMMM, Do YYYY');
		return (
			<div className="recharge-history-item">
				<div className="recharge-history-item__package">{item.package}</div>
				<div className="recharge-history-item__date">{_date}</div>
				<div className="recharge-history-item__credits">{item.credits}</div>
				<div className="recharge-history-item__price">{item.price}{item.priceCurrency}</div>
				<div className="recharge-history-item__menu">
					<div className="icon klassicon-options"></div>
				</div>
			</div>
		);
	}
}
RechargeHistoryItemComponent.propTypes = {
	item: PropTypes.object.isRequired,
}
export const RechargeHistoryItem = withTranslation()(RechargeHistoryItemComponent)
