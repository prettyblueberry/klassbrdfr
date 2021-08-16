import * as React from "react";
import { withTranslation } from 'react-i18next';
import {CircleImage, ColorBar} from "../../../../../../presentational";
import PropTypes from 'prop-types';
import {KRUtils} from "@klassroom/klassroom-sdk-js";
import "./ClassNotLinked.scss";
import {ModalManager} from "containers/modals"

class ClassNotLinkedComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	cancelRequest = () => {
		kbApp.modalAPI.confirm(this.$t("Do you want to cancel this request?")
			,(val) => {
				if(val){
					showLoader(this.$t("Cancelling request..."));
					this.props.classroom.cancelRequest()
					.then(() => {

					})
					.catch((err) => {
								ModalManager.getInstance().alert(this.$t("Error"), err.message);
					})
					.finally(()=>hideLoader());
				}
		}
	 );
	};

	resendRequest = ()=>{
		kbApp.modalAPI.confirm(this.$t("Do you want to resend this request?")
			,(val) => {
				if(val){
					showLoader(this.$t("Resending request..."));
					this.props.classroom.resendRequest()
					.then(() => {
							ModalManager.getInstance().alert(null,this.$t("You request has been resent."))
					})
					.catch((err) => {
								ModalManager.getInstance().alert(this.$t("Error"), err.message);
					})
					.finally(()=>hideLoader());
				}
		}
		);
	};



	render() {
		return (
			<div className="class-not-linked">
				<ColorBar index={3}/>
				<div className="class-not-linked-header">
					<div className="class-not-linked-header__logo-container">
						<CircleImage
							photo={(this.props.classroom.request.klass && this.props.classroom.request.klass.cover_thumb_url) || "/public/pages/listClasses/class-icon.svg"}

						/>
					</div>
					{this.props.classroom.request.klass &&
					<div className="class-not-linked-header__name-container">
						<span title={this.props.classroom.request.klass.natural_name} className="class-not-linked-header__name">{this.props.classroom.request.klass.natural_name}</span>
						<span className="class-not-linked-header__by" dangerouslySetInnerHTML={{__html: this.$t("by <b>{{by}}</b>", {by: this.props.classroom.request.klass.ownerDisplayName()})}}></span>
						<div className="class-not-linked-data">

							{this.props.classroom.request.klass_key && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{this.props.classroom.request.klass_key}</span>
							</span>}
							{this.props.classroom.request.email && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{KRUtils.formatPhone(this.props.classroom.request.phone)}</span>
							</span>}
							{this.props.classroom.request.email && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{this.props.classroom.request.email}</span>
							</span>}
						</div>
					</div>
					}
					{!this.props.classroom.request.klass &&
					<div className="class-not-linked-header__name-container">
						<span title={this.$t("Pending request to teacher")} className="class-not-linked-header__name">{this.$t("Pending request to teacher")}</span>
						<span className="class-not-linked-header__by" dangerouslySetInnerHTML={{__html: `<b>${this.props.classroom.request.user_name}</b>`}}></span>
						<div className="class-not-linked-data">

							{this.props.classroom.request.klass_key && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{this.props.classroom.request.klass_key}</span>
							</span>}
							{this.props.classroom.request.email && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{KRUtils.formatPhone(this.props.classroom.request.phone)}</span>
							</span>}
							{this.props.classroom.request.email && <span className="class-not-linked-data__row">
								<img className="class-not-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
								<span>{this.props.classroom.request.email}</span>
							</span>}
						</div>
					</div>
					}
					<div className="class-not-linked-header__icon-container">
						<img src="/public/pages/listClasses/confirm-icon.svg"/>
					</div>

				</div>{/** class-not-linked-header[END] */}




				<div className="class-not-linked-bottom">
					<a className="class-not-linked-bottom-cancel" onClick={this.cancelRequest}>{this.$t("Cancel the request")}</a>
					<a className="class-not-linked-bottom-resend" onClick={this.resendRequest}>{this.$t("Resend the request")}</a>
				</div>

			</div>
		);
	}
}
ClassNotLinkedComponent.propTypes = {
	type: PropTypes.string,
	index: PropTypes.number,
}
export const ClassNotLinked = withTranslation()(ClassNotLinkedComponent)
