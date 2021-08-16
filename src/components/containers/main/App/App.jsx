import classnames from "classnames";
import * as React from "react";
import { hot } from "react-hot-loader";
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
const { detect } = require('detect-browser');
import { detectBrowserVersion } from "utils";
import ScrollMemory from 'react-router-scroll-memory';
// Activities
import {
  HomeActivity,
  LoginActivity,
  UserProfileActivity,
  ForgotPasswordActivity,
  ChangePasswordActivity,
  Page404Activity,
  SignupActivity,
  AddSchoolActivity,
  MessagesActivity,
  MyClassesActivity,
  ParentsActivity,
  StudentsActivity,
  AddClassActivity,
  LinkClassActivity,
  ChooseTypeMessageActivity,
  NewSMSActivity,
  PersonalInformationActivity,
  SchoolInformationActivity,
  SettingsActivity,
  SMSCreditsActivity,
  BuySMSCreditsActivity,
  NewMultimediaActivity,
  DetailMultimediaActivity,
  DetailSMSActivity,
  InsideClassroom,
  AttendanceDashboard,
  AttendanceRegister,
  AttendanceStudents,
  AttendanceStudent,
} from "../../activities";
import { SplashContainer } from '../SplashContainer/SplashContainer';
import {Loader} from 'components/presentational';
import {ModalContext, ModalWrapper} from 'components/containers/modals';
import {KRClient, KREvent} from "@klassroom/klassroom-sdk-js";
// Routes
import {
  Route,
	Switch
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "./App.scss";
import {ModalManager} from "containers/modals"

class AppComponent extends React.Component {
  static routes;
  constructor(props) {
      super(props);
      this.modalAPI = null;
      this.$t  = this.props.t;
      this.i18n = this.props.i18n;
      this.state = {
        isLoading: true,
        versionWarning: false
      };
      this.handleEvent = (ev, opts)=>{

          switch(ev){
              case KREvent.app_unauthorized:
                break;
              case KREvent.app_logout:
                window.location = "/";
                break;

          }
      }

      var culture = "en";

      if(window.location.host=="www.klassboard.fr" || window.location.host=="klassboard.fr" || window.location.host=="dev.klassboard.fr" || window.location.host=="devfr.klassboard.com" ){
        culture = "fr";
      }else if(window.location.host=="es.klassboard.com" || window.location.host=="dev1es.klassboard.com"){
        culture = "es";
      }


      KRClient.getInstance({culture:culture}).addListener(this,this.handleEvent);
      window.kbApp = this;
      this.detectBrowser();
  }
  detectBrowser = () => {
    const browser = detect();
    if(browser.name == "safari"){
      this.fixSafari();
    }
    if(browser.name == "edge"){
      this.fixEdge();
    }
  }
  fixSafari = () => {
    document.getElementById("app").className+=" safari-fix";
    window.appBrowser = "safari";
  }
  fixEdge = () => {
    document.getElementById("app").className+=" edge-fix";
    window.appBrowser = "edge";
  }
  detectBrowserVersion = () => {
    let browser = detectBrowserVersion()

    if (browser.name === 'chrome') {
      if (browser.version < 63) {
        this.setState({ versionWarning: true })
      }
    }
    if (browser.name === 'firefox') {
      if (browser.version < 53) {
        this.setState({ versionWarning: true })
      }
    }
    if (browser.name === 'opera') {
      if (browser.version < 50) {
        this.setState({ versionWarning: true })
      }
    }
    if (browser.name === 'edge') {
      if (browser.version < 16) {
        this.setState({ versionWarning: true })
      }
    }

  }
  fixForWindows(){
		if(navigator.platform.indexOf("Win") > -1){
			document.body.className += " fix-windows";
		}
	}
	getClasses() {
		return classnames({
			"main-container": true
		});
	}
  componentWillUnmount(){
    KRClient.getInstance().removeListener(this);
  }
  componentDidMount() {
    detectBrowserVersion()
    //We will replace with the real function checking server

    /*this.setState({
      isLoading:false
    })*/
    KRClient.getInstance().connect()
      .then(()=> {
        this.setState({
           isLoading:false
        })
      })
      .catch((error) => {
          if(error.code == 500){
              ModalManager.getInstance().alert(this.$t("Error"), error.message);
          }else{
            this.setState({
               isLoading:false
            });
          }
      });

      this.fixForWindows()
  }
	render() {
    if (this.state.versionWarning) {
      return (
        <div className="version-warning">
          <p>{this.$t("We are sorry")},</p>
          <span>{this.$t("but this browser is not supported by Klassboard")}</span>
          <p style={{ fontSize: '20px', marginTop: '16px' }}>{this.$t("Minimum versions of browsers")}:</p>
          <ol>
            <li>Edge <div style={{ color: '#ffb53a' }}> 16</div></li>
            <li>Firefox <div style={{ color: '#f15b5b' }}> 53</div></li>
            <li>Chrome <div style={{ color: '#8f63de' }}> 63</div></li>
            <li>Opera <div style={{ color: '#1f9aff' }}> 50</div></li>
          </ol>
        </div>
      )
    }
    if(this.state.isLoading){
        return <SplashContainer />;
    } else {
      const routes = [];
      //Define routes if user is logged or not.
      if(!KRClient.getInstance().authenticated){
          routes.push(<Route key="r0" path="/" exact component={LoginActivity}/>);
          routes.push(<Route key="r1" exact path="/signup" component={SignupActivity}/>);
          routes.push(<Route key="r2" exact path="/forgot-password" component={ForgotPasswordActivity}/>);
      }else{
          if(KRClient.getInstance().user.is_temp_password){
            routes.push(<Route key="r0" exact path="/" component={ChangePasswordActivity}/>);
          }else{
            if(!KRClient.getInstance().organization){
              routes.push(<Route key="r2" exact path="/" component={AddSchoolActivity}/>);

            }else{
              routes.push(<Route key="r0" path="/" exact component={HomeActivity}/>);
              routes.push(<Route key="r1" exact path="/profile" component={UserProfileActivity}/>);
              routes.push(<Route key="r2" exact path="/messages" component={MessagesActivity}/>);
              routes.push(<Route key="r3" exact path="/my-classes" component={MyClassesActivity}/>);
              routes.push(<Route key="r4" exact path="/parents" component={ParentsActivity}/>);
              routes.push(<Route key="r5" exact path="/students" component={StudentsActivity}/>);
              routes.push(<Route key="r6" exact path="/add-class" component={AddClassActivity}/>);
              routes.push(<Route key="r7" exact path="/link-class/:name" component={LinkClassActivity}/>);
              routes.push(<Route key="r8" exact path="/choose-message" component={ChooseTypeMessageActivity}/>);
              routes.push(<Route key="r9" exact path="/new-sms" component={NewSMSActivity}/>);
              routes.push(<Route key="r10" exact path="/personal-information" component={PersonalInformationActivity}/>);
              routes.push(<Route key="r11" exact path="/school-information" component={SchoolInformationActivity}/>);
              routes.push(<Route key="r12" exact path="/settings" component={SettingsActivity}/>);
              routes.push(<Route key="r13" exact path="/sms-credits" component={SMSCreditsActivity}/>);
              routes.push(<Route key="r14" exact path="/buy-sms-credits" component={BuySMSCreditsActivity}/>);
              routes.push(<Route key="r15" exact path="/new-multimedia" component={NewMultimediaActivity}/>);
              routes.push(<Route key="r16" exact path="/detail-multimedia/:id" component={DetailMultimediaActivity}/>);
              routes.push(<Route key="r17" exact path="/detail-sms/:id" component={DetailSMSActivity}/>);
              routes.push(<Route key="r18" exact path="/inside-class/:id" component={InsideClassroom}/>);
              //attendance
              routes.push(<Route key="r19" exact path="/attendance/dashboard" component={AttendanceDashboard}/>);
              routes.push(<Route key="r20" exact path="/attendance/register" component={AttendanceRegister}/>);
              routes.push(<Route key="r21" exact path="/attendance/students" component={AttendanceStudents}/>);
              routes.push(<Route key="r22" exact path="/attendance/student/:id" component={AttendanceStudent}/>);
            }
          }
      }
      return (
        <div className={this.getClasses()}>
          <div className="ipad-portrait__message">
            {this.$t("Please rorate your device")}
          </div>
          <ScrollMemory elementID="listscroll" />
          <Switch>
            {routes}
            <Route component={Page404Activity} />
          </Switch>
          <ModalContext.Consumer>
             {({modalAPI}) => {
               this.modalAPI = modalAPI;
                console.log(modalAPI)
                return (

                  <Loader />


                )
              }}
            </ModalContext.Consumer>
            <ModalWrapper />
        </div>


      );
    }
	}
}
const mapStateToProps = (state) => {
	return {
		authUser: null,
	};
};

export default hot(module)(connect(mapStateToProps)(withTranslation()(AppComponent)));
