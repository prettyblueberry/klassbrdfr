import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./Actions.scss";

class ActionsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderLabel() {
		if(this.props.label){
			return (<div className="actions__label">{this.props.label}</div>)
		}
		return null;
	}
	render() {
		return (
			<div className="actions">
				{this.renderLabel()}
				<div className="actions__select">
					<div className="actions__title">{this.$t("Actions")} <span className="actions_arrow"></span></div>
				</div>
			</div>
		);
	}
}
export const Actions = withTranslation()(ActionsComponent)