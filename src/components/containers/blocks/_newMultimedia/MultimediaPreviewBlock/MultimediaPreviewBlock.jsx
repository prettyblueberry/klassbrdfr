import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	HeaderText,
	HeaderTextSmall,
	Button,
	RoundIconMiddle,
	Space,
	MessagePreview,
} from "presentational";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./MultimediaPreviewBlock.scss";

class MultimediaPreviewBlockComponent extends React.Component {
	static translate;
	static i18n;
	modalAPI = {};
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = this.props.formAPI;
		this.steps = this.props.stepsAPI;
		this.previewBlockRef = React.createRef();
		this.timerScrollEvent = null;
		this.modalAPI = null;
	}
	componentDidMount() {
		this.addListeners();
		this.initWidth();
	}
	componentWillUnmount(){
		this.removeListeners();
	}
	addListeners = () => {
		const leftPanelElement = document.querySelector(".messages-layout");
		if(leftPanelElement){
			leftPanelElement.addEventListener("scroll", this.onScroll);
		}
	}
	removeListeners = () => {
		const leftPanelElement = document.querySelector(".messages-layout");
		if(leftPanelElement){
			leftPanelElement.removeEventListener("scroll", this.onScroll);
		}
	}
	initWidth = () => {
		if(this.previewBlockRef.current) {
			this.previewBlockRef.current.style.width = this.previewBlockRef.current.offsetWidth + "px";
		}
	}
	onScroll = (event) => {
		if(event.target.scrollTop >= 153){
			if(this.previewBlockRef.current){
				this.previewBlockRef.current.style.position = 'fixed';
				this.previewBlockRef.current.style.marginTop = '50px';
				this.previewBlockRef.current.style.top = '0';
				this.previewBlockRef.current.style.maxHeight = '100%';
			}
		} else {
			if(this.previewBlockRef.current) {
				this.previewBlockRef.current.style.position = null;
				this.previewBlockRef.current.style.marginTop = null;
				this.previewBlockRef.current.style.top = null;
				this.previewBlockRef.current.style.maxHeight = null;
			}
		}
	}
	onWheel = (event) => {
		if(this.previewBlockRef.current){
			clearTimeout(this.timerScrollEvent);
			this.previewBlockRef.current.style.pointerEvents = 'none';
			this.timerScrollEvent = setTimeout(() => {
				this.previewBlockRef.current.style.pointerEvents = null;
			}, 300);
		}
	}
	getData = () => {
		const data = this.form.getValueInputForm('message');

		return data;
	}
	onSubmit = () => {
		if(this.props.callbackSubmit){
			this.props.callbackSubmit();
		}
	}
	cancel = () => {
			this.props.history.goBack();
	}
	disableNext() {
		return !this.form.getFormValidation(false).valid;
	}

	statistic() {
		return {
			views: 32,
            reactions: 46,
            comments: 21,
			viewsOf: 86
		}
	}

	render() {
		return (
			<div ref={this.previewBlockRef} className="multimedia-preview-block">
				<div className="multimedia-preview-block__blocks">
					<HeaderText className="multimedia-preview-block__h1" textJSX={this.$t("Message preview")}/>
					<RoundIconMiddle className="multimedia-preview-block__icon" color="purple" icon="views"/>
					<HeaderTextSmall className="multimedia-preview-block__h2" style={{marginBottom: "40px"}} textJSX={this.$t("Check a preview of your multimedia message")}/>
					<MessagePreview post={this.getData()} statistic={this.statistic()} formAPI={this.form} isPreview={true}/>

					

				</div>
				<Space height="60px" />
				<div className="multimedia-preview-block__buttons">
					<Button disabled={this.disableNext()} className="multimedia-preview-block__next" onClick={this.onSubmit} iconType="send" typeDesign="primary" name={this.$t("Broadcast the message")}/>
					<Button className="multimedia-preview-block__cancel" onClick={this.cancel} iconType="without-icon" typeDesign="transparent-blue" name={this.$t("Cancel")}/>
				</div>
			</div>
		);
	}
}
MultimediaPreviewBlockComponent.propTypes = {
	formAPI: PropTypes.object.isRequired,
	callbackSubmit: PropTypes.func,
}
const TranslatedComponent = withTranslation()(MultimediaPreviewBlockComponent);
export const MultimediaPreviewBlock = withRouter(props => <TranslatedComponent {...props}/>)
