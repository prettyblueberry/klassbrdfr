import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {TopBlockInsideClass, FilterClass} from "blocks";
import {ListInsideClass, ListAPI} from "lists";
import {MessageDetailData} from "mockup-data";
import {uniqueId, deepClone} from "utils";
import PropTypes from 'prop-types';
import "./InsideClassPage.scss";
import { DotLoader } from 'react-spinners';
import { KRClient, KRUtils, KRPost } from '@klassroom/klassroom-sdk-js';
import {BackButton} from "components/presentational";
import {ModalManager} from "containers/modals"

class InsideClassPageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);

		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			klassLoaded: false,
		};
		this.list = new ListAPI(this);
		this.klass = this.props.klass || null;

		this.refDate = new Date();
		this.isLoading = false;
		this.reloadMore = true;
		this.isFirstTime = true;

		this.posts = {};


		this.list.setRequests(
			{
				loadPosts: (quiresURL, params) => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {

							var dnow = new Date().getTime() + 30000;

							var data = [];
							let filter = params.filter || KRPost.Filter.all;

							KRUtils.each(this.posts, (postID,post)=>{

								switch(filter){
											case KRPost.Filter.all:
													if(post.date.getTime() <= dnow){
														if(!post.homework) data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate = post.date;
														}
													}
												break;
											case KRPost.Filter.event:
													if(post.event != null && post.date.getTime() <= dnow){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}
												break;



											case KRPost.Filter.document:
													if(post.documents.length > 0 && post.date.getTime() <= dnow){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}

												break;
											case KRPost.Filter.photo:
													if(post.images.length > 0 && post.date.getTime() <= dnow){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}

												break;
											case KRPost.Filter.vido:
													if(post.videos.length > 0 && post.date.getTime() <= dnow){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}

												break;
											case KRPost.Filter.audio:
													if(post.audios.length > 0 && post.date.getTime() <= dnow){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}


												break;
											case KRPost.Filter.location:
													if(post.location ){
														data.push(post);
														if(post.date.getTime() < this.refDate.getTime()){
															 this.refDate  = post.date;
														}
													}

												break;
												case KRPost.Filter.checklist:
														if(post.checklist ){
															data.push(post);
															if(post.date.getTime() < this.refDate.getTime()){
																 this.refDate  = post.date;
															}
														}

													break;
													case KRPost.Filter.poll:
															if(post.poll ){
																data.push(post);
																if(post.date.getTime() < this.refDate.getTime()){
																	 this.refDate  = post.date;
																}
															}
														break;

										}

											data.sort(function(a,b){
												var d1 =  a.date.getTime();
												var d2 = b.date.getTime();
												return d1>d2 ? -1 : d1<d2 ? 1 : 0;
											});
							});



							resolve(data);
						}, 0);
					});
				},

			}
		);

	}


	componentDidMount() {
		this.addEventsListeners();


	}
	componentWillUnmount() {
		this.removeEventsListeners();
	}
	addEventsListeners(){
		window.addEventListener("scrollBottom", this.onScrollBottom);

	}
	removeEventsListeners(){
		window.removeEventListener("scrollBottom", this.onScrollBottom);
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
			if(!this.klass){
				this.klass = nextProps.klass;
				this.loadMore();
			}
	}



	goBack = () => {
		this.props.history.goBack();
	}

	reloadData = () => {
		this.list.sendRequest("loadPosts", null, true);
	}


	loadMore = ()=>{
		var type = KRPost.Filter.all;
		this.isLoading = true;
		this.klass.postHistory(type,null, this.refDate).then(
				(data)=>{
					const {result:posts,more} = data;
					this.isFirstTime = false;
					this.reloadMore = more;

					KRUtils.each(posts, (postID, post) =>{
										this.posts[postID] = post;
								});

    			this.reloadData();
    		}).catch((error)=>{
						ModalManager.getInstance().alert(error.message);
    		}).finally(()=>{
					this.isLoading = false;
				});
	}

	onChangeFilter = (value) => {
		this.refDate = new Date();
		this.loadMore();
	}

	onScrollBottom = () => {
		if(this.reloadMore){
			this.loadMore();
		}
	}


	renderLoader() {

		return (
		<div style={{textAlign: "center"}}>
		<br/><br/>
		<DotLoader
				sizeUnit={"px"}
				size={50}
				color={'#1f9aff'}
				loading={true}
				css={{"display":"inline-block"}}
			/>
		</div>
		);


	}

	renderBody(){
		if(!this.klass){
				return this.renderLoader();
		}else{
			if(this.klass != null){
					return (
							<>
							<FilterClass onFilter={this.onChangeFilter}/>
							<ListInsideClass listAPI={this.list} klass={this.klass}/>
							{this.reloadMore &&  this.renderLoader()}
							</>
					)


				/*	if(this.state.loading){
						return this.renderLoader();
					}else{
						return (
							<>

							<ListInsideClass listAPI={this.list}/>
							</>
						)
					}*/

			}

		}

	}

	render() {
		return (
			<div className="inside-class-page">
			<BackButton onClick={this.goBack} absolute/>
				<div className="inside-class-page__container">
						{(this.klass != null) && <TopBlockInsideClass klass={this.klass} />}
						{this.renderBody()}
				</div>
			</div>
		);
	}
}
InsideClassPageComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(InsideClassPageComponent);
export const InsideClassPage = withRouter(props => <TranslatedComponent {...props}/>)
