import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {TwoGridLayout} from "../../layouts";
import {
  HeaderBlock,
	AddClassLeftBlock,
  AddClassRightBlock
} from '../../blocks';
import "./AddClassActivity.scss";
import {KRClient, KRClassroom} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class AddClassActivityComponent extends React.Component {
	static $t;
	static i18n;

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
    this.data = {};
		this.stepsData = {
      step1: null,
      classData: null,
      step3: null,
      step4: null,
    }
    this.year = new Date().getFullYear();
    this.photo = null,
    this.allClasses = [];
		this.state = {
      step: Object.values(KRClient.getInstance().classrooms).length == 0 ? 1 : 2
    }
  }
  componentDidMount() {
    // update this.allClasses from server here
    // update this.year
  }
  changePhoto = (photo) => {
    this.photo = photo;
    this.forceUpdate();
  }
	onNext = () => {
    const step = this.state.step + 1;
    if(step <= 3) {
      this.setState({
        step
      });
		}else{
      const self = this;
      if(step == 4){

        const org = new KRClassroom();
        org.name =  this.data.internName;
        org.teacher = this.data.principalTeacher;
        org.students_count = this.data.studentNumber;
        org.externalID = this.data.internID;

        showLoader(this.$t("Adding class..."));

        org.save()
        .then(() => {
          self.setState({
            step
          });
        })
        .catch((err) => {
              ModalManager.getInstance().alert(self.$t("Error"), err.message);
        })
        .finally(()=>hideLoader());

      }else{
          this.props.history.push("/add-class")
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
  };
  changeData = (data, typeState, toNextStep) => {
    this.stepsData[typeState] = data;
    this.data = Object.assign(this.data,data);
    if(typeState == "step3" && this.getClass()){
      this.allClasses.push(this.getClass());
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
	render() {
		return (
			<TwoGridLayout
        className="add-class-layout"
        headerHTML={<HeaderBlock pageType="school"/>}
        leftPanelHTML={<AddClassLeftBlock
          class={this.getClass()}
          allClasses={Object.values(KRClient.getInstance().classrooms).length}
          step={this.state.step}
          photo={this.photo}
          changePhoto={this.changePhoto}
				/>}
        rightPanelHTML={
          <AddClassRightBlock
						step={this.state.step}
						callbackChangeData={this.changeData}
            callbackOnBack={this.onBack}
            class={this.getClass()}
            year={this.year}
					/>
        }
      />
		);
	}
}

const TranslatedComponent = withTranslation()(AddClassActivityComponent);
export const AddClassActivity = withRouter(props => <TranslatedComponent {...props}/>)
