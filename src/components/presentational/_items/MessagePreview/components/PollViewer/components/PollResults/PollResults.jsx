import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { RelativeUser, AlertUnicorn} from "presentational";
import { DotLoader } from 'react-spinners';
import "./PollResults.scss";
import {KRColor} from "@klassroom/klassroom-sdk-js";
import { KRStudent,KRMember } from "@klassroom/klassroom-sdk-js";
import {Tabs} from "components/containers/tabs";
import {strongify} from "utils";


class PollResultsComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;

    this.votes = {};
    this.isLoading = true;
    this.poll = this.props.post.poll;
    this.post = this.props.post;

      this.activeIndex = 0;

    // For Testing purposes
    // this.reactions = Object.entries(ReactionsData);
    // this.members = {...ClassData.list_students, ...ClassData.members};
  }

  componentDidMount(){
    this.post.getVotes()
      .then(data => {
        this.votes = data.votes;
      })
      .finally(() =>{
        this.isLoading = false;
        this.forceUpdate();
      })

  }

  getTabs = () => {
    const colors = Object.keys(KRColor);

    return this.poll.options.map((option, idx) => {
      return {
        title: option,
        color: colors[idx % colors.length],
        badge: {
          title: "votes",
          value: this.poll.votes[idx+1]  || null
        }
      };
    });
  };

  onSelectTab = tabIndex => {
    this.activeIndex = tabIndex;

    this.forceUpdate();
  };

  getFullName = (subject) => {
    if (subject instanceof KRStudent) {
        return subject.getFullName();
    } else {
        return `${subject.user.first_name} ${subject.user.last_name}`
    }
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
    const memberIDs =  this.votes[this.activeIndex + 1] || []

    return (
        <div className="reactions-container__user-list">

            {
                memberIDs.map((userId) => {

                    var member = new KRMember({id : userId});
                    var simple = true;
                    if(this.post.klass && this.post.klass.members[userId]){
                      member = this.post.klass.members[userId];
                      simple = false;
                    }

                  return (<RelativeUser key={userId} simple={simple} member={member} disableCheckbox={true} size={60}/>)
                })
            }
        </div>
    )
  };

  renderEmptyContent = () => {
    return (
      <div className="reactions-container__empty">
        <AlertUnicorn
          title={strongify(this.$t("No Votes"), KRColor.krPurple)}
          subtitle={this.$t("Ohh... There are no votes")}
        />
      </div>
      )
  }

  renderContent = () => {
    if (this.isLoading) return;

    if (!this.votes[this.activeIndex + 1]) return this.renderEmptyContent();

    return this.renderTabContent();
  }

  render() {
    return (
      <div className="reactions-container">
        {this.renderLoader()}
        <Tabs
          tabs={this.getTabs()}
          onSelect={this.onSelectTab}
          activeIndex={this.activeIndex}
          simpleDesign={true}
        />
        {this.renderContent()}
      </div>
    );
  }
}
PollResultsComponent.propTypes = {

}
export const PollResults = withTranslation()(PollResultsComponent)
