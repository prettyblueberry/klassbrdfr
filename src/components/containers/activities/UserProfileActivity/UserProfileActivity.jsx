import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./UserProfileActivity.scss";

export class UserProfileActivityComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<p>Profile page</p>
		);
	}
}
export const UserProfileActivity = withTranslation()(UserProfileActivityComponent)