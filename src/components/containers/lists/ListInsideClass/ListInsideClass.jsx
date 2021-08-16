import * as React from "react";
import { withTranslation } from 'react-i18next';
import {InsideClassItem} from "presentational";
import PropTypes from 'prop-types';
import "./ListInsideClass.scss";

import {KRClient} from "@klassroom/klassroom-sdk-js";

class ListInsideClassComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;
		this.klass = this.props.klass;
		this.itemsWithActiveComments = [];

	}
	componentDidMount() {
		this.list.sendRequest("loadItems");
	}
	isShowComments = (post) => {
		let shownComments = false;
		this.itemsWithActiveComments.some((_post) => {
			if(post.id == _post.id){
				shownComments = true;
				return true;
			}
			return false;
		});
		return shownComments;
	}
	onClickComments = (post) => {
		this.itemsWithActiveComments.push(post);
		this.forceUpdate();
	}

	notEmpty = () => {
		return !!this.list.getList().length
	}

	renderPin = () => {
		return (
		  <div className="album-select-posts__pin">
			<img src="/public/k-img/icons/timeline_beginning.png" width="14" />
		  </div>
		);
	};

	reloadData = () => {
		this.list.sendRequest("loadPosts", null, true);
	}

	renderItems(){
		return this.list.getList().map((post, index) => {
			return <InsideClassItem
				showComments={this.isShowComments(post)}
				key={post.id + index}
				post={post}
				klass={this.klass}
				onClickComments={this.onClickComments}
			/>
		});
	}
	render() {
		return (
			<div className="list-inside-class">
				{this.notEmpty() && this.renderPin()}
				{this.renderItems()}
			</div>
		);
	}
}
ListInsideClassComponent.propTypes = {
	listAPI: PropTypes.object.isRequired,
}
export const ListInsideClass = withTranslation()(ListInsideClassComponent)
