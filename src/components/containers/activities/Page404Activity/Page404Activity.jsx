import * as React from "react";
import {
  Link
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import "./Page404Activity.scss";


export class Page404ActivityComponent extends React.Component {
	static $t;
	static i18n;

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}



	render() {
		return (
			<div className="error-container">
					<div id="not-found-activity">
						<div className="not-found-background">
							<img src="/public/k-img/404/blue-planet.svg"/>
							<img src="/public/k-img/404/purple-planet.svg"/>
							<img src="/public/k-img/404/yellow-star.svg"/>
							<img src="/public/k-img/404/purple-star.svg"/>
							<img src="/public/k-img/404/green-star.svg"/>
							<img src="/public/k-img/404/red-star.svg"/>
						</div>
					<div className="not-found-page">
							<div className="not-found-content">
								<h1>404</h1>
								<h2>{this.$t("Oops")}</h2>
								<p>{this.$t("It looks like you are lost")}...</p>
								<strong>{this.$t("This page doesn't exists.")}</strong>
							</div>
							<div className="not-found-cta">
								<Link to="/" className="btn-important">{this.$t("Home")} <img src="/public/k-img/icons/arrow-white.svg"/></Link>


							</div>
							<img src="/public/k-img/404/astronaut.svg" className="floating f-bottom-right"/>
							<img src="/public/k-img/404/rocket.svg" className="floating f-bottom-left"/>
							<img src="/public/k-img/404/yellow-planet.svg" className="floating f-top-right"/>
							<img src="/public/k-img/404/ambassador.svg" className="floating f-top-middle"/>
							<img src="/public/k-img/404/yellow-star.svg" className="floating f-left"/>
							<img src="/public/k-img/shapes/triangle.svg" className="floating f-bottom"/>
							<img src="/public/k-img/shapes/rectangle.svg" className="floating f-right"/>
							<img src="/public/k-img/shapes/square-red.svg" className="floating f-middle"/>
						</div>
					</div>
			</div>
		);
	}
}
export const Page404Activity = withTranslation()(Page404ActivityComponent);
