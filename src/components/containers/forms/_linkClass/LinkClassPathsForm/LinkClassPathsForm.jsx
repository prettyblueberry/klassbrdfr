import * as React from "react";
import { withTranslation } from 'react-i18next';
import {LinkClassHeader} from "../components";
import {
	DescriptionButton,
	HeaderText,
	HeaderTextSmall,
	Separator
} from "../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LinkClassPathsForm.scss";

class LinkClassPathsFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {

			},
			formRules: {

			}
		}
	}
	userHasKey = () => {
		this.props.callbackSubmit({
			userHasKey: true,
		});
	}
	userDontKnowKey = () => {
		this.props.callbackSubmit({
			userHasKey: false,
		});
	}
	render() {
		return (
			<div className="link-class-paths">
				<LinkClassHeader {...this.props}/>
				<HeaderTextSmall textJSX={this.$t("LINK A KLASSROOM CLASS")}/>
				<HeaderText style={{marginBottom: "30px"}} textJSX={this.$t("Do you know the <purple/>class key<purple/>?")}/>
				<DescriptionButton
					leftIconJSX={<img src="/public/pages/linkClass/success-blue-icon.svg"/>}
					text1JSX={this.$t("<blue>I know</blue> the class key")}
					text2JSX={this.$t("The class has already been created by the teacher<br/> and I have his class key!")}
					rightIconJSX={<img src="/public/pages/linkClass/arrow-right.svg"/>}
					onClick={this.userHasKey}
				/>
				<Separator textJSX={this.$t("or")}/>
				<DescriptionButton
					leftIconJSX={<img src="/public/pages/linkClass/cancel-red-icon.svg"/>}
					text1JSX={this.$t("<coral>I don't know</coral> the class key")}
					text2JSX={this.$t("The class has not yet been created by the teacher<br/> and I send him a request for class creation!")}
					rightIconJSX={<img src="/public/pages/linkClass/arrow-right.svg"/>}
					style={{boxShadow: "none"}}
					onClick={this.userDontKnowKey}
				/>
				<img className="link-class-paths__unicorn-left" src="/public/pages/linkClass/unicorn-left.png"/>
				<img className="link-class-paths__unicorn-right" src="/public/pages/linkClass/unicorn-right.svg"/>
			</div>);
	}
}
LinkClassPathsFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
}

export const LinkClassPathsForm = withTranslation()(LinkClassPathsFormComponent);
