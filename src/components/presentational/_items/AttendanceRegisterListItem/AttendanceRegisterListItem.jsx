import * as React from "react";
import { withTranslation } from 'react-i18next';
import {UserIcon} from "presentational";
import PropTypes from 'prop-types';
import "./AttendanceRegisterListItem.scss";

class AttendanceRegisterListItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderType = () => {
		return (<div className="attendance-register__list-item-type attendance-register__list-item-type--ansent">
			<span className="icon klassicon-close"></span> <span>{this.$t("Absent")}</span>
		</div>)
	}
	render() {
		return (
			<div className="attendance-register__list-item">
	
				<div className="attendance-register__list-item-left">
					<div className="attendance-register__list-item-left__top">
						<UserIcon name="Test user"/>
					</div>
					<div className="attendance-register__list-item-left__bottom">
						<div className="attendance-register__list-item-left-h1">Alfort</div>
						<div className="attendance-register__list-item-left-h2">Thomas</div>
						<div className="attendance-register__list-item-left-h3">CE1 A</div>
					</div>
				</div>

				<div className="attendance-register__list-item-center">
					<div className="attendance-register__list-item-center_top">
						{this.renderType()}
					</div>
					<div className="attendance-register__list-item-center__center">
						<div className="attendance-register__list-item-center-h1">{this.$t("Duration")}</div>
						<div className="attendance-register__list-item-center-h2">{this.$t("{{count}} day", {count: 1})}</div>
						<div className="attendance-register__list-item-center-h3">
							Feb 8, 2019
						</div>
					</div>
					<div className="attendance-register__list-item-center__bottom">
						<div className="attendance-register__list-item-center-h1">{this.$t("Reason")}</div>
						<div className="attendance-register__list-item-center-h2">{this.$t("Medical reason")}</div>
						<div className="attendance-register__list-item-center-h3">
							Justified
						</div>
					</div>
				</div>

				<div className="attendance-register__list-item-right">
					<span className="icon klassicon-options"></span>
				</div>

			</div>
		);
	}
}
AttendanceRegisterListItemComponent.propTypes = {

}
export const AttendanceRegisterListItem = withTranslation()(AttendanceRegisterListItemComponent)