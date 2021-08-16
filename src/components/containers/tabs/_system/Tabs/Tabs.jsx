import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./Tabs.scss";

import {KRColor, KREvent} from "@klassroom/klassroom-sdk-js";

class TabsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.activeIndex = this.props.activeIndex || 0;
		this.handleEvent = (ev, opts)=>{
				switch(ev){
						case KREvent.counts_updated:
							this.forceUpdate();
							break;
				}
		}


		//KRClient.getInstance().addListener(this,this.handleEvent);
	}

	componentWillUnmount(){
		//KRClient.getInstance().removeListener(this);
	}


	changeIndex = (index) => {
		this.activeIndex = index;
		this.props.onSelect(index)
		this.forceUpdate();
	}
	getStyle = (tabProperties, isActive) => {
		let style = {};
		if(tabProperties.color){
			style.color = KRColor[tabProperties.color];
			if(isActive){
				style.background = KRColor[tabProperties.color];
				style.color = "#fff";
			}
		}
		let visibledTabs = this.props.tabs.filter((tab, index) => {
			if(typeof tab.visible == "boolean" && !tab.visible){
				return false;
			}
			return true;
		});
		style.width = (100 / visibledTabs.length) + "%";
		return style;
	}
	getActiveTab = () => {
		let activeTab = null;
		this.props.tabs.some((tab, index) => {
			if(index == this.activeIndex){
				activeTab = tab;
			}
		});
		return activeTab;
	}
	renderTabs = () => {
		return this.props.tabs.map((tabProperties, index) => {
			if(typeof tabProperties.visible == "boolean" && !tabProperties.visible){
				return null;
			}
			return (
				<li style={this.getStyle(tabProperties, false)} key={"react-tab-"+index} onClick={() => this.changeIndex(index)} className={"react-tabs__tab"}>
				{tabProperties.title}
				{tabProperties.badge && tabProperties.badge.value > 0 && <span className={"pill "+tabProperties.badge.title}>{tabProperties.badge.value}</span>}
				</li>
			)
		});
	}
	renderActiveTab = () => {
		const activeTab = this.getActiveTab();
		if(activeTab){
			let style = this.getStyle(activeTab, true);
			style.left = (style.width.replace("%", "") * this.activeIndex) + "%";
			return (
			<div style={style} className="react-tabs__active-tab">
				{activeTab.title}
			</div>)
		}
		return null;
	}

	renderSipleDesign = () => {
		return (
			<ul className="react-tabs__simple-tabs">
					{
						this.props.tabs.map((tab, idx) => {
							const active = this.activeIndex === idx ? 'react-tabs__simple-tabs-item-active' : '';
							return (
								<li key={idx}
									className={`react-tabs__simple-tabs-item ${active}`}
									onClick={e => this.changeIndex(idx)}>
									{tab.title}
									{tab.badge && tab.badge.value > 0 && <span className={"simple-pill"}>{tab.badge.value}</span>}
								</li>
							)
						})
					}
			</ul>
		)
	}

	renderDefault = () => {
		return (
			<>
			<ul className="react-tabs__tabs">
				{this.renderTabs()}
			</ul>
			{this.renderActiveTab()}
			</>
		)
	}
	render() {
		return (
		<div className="react-tabs-container">
			<div className="react-tabs">
				{
					this.props.simpleDesign ? this.renderSipleDesign() : this.renderDefault()
				}
			</div>
		</div>)
	}
}
TabsComponent.propTypes = {
	onSelect: PropTypes.func,
	tabs: PropTypes.array,
	simpleDesign: PropTypes.bool
}
export const Tabs = withTranslation()(TabsComponent)
