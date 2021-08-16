import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {
  ImageMosaic,
  AudioPlayer,
  VideoPlayer,
  EventViewer,
  PollViewer,
  FileAttachment,
  ListViewer,
  Comments,
  MapViewer,
  EmojiPopup,
  Views,
  Reactions,
  UserIcon
} from 'presentational';
import linkifyHtml from 'linkifyjs/html';
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import PropTypes from 'prop-types';
import { KRClient } from '@klassroom/klassroom-sdk-js';
import {nl2br} from "utils"
import './MessagePreview.scss';
import * as moment from 'moment';
import {ModalManager} from "containers/modals"

const DEFAULT_USER_AVATAR_SRC = '/public/k-img/icons/img_profile.png';


class MessagePreviewComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;
    this.showReactPopup = false;
    this.post = this.props.post;
    this.klass = this.post.klass;
    this.isPreview = this.props.isPreview;
  }

  componentWillUpdate(nextProps, nextState) {
    this.post = nextProps.post;
    this.klass = this.post.klass;
  }
  getText() {
    if (this.post) {
      return this.post.formatted_text ? linkifyHtml(this.parsePostText(this.post.formatted_text)) : nl2br(this.post.text)
    }
    return null;
  }


  parsePostText = (text) => {
		var delta = text;
		var output = "";
		var lines = [];
		lines.push({ text: "" });
		let linesIndex = 0;
		delta.ops.forEach(function (element) {
		  if (element.attributes) {

		    if (element.attributes.link) {
						lines[linesIndex].text += `<a href=${element.attributes.link} target="_blank">`;
		    }
		    if (element.attributes.bold) {
						lines[linesIndex].text += "<b>";
		    }
		    if (element.attributes.italic) {
						lines[linesIndex].text += "<i>";
		    }
		    if (element.attributes.underline) {
						lines[linesIndex].text += "<u>";
		    }
		    if (element.attributes.strike) {
					lines[linesIndex].text += "<s>";
		    }
		    if (element.attributes.script == "super") {
					lines[linesIndex].text += "<sup>";
		    }
		    if (element.attributes.script == "sub") {
					lines[linesIndex].text += "<sub>";
		    }
		    if (element.attributes['code-block']) {
		      lines[linesIndex].codeBlock = true;
		    }
		    if (element.attributes.list == "ordered") {
		      lines[linesIndex].orderedList = true;
		    }

		    if (element.attributes.list == "bullet") {
		      lines[linesIndex].bulletList = true;
		    }
		  }
		  if (element.insert.formula) {
		    lines[linesIndex].text +=
		      "<span>\\(" + element.insert.formula + "\\)</span>";
		  } else if (element.insert.image) {
		    lines[linesIndex].text += '<img src="' + element.insert.image + '"/>';
		  } else {
		    element.insert.split(/(\n)/g).forEach(function (textElement) {
		      if (textElement == "\n") {
		        if (element.attributes) {
		          if (element.attributes.header) {
		            lines[linesIndex].text =
		              "<h" +
		              element.attributes.header +
		              ">" +
		              lines[linesIndex].text +
		              "</h" +
		              element.attributes.header +
		              ">";
		          }
		        } else {
		          lines[linesIndex].text = "<p>" + lines[linesIndex].text + "</p>";
		        }
		        lines.push({ text: "" });
		        linesIndex++;
		      } else {
						if (element.attributes  && element.attributes.color) {
							lines[linesIndex].text += `<span style="color: ${element.attributes.color}">${textElement}</span>`;
						} else {
							lines[linesIndex].text += textElement;
						}

		      }
		    });
		  }
		  if (element.attributes) {
		    if (element.attributes.link) {
		      lines[linesIndex].text += "</a>";
		    }
		    if (element.attributes.bold) {
		      lines[linesIndex].text += "</b>";
		    }
		    if (element.attributes.italic) {
		      lines[linesIndex].text += "</i>";
		    }
		    if (element.attributes.underline) {
		      lines[linesIndex].text += "</u>";
		    }
		    if (element.attributes.strike) {
		      lines[linesIndex].text += "</s>";
		    }
		    if (element.attributes.script == "super") {
		      lines[linesIndex].text += "</sup>";
		    }
		    if (element.attributes.script == "sub") {
		      lines[linesIndex].text += "</sub>";
		    }
		  }
		});
		if (lines[lines.length - 1].text == "") {
		  lines.pop();
		}
		var inCodeBlock = false;
		var isOrderedList = false;
		var isBulletList = false;

		for (var i = 0; i < lines.length; i++) {



		  if (lines[i].orderedList && isOrderedList == false) {

				if(isBulletList){
					output += "</ul>";
				  isBulletList = false;
				}

				if(inCodeBlock){
					output += "</pre>";
				  inCodeBlock = false;
				}

			  output += "<ol>";
		    isOrderedList = true;
		  }



		  if (lines[i].bulletList && isBulletList == false) {

				if(isOrderedList){
					output += "</ol>";
				  isOrderedList = false;
				}

				if(inCodeBlock){
					output += "</pre>";
				  inCodeBlock = false;
				}

		    output += "<ul>";
		    isBulletList = true;
		  }

			if (lines[i].codeBlock && inCodeBlock == false) {

				if(isOrderedList){
					output += "</ol>";
				  isOrderedList = false;
				}

				if(isBulletList){
					output += "</ul>";
				  isBulletList = false;
				}

		    output +=
		      '<pre>';
		    inCodeBlock = true;
		  }






		  if (lines[i].orderedList) {
		    output += "<li>" + lines[i].text + "</li>";
		  }

		  if (lines[i].bulletList) {
		    output += "<li>" + lines[i].text + "</li>";
		  }

			if (lines[i].codeBlock) {
		    output += lines[i].text;
		  }


			if (!lines[i].orderedList && isOrderedList) {
			 output += "</ol>";
			 isOrderedList = false;
		 }

		 if (!lines[i].bulletList && isBulletList) {
			 output += "</ul>";
			 isBulletList = false;
		 }


			if (!lines[i].codeBlock && inCodeBlock) {
		    output += "</pre>";
		    inCodeBlock = false;
		  }

		  if (inCodeBlock || isOrderedList || isBulletList) {
		    output += "\n";
		  }

		  if (!lines[i].orderedList && !lines[i].codeBlock && !lines[i].bulletList) {
		    if (i == lines.length - 1 && lines[i].text.endsWith("</br>")) {
		      output += lines[i].text.slice(0, lines[i].text.length - 5);
		    } else {
		      output += lines[i].text;
		    }
		  }
		}

		return output;

	};

  renderImages() {
    if (this.post && this.post.images && this.post.images.length > 0) {
      return <ImageMosaic attachments={this.post.images} />;
    }
    return null;
  }
  renderAudios() {
    if (this.post && this.post.audios && this.post.audios.length > 0) {
      return this.post.audios.map((attachment, index) => {
        return <AudioPlayer audio={attachment} key={'audio' + index} />;
      });
    }
    return null;
  }
  renderVideos() {
    if (this.post && this.post.videos && this.post.videos.length > 0) {
      return this.post.videos.map((attachment, index) => {
        return <VideoPlayer video={attachment} key={'video' + index} />;
      });
    }
    return null;
  }
  renderEvent() {
    if (this.post && this.post.event) {
      return <EventViewer key={'event'} event={this.post.event} />;
    }
    return null;
  }

  renderPoll() {
    if (this.post && this.post.poll) {
      return (
        <PollViewer
          key={'poll'}
          post={this.post}
          update={this.update}
          klass={this.klass}
          isPreview = {this.props.readonly}
        />
      );
    }
    return null;
  }
  renderFiles() {
    if (this.post && this.post.documents && this.post.documents.length > 0) {
      return this.post.documents.map((attachment, index) => {
        return <FileAttachment key={'files' + index} attachment={attachment} />;
      });
    }
    return null;
  }
  renderLists() {
    if (this.post && this.post.checklist) {
      return <ListViewer key={'list'} list={this.post.checklist} />;
    }

    return null;
  }

  renderLocation() {
    if (this.post && this.post.location) {
      return (
        <MapViewer
          address={this.post.location.address}
          title={this.post.location.name}
          lat={this.post.location.latitude}
          lng={this.post.location.longitude}
        />
      );
    }

    return null;
  }

  renderMessage() {
    const text = this.getText();
    if (text && text.length <= 35) {
      return (
        <div
          className="message-preview__header-message message-preview__header-message--large"
          dangerouslySetInnerHTML={{ __html: this.getText() }}
        ></div>
      );
    }
    if (text && text.length > 35) {
      return (
        <div
          className="message-preview__header-message"
          dangerouslySetInnerHTML={{ __html: this.getText() }}
        ></div>
      );
    }
    return null;
  }

  editMessage = () => {};
  deleteMessage = () => {};

  switchMute = state => {
    if (this.post) {
      const message = this.post.is_mute
        ? this.$t('Are you sure you want to unmute this post?')
        : this.$t('Are you sure you want to mute this post?');
      kbApp.modalAPI.confirm(message, val => {
        if (val) {
          this.post.mute(state, () => this.forceUpdate());
        }
      });
    }
  };

  switchFavorite = state => {
    this.post.favorite(state, () => this.forceUpdate());
  };

  switchPin = state => {
    this.post.pin(state, () => this.forceUpdate());
  };

  download = type => {
    this.post[type].forEach(file => {
      fetch(file.url, {
        method: 'GET',
        mode: 'no-cors',
      })
        .then(response => response.blob())
        .then(blob => {
          if (blob.size > 0) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        });
    });
  };

  onChangeMessage = (value, attachments, submit = false) => {
    this.post = value;
    this.attachments = attachments;
    // this.form.updateValueForm('message', value);
    // this.form.updateValueForm('attachments', attachments);

    // if(submit) {
    // 	this.onSubmit();
    // }
  };

  savePost = () => {
    this.post.send(this.attachments);
    this.modalAPI.hideModal();
    this.props.update();
  };

  viewPost = () => {
    const id = this.post.campaignID;
    if (id) {
      this.props.history.push(`/detail-multimedia/` + id);
    }
  };

  editPost = () => {
    const id = this.post.campaignID;
    if (id) {
      this.props.history.push(`/new-multimedia?id=` + id);
    }
  };

  deletePost = () => {
    // kbApp.modalAPI.confirm(
    //   this.$t('Are you sure you want to delete this message?'),
    //   val => {
    //     if (val) {
    //       this.post.delete(() => this.props.update());
    //     }
    //   },
    // );

    KRClient.getInstance()
      .loadCampaign(this.post.campaignID)
      .then(() => {
        const campaign = KRClient.getInstance().campaigns[this.post.campaignID];

        campaign.updateStatus(3).then(() => this.props.update());
      })
      .catch(error => {
        ModalManager.getInstance().alert(this.$t("Error"), error.message);
      });
  };

  getMenuItems() {
    const items = [];

    items.push({ text: this.$t('View'), callback: e => this.viewPost() });
    items.push({ text: this.$t('Edit'), callback: e => this.editPost() });

      // Fix SDK before push this item
      // items.push({ text: this.$t('Delete'), callback: e => this.deletePost() });

    return items;
  }

  renderPin = () => {
    if (this.post.is_pinned) {
      return (
        <img
          src="/public/k-img/icons/push-pin.png"
          className="message-preview__header-menu-icon menu-icon-pin"
        />
      );
    }
  };

  renderFavorite = () => {
    if (this.post.is_favorite) {
      return (
        <img
          src="/public/k-img/icons/favorite.png"
          className="message-preview__header-menu-icon menu-icon-favorite"
        />
      );
    }
  };

  renderMuted = () => {
    if (this.post.is_mute) {
      return (
        <img
          src="/public/k-img/icons/icon_mute.png"
          width="14"
          className="message-preview__header-menu-icon"
        />
      );
    }
  };


  renderLabel() {
    if (!this.post) {
      return null;
    }

    let post_type = null;
		let label_type = null;
		if(this.post.location){
			post_type = ("location");
			label_type = this.$t("location");
		} else if(this.post.event){
			post_type = ("event");
			label_type = this.$t("event");
		}  else if(this.post.poll){
			post_type = ("poll");
				label_type = this.$t("poll");
		} else if(this.post.checklist){
			post_type = ("list");
				label_type = this.$t("list");
		} else if(this.post.homework){
			post_type = ("homework");
			label_type = this.$t("homework");
		} else if(this.post.documents && this.post.documents.length > 0){
			post_type = ("document");
				label_type = this.$t("document");
		} else if((this.post.videos && this.post.videos.length > 0) || (this.post.audios && this.post.audios.length > 0) || (this.post.images && this.post.images.length > 0)){
			post_type = ("media");
			label_type = this.$t("media");
		} else  {
			//Some types are missing
			post_type = ("message");
			label_type = this.$t("message");
		}

    return (




      <>
        <div
          className={
            'message-preview__header-label  message-preview__header-label-' +
            post_type
          }
        >
          <img src="/public/k-img/icons/post_separator.png" width="14"></img>
          <span>{label_type.toUpperCase()}</span>
        </div>
      </>
    );
  }

  renderUserAvatar = () => {
    const getImgSrc = () => {
      if (this.post.user) {
        return this.post.user.thumb_image_url;
      }else if (KRClient.getInstance().organization) {
        return KRClient.getInstance().organization.thumb_image_url;
      }else if (!this.post.user.thumb_image_url) {
        return DEFAULT_USER_AVATAR_SRC;
      }
    };

    return (
      <div className="photo-component__photo">
        	<UserIcon src={getImgSrc()} name={this.post.user ? this.post.user.name : KRClient.getInstance().organization.name } size={34}/>

      </div>
    );
  };

  renderUserName = () => {
    return (
      <span className="message-preview__header-h1">{(this.post.user) ? this.post.user.name : this.$t("Name")}</span>
    );
  };

  renderAlbumName = () => {
    return (
      this.post.album_name && (
        <span className="message-preview__header-h2">
          <i>{this.$t('in album') + ` «${this.post.album_name}»`}</i>
        </span>
      )
    );
  };

  renderPostCreatedTime = () => {
    return (
      <span className="message-preview__header-h2">
        {moment(!this.post.date ? new Date() : this.post.date)
          .locale(this.i18n.language)
          .format('lll')}
      </span>
    );
  };

  renderMenuIcons = () => {
    return (
      <>
        {this.renderMuted()}
        {this.renderFavorite()}
        {this.renderPin()}
      </>
    );
  };

  renderHeader() {
    return (
      <div className="message-preview__header">
        <div className="message-preview__header-label-container">
          {this.renderLabel()}
        </div>
        <div className="message-preview__header-left">
          {this.renderUserAvatar()}
        </div>

        <div className="message-preview__header-center">
          {this.renderUserName()}
          {this.renderAlbumName()}
          {this.renderPostCreatedTime()}
        </div>

        <div
          onClick={event => {
            event.stopPropagation();
          }}
          className="message-preview__header-right"
        >
          {this.renderMenuIcons()}

          {this.post.campaignID && (
            <PopupMenu
              alignRight={true}
              className="class-item-left__popup"
              items={this.getMenuItems()}
            >
              <div className="icon klassicon-options"></div>
            </PopupMenu>
          )}
        </div>
      </div>
    );
  }
  renderBody() {
    return (
      <div className="message-preview__header-body">
        {this.renderMessage()}
        {this.renderImages()}
        {this.renderAudios()}
        {this.renderVideos()}
        {this.renderEvent()}
        {this.renderPoll()}
        {this.renderLocation()}
        {this.renderFiles()}
        {this.renderLists()}
      </div>
    );
  }

  getReactionsCount = () => {
    return !!this.props.statistic.reactions && this.props.statistic.reactions;
  };

  getViewsCount = () => {
    return (
      this.props.statistic.views + ' / ' + this.props.statistic.viewsOf
    );
  };

  getCommentsCount = () => {
    return this.props.post.comments_count;
  };

  resolveCampaignPeople = () => {
    return new Promise((resolve, reject) => {
      KRClient.getInstance()
        .loadCampaign(this.post.campaignID)
        .then(campaign => {
          const user_classrooms = KRClient.getInstance().classrooms;
          const compaign_classrooms = campaign.classrooms;

          const actualClassrooms = compaign_classrooms.reduce((acc, curr) => {
            acc.push(user_classrooms[curr]);
            return acc;
          }, []);

          const promises = actualClassrooms.map(classroom => {
            return new Promise(function(resolve, reject) {
              classroom.refreshKlass().then(data => {
                resolve(data);
              });
            });
          });

          Promise.all(promises).then(klassrooms => {
            const people = klassrooms.reduce((acc, curr) => {
              const { members, students } = curr.klass;

              acc['members'] = { ...members, ...acc['members'] };
              acc['students'] = { ...students, ...acc['students'] };
              return acc;
            }, {});

            resolve(people);
          });
        })
        .catch(error => {
          ModalManager.getInstance().alert(this.$t("Error"), error.message);
        });
    });
  };

  resolveCompaignAndOpenViewsModal = openModal => {
    this.resolveCampaignPeople().then(({ members, students }) =>
      openModal(members, students),
    );
  };

  resolveCompaignAndOpenReactionsModal = openModal => {
    this.resolveCampaignPeople()
      .then(({ members, students }) => openModal({...members, ...students}));
  };

  getTitle = () =>{
    if(this.post.require_signature){
      return this.$t("Signatures");
    }else if(this.post.require_reply){
      return this.$t("Replies");
    }else{
      return this.$t("Views");
    }

  }

  openViewsModal = () => {
    if (this.props.isPreview) return;

    this.modalAPI = kbApp.modalAPI.dialog({
      dialogClassName: 'views',
      title: this.getTitle(),
      closeButton: true,
      message: (
        <Views post={this.post} />
      ),
    });
  };

  openReactionsModal = () => {
    if (this.props.isPreview) return;

    this.modalAPI = kbApp.modalAPI.dialog({
      dialogClassName: 'reactions-modal',
      title: this.$t('Reactions'),
      closeButton: true,
      message: <Reactions post={this.post}  />,
    });
  };

  openCommentsModal = () => {
    if (this.props.isPreview) return;

    this.modalAPI = kbApp.modalAPI.dialog({
      dialogClassName: 'comments',
      title: this.$t('Comments'),
      closeButton: true,
      message: (
        <div className="message-preview__comments">
          <MessagePreview
            post={this.props.post}
            statistic={this.props.statistic}
            showComments={true}
            modal={this.modalAPI}
            isInModalMode={true}
            isPreview={true}
          />
        </div>
      ),
    });
  };

  onClickComments = () => {
    if (typeof this.props.onClickComments == 'function') {
      this.props.onClickComments(this.post);
    }
  };

  saveEmoji = reaction => {
    this.post.addReaction(reaction, () => this.forceUpdate());
  };

  removeEmoji = reaction => {
    this.post.removeReaction(reaction, () => this.forceUpdate());
  };

  renderReactPopup() {
    return (
      <EmojiPopup
        previousReaction={this.post.user_reaction}
        saveEmoji={this.saveEmoji}
        removeEmoji={this.removeEmoji}
      >
        <div className="icon klassicon-add-reaction"></div>
        <span>{this.$t('React')}</span>
      </EmojiPopup>
    );
  }

  renderReactions() {
    if (!this.post.id) {
      return (
        <>
          <img src={'/public/k-img/emoji/icon_mood_clap_gif.gif'} height="32" />
          <img
            src={'/public/k-img/emoji/icon_mood_waouh_gif.gif'}
            height="32"
          />
          <img
            src={'/public/k-img/emoji/icon_mood_thumbup_gif.gif'}
            height="32"
          />
        </>
      );
    } else {
      return Object.keys(this.post.reactions).map((key, index) => {
        return (
          <img
            key={this.post.id + index}
            src={'/public/k-img/emoji/icon_mood_' + key + '_gif.gif'}
            height="32"
          />
        );
      });
    }
  }

  renderFooter() {
    return (
      <div className="message-preview__footer">
        <div className="message-preview__footer-top-panel">
          <div
            className="message-preview__footer-left"
            onClick={this.openReactionsModal}
          >
            {this.renderReactions()}
            {this.getReactionsCount()}
          </div>

          <div className="message-preview__footer-right">
            {this.getCommentsCount() > 0 && (
              <div
                className="message-preview__footer-comments"
                onClick={this.openCommentsModal}
              >
                <div className="icon klassicon-comments"></div>
                <span> {this.getCommentsCount()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="message-preview__footer-bottom-panel">
          <div className="message-preview__footer-bottom-buttons">
            <div className="message-preview__footer-reaction">
              <div className="icon klassicon-add-reaction"></div>
              <span>{this.$t('React')}</span>
            </div>

            <div
              // onClick={this.openCommentsModal}
              onClick={this.openCommentsModal}
              className="message-preview__footer-comment"
            >
              <div className="icon klassicon-add-comment"></div>
              <span>{this.$t('Show comments')}</span>
            </div>
          </div>

          <div className="message-preview__footer-bottom-signed">
            <div
              className="message-preview__footer-views"
              onClick={this.openViewsModal}
            >
              {this.renderViews()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderComments() {
    if (this.props.showComments) {
      return (
        <Comments
          post={this.props.post}
          isInModalMode={this.props.isInModalMode}
          updateParent = {() => { this.forceUpdate() }}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="message-preview">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
        {this.renderComments()}
      </div>
    );
  }

  getStatistic(){
    return this.props.statistic;
  }

  renderViews(){

      if(this.post.require_signature){
        if(this.post.campaignID){
          return (
          <>
              <span>{this.$t("Signed {{v}}",{v:this.getStatistic().views,tv:this.getStatistic().viewsOf})}</span>
          </>
        )
        }else{
          return (
            <>
                <span> {this.$t("Signed {{v}}/{{tv}}",{v:this.getStatistic().views,tv:this.getStatistic().viewsOf})}</span>
            </>
          )
        }
      }else if(this.post.require_reply){

        if(this.post.campaignID){
          return (
            <>
                <span> {this.$t("Replied {{v}}",{v:this.getStatistic().views,tv:this.getStatistic().viewsOf})}</span>
            </>
        )
        }else{
          return (
            <>
                <span> {this.$t("Replied {{v}}/{{tv}}",{v:this.getStatistic().views,tv:this.getStatistic().viewsOf})}</span>
            </>
          )
        }
      }else{

        if(this.post.campaignID){
          return (
          <>
              <div className="icon klassicon-views"></div><span> {this.getStatistic().views}</span>
          </>
        )
        }else{
          return (
            <>
                <div className="icon klassicon-views"></div><span> {this.getStatistic().views}/{this.getStatistic().viewsOf}</span>
            </>
          )
        }


      }


  }
}


MessagePreviewComponent.propTypes = {
  post: PropTypes.object.isRequired,
  statistic: PropTypes.object,
  enableMenu: PropTypes.bool,
  enableReact: PropTypes.bool,
  menuItems: PropTypes.array,
  showComments: PropTypes.bool,
  onClickComments: PropTypes.func,
  isPreview: PropTypes.bool
};
const TranslatedComponent = withTranslation()(MessagePreviewComponent);
export const MessagePreview = withRouter(props => (
  <TranslatedComponent {...props} />
));
