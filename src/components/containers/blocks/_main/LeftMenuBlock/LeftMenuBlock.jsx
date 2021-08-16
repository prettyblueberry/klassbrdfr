import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {Button, PhotoSelector, LeftMenuItem} from "presentational";
import classnames from "classnames";
import "./LeftMenuBlock.scss";
import {KRClient, KBEvent, KREvent} from "@klassroom/klassroom-sdk-js";
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {ModalManager} from "containers/modals"

class LeftMenuBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.refRoot = React.createRef();
		this.handleEvent = (ev, opts)=>{
				switch(ev){
					case KREvent.app_connect:
						this.forceUpdate();
						break;
						case KBEvent.organization_updated:
							this.forceUpdate();
							break;
						case KREvent.counts_updated:
							this.forceUpdate();
							break;
				}
		}
		this.wideMobileMenu = false;
		KRClient.getInstance().addListener(this,this.handleEvent);
	}
	componentDidMount() {
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
	onScroll = (data) => {
		const event = data.detail.event;
		/*if(event.target.scrollTop >= 105){
			if(this.refRoot.current){
				this.refRoot.current.style.position = 'fixed';
				this.refRoot.current.style.marginTop = '0';
				this.refRoot.current.style.top = '0';
				this.refRoot.current.style.left = '30px';
				this.refRoot.current.style.width = '270px';
				this.refRoot.current.style.maxHeight = '100%';
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
		}*/
	}

	toggleMenu = () => {
		this.wideMobileMenu = !this.wideMobileMenu;
		this.forceUpdate();
	}
	getRootClasses() {
		let classes = {
			"left-menu-block": true
		}
		if(this.wideMobileMenu){
			classes["left-menu-block__wide-menu"] = true;
		}
		return classnames(classes);
	}
	renderMenu() {
		let pages = [];
		if(this.props.pageType == "school"){
			pages = [
				{
					to: "/",
					icon: "dashboard",
					name: this.$t("Dashboard"),
					visible: Object.values(KRClient.getInstance().classrooms).length > 0
				},
				{
					to: "/my-classes",
					icon: "my-classes",
					count: Object.values(KRClient.getInstance().classrooms).length,
					countColor: "255, 181, 58",
					name: this.$t("My Classes"),
					visible: Object.values(KRClient.getInstance().classrooms).length > 0
				},
				{
					to: "/messages",
					icon: "campaign",
					count: KRClient.getInstance().campaigns_count,
					countColor: "0, 183, 206",
					name: this.$t("My Messages"),
					visible: Object.values(KRClient.getInstance().classrooms).length > 0
				},

				{
					to: "/parents",
					icon: "parents",
					count: KRClient.getInstance().parents_count,
					countColor: "241, 91, 91",
					name: this.$t("Parents"),
					visible: Object.values(KRClient.getInstance().classrooms).length > 0
				},
			]
		}
		if(this.props.pageType == "attendance"){
			pages = [
				{
					to: "/attendance/dashboard",
					icon: "dashboard",
					name: this.$t("Dashboard"),
					visible: true
				},
				{
					to: "/attendance/register",
					icon: "attendance-register",
					name: this.$t("Attendance Register"),
					visible: true
				},
				{
					to: "/attendance/my-classes",
					icon: "my-classes",
					count: Object.values(KRClient.getInstance().classrooms).length,
					countColor: "255, 181, 58",
					name: this.$t("My Classes"),
					visible: true
				},

				{
					to: "/attendance/students",
					icon: "students",
					count: 10,
					countColor: "143, 99, 222",
					name: this.$t("Students"),
					visible: true
				},
			]
		}

		return (
			<div className="left-menu-block__menu-container">
				{pages.map((page, index) => {
					if(!page.visible){
						return null;
					}
					return <LeftMenuItem key={"page__"+index} countColor={page.countColor} count={page.count} to={page.to} icon={page.icon} name={page.name} callback={page.callback || (() => {})}/>
				})}
			</div>
		)
	}
	render() {
		return (
			<div ref={this.refRoot} className={this.getRootClasses()}>

					<PhotoSelector
						callbackChangePhoto = {(photo) => {
							if(!photo){
								showLoader(this.$t("Removing school cover..."));
								KRClient.getInstance().organization.removeCover()
								.then(() => {
								})
								.catch((err) => {
											ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());
							}else{
								showLoader(this.$t("Uploading school cover..."));
								KRClient.getInstance().organization.setCover(photo)
								.then(() => {
								})
								.catch((err) => {
											ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());
							}


						}


						}
						photo={KRClient.getInstance().organization.thumb_image_url}
					/>
						<div className="" style={{position:"relative"}}>
						<div className="left-menu__shape small-butterscotch"></div>
						<div className="left-menu__shape small-coral"></div>
						<div className="left-menu__shape small-turquoise-blue"></div>
						<div className="left-menu__shape small-purple"></div>


						<div className="left-menu-block__header1">{this.$t("MY SCHOOL")}</div>
						<div className="left-menu-block__header2">
							{KRClient.getInstance().organization.name}
						</div>
						<NavLink
							className="left-menu-block__edit-school-btn"
							activeClassName="active"
							to="/school-information"
							exact={true}
						>
							{this.$t("Edit my school")}
						</NavLink>
						<div onClick={this.toggleMenu} className="left-menu__menu-icon icon klassicon-menu"></div><br/>
						<div className="left-menu__separator"></div>

					</div>

					<Button disabled={Object.values(KRClient.getInstance().classrooms).length == 0} name={this.$t("Broadcast Message")} iconType="write-message-white" iconSide="left" typeDesign="primary" onClick={() => {

							this.props.history.push(`/choose-message`);

					}}/>

					{this.renderMenu()}
			</div>
		);
	}
}
LeftMenuBlockComponent.propTypes = {
	pageType: PropTypes.string
}

const TranslatedComponent = withTranslation()(LeftMenuBlockComponent);
export const LeftMenuBlock = withRouter(props => <TranslatedComponent {...props}/>)
