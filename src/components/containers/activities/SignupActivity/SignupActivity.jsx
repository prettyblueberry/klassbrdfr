import * as React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {TwoGridLayout} from "../../layouts";
import './SignupActivity.scss';
import {ModalManager} from "containers/modals"

import {
  SignupTopBlock,
  StepsLeftBlock,
  SignupRightBlock
} from '../../blocks/';
import {KRUser,KRClient} from "@klassroom/klassroom-sdk-js";

class SignupActivityComponent extends React.Component {
  static $t;
	static i18n;

  constructor(props) {
    super(props);
    this.$t  = this.props.t;
		this.i18n = this.props.i18n;
    this.userData = {};
    this.state = {
      step: 1,
      personalInfoData: null,
			contactInfoData: null,
      codeData: null,
			passwordData: null,
			successData: null
    }


  }

  onNext = () => {
    const step = this.state.step + 1;

    if(step <= 4) {

      this.setState({
        step
      });


    }else{
const self = this;
      if(step == 5){
        showLoader(this.$t("Creating account..."));
        KRUser.register(this.userData.login,this.userData.code,this.userData.firstName,this.userData.lastName,this.userData.email,this.userData.phoneInput.countryData.iso2.toUpperCase())
        .then(() => {
           const cb = async ()=>{
             try{
               showLoader(self.$t("Creating account..."));


                 await KRClient.getInstance().user.setPassword(self.userData.password);
                 self.setState({
                   step
                 });
             }catch(err){
               throw err;
             }
             hideLoader();
           };
           cb();
        })
        .catch((err) => {
              ModalManager.getInstance().alert(self.$t("Error"), err.message);
        })
        .finally(()=>hideLoader());
      }else{
        const cb = async ()=>{
          try{
            showLoader(self.$t("Uploading photo..."));

            if(self.userData.avatar){
               await KRClient.getInstance().user.setAvatar(self.userData.avatar);
            }else if(self.userData.photo){
               await KRClient.getInstance().user.setPhoto(self.userData.photo);
            }
              window.location = "/";
          }catch(err){
            ModalManager.getInstance().alert(self.$t("Error"), err.message);
          }
          hideLoader();
        };
         cb();
      }
    }
  };
  onBack = () => {
    const step = this.state.step - 1;
    if(step > 0) {
      this.setState({
        step
      });
    }
  };
  changeData = (data, typeState) => {
    let state = {};
    state[typeState] = data;
    this.userData = Object.assign(this.userData,data);

    this.setState(state, () => {
      this.onNext();
    });
  }
  getDataOfSteps() {
    let userData = this.getUserData();
    let data =  [
      {
        data: userData.personalInfoData,
        title: this.$t("Personal information")
      },
      {
        data: userData.contactInfoData,
        title: this.$t("Contact information")
      },
      {
        data: userData.contactInfoData,
        title: this.$t("Verification Code")
      },
      {
        data: userData.passwordData,
        title: this.$t("Password")
      },
    ];
    return data;
  }
  getUserData() {
    return {
      personalInfoData: this.state.personalInfoData,
			contactInfoData: this.state.contactInfoData,
      codeData: this.state.codeData,
			passwordData: this.state.passwordData,
			successData: this.state.successData,
    }
  }
  render() {
    return (
      <TwoGridLayout
        className="signup__two_grid_layout"
        headerHTML={<SignupTopBlock />}
        leftPanelHTML={<StepsLeftBlock
          textJSX={this.$t("WELCOME")}
          text2JSX={this.$t("Create <b>my account</b>")}
          step={this.state.step}
          stepsData={this.getDataOfSteps()}
        />}
        rightPanelHTML={
          <SignupRightBlock
            step={this.state.step}
            callbackChangeData={this.changeData}
            callbackOnBack={this.onBack}
            userData={this.getUserData()}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    auth: state.Auth,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {};
};

export const SignupActivity = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(SignupActivityComponent));
