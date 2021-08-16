import * as React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./EmojiPopup.scss";

const emojies = ['thumbup', 'blueheart', 'lol', 'thankyou', 'clap', 'superklass', 'magic', 'waouh']

class EmojiPopupComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;
    this.popupIsVisible = false;
  }

  openPopup = e => {
    this.popupIsVisible = true;

    this.forceUpdate();
  };

  closePopup = () => {
    this.popupIsVisible = false;
    this.forceUpdate();
  };

  saveEmoji = item => {
    this.props.saveEmoji(item)

    this.closePopup();
  };

  removeEmoji = item => {
    this.props.removeEmoji(item)

    this.closePopup();
  };

  renderEmoji = reaction => {
    switch (reaction) {
      case "thumbup":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_thumbup_gif.gif"/>
            <span className="krYellow">{this.$t("Cool")}</span>
          </>
        );
      case "blueheart":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_blueheart_gif.gif"/>
            <span className="krBlue">{this.$t("I love it")}</span>
          </>
        );
      case "lol":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_lol_gif.gif"/>
            <span className="krPurple">{this.$t("So funny")}</span>
          </>
        );
      case "thankyou":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_thankyou_gif.gif"/>
            <span className="krRed">{this.$t("Thanks")}</span>
          </>
        );
      case "clap":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_clap_gif.gif"/>
            <span className="krTurquoise">{this.$t("Well done")}</span>
          </>
        );
      case "superklass":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_superklass_gif.gif"/>
            <span className="krBlue">
              {this.$t("Super Klass")}
            </span>
          </>
        );
      case "magic":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_magic_gif.gif"/>
            <span className="krYellow">{this.$t("Magic")}</span>
          </>
        );
      case "waouh":
        return (
          <>
            <img src="/public/k-img/emoji/icon_mood_waouh_gif.gif"/>
            <span className="krPurple">{this.$t("Wow")}</span>
          </>
        );

      default: {
        return <img src="" />;
      }
    }
  };

  renderProjection = () => {
    const userReaction = this.props.previousReaction;

    return userReaction ? (
      <div className="emoji-popup__projection-emoji" onClick={e => this.removeEmoji(userReaction)}>
        {this.renderEmoji(userReaction)}
      </div>
    ) : (
        <div onClick={this.openPopup}>
          <div className="icon icon-reactions-add"></div>
          {this.props.children}
        </div>
      );
  };

  renderContent = () => {
    return emojies.map((emoji, index) => {
      return (
        <div
          className="emoji-popup__item"
          key={index}
          onClick={e => this.saveEmoji(emoji)}
        >
          {this.renderEmoji(emoji)}
        </div>
      )
    });
  };

  render() {
    return (
      <div className="emoji-popup">
        <span className="emoji-popup__projection">{this.renderProjection()}</span>

        {this.popupIsVisible && (
          <>
            <div
              className="emoji-popup__backdrop"
              onClick={this.closePopup}
            ></div>
            <div className="emoji-popup__content">{this.renderContent()}</div>
          </>
        )}
      </div>
    );
  }
}

EmojiPopupComponent.propTypes = {
  previousReaction: PropTypes.string,
  saveEmoji: PropTypes.func.isRequired,
  removeEmoji: PropTypes.func.isRequired
};

export const EmojiPopup = withTranslation()(EmojiPopupComponent);
