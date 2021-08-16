import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import "./NotificationsBlock.scss";

export class NotificationsBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return null;
		return (
			<div className="notifications-block">
					<div className="notifications-block__wrapper">
						<div className="notifications-block__header">
							<span className="notifications-block__header-title">{this.$t("Notifications")}</span>
							<span className="notifications-block__header-count">0</span>
						</div>

						<div className="notifications-block__body">
							<p className="notifications-block__no-notifications" dangerouslySetInnerHTML={{__html: this.$t("<b>No</b> notifications")}}></p>
						</div>

						<div className="notifications-block__bottom">
								<a className="notifications-block__more">{this.$t("See more")}</a>
						</div>

					</div>
			</div>
		);
	}
}
export const NotificationsBlock = withTranslation()(NotificationsBlockComponent)
