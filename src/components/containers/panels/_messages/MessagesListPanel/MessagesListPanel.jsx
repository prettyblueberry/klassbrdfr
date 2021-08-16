import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	SearchInput,
	SelectSmall,
} from "presentational";
import {queryStringToObject} from "utils";
import {withRouter} from 'react-router-dom';
import "./MessagesListPanel.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";

class MessagesListPanelComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

	}
	onSearch = (value) => {
		this.props.onFilter({
			search: value
		})
	}
	onChangeClass = (value) => {
		this.props.onFilter({
				class: value
		})
	}
	onChangeShow = (value) => {
		this.props.onFilter({
				show: value
		})
	}
	getClassOptions = () => {

		let result = [
			{
				value: "all",
				title: this.$t("All my classes"),
			}
		];

		KRUtils.each(KRClient.getInstance().classrooms,(classroomID,classroom) => {
				result.push({
					value: classroomID,
					title: classroom.name,
				});
		});

		return result;
	}
	getShowOptions = () => {
		return [
			{
				title: this.$t("Analytics & list"),
				value: "all",
			},
			{
				title: this.$t("List"),
				value: "list",
			},
		];
	}
	getSearchValueFromURL = () => {
		let search = queryStringToObject().search || "";
		return decodeURI(search);
	}
	getClassFromURL = () => {
		let _class = queryStringToObject().class || "all";
		return decodeURI(_class);
	}
	getShowFromURL = () => {
		let show = queryStringToObject().show || "all";
		return decodeURI(show);
	}
	render() {
		
		return (
			<div className="messages-list-panel">
				<div className="messages-list-panel__container">
					<SearchInput
						style={{maxWidth: "340px", marginRight: "30px"}}
						autofocus={true}
						placeholder={this.$t("Search...")}
						value={this.getSearchValueFromURL()}
						onChange={this.onSearch}
					/>
					<div className="messages-list-panel__selects">
						<SelectSmall
								style={{maxWidth: "200px"}}
								value={this.getClassFromURL()}
								onChange={this.onChangeClass}
								label={this.$t("Display")}
								items={this.getClassOptions()}
						/>
						<SelectSmall
							style={{maxWidth: "150px"}}
							value={this.getShowFromURL()}
							onChange={this.onChangeShow}
							items={this.getShowOptions()}
						/>
					</div>
				</div>
			</div>
		);
	}
}
MessagesListPanelComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(MessagesListPanelComponent);
export const MessagesListPanel = withRouter(props => <TranslatedComponent {...props}/>)
