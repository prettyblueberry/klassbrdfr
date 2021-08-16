import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {deepEqual} from "utils";
import {CardSliderItem} from "./components/CardSliderItem/CardSliderItem";
import "./CardSlider.scss";

class CardSliderComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.rootRef = React.createRef();
		this.form = this.props.formAPI;
		this.state = {
			currentIndex: 1,
		}
	}
	componentDidMount(){
		this.forceUpdate();
	}
	next = () => {
		if(this.state.currentIndex < this.props.accounts.length - 1 ){
			this.setState({
				currentIndex: this.state.currentIndex + 1,
			})
		}
	}
	prev = () => {
		if(this.state.currentIndex > 0){
			this.setState({
				currentIndex: this.state.currentIndex - 1,
			})
		}
	}
	getHalSliderWidth() {
		if(this.rootRef && this.rootRef.current){
			return this.rootRef.current.offsetWidth / 2;
		}
		return null;
	}
	getItemsWidth() {
		if(this.props.itemsWidth){
			return this.props.itemsWidth.replace('px', "")
		}
		return 460;
	}
	getOneStepOffset(){
		return (this.state.currentIndex * this.getItemsWidth() + this.getHalSliderWidth()) * -1;
	}
	getPositionWrapper(){
		if(!this.getHalSliderWidth()){
			return {}
		}
		let position  = 0;
		position = this.getOneStepOffset() + this.getItemsWidth();
		return {
			left: `${position}px`
		}
	}
	onSelect = (account) => {
		this.form.updateValueForm("bankAccount", account);
	}

	renderItems(){
		if(Array.isArray(this.props.accounts)){
			return this.props.accounts.map((account, index) => {
				return <CardSliderItem
					key={"account-"+index}
					onSelect={this.onSelect}
					account={account}
					selected={deepEqual(this.form.getValueInputForm('bankAccount'), account)}
				/>
			});
		}
		return null;
	}
	render() {
		return (
			<div ref={this.rootRef} className="card-slider">
				<div onClick={this.next} className="card-slider__next icon klassicon-back"></div>
				<div onClick={this.prev} className="card-slider__prev icon klassicon-back"></div>
				<div style={this.getPositionWrapper()} className="card-slider__wrapper">
					{this.renderItems()}
				</div>
			</div>
		);
	}
}
CardSliderComponent.propTypes = {
	formAPI: PropTypes.object.isRequired,
	accounts: PropTypes.array.isRequired,
}
export const CardSlider = withTranslation()(CardSliderComponent)