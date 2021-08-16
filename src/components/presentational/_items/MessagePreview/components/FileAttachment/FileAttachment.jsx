import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./FileAttachment.scss";

class FileAttachmentComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getSize() {
		const size = this.props.attachment.size;
		let i = Math.floor( Math.log(size) / Math.log(1024));
		return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['b', 'kb', 'mb', 'gb', 'tb'][i];
	};
	getExtension(){
		const words = this.props.attachment.name.split(".");
		return words[words.length - 1];
	}
	render() {
		return (
			<div className="file-attachment-component">

				<div className="file-attachment-component-icon">{this.getExtension()}</div>

				<div className="file-attachment-component-texts">
					<div className="file-attachment-component-file-name">
						{this.props.attachment.name}
					</div>
					<div className="file-attachment-component-file-size">
						{this.getSize()}
					</div>
				</div>

			</div>
		);
	}
}
FileAttachmentComponent.propTypes = {
	attachment: PropTypes.object.isRequired,
}
export const FileAttachment = withTranslation()(FileAttachmentComponent)
