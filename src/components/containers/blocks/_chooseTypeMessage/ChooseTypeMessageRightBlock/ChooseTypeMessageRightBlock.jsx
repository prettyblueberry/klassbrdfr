import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	DescriptionButton,
	HeaderText,
	HeaderTextSmall,
	Separator,
	CurrentYear,
	RoundIconMiddle,
	BackButton
} from "components/presentational";
import { withRouter } from 'react-router-dom';
import "./ChooseTypeMessageRightBlock.scss";
import {ModalManager} from "containers/modals"

class ChooseTypeMessageRightBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	selectSMS = () => {
		ModalManager.getInstance().alert(this.$t("Klassroom"), this.$t("Soon available"));

		//this.props.history.push(`/new-sms`);
	}
	selectMultimedia = () => {
		this.props.history.push(`/new-multimedia`);
	}

	goBack = () => {
		this.props.history.goBack();
	}
	render() {
		return (
			<div className="choose-type-message-right">
			  	<BackButton onClick={this.goBack} absolute/>
				<CurrentYear style={{marginTop: "42px", marginBottom: "79px"}} title={this.$t("SCHOOL YEAR")}/>
				<HeaderTextSmall style={{fontSize: "13px"}} textJSX={this.$t("CREATE A NEW MESSAGE")}/>
				<HeaderText style={{marginBottom: "30px"}} textJSX={this.$t("Choose your message type?")}/>
				<DescriptionButton
					leftIconJSX={
						<RoundIconMiddle icon="multimedia-campaign" color="purple"/>
					}
					text1JSX={this.$t("Multimedia message")}
					text2JSX={this.$t("Broadcast a message to the Klassroom timeline of the all parents.")}
					onClick={this.selectMultimedia}
				/>
				<Separator textJSX={this.$t("or")}/>
				<DescriptionButton
					leftIconJSX={
						<RoundIconMiddle icon="sms-campaign" color="butterscotch"/>
					}
					text1JSX={this.$t("SMS message")}
					text2JSX={this.$t("Broadcast a SMS message on the smartphone of the parents")}
					style={{boxShadow: "none", border: "solid 1px rgba(46, 59, 80, 0.1)"}}
					onClick={this.selectSMS}
				/>
				<img className="choose-type-message-right__unicorn-left" src="/public/pages/linkClass/unicorn-left.png"/>
				<img className="choose-type-message-right__unicorn-right" src="/public/pages/linkClass/unicorn-right.svg"/>
			</div>);
	}
}
const TranslatedComponent = withTranslation()(ChooseTypeMessageRightBlockComponent);
export const ChooseTypeMessageRightBlock = withRouter(props => <TranslatedComponent {...props}/>)
