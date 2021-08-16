import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {MemberItem} from "../../../presentational";
import "./ListMembers.scss";

class ListMembersComponent extends React.Component {
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
	getMembers = () => {
		return this.getParent().state.members;
	}
	getCheckedMembers = () => {
		return this.getParent().state.checkedMembers
	}
	onToggle = (checked, member) => {
		if(!checked) {
			this.getParent().onUncheck(member);
		} else {
			this.getParent().onCheck(member);
		}
	}
	isChecked = (member) => {
		return this.getParent().isChecked(member);
	}
	getMenuItems(member) {
		return [
			{text: this.$t("action 1"), callback: () => {
				
			}},
			{text: this.$t("action 2"), callback: () => {

			}},
			{text: this.$t("action hidden"), callback: () => {}, visible: false},
		];
	}
	renderItems() {
		return this.getMembers().map((member, index) => {
			return <MemberItem
				checked={this.isChecked(member)}
				onToggle={this.onToggle}
				member={member}
				key={`member_${index}`}
				menuItems={this.getMenuItems(member)}
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
ListMembersComponent.propTypes = {
	parentAPI: PropTypes.object.isRequired
}
export const ListMembers = withTranslation()(ListMembersComponent)
