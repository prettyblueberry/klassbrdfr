import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {TwoGridLayout} from "../../layouts";
import {
  LinkClassLeftBlock,
  HeaderBlock,
  LinkClassRightBlock,
} from '../../blocks';
import "./LinkClassActivity.scss";
import {KRClient, KRClassroom,KROrgKlassRequest} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class LinkClassActivityComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
    this.data = {};
		this.stepsData = {};
    this.classroom ;
    // it is static, later replace it form

    if(!KRClient.getInstance().classrooms[this.props.match.params.name]){
      this.props.history.push("/error");
    }else{
      this.classroom = KRClient.getInstance().classrooms[this.props.match.params.name];
    }


		this.state = {
      step: 1
    }
  }
  selectPath(userHasKey) {
    if(userHasKey) {
      this.stepsData = {
        // 1 step
        selectedPathData: {
          userHasKey: true
        },
        // 2 step
        keyData: null,
        // 3 step
        linkClassData: null,
        // 4 step
        LinkSuccessData: null,
      }
    } else {
      this.stepsData = {
        // 1 step
        selectedPathData: {
          userHasKey: false
        },
        // 2 step
        requestData: null,
        // 3 step
        requestSentData: null,
      }
    }
  }
  componentDidMount() {

  }
  changePhoto = (photo) => {
    this.photo = photo;
    this.forceUpdate();
  }
	onNext = () => {
    const step = this.state.step + 1;
    let maxSteps = 4;
    if(step > 1 && !this.getStepsData().selectedPathData.userHasKey) {
      maxSteps = 3
    }
    if(step <= maxSteps-1) {
      this.setState({
        step
      });
		}else{

      if(step == maxSteps){


        if(this.getStepsData().selectedPathData.userHasKey){
          showLoader(this.$t("Linking classes..."));
          this.classroom.sendRequestByKey(this.data.klass.key)
          .then(() => {
            this.setState({
              step
            });
          })
          .catch((err) => {
                ModalManager.getInstance().alert(this.$t("Error"), err.message);
          })
          .finally(()=>hideLoader());
        }else{
          showLoader(this.$t("Sending request to teacher..."));
          this.classroom.sendRequestByPhone(this.data.login,this.data.teacherEmail,this.data.teacherName)
          .then(() => {
            this.setState({
              step
            });
          })
          .catch((err) => {
                ModalManager.getInstance().alert(this.$t("Error"), err.message);
          })
          .finally(()=>hideLoader());
        }


      }else{
          this.props.history.push("/my-classes")
      }

    }
	}
	onBack = (step) => {

    let _step = step;
    if(!_step){
      _step = this.state.step - 1
    }
    if(_step > 0) {
      this.setState({
        step: _step
      });
    }

    if(!_step){
      this.props.history.goBack();
    }
  };
  changeData = (data, typeStep, toNextStep) => {
    this.data = Object.assign(this.data,data);
    if(typeStep == "selectedPathData") {
      // first select path
      this.selectPath(data.userHasKey);
    } else {
      // later change step
      this.stepsData[typeStep] = data;
    }
    if(toNextStep || typeof(toNextStep) == 'undefined' ) {
      this.onNext();
    } else {
      this.forceUpdate();
    }
  }
	getClass() {
		return this.stepsData.classData
  }
  getStepsData() {
    return this.stepsData;
  }
	render() {
		return (
			<TwoGridLayout
        headerHTML={<HeaderBlock pageType="school"/>}
        leftPanelHTML={<LinkClassLeftBlock/>}
        rightPanelHTML={<LinkClassRightBlock
            step={this.state.step}
            stepsData={this.getStepsData()}
            callbackChangeData={this.changeData}
            callbackOnBack={this.onBack}
            classroom={this.classroom}
            data={this.data}
          />}
      />
		);
	}
}

const TranslatedComponent = withTranslation()(LinkClassActivityComponent);
export const LinkClassActivity = withRouter(props => <TranslatedComponent {...props}/>)
