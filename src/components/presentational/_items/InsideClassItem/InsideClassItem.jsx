import * as React from "react";
import { withTranslation } from 'react-i18next';
import { MessagePreview } from "presentational";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./InsideClassItem.scss";

class InsideClassItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.klass = this.props.klass;
	}
	getData(){
		return this.props.post;
	}
	getPost(){
		return this.getData();
	}
	getStatistic(){
		const post = this.getPost();
		return {
			views: post.views_count,
			reactions: post.reactions_count,
			comments: post.comments_count,
			viewsOf: Math.max(post.views_count,Object.values(this.klass.active_members).length)
		}
	}
	getMenuItems = () => {
		return [
			{text: this.$t("Mute"), callback: () => {}, visible: false},
			{text: this.$t("Favorite post"), callback: () => {}, visible: false}
		];
	}
	getRootClasses() {
		let classes = {
			"inside-class-item": true,
		}
		if(this.props.showComments){
		//	classes["inside-class-item--show-comments"] = true;
		}
		if(this.props.hidden){
		//	classes["inside-class-item--hidden"] = true;
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	onClickComments = (post) => {
		this.props.onClickComments(post);
	}

	render() {
		return (
			<div onScroll={(event) => {event.stopPropagation()}} className={this.getRootClasses()}>
				<div className="inside-class-item__spec">
					<MessagePreview
						statistic={this.getStatistic()}
						post={this.getPost()}
						klass={this.klass}
						enableMenu={true}
						menuItems={this.getMenuItems()}
						enableReact={true}
						key={this.getPost().id}
					/>
				</div>

			</div>
		);
	}
}
InsideClassItemComponent.propTypes = {
	item: PropTypes.object,
	showComments: PropTypes.bool,
	onClickComments: PropTypes.func,
	hidden: PropTypes.bool,
}
export const InsideClassItem = withTranslation()(InsideClassItemComponent)
