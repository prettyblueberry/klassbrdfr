import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { RelativeUser, AlertUnicorn} from "presentational";
import { DotLoader } from 'react-spinners';
import "./Reactions.scss";
import {KRColor} from "@klassroom/klassroom-sdk-js";
import { KRStudent,KRMember} from "@klassroom/klassroom-sdk-js";
import {Tabs} from "components/containers/tabs";
import {strongify} from "utils";


class ReactionsComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;
    this.activeIndex = 0;

    this.members = [];
    this.reactions = {};
    this.isLoading = true;
    this.post = this.props.post;


    // For Testing purposes
    // this.reactions = Object.entries(ReactionsData);
    // this.members = {...ClassData.list_students, ...ClassData.members};
  }

  componentDidMount(){


    this.post.getReactions()
      .then(reactions => {
        this.reactions = reactions;
      })
      .finally(() =>{
        this.isLoading = false;
        this.forceUpdate();
      })
  }

  getTabs = () => {
    const colors = Object.keys(KRColor);
    console.log(Object.keys(this.reactions));
    return (Object.keys(this.reactions)).map((reaction, idx) => {
      return {
        title: <img src={`/public/k-img/emoji/icon_mood_${reaction}_gif.gif`} className="reactions-container__tab-img"/>,
        color: colors[idx % colors.length],
        badge: {
          title: "reactions",
          value: this.post.reactions[Object.keys(this.reactions)[idx]] || null
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
    const memberIDs =  this.reactions[Object.keys(this.reactions)[this.activeIndex]] || []

    return (
        <div className="reactions-container__user-list">
            {
                memberIDs.map((userId) => {

                    var member = new KRMember({id : userId, role:null});
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
          title={strongify(this.$t("No Reactions"), KRColor.krPurple)}
          subtitle={this.$t("Ohh...Post doesn't have any reactions")}
        />
      </div>
      )
  }

  renderContent = () => {
    if (this.isLoading) return;

    if (Object.keys(this.reactions).length === 0) return this.renderEmptyContent();

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
ReactionsComponent.propTypes = {

}
export const Reactions = withTranslation()(ReactionsComponent)
