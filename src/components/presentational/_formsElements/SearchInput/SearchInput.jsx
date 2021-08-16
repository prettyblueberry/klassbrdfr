import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import "./SearchInput.scss";

class SearchInputComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.inputRef = React.createRef();
		this.timeoutUpdateValue = null;
	}
	componentDidMount(){
		if(this.inputRef.current) {
			this.inputRef.current.value = this.props.value;
		}
	}
	onChange = () => {
		if(this.inputRef.current) {
			clearTimeout(this.timeoutUpdateValue);
			this.timeoutUpdateValue = setTimeout(() => {
				this.props.onChange(this.inputRef.current.value);
			}, 300);
		}
	}
	onKeyPress = (event) => {
		if (event.key == 'Enter') {
			this.props.onChange(event.target.value, true);
		}
	}
	// fixed translation bug (value not be translated)
	getValue(){
		return this.props.value;
	}
	render() {
		return (
			<div style={this.props.style || {}} className="search-input">
				<div className="search-input__icon icon klassicon-search"></div>
				<input ref={this.inputRef} autoFocus={this.props.autofocus} onChange={this.onChange} className="search-input__input" placeholder={this.props.placeholder}/>
			</div>
		);
	}
}

SearchInputComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	autofocus: PropTypes.bool,
	style: PropTypes.object,
}
export const SearchInput = withTranslation()(SearchInputComponent)
