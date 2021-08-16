import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {CheckBox} from "../../../presentational";

import {RoundIconMiddle} from "../../";
import "./ListItem.scss";

class ListItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

	}

	getItem() {
		return this.props.item;
	}
	onToggle = () => {
		this.props.onToggle(!this.props.checked, this.getItem());
	}
	getCharIcon = () => {
		return this.getItem().title[0].toUpperCase();
	}


	render() {
		return (
			<div className="member-item">
				<div className="member-item__checkbox">
					<CheckBox
						checked={this.props.checked}
						customData={this.getItem()}
						onToggle={this.onToggle}
					/>
				</div>
				<div className="member-item__icon">
					<RoundIconMiddle char={this.getCharIcon()}/>
				</div>
				<div className="member-item__body">
					<div className="member-item__names">
						<span className="member-item__last-name">{this.getItem().title}</span>
					</div>
				</div>
			</div>
		);
	}
}
ListItemComponent.propTypes = {
	item: PropTypes.object.isRequired,
	onToggle: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
}
export const ListItem = withTranslation()(ListItemComponent)
