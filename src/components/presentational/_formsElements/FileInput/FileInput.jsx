import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from "../../";
import classnames from "classnames";
import {DnD} from "../../../containers/coordinates";
import "./FileInput.scss";

export class FileInputComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.inputRef = React.createRef();
		this.state = {
			errorText: "",
		};
	}
	fileSelected() {
		return (this.props.value && this.props.value.file);
	}
	getRootClasses() {
		let classes = {
			"file-input": true,
		}
		if(this.fileSelected()){
			classes["file-input--selected"] = true;
		}
		return classnames(classes);
	}
	onClick = () => {
		if(this.inputRef.current){
			this.inputRef.current.click();
		}
	}
	onChange = (files) => {
		const file = files[0];
		if (!file) {
			return;
		}
		if(Array.isArray(this.props.mimes) && file.type) {
			if(this.props.mimes.indexOf(file.type) == -1) {
				this.setState({errorText: this.$t("File format is wrong")}, () => {
					this.props.onChange(null);
				});
				return;
			}
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const result = event.target.result;
			this.setState({errorText: ""}, () => {
				this.props.onChange({file: {
					name: file.name,
					type: file.type,
				}, result});
			});
		};
  	reader.readAsText(file,'ISO-8859-1');
	}
	handleFiles = (event) => {
		const files = event.target.files;
		this.onChange(files);
	}
	onDrop = (files) => {
		this.onChange(files);
	}
	renderFileName() {
		if(this.fileSelected()) {
			const fileName = this.props.value.file.name;
			return <div>{fileName}</div>
		}
		return null;
	}
	renderDescription() {
		if(this.state.errorText !== "" && this.state.errorText) {
			return <div className="file-input__error-format">{this.state.errorText}</div>
		}
		if(this.props.description){
			return <div className="file-input__description">{this.props.description}</div>
		}
		return null;
	}
	render() {
		return (
			<DnD
				type="files"
				onDrop={this.onDrop}
			>
				<div className={this.getRootClasses()}>
					{this.renderDescription()}
					<input onChange={this.handleFiles} type="file" ref={this.inputRef} className="file-input__input-hidden"/>
					<label className="file-input__label">{this.props.label} {this.props.required && "*"}{this.props.optional && this.$t("(optional)")}</label>
					<div className="file-input__input-container">
						{this.renderFileName()}
						<Button onClick={this.onClick} className="file-input__button" iconType="add-white" iconSide="right" typeDesign="primary" name={this.$t("Add a file")}/>
					</div>
				</div>
			</DnD>
		);
	}
}
FileInputComponent.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
	]),
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	description: PropTypes.string,
	required: PropTypes.bool,
	mimes: PropTypes.array,
}
export const FileInput = withTranslation()(FileInputComponent)
