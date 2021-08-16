import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ProgressBar} from "react-bootstrap";
import PropTypes from 'prop-types';
import "./AttachmentComponent.scss";
import {KRFile, KRAttachment} from "@klassroom/klassroom-sdk-js";

class AttachmentComponentComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.canvasRef = React.createRef();
		this.videoRef = React.createRef();
	}
	componentDidMount(){
	}
	getAttachment() {
		return this.props.attachment;
	}
	deleteAttachment = () => {
		this.getAttachment().delete();
	}
	edit = () => {
		this.getAttachment().edit();
	}
	renderPreview() {
		return <img src={this.props.attachmentThumb}/>


		/*switch(this.getAttachment().type){
			case "image":
			return <img src={this.getAttachment().getBase64()}/>
			case "video":
			return (
				<>
					<div className="icon klassicon-play"></div>
					<div className="editor-message__video-shadow"></div>
					<div className="editor-message__video-wrapper">
						<video ref={this.videoRef} src={this.getAttachment().getBase64()}/>
					</div>
				</>
			)
			case "audio":
			return (
				<>
				<div className="icon klassicon-audio"></div>
				<div className="editor-message__audio-shadow"></div>
			</>
			)
			case "other":
			return 	<div className="editor-message__other icon klassicon-csv-file"></div>
			case "event":
			return 	<div onClick={this.edit} className="editor-message__none-file icon klassicon-event"></div>
			case "poll":
			return 	<div onClick={this.edit} className="editor-message__none-file icon icon klassicon-poll-1"></div>
			case "location":
			return 	<div onClick={this.edit} className="editor-message__none-file icon klassicon-location"></div>
			case "list":
			return 	<div onClick={this.edit} className="editor-message__none-file icon klassicon-list-1"></div>
		}*/
	}
	renderTooltip() {
		//console.log(this.getAttachment(), '!!!');
		return <div className="editor-message__tooltip editor-message__tooltip--top">{this.getAttachment().name }</div>
	}
	render(){
    return (
      <div id={'editor-message__file'+this.getAttachment().indexAttachment} key={this.getAttachment().id} className="editor-message__file">
        <div onClick={this.props.onDelete} className="icon klassicon-close"></div>
				{!(this.getAttachment() instanceof KRFile || this.getAttachment() instanceof KRAttachment) && <div onClick={this.props.onEdit} className="icon klassicon-edit"></div>}

				{this.renderPreview()}
				{(this.getAttachment() instanceof KRFile)  &&  this.renderTooltip()}
        {this.getAttachment().loaded < 100 && <ProgressBar variant="success" label={<div className="editor-message__file-label">{this.$t("Compressing")}</div>} animated now={this.getAttachment().loaded}/>}
      </div>
    )
  }
}

AttachmentComponentComponent.propTypes = {
	attachment: PropTypes.object.isRequired,
}
export const AttachmentComponent = withTranslation()(AttachmentComponentComponent)
