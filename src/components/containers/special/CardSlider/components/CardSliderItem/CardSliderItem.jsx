import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "../colors.scss";
import "./CardSliderItem.scss";

class CardSliderItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.color = this.getRandomColor();
	}
	getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	getRandomColor() {
		const colors = [
			"blue",
			"purple",
			"coral",
			"butterscotch",
			"turquoiseblue",
			"green",
		];
		return colors[this.getRandomInt(0, colors.length - 1)];
	}
	getRootClass() {
		let classes = {
			"card-slider__item": true,
		}
		if(this.props.selected){
			classes["card-slider__item--active"] = true;
		}
		classes[this.color] = true;
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	onSelectCard = () => {
		this.props.onSelect(this.props.account);
	}
	render() {
		return (
			<div onClick={this.onSelectCard} className={this.getRootClass()}>
				{this.props.selected && <div className="icon klassicon-check"></div>}
				<img className="card-slider__item-icon" src="public/pages/buysms/Puce.svg"/>
				<div className="card-slider__item-label">IBAN</div>
				<div className="card-slider__item-number">{this.props.account != undefined && this.props.account.account}</div>
				<div className="card-slider__item-label-bottom">{this.props.account != undefined && this.props.account.nameCard}</div>
			</div>
		);
	}
}
CardSliderItemComponent.propTypes = {
	selected: PropTypes.bool,
	account: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired,
}
export const CardSliderItem = withTranslation()(CardSliderItemComponent)