import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./ModalChooseAvatarTabs.scss";

class ModalChooseAvatarTabsComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	changeTab = (tabId) => {
		this.props.onChange(tabId);
	}
	selectAvatar = (val,index) => {
		this.props.onSelectAvatar(val,index);
	}
	renderHeaderTabs() {
		if(!this.props.avatars.length) return;
		return this.props.avatars.map((val) => val.name).map((tab, index) => {

			return (
				<li className={
					classnames({
						"modal-choose-avatar-tabs__list-item": true,
						"active": index == this.props.selectedTabId
					})}
					onClick={() => this.changeTab(index)}
					role="tab"
					key={index}
				>
					{tab}
				</li>
			)
		});
	}
	renderContent() {
		if(!this.props.avatars.length) return;
	

		const imgs = this.props.avatars[this.props.selectedTabId].list.map((val,index) =>{
				return (
					<img onClick={() => this.selectAvatar(val,index)} className="modal-choose-avatar__avatar" key={index} src={val}/>
				)
		})
			return (
				<div className={
					classnames({
						"tab-pane": true,
						"active": true,

					})}
					key={this.props.selectedTabId}
				>

					{imgs}
				</div>)
		};

	render() {
		return (
			<div className="modal-choose-avatar-tabs">
				<div className="modal-choose-avatar-tabs__list_menu">
						<ul className="modal-choose-avatar-tabs__list " role="tablist">
			   			{this.renderHeaderTabs()}
						</ul>
				</div>

        <div className="modal-choose-avatar-tabs__content tab-content">
					{this.renderContent()}
        </div>
			</div>
		);
	}
}

ModalChooseAvatarTabsComponent.propTypes = {
	selectedTabId: PropTypes.number,
	avatars: PropTypes.array,
	onChange: PropTypes.func.isRequired,
}
export const ModalChooseAvatarTabs = withTranslation()(ModalChooseAvatarTabsComponent)
