import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MultimediaFlow} from "steps";
import "./NewMultimediaActivity.scss";

class NewMultimediaActivityComponent extends React.Component {
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
			<MultimediaFlow/>
		);
	}
}
export const NewMultimediaActivity = withTranslation()(NewMultimediaActivityComponent)
