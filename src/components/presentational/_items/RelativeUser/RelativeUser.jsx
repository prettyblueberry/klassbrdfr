import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { UserIcon, CheckBox } from "presentational";
import "./RelativeUser.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import * as moment from 'moment';

class RelativeUserComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.member = this.props.member;
		/*
		if(!this.member.user || !this.member.user.id){
			this.member.user = KRClient.getInstance().users[this.member.id];
		}
*/
		this.simple = this.props.simple || false;

	}

	onClick = () => {
		if(this.props.onClick){
			this.props.onClick(this.member);
		}
	}

	renderAvatar = () => {
		const img = this.member.user ? this.member.user.thumb_image_url : this.member.thumb_image_url;
		const firstName = this.member.user ? this.member.user.first_name : this.member.first_name;
		return (
		<div>
			<UserIcon src={img} name={firstName} size={this.props.size || 40}/>
		</div>)
	}

	render() {
		const firstName = this.member.user ? this.member.user.first_name : this.member.first_name;
		const lastName = this.member.user ? this.member.user.last_name : this.member.last_name;

		return (
			<div onClick={this.onClick} className="relative-user">
				{!this.props.disableCheckbox && (<div className="relative-user__checkbox"><CheckBox rounded={true} checked={this.props.isChecked}/></div>)}
				{this.renderAvatar()}
				<div className="relative-user__names">
					<div className="relative-user__child"><b>{lastName}</b> {firstName}</div>
					{this.simple && <div className="relative-user__father">{this.member.getDescription() ? this.member.getDescription() : ""}</div>}
					{this.simple && <div className="relative-user__type">{this.member.roleString() ? this.member.roleString() : ""}</div>}

						{this.props.text &&  <div className="relative-user__text">{this.props.text}</div>}
					{this.props.date &&  <div className="relative-user__date">{moment(this.props.date).locale(this.i18n.language).format("lll")}</div>}
				</div>
			</div>
		);
	}
}
RelativeUserComponent.propTypes = {

}
export const RelativeUser = withTranslation()(RelativeUserComponent)
