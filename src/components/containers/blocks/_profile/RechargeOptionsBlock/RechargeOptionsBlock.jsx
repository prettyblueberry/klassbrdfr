import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	HeaderText,
	CheckBoxLabeled,
	SelectSmall,
} from "presentational";
import PropTypes from 'prop-types';
import "./RechargeOptionsBlock.scss";

class RechargeOptionsBlockComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.options = {
			autoRecharge: false,
			scheduling: false,
			autoRechargeValue: "",
			rechargeValue: "",
			dateSchedule: "",
		}
	}
	onToggleOption = (option) => {
		this.options[option] = !this.options[option];
		this.forceUpdate();
	}
	onChangeValue = (option, value) => {
		this.options[option] = value;
		this.forceUpdate();
	}
	getAutoRechargeOptions() {
		return [
			{
				title: this.$t("{{credits}} credits", {credits: 100}),
				value: 100,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 200}),
				value: 200,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 300}),
				value: 300,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 400}),
				value: 400,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 500}),
				value: 500,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 1000}),
				value: 1000,
			},
		]
	}
	getRechargeOptions() {
		return [
			{
				title: this.$t("{{credits}} credits", {credits: 100}),
				value: 100,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 200}),
				value: 200,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 300}),
				value: 300,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 400}),
				value: 400,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 500}),
				value: 500,
			},
			{
				title: this.$t("{{credits}} credits", {credits: 1000}),
				value: 1000,
			},
		]
	}
	getDateScheduleOptions () {
		return [
			{
				title: this.$t("Each month"),
				value: "each_month",
			},
			{
				title: this.$t("Each year"),
				value: "each_year",
			}
		]
	}
	render() {
		return (
			<div className="recharge-options-block">
				<HeaderText style={{marginBottom: "30px", "fontSize": "18px", 'textAlign': "left"}} textJSX={this.$t("SMS credits balance")}/>
				<div className="recharge-options-block__options">
					<CheckBoxLabeled
						checked={this.options.autoRecharge}
						onToggle={() => this.onToggleOption("autoRecharge")}
						label={this.$t("Enable Auto-recharge")}
						reverseSide={true}
						description={this.$t("Never run out of SMS credits")}
					/>
					<SelectSmall
						style={{width: "230px"}}
						value={this.options.autoRechargeValue}
						onChange={(value) => this.onChangeValue("autoRechargeValue", value)}
						label={this.$t("Auto-recharge with")}
						items={this.getAutoRechargeOptions()}
					/>
				</div>
				<div className="recharge-options-block__options">
					<CheckBoxLabeled
							checked={this.options.scheduling }
							onToggle={() => this.onToggleOption("scheduling")}
							label={this.$t("Enable credits-scheduling")}
							reverseSide={true}
							description={this.$t("Schedule your SMS credits recharge")}
					/>
					<div className="recharge-options-block__selects">
						<SelectSmall
							style={{width: "190px"}}
							value={this.options.rechargeValue}
							onChange={(value) => this.onChangeValue("rechargeValue", value)}
							label={this.$t("Recharge")}
							items={this.getRechargeOptions()}
						/>
						<SelectSmall
							style={{width: "190px"}}
							value={this.options.dateSchedule}
							onChange={(value) => this.onChangeValue("dateSchedule", value)}
							items={this.getDateScheduleOptions()}
						/>
					</div>
				</div>
			</div>
		);
	}
}
RechargeOptionsBlockComponent.propTypes = {

}
export const RechargeOptionsBlock = withTranslation()(RechargeOptionsBlockComponent)