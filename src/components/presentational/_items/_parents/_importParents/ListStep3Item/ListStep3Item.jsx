import * as React from "react";
import { withTranslation } from 'react-i18next';
import {RoundIconMiddle} from "../../../../../presentational";
import PropTypes from 'prop-types';
import "./ListStep3Item.scss";
import {KRUtils} from "@klassroom/klassroom-sdk-js";

class ListStep3ItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getCharIcon () {
		if(this.props.contact.first_name && this.props.contact.first_name !== ""){
			return this.props.contact.first_name[0];
		}
		if(this.props.contact.last_name && this.props.contact.last_name !== ""){
			return this.props.contact.last_name[0];
		}
		return "";
	}
	render() {
		return (
			<div className="list-step3-item">
				<div className="list-step3-item__icon-container">
					<RoundIconMiddle char={this.getCharIcon()}/>
				</div>
				<div className="list-step3-item__name-container">
					<div className="list-step3-item__name break-word">{this.props.contact.first_name || ""} <span>{this.props.contact.last_name || ""}</span></div>
					{this.props.class && <div className="list-step3-item__class break-word">{this.props.class.name}</div>}
				</div>
				<div className="list-step3-item__phone-container">
					<div className="list-step3-item__label">{this.$t("Mobile phone")}</div>
					<div className="list-step3-item__phone break-word">{this.props.contact.phone ? KRUtils.formatPhone(this.props.contact.phone) : ""}</div>
				</div>
				<div className="list-step3-item__email-container">
					<div className="list-step3-item__label">{this.$t("Email")}</div>
					<div className="list-step3-item__email break-word">{this.props.contact.email || ""}</div>
				</div>
				<div className="list-step3-item__buttons-container">
					<div onClick={() => this.props.onDelete(this.props.contact)} className="icon klassicon-delete"></div>
				</div>
			</div>
		);
	}
}
ListStep3ItemComponent.propTypes = {
	contact: PropTypes.object.isRequired,
	class: PropTypes.object,
	onDelete: PropTypes.func.isRequired,
}
export const ListStep3Item = withTranslation()(ListStep3ItemComponent)
