import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {queryStringToObject, deepEqual} from "../../../../../lib/Utils";
import {TabButton} from "../../";
import "./TabsHorizontal.scss";

class TabsHorizontalComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getTabs() {
		return this.props.tabs;
	}	
	tabIsActive(tab) {
		const currentQueries = queryStringToObject();
		const queriesInTab = tab.queries;
		const queriesInTabKeys = Object.keys(queriesInTab);
		let countEqual = 0;
		queriesInTabKeys.forEach((keyQuery) => {
			if(currentQueries[keyQuery] === queriesInTab[keyQuery]) {
				countEqual++;	
			}
		});
		if(queriesInTabKeys.length === countEqual){
			return true;
		}
		return false
	}
	getActiveTab() {
		const tabs = this.getTabs();
		let activeTab = tabs[0];
		tabs.some((tab) => {
			const isActive = this.tabIsActive(tab);
			if(isActive) {
				activeTab = tab;
				return true;
			}
			return false;
		});
		return activeTab;
	}
	renderActiveTab(){
		return this.getActiveTab().bodyJSX || null;
	}
	renderButtons() {
		return this.getTabs().map((tab, index) => {
			const isActive = JSON.stringify(this.getActiveTab().queries) == JSON.stringify(tab.queries);
			return <TabButton key={`${index}_tab`} isActive={isActive} tab={tab}/>
		});
	}
	render() {
		return (
			<div className="tabs-horizontal">
				<div className="tabs-horizontal__buttons">
					{this.renderButtons()}
				</div>
				<div className="tabs-horizontal__body">
					{this.renderActiveTab()}
				</div>
			</div>
		);
	}
}
TabsHorizontalComponent.propTypes = {
	tabs: PropTypes.array.isRequired
}
export const TabsHorizontal = withTranslation()(TabsHorizontalComponent)