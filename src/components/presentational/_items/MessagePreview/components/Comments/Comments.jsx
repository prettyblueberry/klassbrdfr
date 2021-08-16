import * as React from "react";
import { withTranslation } from 'react-i18next';

import {InputMessage,UserIcon} from "presentational";
import {CommentsData, AuthUserData} from "mockup-data";
import PropTypes from 'prop-types';
import {FormAPI} from "forms";
import {uniqueId, deepClone} from "utils";
import * as moment from 'moment';
import { DotLoader } from 'react-spinners';
import "./Comments.scss";
import classnames from "classnames";
import {ModalManager} from "containers/modals"

import {KRClient, KRUtils, KRComment, KRPost} from "@klassroom/klassroom-sdk-js";

class CommentsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.post = this.props.post;
		this.modal = this.props.modal;
		this.reloadMore = true;
		this.refDate = new Date();
		this.isLoading = true;
		this.comments = [];



		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				comment: "",
			},
			formRules: {
				comment: [],
			}
		}
		this.selectedComment = null;
		this.disableMoreBtn = false;
		this.inputRef = null;
		this.loading = false;
	}
	componentDidMount() {
		this.loadMore()
	}

	getDataAsync = () => {
		return new Promise((resolve, reject) => {
			this.props.post.getComments(this.props.post.last_comment_date).then(
				(more)=>{
				resolve(comments)
    		}).catch((error)=>{
					ModalManager.getInstance().alert(error.message);
    		}).finally(()=>{
					this.setLoader(false);
				})
		});
	  };


	loadMore = () => {
			const post = this.props.post;
			this.isLoading = true;
			post.getComments(this.refDate).then((more)=>{
				this.reloadMore = more
				this.reloadData();
			}).finally(() => {
				this.isLoading = false;
				this.forceUpdate()
			});
			this.forceUpdate()
		}

	reloadData = () => {

		const post = this.props.post;
		this.comments = []
		const dnow = new Date().getTime() + 30000;


		KRUtils.each(post.comments,(key,message) => {
			this.comments.push(message);
			if(message.date.getTime() < this.refDate.getTime()){
				this.refDate = message.date
			}
		});
		this.comments.sort(function(a,b){
			let d1 =  a.date.getTime();
			let d2 = b.date.getTime();
			return d1>d2 ? 1 : d1<d2 ? -1 : 0;
		});

		this.forceUpdate()
	}


	/*
	removeComment: (quiresURL, params, data) => {
		this.setLoader();
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.setLoader(false);

				let editedItems = this.list.getList();
				editedItems = editedItems.filter((item) => {
					if(item.id == data.id){
						return false;
					}
					return true;
				});
				this.selectedComment = null;
				this.list.replaceItems(editedItems);

			}, 500);
		});
	},
	makeOrUpdateMessage: (quiresURL, params, data) => {
		this.setLoader();
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.setLoader(false);
				this.inputRef.updateValue("");
				// if list has edited comment
				if(!this.selectedComment){

					let newComment = deepClone(CommentsData.newComment);
					newComment.text = data.text;
					newComment.id = uniqueId();
					newComment.date = moment().unix();
					this.list.pushToList(newComment);

				} else {

					let editedItems = this.list.getList();
					editedItems = editedItems.map((item) => {
						let _item = deepClone(item);
						if(_item.id == data.id){
							_item.text = data.text;
						}
						return _item;
					});
					this.selectedComment = null;
					this.list.replaceItems(editedItems);
				}
				this.inputRef.focus();
				resolve(null);
			}, 500);
		});
	}*/

	editComment = (comment) => {
		this.selectedComment = comment;
		this.inputRef.updateValue(comment.text);
		this.inputRef.focus();
		this.forceUpdate();
	}
	deleteComment = (comment) => {
		kbApp.modalAPI.confirm(this.$t("Do you want to remove this comment?")
		,(val) => {
			if(val){
				this.setLoader();
				this.post.deleteComment(comment.id).then(()=>{
					this.inputRef.updateValue("");
					  this.reloadData();
						this.setLoader(false);
						this.props.updateParent()
						}).catch((error)=>{
								ModalManager.getInstance().alert(error.message);
		    		}).finally(()=>{

								this.setLoader(false);
						});
			}
		},true);
	}

	setLoader(loading = true){
		this.isLoading = loading
		// this.loading = loading;
		this.forceUpdate();
	}

	renderItems(){
		return this.comments.map((comment, index) => {
			let isEditing = false;
			if(this.selectedComment && this.selectedComment.id && this.selectedComment.id == comment.id){
				isEditing = true;
			}
			return (
				<div key={comment.id} className={"message-preview__comment "+(isEditing ? "message-preview__comment__edited" : "")}>

					<div className="message-preview__comment-img-container">
					<div><UserIcon src={comment.user.thumb_image_url} name={comment.user.first_name} size={this.props.size || 40}/></div>

					</div>

					<div className="message-preview__comment-body">
						<div className="message-preview__comment-author">{comment.user.name}</div>
						<div className="message-preview__comment-message" dangerouslySetInnerHTML={{__html: comment.text}}></div>
						<div className="message-preview__comment-date">{moment(comment.date).locale(this.i18n.language).format("lll")}</div>
					</div>

					<div className="message-preview__comment-buttons">
						{comment.canEdit() && <div onClick={() => this.editComment(comment)} className="icon klassicon-add-note"></div>}
						<div onClick={() => this.deleteComment(comment)} className="icon klassicon-delete"></div>
					</div>

				</div>
			)
		});
	}
	showMoreComments = () => {
		this.loadMore();
	}
	onChangeComment = (value, submit = false) => {
		this.form.updateValueForm('comment', value);
		if(submit) {
			this.onSubmit();
		}
	}
	sendMessage = (value) => {

		this.setLoader();

		if(this.selectedComment){
				this.post.editComment(this.selectedComment.id, value).then(()=>{
						this.inputRef.updateValue("");
					this.reloadData();
					this.cancelEditing();

				}).catch((error)=>{
						ModalManager.getInstance().alert(error.message);
				}).finally(()=>{

						this.setLoader(false);
				});
		}else{
			this.post.addComment(value).then(()=>{
					this.inputRef.updateValue("");

				this.reloadData();

			}).catch((error)=>{
					ModalManager.getInstance().alert(error.message);
			}).finally(()=>{

					this.setLoader(false);
			});

		}

		this.forceUpdate()

	}
	cancelEditing = () => {


		this.selectedComment = null;
		this.inputRef.updateValue("");
		this.forceUpdate();
	}

	renderInput(){
		if(this.isLoading && this.comments.length == 0){
			return null;
		}
		return (
		<div className="message-preview__comments-input-root">
			<div className="message-preview__comments-input-user-container">
				<div><UserIcon className="message-preview__comments-input-user" src={KRClient.getInstance().user.thumb_image_url} name={KRClient.getInstance().user.first_name} size={this.props.size || 30}/></div>
			</div>
			<div className="message-preview__comments-input-container">
				<InputMessage
					onRef={_ref => {this.inputRef = _ref}}
					onChange={this.onChangeComment}
					value={this.form.getValueInputForm('comment')}
					sendMessage={this.sendMessage}
					isEditing={this.selectedComment != null}
					onCancelEditing={this.cancelEditing}
				/>
			</div>
		</div>)
	}
	renderShowMore(){
		if(this.isLoading && this.comments.length == 0){
			return null;
		}
		if(this.reloadMore){
			return (<div className="message-preview__comments-show-more">
				<button onClick={this.showMoreComments} className="message-preview__comments-show-more-btn">{this.$t("Show more")}</button>
			</div>)
		}
		return null;
	}
	renderLoader(){
		if(this.isLoading){
			return (
				<div className="message-preview__loader">
					<DotLoader
						sizeUnit={"px"}
						size={50}
						color={'#1f9aff'}
						loading={true}
					/>
				</div>
			)
		}
		return null;
	}
	render() {
		const isInModalMode = this.props.isInModalMode;
		return (
			<div className={classnames('message-preview__comments', {'message-preview__comments-in-modal': isInModalMode})}>
				{this.renderLoader()}
				{this.renderInput()}
				{this.renderShowMore()}
				<div className="message-preview__comments-list">
					{this.renderItems()}
				</div>

			</div>
		);
	}
}
CommentsComponent.propTypes = {
	isInModalMode: PropTypes.bool
}
export const Comments = withTranslation()(CommentsComponent)
