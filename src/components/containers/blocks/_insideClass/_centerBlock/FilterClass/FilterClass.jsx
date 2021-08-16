import * as React from "react";
import { withTranslation } from 'react-i18next';
import {queryStringToObject} from "utils";
import PropTypes from 'prop-types';
import "./FilterClass.scss";
import {KRPost} from "@klassroom/klassroom-sdk-js";

class FilterClassComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.menuItems = [
			{
				title: this.$t("Posts"),
				id: KRPost.Filter.all,
				callback: () => {},
			},
			{
				title: this.$t("Events"),
				id: KRPost.Filter.event,
				callback: () => {},
			},
			{
				title: this.$t("Photos"),
				id: KRPost.Filter.photo,
				callback: () => {},
			},
			{
				title: this.$t("Videos"),
				id: KRPost.Filter.video,
				callback: () => {},
			},
			{
				title: this.$t("Documents"),
				id: KRPost.Filter.document,
				callback: () => {},
			},
			{
				title: this.$t("Audios"),
				id: KRPost.Filter.audio,
				callback: () => {},
			},
			{
				title: this.$t("Lists"),
				id: KRPost.Filter.list,
				callback: () => {},
			},
			{
				title: this.$t("Polls"),
				id: KRPost.Filter.poll,
				callback: () => {},
			},
			{
				title: this.$t("Locations"),
				id: KRPost.Filter.location,
				callback: () => {},
			}
		];
		this.showMenu = false;
	}
	componentDidMount() {
		this.addEventsListeners();
	}
	componentWillUnmount() {
		this.removeEventsListeners();
	}
	addEventsListeners(){
		window.addEventListener("click", this.hideMenu);
	}
	removeEventsListeners(){
		window.removeEventListener("click", this.hideMenu);
	}
	hideMenu = () => {
		this.showMenu = false;
		this.forceUpdate();
	}
	onClickMenuItem = (item) => {
		this.props.onFilter({
			filter: item.id
		})
		this.hideMenu();
	}
	renderMenuItems(){
		return this.menuItems.map((item, index) => {
			return (<div className="filter-class__popup-item" key={index + "filter-class__popup-item"} onClick={() => this.onClickMenuItem(item)}>
				{item.title}
			</div>)
		});
	}
	renderMenu(){
		if(!this.showMenu){
			return null;
		}
		return (
			<div onClick={(event) => {event.stopPropagation()}} className="filter-class__popup">
				{this.renderMenuItems()}
			</div>
		);
	}
	setShowMenu = (event) => {
		event.stopPropagation();
		this.showMenu = true;
		this.forceUpdate();
	}
	getActiveMenu = () => {
		let filter = queryStringToObject().filter || "";
		filter = decodeURI(filter);
		let result = this.menuItems[0];
		this.menuItems.some((item) => {
			if(item.id == filter){
				result = item;
				return true;
			}
			return false;
		});
		return result;
	}
	render() {
		return (
			<div className="filter-class">
				<div className="filter-class__container">
					<div className="icon klassicon-customize"></div>
					<span>{this.$t("Filter by")}</span>
					<span onClick={this.setShowMenu} className="filter-class__result">{this.getActiveMenu().title} <span className="filter-class__caret"></span> </span>
					{this.renderMenu()}
				</div>
			</div>
		);
	}
}
FilterClassComponent.propTypes = {
	onFilter: PropTypes.func.isRequired,
}
export const FilterClass = withTranslation()(FilterClassComponent)
