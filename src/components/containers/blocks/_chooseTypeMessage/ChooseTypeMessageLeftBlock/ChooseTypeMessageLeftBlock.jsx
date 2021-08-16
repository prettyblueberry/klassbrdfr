import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	SchoolPhoto,
	HeaderText,
	HeaderTextSmall,
	HeaderTextMiddle,
} from "../../../../presentational";
import "./ChooseTypeMessageLeftBlock.scss";
import {KRClient} from '@klassroom/klassroom-sdk-js';

class ChooseTypeMessageLeftBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {}
	}
	render() {
		if(KRClient.getInstance().organization) {
			return (
			<div className="choose-type-message-left">
				<img src="/public/images/left-panel-add-class.png" className="choose-type-message-left__image" />
				<SchoolPhoto/>
				<HeaderTextSmall style={{fontSize: "13px", textAlign: "center", marginTop: "90px"}} textJSX={this.$t("MY SCHOOL")}/>
				<HeaderText style={{textAlign: "center",}} textJSX={this.$t("{{school}} School", {school: `<butterscotch>${KRClient.getInstance().organization.name}</butterscotch>`})}/>
				<div className="choose-type-message-left__rectangle"></div>
				<HeaderTextMiddle style={{textAlign: "center",}} textJSX={this.$t("create a new message")}/>
				<HeaderTextSmall style={{marginTop: "30px", width: "265px", textAlign: "center",}} textJSX={this.$t("Broadcast multimedia and sms messages in all your classes instantly.Useful for communicating easily with all your classes.")}/>
			</div>
			)
		}
		return null;
	}
}
ChooseTypeMessageLeftBlockComponent.propTypes = {

}

export const ChooseTypeMessageLeftBlock = withRouter(withTranslation()(ChooseTypeMessageLeftBlockComponent))
