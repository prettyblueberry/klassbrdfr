import * as React from "react";
import { withTranslation } from 'react-i18next';
import {SMSFlow} from "../../steps";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./NewSMSActivity.scss";

class NewSMSActivityComponent extends React.Component {
	static $t;
	static i18n;
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<SMSFlow/>
		);
	}
}
export const NewSMSActivity = withTranslation()(NewSMSActivityComponent)
