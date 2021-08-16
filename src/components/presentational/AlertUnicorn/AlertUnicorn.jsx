import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./AlertUnicorn.scss";

class AlertUnicornComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderLabel() {
		if(this.props.label){
			return (<div className="actions__label">{this.props.label}</div>)
		}
		return null;
	}
	render() {
		return (
			<div className="alert-unicorn">
				<img src="/public/images/magnifying-glass.svg"/>
                <div className="alert-unicorn__title" dangerouslySetInnerHTML={{ __html: this.props.title}}>
                    
                </div>
                <div className="alert-unicorn__subtitle">
                    {this.props.subtitle}
                </div>
			</div>
		);
	}
}
export const AlertUnicorn = withTranslation()(AlertUnicornComponent)