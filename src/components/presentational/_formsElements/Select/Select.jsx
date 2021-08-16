import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes, { array } from 'prop-types';
import {deepEqual} from "../../../../lib/Utils";
import { Link } from 'react-router-dom';
import classnames from "classnames";
import "./Select.scss";
import {KRUtils} from "@klassroom/klassroom-sdk-js";

export class SelectComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			isShowing: false,
			focusedItem: null,
		}
		this.refScroll = React.createRef();
		this.setItems();
	}
	componentDidMount() {
		this.addEventsListeners();
	}
	componentWillUnmount() {
		this.removeEventsListeners();
	}
	shouldComponentUpdate() {
		this.setItems();
		return true;
	}
	setItems () {
		if(this.props.useEmptyValue) {
			this.items = [{
				value: "",
				title: "",
			},
			...this.props.items
			];
		} else {
			this.items = [
			...this.props.items
			];
		}
	}
	addEventsListeners(){
		window.addEventListener("click", this.hideList);
	}
	removeEventsListeners(){
		window.removeEventListener("click", this.hideList);
	}
	// fixed translation bug (value not be translated)
	getValue(){
		return this.props.value;
	}
	getItemByValue(value) {
		let foundItem = null;
		this.items.some((item) => {
			if(deepEqual(item.value, value)) {
				foundItem = item;
				return true;
			}
			return false;
		});
		return foundItem;
	}
	getFocusedItem() {
		return this.state.focusedItem;
	}
	getValueFocusedItem() {
		return this.getFocusedItem() ? this.getFocusedItem().value : null;
	}
	toggleShowingList = (event) => {
		event.stopPropagation();
		this.setState({
			isShowing: !this.state.isShowing
		}, () => {
			const item = this.getItemByValue(this.props.value);
			if(item) {
				this.setFocusedItem(item);
			}
		});
	}
	hideList = () => {
		if(this.state.isShowing) {
			this.resetScroll();
			this.setState({
				isShowing: false,
				focusedItem: null
			});
		}
	}
	getTittleOfValue = () => {
		const value = this.getValue();
		let title = "";
		this.items.some((item, index) => {
			if(deepEqual(item.value, value)) {
				title = item.title;
				return true;
			}
			return false;
		});
		return this.props.showValueInSelection ? this.props.showValueInSelection : title;
	}
	changeValue = (item) => {
		if(item) {
			this.props.onChange(item.value);
		}
	}
	setFocusedItem(item) {
		this.setState(
			{
				focusedItem: item
			},
			this.updateScroll
		);
	}
	blurItem() {
		this.setState(
			{
				focusedItem: null
			},
			this.resetScroll
		);
	}
	findIndexByItem(item) {
		if(item) {
			return this.items.findIndex((_item) => {
				return deepEqual(item.value,  _item.value);
			});
		}
		return -1;
	}
	updateScroll = () => {
		const index = this.findIndexByItem(this.getFocusedItem());
		const element = document.querySelector(`.select-input__list-item[tabindex="${index}"]`);
		if(element){
			element.focus();
		}
	}
	resetScroll = () => {
		const index = this.findIndexByItem(this.getFocusedItem());
		const element = document.querySelector(`.select-input__list-item[tabindex="${index}"]`);
		const scrollElement = this.refScroll;
		if(element){
			element.blur();
		}
		if(scrollElement && scrollElement.current) {
				scrollElement.current.scrollTop = 0;
		}
	}
	upFocus() {
		if(!this.getFocusedItem()) {
			this.setFocusedItem(this.items[this.items.length - 1]);
		} else {
			const index = this.findIndexByItem(this.getFocusedItem());
			if(0 !== index ) {
				this.setFocusedItem(this.items[index - 1]);
			} else {
				this.setFocusedItem(this.items[this.items.length - 1]);
			}
		}
	}
	downFocus() {
		if(!this.getFocusedItem()) {
			this.setFocusedItem(this.items[0]);
		} else {
			const index = this.findIndexByItem(this.getFocusedItem());
			if((this.items.length - 1) !== index ) {
				this.setFocusedItem(this.items[index + 1]);
			} else {
				this.setFocusedItem(this.items[0]);
			}
		}
	}
	setFocusByChar(char) {
		const self = this;
    const elements = document.querySelectorAll(`.select-input__list-item`);
		KRUtils.each(elements, function(key,val){
			let s = val.innerText.toLowerCase();
			if(s.substr(0,1) == char.toLowerCase()){
				self.setFocusedItem(self.props.items[val.getAttribute('tabindex')]);
				return false;
			}
		})


	}
	onPressKeyBoard = (event) => {
		event.preventDefault();
		if(!this.state.isShowing) {
			if (event.key === 'Enter') {
				this.toggleShowingList(event);
			}
		} else {
			if (event.key === 'Escape') {
				this.hideList();
			}
			else if (event.key === 'Enter') {
				this.changeValue(this.getFocusedItem());
			}
			else if (event.keyCode == '38') {
				// up arrow
				this.upFocus();
    	}
			else if (event.keyCode == '40') {
				// down arrow
				this.downFocus();
			} else {
				this.setFocusByChar(String.fromCharCode(event.keyCode));
			}
		}
	}

	getClassesForRoot() {
		return classnames(
			{
				"select-input": true,
				"select-input--showing": this.state.isShowing
			}
		);
	}
	renderList() {
		let items = this.items;
		return items.map((item, index) => {
			return <div style={this.props.styleItem || {}} data-char={item.title[0]} tabIndex={index} onClick={() => this.changeValue(item)} key={index} className={classnames({
				"select-input__list-item": true,
				"selected": deepEqual(item.value, this.getValue()),
				"focused": deepEqual(item.value, this.getValueFocusedItem())
			})}>
				{item.title}
			</div>
		});
	}
	renderValue() {
		const value = this.getValue();
		if(this.props.placeholder && (!value || value == "")) {
			return <div className="select-input__placeholder">{this.props.placeholder}</div>
		}
		return <div className="select-input__value">{this.getTittleOfValue()}</div>
	}
	render() {
		return (
			<div tabIndex="0" onKeyDown={this.onPressKeyBoard} onClick={this.toggleShowingList} className={this.getClassesForRoot()}>
				<span className="select-input__label">{this.props.label}</span>
				{this.renderValue()}
				<img className="select-input__arrow" src="/public/k-img/icons/arrow-bottom-black.svg"/>
				<div ref={this.refScroll} className="select-input__list">
					{this.renderList()}
				</div>
			</div>
		);
	}
}
SelectComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	styleItem: PropTypes.object,
	showValueInSelection: PropTypes.string,
	useEmptyValue: PropTypes.bool,
}
export const Select = withTranslation()(SelectComponent)
