import * as React from "react";
import { withTranslation } from 'react-i18next';
import {HeaderTextMiddle} from "presentational";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SMSPackageItem.scss";

class SMSPackageItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getRootClasses () {
		let classes = {
			"choose-package-package": true,
		}
		if(this.props.isSelected){
			classes["choose-package-package__selected"] = true;
		} else {
			if(this.props.package.type == "eco"){
				classes["choose-package-package__eco"] = true;
			}
			if(this.props.package.type == "comfort"){
				classes["choose-package-package__comfort"] = true;
			}
			if(this.props.package.type == "premium"){
				classes["choose-package-package__premium"] = true;
			}
		}
		return classnames(classes);
	}
	getClassesIcon() {
		let classes = {
			"icon": true
		}
		if(this.props.package.type == "eco"){
			classes["choose-package-package__eco"] = true;
			classes["klassicon-sms-credits-1"] = true;
		}
		if(this.props.package.type == "comfort"){
			classes["choose-package-package__comfort"] = true;
			classes["klassicon-sms-credits-2"] = true;
		}
		if(this.props.package.type == "premium"){
			classes["choose-package-package__premium"] = true;
			classes["klassicon-sms-credits-3"] = true;
		}
		return classnames(classes);
	}
	onSelect = () => {
		this.props.onSelect(this.props.package.type);
	}
	render() {
		return (
			<div onClick={this.onSelect} className={this.getRootClasses()}>
				<div className="icon klassicon-check"></div>
				
				<div className={this.getClassesIcon()}></div>
				<HeaderTextMiddle style={{textAlign: "center", margin: "10px 0"}} textJSX={this.props.package.name}/>
				<div className="choose-package-package__credits">
					<div className="choose-package-package__h1">{this.props.package.credits}</div>
					<div className="choose-package-package__h2">{this.$t('Credits').toUpperCase()}</div>
				</div>
				<div className="choose-package-package__description">
					{this.props.package.description}
				</div>
				<div className="choose-package-package__cost">
					{this.props.package.cost}
				</div>
			</div>
		);
	}
}
SMSPackageItemComponent.propTypes = {
	package: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired,
	isSelected: PropTypes.bool,
}
export const SMSPackageItem = withTranslation()(SMSPackageItemComponent)