import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./InputMessage.scss";
import { constants } from "crypto";

class InputMessageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.rootRef = React.createRef();
	}
	componentDidMount(){
		//this.updateValue();
		this.props.onRef(this);
	}
	shouldComponentUpdate(nextProps){
		return true;
	}
	// using in a parent
	updateValue = (value) => {
		if(this.rootRef.current){
			this.rootRef.current.innerHTML = value;
		}
	}
	onChange = (event) => {
		this.props.onChange(event.target.innerHTML);
	}
	sendMessage = () => {
		if(typeof this.props.sendMessage == "function"){
			this.props.sendMessage(this.rootRef.current.innerHTML);
		}
	}
	cancelEditing = () => {
		if(typeof this.props.onCancelEditing == "function"){
			this.props.onCancelEditing();
		}
	}
	focus = () => {
		setTimeout(() => {
			const element = this.rootRef.current;
			element.focus();
		
			const range = document.createRange();
			range.selectNodeContents(element);
			range.collapse(false);
			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

		}, 100);
	}
	renderButtons(){
		return (
			<div className="input-message__buttons">
				{this.props.isEditing && <button onClick={this.cancelEditing} className="input-message__button">{this.$t("Cancel editing")}</button>}
			</div>
		)
	}
	render() {
		return (
			<div className="input-message--container">
				<div className="input-message">
					<div onClick={this.sendMessage} className="icon klassicon-send"></div>
					<div
						ref={this.rootRef}
						contentEditable="true"
						onInput={this.onChange} 
						onBlur={this.onChange}
						className="input-message-inpt"
					></div>
				</div>
				{this.renderButtons()}
			</div>
		
		);
	}
}
InputMessageComponent.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	sendMessage: PropTypes.func,
	isEditing: PropTypes.bool,
	onCancelEditing: PropTypes.func,
}
export const InputMessage = withTranslation()(InputMessageComponent)