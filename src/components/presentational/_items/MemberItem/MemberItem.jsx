import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {CheckBox} from "../../../presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {RoundIconMiddle} from "../../";
import "./MemberItem.scss";

class MemberItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			showMenu: false
		}
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
	getMember() {
		return this.props.member;
	}
	onToggle = () => {
		this.props.onToggle(!this.props.checked, this.getMember());
	}
	getCharIcon = () => {
		return this.getMember().lastName[0];
	}
	showMenu = (event) => {
		event.stopPropagation();
		this.setState({
			showMenu: true,
		});
	}
	hideMenu = () => {
		this.setState({
			showMenu: false,
		});
	}
	getMenuItems() {
		return this.props.menuItems;
	}
	render() {
		return (
			<div className="member-item">
				<div className="member-item__checkbox">
					<CheckBox
						checked={this.props.checked}
						customData={this.getMember()}
						onToggle={this.onToggle}
					/>
				</div>
				<div className="member-item__icon">
					<RoundIconMiddle char={this.getCharIcon()}/>
				</div>
				<div className="member-item__body">
					<div className="member-item__names">
						<span className="member-item__last-name">{this.getMember().lastName}</span>
						 {this.getMember().firstName}
					</div>
					<div className="member-item__role">{this.$t(this.getMember().role)}</div>
				</div>
				<div className="member-item__menu">
					<div onClick={this.showMenu} className="icon klassicon-options"></div>
					<PopupMenu alignRight={true} className="class-item-left__popup" items={this.getMenuItems()} isShowing={this.state.showMenu}/>
				</div>
			</div>
		);
	}
}
MemberItemComponent.propTypes = {
	member: PropTypes.object.isRequired,
	onToggle: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	menuItems: PropTypes.array.isRequired,
}
export const MemberItem = withTranslation()(MemberItemComponent)
