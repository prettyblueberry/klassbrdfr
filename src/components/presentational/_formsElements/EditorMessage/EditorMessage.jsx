import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import * as moment from 'moment';
import {Attachment, AttachmentFile} from "./classes";
import {deepClone} from "utils";
import {
	SliderButton,
	DateTimePicker,
} from "presentational";
import {AttachEventForm, LocationForm, PollForm, MultimediaAddListForm} from "forms";
import {AttachmentComponent} from "./components";
import {KRClient,KRPost, KRAttachment, KRUtils, KRFile, KRPostEvent, KRPostLocation, KRPostChecklist,KRPostPoll} from "@klassroom/klassroom-sdk-js";
import "./EditorMessage.scss";
import {ModalManager} from "containers/modals"


class EditorMessageComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.textareaRef = React.createRef();
		this.filesRef = React.createRef();
		this.videosRef = React.createRef();
		this.imagesRef = React.createRef();
		this.type = {

			image:"image",
			video:"video",
			event:"event",
			document:"document",
			audio:"audio",
			location:"location",
			poll:"poll",
			checklist:"checklist",
		}

		this.attachments = [];
		this.attachmentsThumb = [];
		this.text = null;
		this.pickerType = KRAttachment.Type.image;
		this.postType = KRPost.Type.message;
		this.imageLimit = this.props.imageLimit || 32;
		this.documentLimit = this.props.documentLimit || 32;
		this.canMix = this.props.canMix || false;

		this.post = this.props.value || new KRPost();
		this.options = {
			reply: false,
			signature: false,
			date: null,
		}
		//this.initPost();
	}
	componentDidMount() {
		this.initPost();
	}
	updatePreview = (text, validateForm = false)=>{


			let post = this.post;
			const options = this.options;
			post.date = new Date();
			if(text != null) post.text = text;
			this.post.attachments = {};


			if(options.date){
				post.is_scheduled = true;
				post.scheduled_at = options.date.toDate();
			}else{
				post.scheduled_at = null;
				post.is_scheduled = false;
			}

			post.require_reply = options.reply;
			post.require_signature = options.signature;

			KRUtils.each(this.attachments, (id, attachment)=>{
					if(attachment instanceof KRPostEvent){
						post.event = attachment
					}

					if(attachment instanceof KRPostChecklist){
						post.checklist = attachment
					}

					if(attachment instanceof KRPostPoll){
						post.poll = attachment
					}

					if(attachment instanceof KRPostLocation){
						post.location = attachment
					}

					if(attachment instanceof KRFile){
						post.attachments[id] = new KRAttachment(attachment);
					}

					if(attachment instanceof KRAttachment){
						post.attachments[attachment.id] = attachment;
					}
			});

			post.initAttachments();
			this.forceUpdate();
			this.props.onChange(post,this.attachments, validateForm);
	}

	onChange = (event) => {
		const value = event.target.value;
		const maxCount = this.getMaxCountChars();
		if(maxCount && maxCount > 0){
			if(value.length > maxCount){
				return false;
			}
		}
		this.updatePreview(value);
		//this.props.onChange({text: value, attachments: this.props.value.attachments});
	}
	onKeyPress = (event) => {
		if (event.key == 'Enter') {
			const value = event.target.value;
			const maxCount = this.getMaxCountChars();
			if(maxCount && maxCount > 0){
				if(value.length > maxCount){
					return false;
				}
			}
			this.updatePreview(value, true);
		}
	}
	getMaxCountChars() {
		return this.props.maxCountChars || 0;
	}
	getValue(){
		return this.props.value;
	}
	getCountChars(){
		if(this.textareaRef.current && this.textareaRef.current.value){
			return this.textareaRef.current.value.length;
		}
		return 0;
	}

	changeFiles = (event) => {
		const files = event.target.files;
		switch(this.pickerType){
			case KRAttachment.Type.image:
			this.attachImage(files);
			break;
			case KRAttachment.Type.video:
			this.attachVideo(files);
			break;
			case KRAttachment.Type.audio:
			this.attachAudio(files);
			break;
			default:
			this.attachDocument(files);
		}
		event.target.value = null;


		//for (let i = 0; i < files.length; i++) {
			//this.uploadSingleFile(files[i], i);
		//}
	}
	uploadFiles = (type) => {
		if(this.filesRef && this.filesRef.current){
			this.setAcceptType(type);
			this.filesRef.current.click();
		}
	}
	// type e.g. videos, images,
	setAcceptType = (type = null) => {
		if(this.filesRef && this.filesRef.current){
			switch(type){
				case "videos":
				this.filesRef.current.setAttribute("accept", "video/mp4,video/x-m4v,video/*");
				this.pickerType = KRAttachment.Type.video;
				this.filesRef.current.removeAttribute("multiple","");
				break;
				case "images":
				this.filesRef.current.setAttribute("accept", "image/*");
				this.pickerType = KRAttachment.Type.image;
				this.filesRef.current.setAttribute("multiple","");
				break;
				case "audios":
				this.filesRef.current.setAttribute("accept", "audio/*");
				this.pickerType = KRAttachment.Type.audio;
				this.filesRef.current.setAttribute("multiple","");
				break;
				default:
				this.filesRef.current.setAttribute("accept", ".pdf,.doc,.pages,.docx,.xlsx,.numbers");
				this.pickerType = KRAttachment.Type.document;
				this.filesRef.current.setAttribute("multiple","");
			}
		}
	}

	attachImage = (files) => {
		if(this.canMix){
			if(this.selectedType != this.type.document){
					this.attachments = [];
					this.attachmentsThumb = [];
			}
			if(this.attachments.length+files.length > this.documentLimit){
					ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can't add more than {{count}} documents per post",{count:this.documentLimit}));
					return;
			}
			this.selectedType = this.type.document

		}else{
			if(this.selectedType != this.type.image){
					this.attachments = [];
					this.attachmentsThumb = [];
			}
			if(this.attachments.length+files.length > this.documentLimit){
					ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can't add more than {{count}} images per post",{count:this.imageLimit}));
					return;
			}
			this.selectedType = this.type.image
		}

		let aLength = this.attachmentsThumb.length;
		let count = files.length;
		KRUtils.each(files,(key,val)=>{

			let id = JSON.parse(key) + aLength;
			let file = val;

			if(file.type.indexOf("image")<0){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("file not supported"));

				return false;
			}

			this.attachmentsThumb[id]="/public/k-img/placeholder.png";
			let f = new KRFile(file);
			f.loaded = 0;
			f.type = KRAttachment.Type.image;

			this.attachments[id]=f;


			this.forceUpdate();
			setTimeout(()=>{
						let reader  = new FileReader();
						reader.onprogress = (event)=>{
							  if (event.lengthComputable) {
									this.attachments[id].loaded = (event.loaded/event.total*100);
									this.forceUpdate();
						    }
						}
						reader.onloadend =  () =>{
							 setTimeout(()=>{
							   KRUtils.processImage(reader.result, file.type, 1280,(dataUrl)=>{
								   	this.attachmentsThumb[id]=dataUrl;
							  		this.attachments[id].dataURItoFile(dataUrl,file.name);
										this.attachments[id].loaded = 100;
										this.updatePreview();

							   });
							 },1000);
						  }
						  reader.readAsDataURL(file);
					},500);
		});
	}

	attachVideo = (files) => {
		this.attachments = [];
		this.attachmentsThumb = [];

		this.selectedType = this.type.video

		let aLength = this.attachmentsThumb.length;
		let count = files.length;

		let id = aLength;
		let file = files[0];

		if(file.type.indexOf("video")<0){
			ModalManager.getInstance().alert(this.$t("Error"),this.$t("file not supported"));

			return false;
		}

		if(file.size>150000000){
			ModalManager.getInstance().alert(this.$t("Error"),this.$t("file too large(max 150mb)"));

			return false;
		}

		this.attachmentsThumb[id]="/public/k-img/icons/add-video.png";
		this.attachments[id]=new KRFile(file);
		this.attachments[id].type=KRAttachment.Type.video;

		this.updatePreview();


	}

	attachDocument = (files) => {
		if(this.selectedType != this.type.document){
				this.attachments = [];
				this.attachmentsThumb = [];
		}
		if(this.attachments.length+files.length > this.documentLimit){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can't add more than {{count}} documents per post",{count:this.documentLimit}));
				return;
		}

		this.selectedType = this.type.document

		let aLength = this.attachmentsThumb.length;
		let count = files.length;
		KRUtils.each(files,(key,val)=>{

			let id = JSON.parse(key) + aLength;
			let file = val;

			if(file.type.indexOf("video")>=0 || file.type.indexOf("image")>=0 || file.type.indexOf("audio")>=0){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("file not supported"));

				return false;
			}

			if(file.size>150000000){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("file too large(max 150mb)"));

				return false;
			}

			this.attachmentsThumb[id]="/public/k-img/icons/add-document.png";
			this.attachments[id]=new KRFile(file);
			this.attachments[id].type=KRAttachment.Type.document;
			this.updatePreview();

		});
	}

	attachAudio = (files)=>{

		if(this.canMix){
			if(this.selectedType != this.type.document){
					this.attachments = [];
					this.attachmentsThumb = [];
			}
			if(this.attachments.length+files.length > this.documentLimit){
					ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can't add more than {{count}} documents per post",{count:this.documentLimit}));
					return;
			}
			this.selectedType = this.type.document

		}else{
			if(this.selectedType != this.type.audio){
					this.attachments = [];
					this.attachmentsThumb = [];
			}
			if(this.attachments.length+files.length > this.documentLimit){
					ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can't add more than {{count}} documents per post",{count:this.documentLimit}));
					return;
			}

			this.selectedType = this.type.audio


		}


		let aLength = this.attachmentsThumb.length;
		let count = files.length;
		KRUtils.each(files,(key,val)=>{

			let id = JSON.parse(key) + aLength;
			let file = val;

			if(file.type.indexOf("audio")<0){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("file not supported"));

				return false;
			}

			if(file.size>150000000){
				ModalManager.getInstance().alert(this.$t("Error"),this.$t("file too large(max 150mb)"));

				return false;
			}

			this.attachmentsThumb[id]="/public/k-img/icons/add-audio.png";
			this.attachments[id]=new KRFile(file);
			this.attachments[id].type=KRAttachment.Type.audio;
			this.updatePreview();

		});


	}


	attachEvent = (event) => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "attach-event-modal",
			title: this.$t("Attach event"),
			closeButton: true
		});
		this.modalAPI.message = <AttachEventForm
			event={event}
			modalAPI={this.modalAPI}
			callbackSubmit={(event) => {

				if(this.selectedType != this.type.event){
						this.attachments = [];
						this.attachmentsThumb = [];
				}

				this.attachments.push(event);
				this.attachmentsThumb.push("/public/k-img/icons/add-event.png");


				this.updatePreview();

				this.modalAPI.hideModal();
			}}
		/>;
	}
	attachLocation = (location = {}) => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "attach-event-modal",
			title: this.$t("Location"),
			closeButton: true
		});
		this.modalAPI.message = <LocationForm
			location={location}
			modalAPI={this.modalAPI}
			callbackSubmit={(location)=>{
				if(this.selectedType != this.type.location){
						this.attachments = [];
						this.attachmentsThumb = [];
				}

				this.attachments.push(location);
				this.attachmentsThumb.push("/public/k-img/icons/add-location.png");


				this.updatePreview();

				this.modalAPI.hideModal();
			}}
		/>;
	}
	attachPoll = (poll) => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "attach-event-modal",
			title: this.$t("Add Poll"),
			closeButton: true
		});
		this.modalAPI.message = <PollForm
			poll={poll}
			modalAPI={this.modalAPI}
			callbackSubmit={(poll)=>{
				if(this.selectedType != this.type.poll){
						this.attachments = [];
						this.attachmentsThumb = [];
				}

				this.attachments.push(poll);
				this.attachmentsThumb.push("/public/k-img/icons/add-poll.png");


				this.updatePreview();

				this.modalAPI.hideModal();
			}}
		/>;
	}
	attachList = (list) => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "attach-event-modal",
			title: this.$t("Add list"),
			closeButton: true
		});
		this.modalAPI.message = <MultimediaAddListForm
			list={list}
			modalAPI={this.modalAPI}
			callbackSubmit={(list)=>{
				if(this.selectedType != this.type.checklist){
						this.attachments = [];
						this.attachmentsThumb = [];
				}

				this.attachments.push(list);
				this.attachmentsThumb.push("/public/k-img/icons/add-list.png");


				this.updatePreview();

				this.modalAPI.hideModal();
			}}
		/>;
	}
	deleteAttachment = (id) => {

		if(this.attachments[id] instanceof KRAttachment && this.attachments[id].id){
				this.post.to_remove.push(this.attachments[id].id);
				delete this.post.attachments[this.attachments[id].id];
		}

		if(this.attachments[id] instanceof KRFile){
				delete this.post.attachments[id];
		}

		this.post.event = null;
		this.post.poll = null;
		this.post.checklist = null;
		this.post.location = null;

		this.attachments.splice(id,1);
		this.attachmentsThumb.splice(id,1);



		this.updatePreview();
	}
	renderCountChars() {
		if(this.props.maxCountChars){
			return (
			<div className="editor-message__count">
				{this.$t("{{count}}/{{max}} characters", {
					max: this.props.maxCountChars,
					count: this.getCountChars(),
				})}
			</div>
			)
		}
		return null;
	}
	renderAttachments(){

		return this.attachments.map((attachment,index) => {
			return (
				<AttachmentComponent
						attachment={this.attachments[index]}
						attachmentThumb={this.attachmentsThumb[index]}
						key={index}
						onDelete={()=>{
							this.deleteAttachment(index);
						}}
						onEdit={()=>{
							if(attachment instanceof KRPostEvent){
								this.attachEvent(attachment);
							}
							if(attachment instanceof KRPostChecklist){
								this.attachList(attachment);
							}
							if(attachment instanceof KRPostPoll){
								this.attachPoll(attachment);
							}
							if(attachment instanceof KRPostLocation){
								this.attachLocation(attachment);
							}
						}}
				/>
			)
		});
	}
	hasImagesOrDocumentsOrAudios(){
		return false;
	}
	hasNonFilesAttachments(){
		return false;
	}

	initPost = ()=>{


		this.post.to_remove = [];

		if(this.post.id && !this.post.homework){

			this.options.reply = this.post.require_reply;
			this.options.signature = this.post.require_signature;

			this.options.date = (this.post.scheduled_at) ? moment(this.post.scheduled_at) : null;

			if(this.post.videos.length){
								this.selectedType = this.type.video
							}else{
								if(this.post.audios.length  || this.post.documents.length || this.post.images.length){
									 this.selectedType = this.type.document

								}else if(this.post.type == KRPost.Type.message){


								}

							}

		KRUtils.each(this.post.attachments, (key,a)=>{
						if(a.thumb_url){
							this.attachmentsThumb.push(a.thumb_url);
						}else{
							if(a.type == KRAttachment.Type.audio){
								this.attachmentsThumb.push('/public/k-img/icons/add-audio.png');
							}else{
								this.attachmentsThumb.push('/public/k-img/icons/add-document.png');
							}
						}
						this.attachments.push(a);
					});

		if(this.post.event){
			this.attachments.push(this.post.event);
			this.attachmentsThumb.push("/public/k-img/icons/add-event.png");
		}
		if(this.post.poll){
			this.attachments.push(this.post.poll);
			this.attachmentsThumb.push("/public/k-img/icons/add-poll.png");
		}
		if(this.post.checklist){
			this.attachments.push(this.post.checklist);
			this.attachmentsThumb.push("/public/k-img/icons/add-list.png");
		}
		if(this.post.location){
			this.attachments.push(this.post.location);
			this.attachmentsThumb.push("/public/k-img/icons/add-location.png");
		}
	}
		this.updatePreview()
	}

	componentWillUpdate(nextProps, nextState) {
			if(this.post != nextProps.value){
				this.post = nextProps.value;
				this.initPost();

			}
	}

	renderTextarea(){
		let text = "";
		if(this.post && this.post){
			text = this.post.text;
		}
		return <textarea value={text || ""} onChange={this.onChange} ref={this.textareaRef} className="editor-message__input"></textarea>;
	}
	updateOptionValue = (type, value) => {
		this.options[type] = value;
		this.updatePreview();
	}
	renderOptions = () => {
		return (<div className="editor-message__options">
			<div className="editor-message__options-top">
				<SliderButton
					className="editor-message__options-signature"
					isActive={this.options.signature}
					onClick={(value) => {this.updateOptionValue("signature", value)}}
					label={this.$t("Signature")}
					useSmallSize={true}
				/>
				<SliderButton
					className="editor-message__options-reply"
					isActive={this.options.reply}
					onClick={(value) => {this.updateOptionValue("reply", value)}}
					label={this.$t("With reply")}
					useSmallSize={true}
				/>
				<DateTimePicker
					dateFormat="ll"
					className="editor-message__options-date"
					placeholder={this.$t("Scheduled")}
					value={this.options.date}
					onChange={(value) => {this.updateOptionValue("date", value)}}
					showClearButton={true}
					onClear={() => {this.updateOptionValue("date", null)}}
					useSmallSize={true}
				/>
			</div>
		</div>)
	}
	render() {
		return (
			<div className="editor-message">
				<input onChange={this.changeFiles} accept="*" ref={this.filesRef} type='file'  className="editor-message__file-input"/>
				{this.renderOptions()}
				<div className="editor-message__wrapper">
					{this.renderCountChars()}
					<div className="editor-message__label">{this.props.label || ""}</div>
					{this.renderTextarea()}
					<div className={"editor-message__files "+classnames({"editor-message__btn--disabled": this.hasNonFilesAttachments()})}>
						{this.renderAttachments()}
					</div>
				</div>
				<div className="editor-message__buttons">

					<div onClick={() => {
							this.uploadFiles("images")
						}} className={"icon klassicon-photo-camera "+classnames({"editor-message__btn--disabled": this.hasNonFilesAttachments()})}>
						<div className="editor-message__tooltip">{this.$t("Add photo")}</div>
					</div>

					<div onClick={() => {
							this.uploadFiles("videos")
						}}
						className={"icon klassicon-video "+classnames({"editor-message__btn--disabled": (this.hasImagesOrDocumentsOrAudios() || this.hasNonFilesAttachments()) }) }>
						<div className="editor-message__tooltip">{this.$t("Add video")}</div>
					</div>

					<div onClick={() => {
							this.uploadFiles("documents")
						}} className={"icon klassicon-document "+classnames({"editor-message__btn--disabled": this.hasNonFilesAttachments()})}>
						<div className="editor-message__tooltip">{this.$t("Add other files")}</div>
					</div>

					<div onClick={() => {
							this.uploadFiles("audios")
						}}
						className={"icon klassicon-audio "+classnames({"editor-message__btn--disabled": this.hasNonFilesAttachments() })}>
						<div className="editor-message__tooltip">{this.$t("Add audio files")}</div>
					</div>

					<div onClick={() => {
							if(!this.hasImagesOrDocumentsOrAudios() && !this.hasNonFilesAttachments()){
								this.attachEvent();
							}
						}}
						className={"icon klassicon-event "+classnames({"editor-message__btn--disabled": (this.hasImagesOrDocumentsOrAudios() || this.hasNonFilesAttachments()) })}>
						<div className="editor-message__tooltip">{this.$t("Add events")}</div>
					</div>

					<div onClick={() => {
							if(!this.hasImagesOrDocumentsOrAudios() && !this.hasNonFilesAttachments()){
								this.attachLocation();
							}
						}}
						className={"icon klassicon-location "+classnames({"editor-message__btn--disabled": (this.hasImagesOrDocumentsOrAudios() || this.hasNonFilesAttachments()) })}>
						<div className="editor-message__tooltip">{this.$t("Add location")}</div>
					</div>

					<div onClick={() => {
							if(!this.hasImagesOrDocumentsOrAudios() && !this.hasNonFilesAttachments()){
								this.attachPoll();
							}
						}}
					className={"icon klassicon-poll-1 "+classnames({"editor-message__btn--disabled": (this.hasImagesOrDocumentsOrAudios() || this.hasNonFilesAttachments()) })}>
						<div className="editor-message__tooltip">{this.$t("Add poll")}</div>
					</div>

					<div onClick={() => {
							if(!this.hasImagesOrDocumentsOrAudios() && !this.hasNonFilesAttachments()){
								this.attachList();
							}
						}}
					className={"icon klassicon-list-1 "+classnames({"editor-message__btn--disabled": (this.hasImagesOrDocumentsOrAudios() || this.hasNonFilesAttachments()) })}>
						<div className="editor-message__tooltip">{this.$t("Add list")}</div>
					</div>

				</div>
			</div>
		);
	}
}

EditorMessageComponent.propTypes = {
	value: PropTypes.object.isRequired,
	label: PropTypes.string,
	maxCountChars: PropTypes.number,
	onChange: PropTypes.func.isRequired
}
export const EditorMessage = withTranslation()(EditorMessageComponent)
