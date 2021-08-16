import * as React from "react";
import {connect} from "react-redux";
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
// Routes
import {
  Route,
  Link
} from 'react-router-dom';
import {PrivateRoute} from "../special";
// Activities
import {HomeActivity, LoginActivity, UserProfileActivity} from "../activities";
// Components
import {ExamplePresentational} from "../../presentational";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./ExampleContainer.scss";


class ExampleContainerComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
	}
	componentDidMount() {

	}
	login() {
    showLoader(this.$t("Signing in..."));
    KRClient.getInstance().login("16462800800","12345678")
      .then(()=>{
          this.forceUpdate();
      })
      .catch((error) => alert(error.message))
      .finally(()=> hideLoader());


	}
	logout() {
    showLoader(this.$t("Signing out..."));
    KRClient.getInstance().logout()
      .then(()=>{
          this.forceUpdate();
      })
      .catch((error) => alert(error.message))
      .finally(()=> hideLoader());

	}
	onClickHandler = (item) => {
		// Actions after item have been clicked.
	
	}
	getAuthUser() {
		return KRClient.getInstance().authenticated;
	}
	getLinkClasses(linkName) {
		return classNames({
			"link-page": true,
			"hidden": !this.getAuthUser() && (linkName == "profile") ? true : false,
		})
	}
	/** Change language */
	changeLanguage(language) {
		this.i18n.changeLanguage(language);
	}
	renderItems() {
		return this.props.items.map((item) => {
			return <ExamplePresentational onClick={this.onClickHandler} key={item.id} item={item}/>
		});
	}
	render() {
		return (
			<>
				<div className="translation">
					<div>
						{this.$t("Example of translation. Please, select a language for demo.")}
					</div>
					<div className="translation-buttons">
						<button onClick={ () => this.changeLanguage("en")}>EN</button>
						<button onClick={ () => this.changeLanguage("fr")}>FR</button>
						<button onClick={ () => this.changeLanguage("es")}>ES</button>
					</div>
				</div>
				<hr/>
				<div className="example-login">
					<h2>Auth mockup</h2>
					<button onClick={this.login}>Login</button>
					<button onClick={this.logout}>Logout</button>
				</div>
				<hr/>
				<div className="example-items">
					<h2>Example of list components. Data from server(not translated)</h2>
					{this.renderItems()}
				</div>
				<hr/>
				<div className="example-routes">
						<h2>Routes</h2>
						<Link className="link-page" to="/">Home page</Link>
						<Link className="link-page" to="/login">Login page</Link>
						{ KRClient.getInstance().authenticated && <Link className={this.getLinkClasses('profile')} to="/profile">Profile page</Link> }
				</div>
				<div className="example-pages">
					<Route exact path="/" component={HomeActivity}/>
					<Route path="/login" component={LoginActivity}/>
					<PrivateRoute path="/profile" isLogin={this.getAuthUser() != false} redirectPath={"/login"} component={UserProfileActivity}/>
				</div>
			</>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		items: state.ExampleReducer.items,
		authUser: state.Auth.authUser
	};
};
const mapDispatchToProps = function(dispatch, ownProps) {
  return {}
}
export const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExampleContainerComponent));
