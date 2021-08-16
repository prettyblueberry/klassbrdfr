import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MessageTabs_All, MessagesTabs_Multimedia, MessageTabs_SMS} from "./_tabs";
import {TabsHorizontal} from "../";
import "./MessagesTabs.scss";

class MessagesTabsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;

	}
	getTabs() {
		return [
			{
				title: this.$t("All messages"),
				queries:{
					tab: "all",
				},
				bodyJSX: <MessageTabs_All key={'tesssss'} onFilter={this.props.onFilter} listAPI={this.list} type="all"/>
			},
			{
				title: this.$t("Multimedia messages"),
				queries:{
					tab: "multimedia"
				},
				bodyJSX: <MessageTabs_All key={'tesssss'} onFilter={this.props.onFilter} listAPI={this.list} type="multimedia"/>
			},
			{
				title: this.$t("SMS messages"),
				queries:{
					tab: "sms"
				},
				bodyJSX: <MessageTabs_All key={'tesssss'} onFilter={this.props.onFilter} listAPI={this.list} type="sms"/>
			}
		]
	}
	render() {
		return <TabsHorizontal
			tabs={this.getTabs()}
		/>
	}
}
export const MessagesTabs = withTranslation()(MessagesTabsComponent)
