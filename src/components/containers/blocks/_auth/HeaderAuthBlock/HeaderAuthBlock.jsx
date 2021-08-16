import * as React from "react";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {Button} from "../../../../presentational";
import {Route} from 'react-router-dom';
import "./HeaderAuthBlock.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js"
import {getDataDomain} from 'utils'

class HeaderAuthBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderContent() {

		return (
				<>
					<Route path="/forgot-password" exact  render={() =>
						 (
							<>
								<span className="navbar-content-text">{this.$t("You already have a Klassboard account?")}</span>
								<Button iconType="arrow-blue" typeDesign="outline-blue" link="/" name={this.$t("Log In")}/>
							</>
						)

					} />


					<Route path="/" exact  render={() =>{
							if(!KRClient.getInstance().authenticated){
								return (
									<>
										<span className="navbar-content-text">{this.$t("You don't have a Klassboard account yet?")}</span>
										<Button iconType="arrow-blue" typeDesign="outline-blue" link="/signup" name={this.$t("Create an account")}/>
									</>
								);
							}else{
								return (
									""
								);
							}
						}
					} />
					</>


		);


	}
	render() {
		return (
			<nav className="k-navbar-visitor">
			 <img src={getDataDomain()+"/_data/klassroomauth?klassroomauth=delete"} width="0" height="0" style={{display:"none"}} />


					<div className="navbar-brand">
						<a href="/"><img src="/public/k-img/logo.png"/></a>
					</div>
					<div className="navbar-content">
						{this.renderContent()}
					</div>
				</nav>
		);
	}
}
const TranslatedComponent = withTranslation()(HeaderAuthBlockComponent);
export const HeaderAuthBlock = withRouter(props => <TranslatedComponent {...props}/>)
