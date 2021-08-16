import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {deepClone} from "utils";
import {ListParentsItem} from "presentational";
import {ParentListData} from "../../../../../mockupData";
import "./ListParents.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";
import { DotLoader } from 'react-spinners';
import {withRouter} from 'react-router-dom';

class ListParentsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;
	}

	renderItems() {
		return this.props.items.map((parent, index) => {
			return <ListParentsItem listAPI={this.list} parent={parent} key={"parent"+index}/>
		})
	}
	render() {
		return (
			<div className="parents-list">
				{this.renderItems()}
			</div>
		);
	}
}
ListParentsComponent.propTypes = {
	listAPI: PropTypes.object.isRequired,
}

const TranslatedComponent = withTranslation()(ListParentsComponent);
export const ListParents = withRouter(props => <TranslatedComponent {...props}/>)
