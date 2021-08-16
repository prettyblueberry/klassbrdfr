import * as React from "react";
import { withTranslation } from 'react-i18next';
import {AdvertisingAuthBlock, HeaderAuthBlock, FooterAuthBlock} from "../../blocks";
import PropTypes from 'prop-types';
import "./AuthLayout.scss";

class AuthLayoutComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<>
				<HeaderAuthBlock/>
				<div className="auth-layout k-activity">
					<AdvertisingAuthBlock/>
					<section className="k-activity-content has-advertising">
						<div className="k-form k-login-form">
							<div id="login-box" className="login-box visible widget-box no-border">
								<div className="widget-body">
										<div className="widget-main">
											{this.props.headersHTML}
											{this.props.contentHTML}
										</div>
								</div>
							</div>
						</div>
					</section>		 
				</div>
				<FooterAuthBlock/>
			</>
		);
	}
}
AuthLayoutComponent.propTypes = {
	contentHTML: PropTypes.node.isRequired,
	headersHTML: PropTypes.node.isRequired,
}
export const AuthLayout = withTranslation()(AuthLayoutComponent)