import * as React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {TwoGridLayout} from "../../layouts";
import {
  HeaderBlock,
  StepsLeftBlock,
  AddSchoolRightBlock
} from '../../blocks';
import {KROrganization,KRUser,KRClient} from "@klassroom/klassroom-sdk-js";
import './AddSchoolActivity.scss';
import {ModalManager} from "containers/modals"

class AddSchoolActivityComponent extends React.Component {
  static $t;
	static i18n;

  constructor(props) {
    super(props);
    this.$t  = this.props.t;
		this.i18n = this.props.i18n;
    this.data = {};
    this.schoolData = {
      schoolNameData: null,
			localizationData: null,
      classesInfoData: null,
			contactInfoData: null,
			successData: {},
    }
    this.state = {
      step: 1
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // get photo from store to data of forms
    if(!this.schoolData.successData){
      this.schoolData.successData = {}
    }
    this.schoolData.successData.photo = nextProps.photo;
    return true;
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

          const org = new KROrganization();
          org.name =  this.data.schoolName;
          org.is_public = this.data.schoolType == "public";
          org.countryID = this.data.country;
          org.street = this.data.address;
          org.city = this.data.city;
          org.zipcode = this.data.zipcode;
          org.students_count = this.data.studentsNumber;
          org.classes_count = this.data.classesNumber;
          org.start_month = this.data.startMonth;
          org.position = this.data.schoolPosition;
          org.contact_phone = this.data.schoolPhone;
          org.contact_email = this.data.schoolEmail;
          org.contact_name = this.data.schoolContact;

          showLoader(this.$t("Creating school..."));

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
        if(!self.data.photo){
          window.location = "/";
        }else{
          showLoader(this.$t("Uploading school cover..."));

          KRClient.getInstance().organization.setCover(self.data.photo)
          .then(() => {
            window.location = "/";
          })
          .catch((err) => {
                ModalManager.getInstance().alert(self.$t("Error"), err.message);
          })
          .finally(()=>hideLoader());

        }


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
  changeData = (data, typeState, toNextStep) => {
    this.schoolData[typeState] = data;
    this.data = Object.assign(this.data,data);
    if(toNextStep || typeof(toNextStep) == 'undefined' ) {
      this.onNext();
    } else {
      this.forceUpdate();
    }
  }
  getDataOfSteps() {
    let schoolData = this.getSchoolData();
    let data =  [
      {
        data: schoolData.schoolNameData,
        title: this.$t("School name")
      },
      {
        data: schoolData.localizationData,
        title: this.$t("School address")
      },
      {
        data: schoolData.classesInfoData,
        title: this.$t("School information")
      },
      {
        data: schoolData.contactInfoData,
        title: this.$t("Contact information")
      },

    ];
    return data;
  }

  getLeftPanelName() {
    const schoolData = this.getSchoolData();
    if(schoolData && schoolData.schoolNameData && schoolData.schoolNameData.schoolName) {
      return schoolData.schoolNameData.schoolName;
    }
    return this.$t("Add your school");
  }
  getPhoto() {
    const schoolData = this.getSchoolData();
    if(schoolData.successData && schoolData.successData.photo) {
      return schoolData.successData.photo;
    }
    return null;
  }
  getSchoolData() {
    return {
      schoolNameData: this.schoolData.schoolNameData,
			localizationData: this.schoolData.localizationData,
      classesInfoData: this.schoolData.classesInfoData,
			contactInfoData: this.schoolData.contactInfoData,
			successData: this.schoolData.successData,
    }
  }
  render() {
    return (
      <TwoGridLayout
        className="add-school__two_grid_layout"
        headerHTML={<HeaderBlock pageType="school"/>}
        leftPanelHTML={<StepsLeftBlock
          showingPhotoButton={true}
          photo={this.getPhoto()}
          textJSX={this.$t("MY SCHOOL")}
          text2JSX={this.getLeftPanelName()}
          step={this.state.step}
          stepsData={this.getDataOfSteps()}
        />}
        rightPanelHTML={
          <AddSchoolRightBlock
            step={this.state.step}
            callbackChangeData={this.changeData}
            callbackOnBack={this.onBack}
            schoolData={this.getSchoolData()}
            data={this.data}
          />
        }
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
		photo: state.AddSchoolPage.photo
	};
};

const mapDispatchToProps = dispatch => {
  return {}
}

export const AddSchoolActivity = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AddSchoolActivityComponent));
