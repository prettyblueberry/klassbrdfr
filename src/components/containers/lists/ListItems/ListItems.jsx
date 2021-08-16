import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {ListItem} from "../../../presentational";
import "./ListItems.scss";

class ListItemsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getParent() {
		return this.props.parentAPI;
	}
	getItems = () => {
		return this.getParent().state.items;
	}
	getCheckedItems = () => {
		return this.getParent().state.checkedItems
	}
	onToggle = (checked, item) => {
		if(!checked) {
			this.getParent().onUncheck(item);
		} else {
			this.getParent().onCheck(item);
		}
	}
	isChecked = (item) => {
		return this.getParent().isChecked(item);
	}

	renderItems() {
		return this.getItems().map((item, index) => {
			return <ListItem
				checked={this.isChecked(item)}
				onToggle={this.onToggle}
				item={item}
				key={`item_${index}`}

			/>
		});
	}
	render() {
		return (
			<div className="list-members">
				{this.renderItems()}
			</div>
		);
	}
}
ListItemsComponent.propTypes = {
	parentAPI: PropTypes.object.isRequired
}
export const ListItems = withTranslation()(ListItemsComponent)
