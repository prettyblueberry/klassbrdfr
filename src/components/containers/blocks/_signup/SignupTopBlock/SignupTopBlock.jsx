import * as React from "react";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {Button} from "../../../../presentational";
import "./SignupTopBlock.scss";

class SignupTopBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<>
				<div className="top">
					<a href="/"><img src="/public/img/klassboard_logo.png" className="logo-image" /></a>
					<div className="top-right-actions">
						<div className="right-title">
							{this.$t('Already have a Klassboard account?')}
						</div>
						<Button typeDesign="outline-white" link="/" name={this.$t("Sign In")}/>
					</div>
				</div>
				<div className="navbar-bottom" />
			</>
		);
	}
}
const TranslatedComponent = withTranslation()(SignupTopBlockComponent);
export const SignupTopBlock = withRouter(props => <TranslatedComponent {...props}/>)
