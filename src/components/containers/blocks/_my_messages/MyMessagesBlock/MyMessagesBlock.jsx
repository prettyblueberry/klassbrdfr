import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {MessagesTabs} from "../../../tabs";
import {YearSelector, HeaderPage, Button} from "presentational";
import {ListAPI} from "lists";
import {MessagesListPanel} from "panels";
import {MessagesData} from "mockup-data";
import "./MyMessagesBlock.scss";
import {KRClient,KREvent} from "@klassroom/klassroom-sdk-js";

class MyMessagesBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);


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

	getSelectedYear() {
		return KRClient.getInstance().getPeriod();
	}

	sendMessage = (event) => {
		event.preventDefault();
		this.props.history.push(`/choose-message`);
	}

	onFilter = (value) => {
		this.list.changeQueryURL(
			value,
			this.props.history,
			"loadCampaigns"
		);
	}

	renderHeader() {
		return (
			<div className="my-messages-block__header">

				<HeaderPage icon="campaign" text={this.$t("My Messages")}/>

				<div className="my-messages-block__header-right">
					<Button
							name={this.$t("Post a message")}
							iconType="write-message-white"
							iconSide="left"
							typeDesign="primary"
							onClick={this.sendMessage}
						/>
				</div>

			</div>
		)
	}


	render() {
		return (
			<div className="my-messages-block">
				{this.renderHeader()}
				<YearSelector
					selectedYear={this.getSelectedYear()}

				/>
				<MessagesListPanel listAPI={this.list} onFilter={this.onFilter}/>
				<MessagesTabs listAPI={this.list} onFilter={this.onFilter}/>
			</div>
		);
	}
}
MyMessagesBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(MyMessagesBlockComponent);
export const MyMessagesBlock = withRouter(props => <TranslatedComponent {...props}/>)
