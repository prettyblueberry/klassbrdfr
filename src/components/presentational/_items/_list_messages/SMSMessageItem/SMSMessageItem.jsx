import * as React from "react";
import { withTranslation } from 'react-i18next';
import {HeaderText, HeaderTextSmall} from "presentational";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./SMSMessageItem.scss";

class SMSMessageItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getData(){
		return this.props.message;
	}
	goToDetail = () => {
		const id = this.getData().id;
		if(id){
			this.props.history.push(`/detail-sms/`+this.getData().id);
		}
	}
	renderClasses(){
		return this.getData().to.map((_class, index) => {
			if(index >= this.getData().to.length -1){
				return <span key={index} className="sms-message-item_class">{_class.label}</span>
			}
			return <span key={index} className="sms-message-item_class">{_class.label},</span>
		})
	}
	render() {
		return (
			<div onClick={this.goToDetail} className="sms-message-item">

			

				<div className="sms-message-item__icon">
					<div className="icon klassicon-sms-campaign"></div>
				</div>

				<div className="sms-message-item__description">
					<div title={this.getData().message} className="sms-message-item__description-t1">{this.getData().message}</div>
					<HeaderTextSmall className="sms-message-item__description-t2" textJSX={this.$t("SMS message")}/>
					<div className="sms-message-item__description-classes">
						<div className="icon klassicon-back"></div> {this.renderClasses()}
					</div>
				</div>

				<div className="sms-message-item__views sms-message-item__statistic">

				</div>

				<div className="sms-message-item__reactions sms-message-item__statistic">
					<div className="sms-message-item__statistic-top">
						<div className="sms-message-item__statistic-count">{this.getData().statistic.sent}</div>
					</div>

					<div className="sms-message-item__statistic-label">
						{this.$t("SMS Sent")}
					</div>
				</div>

				<div className="sms-message-item__comments sms-message-item__statistic">
					<div className="sms-message-item__statistic-top">
						<div className="sms-message-item__statistic-count">{this.getData().statistic.opened}</div>
						<div className="sms-message-item__statistic-precent">{this.getData().statistic.openedOf}%</div>
					</div>

					<div className="sms-message-item__statistic-label">
						{this.$t("SMS Opened")}
					</div>
				</div>

				<div className="sms-message-item__menu">

				</div>

			</div>
		);
	}
}
SMSMessageItemComponent.propTypes = {
	message: PropTypes.object.isRequired,
}

const TranslatedComponent = withTranslation()(SMSMessageItemComponent);
export const SMSMessageItem = withRouter(props => <TranslatedComponent {...props}/>)
