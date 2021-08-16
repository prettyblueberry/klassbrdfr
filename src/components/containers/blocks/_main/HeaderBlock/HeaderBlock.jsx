import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {Button} from "presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {KRClient, KREvent, KBEvent} from "@klassroom/klassroom-sdk-js";
import {getDataDomain} from 'utils'
import "./HeaderBlock.scss";
import {ModalManager} from "containers/modals"

class HeaderBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.refRoot = React.createRef();
		this.state = {
			show:false
		};


	}
	componentDidMount() {
		KRClient.getInstance().addListener(this,this.handleEvent);
		this.addEventsListeners();
	}
	componentWillUnmount(){
		this.removeEventsListeners();
		KRClient.getInstance().removeListener(this);
	}
	addEventsListeners(){
		window.addEventListener("_scroll", this.onScroll);
	}
	removeEventsListeners(){
		window.removeEventListener("_scroll", this.onScroll);
	}

	handleEvent = (ev, opts)=>{
			switch(ev){
			case KREvent.user_updated:
			this.forceUpdate();
			break;
			case KREvent.app_connect:
			this.forceUpdate();
			break;
			case KBEvent.organization_updated:
			this.forceUpdate();
			break;
			}
	}
	onScroll = (data) => {
		const event = data.detail.event;
		if(event.target.scrollTop >= 105){
			if(this.refRoot.current){
				this.refRoot.current.style.position = 'fixed';
				this.refRoot.current.style.marginTop = '0';
				this.refRoot.current.style.top = '0';
				this.refRoot.current.style.left = '0';
				this.refRoot.current.style.width = '100%';
			}
		} else {
			if(this.refRoot.current) {
				this.refRoot.current.style.position = null;
				this.refRoot.current.style.marginTop = null;
				this.refRoot.current.style.top = null;
				this.refRoot.current.style.left = null;
				this.refRoot.current.style.width = null;
				this.refRoot.current.style.maxHeight = null;
			}
		}
	}

	logout = () => {
		showLoader(this.$t("Signing out..."));
		KRClient.getInstance().logout()
			.then(()=>{

			})
			.catch((error) => alert(error.message))
			.finally(()=> hideLoader());
	}

	getUser(){
		return KRClient.getInstance().user;
	}
	renderLeftButtons() {
		if(KRClient.getInstance().authenticated && KRClient.getInstance().organization) {
			return (
				<>
					<Button className="my-school-btn" name={this.$t("My School")} iconType="my-school-btn" iconSide="left" typeDesign={this.props.pageType == "school" ? "dark-blue" : "transparent-white"} onClick={() => {
						this.props.history.push("/");
					}}/>

					<Button className="my_conversations" name={this.$t("My Conversations")} iconType="conversation-icon" iconSide="left" typeDesign="transparent-white" onClick={() => {
						ModalManager.getInstance().alert(this.$t("Klassroom"), this.$t("Soon available"));
					}}/>
					{ false &&
					<Button className="absences_delays" name={this.$t("Absences & Delays")} iconType="attendance" iconSide="left" typeDesign={this.props.pageType == "attendance" ? "dark-blue" : "transparent-white"} onClick={() => {
						this.props.history.push("/attendance/dashboard");
					}}/>}

				</>
			)
		}
		return null;
	}
	getMenuItems() {
		return [
			{text: this.$t("Profile"), callback: () => {this.props.history.push("/personal-information")}, disabled: !KRClient.getInstance().organization},
			"hr",
			{text: this.$t("Sign out"), callback: this.logout}
		];
	}
	renderUserPanel() {
		if(this.props.pageType != "signup" && this.getUser()) {
			return (
				<>
					{KRClient.getInstance().organization && <img src="/public/k-img/icons/bance-icon-white.svg" className="header-block__demands" /> }

					<div className="header-block__user-container">

							<PopupMenu
								alignRight={true}
								className="class-item-left__popup"
								items={this.getMenuItems()}
							>
							<div className="header-block__user-right">
								<div className="header-block__user-data">
									<span className="header-block__user-name">{this.getUser().first_name}</span><br/>
									{KRClient.getInstance().organization && <span className="header-block__user-position">{KRClient.getInstance().organization.member.position}</span>}
								</div>
								<img src={this.getUser().thumb_image_url || "/public/images/make-photo.svg"} className="header-block__user-photo"/>
								<img src="/public/k-img/icons/arrow-bottom-white.svg" className="header-block__user-options-button" />
							</div>
							</PopupMenu>

					</div>

				</>
			);
		}
		return null;
	}
	render() {
		return (
			<div ref={this.refRoot} className="header-block">
					{KRClient.getInstance().pixel && <img src={getDataDomain()+"/_data/klassroomauth?klassroomauth="+KRClient.getInstance().pixel} width="0" height="0" style={{display:"none"}} />}

					<div className="header-block__left">
						<a className="header-block__logo-app" href="/"><img src="/public/img/klassboard_logo.png" className="header-block__logo" /></a>
						{this.renderLeftButtons()}
					</div>
					<div className="header-block__right">
						{this.renderUserPanel()}
					</div>
			</div>
		);
	}
}
HeaderBlockComponent.propTypes = {
	pageType: PropTypes.string.isRequired,
}
const TranslatedComponent = withTranslation()(HeaderBlockComponent);
export const HeaderBlock = withRouter(props => <TranslatedComponent {...props}/>)
