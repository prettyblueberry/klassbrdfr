import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    RelativeUser,
    AlertUnicorn
} from "presentational";
import { DotLoader } from 'react-spinners';
import "./Views.scss";
import {strongify} from "utils";

import { KRStudent, KRColor, KRMember, KRUtils} from "@klassroom/klassroom-sdk-js";
import {Tabs} from "components/containers/tabs";

class ViewsComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;
    this.activeMembersTabIndex = 0;
    this.activeIndex = 0;

    this.dataByMemberOn = [];
    this.dataByMemberOff = [];
    this.dataByStudentOn = [];
    this.dataByStudentOff = [];
    this.dataByStudentMemberOn = {};
    this.dataByStudentMemberOff = {};


    this.views = {};
    this.replies = {};

    this.isLoading = true;
    this.post = this.props.post;
    this.klass = this.post.klass


  }

  componentDidMount(){
      this.loadViews();
  }

  loadViews = () => {
    this.post.getViews()
      .then(data => {
        this.views = data.views;
        this.replies = data.replies;
      })
      .finally(() =>{
        this.isLoading = false;
        this.reloadData();
      })
  }

  reloadData = () =>{

    this.dataByMemberOn = [];
    this.dataByMemberOff = [];
    this.dataByStudentOn = [];
    this.dataByStudentOff = [];
    this.dataByStudentMemberOn = {};
    this.dataByStudentMemberOff = {};

    if(this.klass && this.klass.id){

      KRUtils.each(this.klass.members, (userID,m)=>{
          if(this.views[m.id]){

                this.dataByMemberOn.push(m);

                KRUtils.each(m.students, (studentID, relation)=>{

                    var student = this.klass.students[studentID];
                    if(this.dataByStudentOn.indexOf(student)<0){
                      this.dataByStudentOn.push(student);
                    }
                    if(!this.dataByStudentMemberOn[studentID]){
                      this.dataByStudentMemberOn[studentID] = [];
                    }
                    this.dataByStudentMemberOn[studentID].push(m);


                });

          }else{

              if(this.klass.active_members[m.id]){


                this.dataByMemberOff.push(m);

                KRUtils.each(m.students, (studentID, relation)=>{

                    var student = this.klass.students[studentID];
                    if(this.dataByStudentOff.indexOf(student)<0){
                      this.dataByStudentOff.push(student);
                    }
                    if(!this.dataByStudentMemberOff[studentID]){
                      this.dataByStudentMemberOff[studentID] = [];
                    }
                    this.dataByStudentMemberOff[studentID].push(m);


                });

              }


          }



      });


      this.dataByStudentOn.sort((a,b)=>{
        return a.last_name > b.last_name? 1 : -1;
      })


      this.dataByStudentOff.sort((a,b)=>{
        return a.last_name > b.last_name ? 1 : -1;
      })

    }else{

        KRUtils.each(this.views, (key,val)=>{

            this.dataByMemberOn.push(new KRMember({id : key, role:null}));

        });


    }

      this.forceUpdate();
  }



  getMembersTabs = () => {
    if(this.klass && this.klass.id){
      return [
          {
            title: this.$t("By Members"),
          },
          {
            title: this.$t("By Students"),
          }
        ];
    }else{
      return [
          {
            title: this.$t("By Members"),
          }
        ];
    }

  }

  getTitle = (isOn) =>{
      if(isOn){
          if(this.post.require_signature){
            return this.$t("Signed");
          }else if(this.post.require_reply){
            return this.$t("Replied");
          }else{
            return this.$t("Viewed");
          }
      }else{
        if(this.post.require_signature){
          return this.$t("Not Signed");
        }else if(this.post.require_reply){
          return this.$t("Not Replied");
        }else{
          return this.$t("Not Viewed");
        }
      }

  }

  getTabs = () => {
    const category = this.activeMembersTabIndex === 0 ? 'members' : 'students';
    if(!(this.klass && this.klass.id)){
      return [
        {
          title: this.getTitle(1),
          color: "krBlue",
          badge: {
            title: "views_badge",
            value: this.activeMembersTabIndex == 0 ? this.dataByMemberOn.length : this.dataByStudentOn.length
          }
        }
      ];

    }else{

      return [
        {
          title: this.getTitle(1),
          color: "krBlue",
          badge: {
            title: "views_badge",
            value: this.activeMembersTabIndex == 0 ? this.dataByMemberOn.length : this.dataByStudentOn.length
          }
        },
        {
          title: this.getTitle(0),
          color: "krPurple",
          badge: {
            title: "views_badge",
            value: this.activeMembersTabIndex == 0 ? this.dataByMemberOff.length : this.dataByStudentOff.length
          }
        }
      ];
    }

  }

  onSelectTab = tabIndex => {
    this.activeIndex = tabIndex;

    this.reloadData();
  };

  onSelectMembersTab = idx => {
    this.activeMembersTabIndex = idx;

    this.reloadData();
  }

  getFullName = (subject) => {
    if (subject instanceof KRStudent) {
        return subject.getFullName();
    } else {
        return `${subject.user.first_name} ${subject.user.last_name}`
    }
  }

  renderInnerTabContent = () => {

    var members = [];
    var students = [];
    if(this.activeMembersTabIndex == 0){
        if(this.activeIndex  == 0){
          members = this.dataByMemberOn;
        }else{
          members = this.dataByMemberOff;
        }
        return (<div className="views-container__user-list">
            {
                members.length ?
                members.map((m, idx) =>{
                    return (<RelativeUser key={m.id} member={m} simple={!m.klass} disableCheckbox={true} size={60} date={this.views[m.id]} text={this.replies[m.id]}/>)
                }) :
                this.renderEmptyContent()
            }
        </div>)

    }else{
      if(this.activeIndex  == 0){
        members = this.dataByStudentMemberOn;
        students = this.dataByStudentOn;
      }else{
        members = this.dataByStudentMemberOff;
        students = this.dataByStudentOff;
      }
      return (<div className="views-container__user-list">
          {
              students.length ?
              students.map((s, idx) =>{
                return (<div className="views-container__user-list">
                      <h2>{s.getFullName()}</h2>
                      <br/>
                    {
                      members[s.id].map((m, idx) =>{
                          return (<RelativeUser key={m.id} member={m} simple={!m.klass} disableCheckbox={true} size={60} date={this.views[m.id]} text={this.replies[m.id]}/>)
                      })

              }</div>)
            }) : this.renderEmptyContent()
          }   </div>)
    }

  };

  renderOuterTabContent = () => {
      return (
          <>
            <Tabs
            tabs={this.getTabs()}
            onSelect={this.onSelectTab}
            activeIndex={this.activeIndex}
            />
            {
                this.renderInnerTabContent()
            }
          </>
      )
  }



  renderLoader() {
    if (!this.isLoading) return;

		return (
		<div style={{textAlign: "center"}}>
		<br/><br/>
		<DotLoader
				sizeUnit={"px"}
				size={50}
				color={'#1f9aff'}
				loading={true}
				css={{"display":"inline-block"}}
			/>
		</div>
		);
  }

  renderTabContent = () => {
    return (
      <>
      <Tabs
          tabs={this.getMembersTabs()}
          onSelect={this.onSelectMembersTab}
          activeIndex={this.activeMembersTabIndex}
          simpleDesign={true}
        />
        {this.renderOuterTabContent()}
      </>
    )
  }

  renderEmptyContent = () => {
    const category = this.activeMembersTabIndex === 0 ? 'members' : 'students';

    return (
      <div className="views-container__empty">
        <AlertUnicorn
          title={strongify(this.$t("No Views"), KRColor.krPurple)}
          subtitle={this.$t("Ohh...there are no views yet")}
        />
      </div>
      )
  }

  renderContent = () => {
    if (this.isLoading) return;

    return this.renderTabContent();
  }

  render() {
    return (
      <div className="views-container">
        {this.renderLoader()}
        {this.renderContent()}
      </div>
    );
  }
}
ViewsComponent.propTypes = {

}
export const Views = withTranslation()(ViewsComponent)
