import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	ProgressIcon,
	HeaderText,
	HeaderTextSmall,
	CloseButton,
} from "../../../../presentational";
import "./ParentsListLevel.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class ParentsListLevelComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;
		this.state = {
			hide: false,
		}
	}
		hide = () => {
		this.setState({hide: true});
	}
	getLevel () {
		const percent = this.getPercent();
		switch(true) {
			case percent < 30:
			return this.$t("low")
			case percent > 30 && percent < 80:
			return this.$t("medium")
			case percent > 80:
			return this.$t("high")
		}
	}
	getPercent = () => {
		let allLinkedParents = KRClient.getInstance().parents_klassroom_count || 0;
		let countParentsAll =  KRClient.getInstance().parents_count || 0;
		return (allLinkedParents/countParentsAll)*100;
	}
	render() {
		const dataParents = this.list.getCustomData();
		if(this.state.hide){
			return null;
		}
		return (
			<div className="parents-list-level">

				<div className="parents-list-level__title">{this.$t("Parent list Level")}: {'\u00A0'}<b>{this.getLevel()}</b></div>

				<div className="parents-list-level__container">

					<div className="parents-list-level__progress">
						<ProgressIcon
							color="blue"
							icon="parents"
							percent={this.getPercent()}
						/>
					</div>

					<div className="parents-list-level__texts">
						<HeaderText style={{ fontSize: "20px", textAlign: "left"}} textJSX={this.$t("<blue>{{countParents}} parents out of {{countParentsAll}}</blue> use Klassroom", {countParents: KRClient.getInstance().parents_klassroom_count || 0, countParentsAll: KRClient.getInstance().parents_count || 0})}/>
						<HeaderTextSmall style={{textAlign: "left"}} textJSX={this.$t("Invite all parents on klassroom to complete your list.")}/>
					</div>

					<div className="parents-list-level__icons">
						<img className="parents-list-level__book" src="/public/pages/listClasses/books-icon.svg"/>
						<CloseButton onClick={this.hide} style={{position: "absolute", top: "26px", right: "26px"}}/>
					</div>

				</div>

			</div>
		);
	}
}
ParentsListLevelComponent.propTypes = {
	listAPI: PropTypes.object.isRequired,
}
export const ParentsListLevel = withTranslation()(ParentsListLevelComponent)
