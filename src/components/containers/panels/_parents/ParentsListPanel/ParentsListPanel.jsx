import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	SearchInput,
	SelectSmall,
	CountWithLabel,
} from "presentational";
import {queryStringToObject} from "utils";
import {withRouter} from 'react-router-dom';
import "./ParentsListPanel.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";

class ParentsListPanelComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;
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
	getClassOptions = () => {

		var result = [
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
	getSearchValueFromURL = () => {
		let search = queryStringToObject().search || "";
		return decodeURI(search);
	}
	getClassFromURL = () => {
		let _class = queryStringToObject().class || "all";
		return decodeURI(_class);
	}
	render() {
		const dataParents = this.list.getCustomData();
		return (
			<div className="panel-parents-list">
				<div className="panel-parents-list__container">
					<SearchInput
						style={{maxWidth: "440px", marginRight: "30px"}}
						autofocus={true}
						placeholder={this.$t("Search...")}
						value={this.getSearchValueFromURL()}
						onChange={this.onSearch}
					/>
					<SelectSmall
							style={{maxWidth: "200px"}}
							value={this.getClassFromURL()}
							onChange={this.onChangeClass}
							label={this.$t("Display")}
							items={this.getClassOptions()}
						/>
				</div>
				<div className="panel-parents-list__container">
					<CountWithLabel
						label={this.$t("Parents")}
						count={dataParents.filteredParents || 0}
					/>
					<div className="panel-parents-list__invite">
						{this.$t("Invite missing parents on Klassroom")} <div className="icon klassicon-add"></div>
					</div>
				</div>
			</div>
		);
	}
}
ParentsListPanelComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(ParentsListPanelComponent);
export const ParentsListPanel = withRouter(props => <TranslatedComponent {...props}/>)
