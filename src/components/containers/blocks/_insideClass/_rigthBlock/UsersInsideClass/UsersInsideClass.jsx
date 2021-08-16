import * as React from "react";
import { withTranslation } from 'react-i18next';
import {UserInsideClass} from "presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {withRouter} from 'react-router-dom';
import {queryStringToObject} from "utils";
import PropTypes from 'prop-types';
import "./UsersInsideClass.scss";
import {KRKlass} from "@klassroom/klassroom-sdk-js";

class UsersInsideClassComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.refRoot = React.createRef();
		this.klass = this.props.klass || new KRKlass();
		this.selectedGroupType = 'members';

	}
	componentDidMount() {
	}

	componentWillUnmount(){

	}

	componentWillUpdate(nextProps, nextState) {
			if(!this.klass || !this.klass.id){
				this.klass = nextProps.klass;

			}
	}

	addEventsListeners(){

	}

	removeEventsListeners(){

	}

	renderSelectedGroupType = () => {
		const selectedGroup = this.selectedGroupType;

		return (
			<span className="users-inside-class__top-panel-h1">
				{this.$t("{{group}}", {group: selectedGroup})}
			</span>
		)
	}

	renderMembersCount = () => {
		const count = this.selectedGroupType === 'members' ?
		   Object.values(this.klass.active_members).length :
		   Object.values(this.klass.students).length;
		return <span className="users-inside-class__top-panel-count">{count}</span>

	}

	renderMenu = () => {
		const items = [
			{ text: this.$t('Members'), callback: e => this.changeType("members") },
			{ text: this.$t('Students'), callback: e => this.changeType("students") }
		];

		return (
			<PopupMenu
              alignRight={true}
              className="class-item-left__popup"
              items={items}
            >
              <div className="icon klassicon-customize"></div>
            </PopupMenu>
		)
	}

	renderList(){
		const sortByName = (a, b) => {
			if (a.user && b.user) {
				return a.user.last_name > b.user.last_name ? 1 : -1;
			} else {
				return a.last_name > b.last_name ? 1 : -1;
			}
		}
		const students = Object
				   .values(this.klass.students)
				   .sort(sortByName);

		const members = Object
				   .values(this.klass.active_members)
				   .sort(sortByName);

		switch (this.selectedGroupType) {
			case 'members':

				return members.map((user) => {
					const student = students.filter(item => item.members[user.id] != null );
					return <UserInsideClass member={user} key={user.id} simple={true}/>
				});

			case 'students':

				return students.map(user => {
					return  <UserInsideClass member={user} key={user.id} />
				})
		}
	}

	changeType = (type) => {
		this.selectedGroupType = type;
		this.forceUpdate();
	}

	getValueFromURL = () => {
		let type = queryStringToObject().type || "members";
		return decodeURI(type);
	}

	render() {
		return (
			<div ref={this.refRoot} className="users-inside-class">
				{this.klass &&
				<div className="users-inside-class__top-panel">
					{this.renderSelectedGroupType()}
					{this.renderMembersCount()}
					{this.renderMenu()}
					{/* <button onClick={() => {this.changeType("members")}} className={"users-inside-class__top-panel-b1 " + ((this.getValueFromURL() == "members") ? "users-inside-class__top-panel--active" : "")}>{this.$t("Members")}</button>
					●
					<button onClick={() => {this.changeType("students")}} className={"users-inside-class__top-panel-b2 " + ((this.getValueFromURL() !== "members") ? "users-inside-class__top-panel--active" : "")}>{this.$t("Students")}</button> */}
				</div>}
				{this.klass && <div className="users-inside-class__user-list">
					{this.renderList()}
				</div>
				}
			</div>
		);
	}
}
UsersInsideClassComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(UsersInsideClassComponent);
export const UsersInsideClass = withRouter(props => <TranslatedComponent {...props}/>)
