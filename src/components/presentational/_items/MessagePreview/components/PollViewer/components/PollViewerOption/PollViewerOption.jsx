import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button
} from "presentational";
import "./PollViewerOption.scss";

class PolViewerOptionComponent extends React.Component {
  static translate;
  static i18n;
  constructor(props) {
    super(props);
    this.$t = this.props.t;
    this.i18n = this.props.i18n;
    this.post = this.props.post || null;
    this.poll = this.post.poll || null;

		this.isPreview = this.props.isPreview;
  }
  getProgress() {
    if (this.poll) {
      const t1 = (this.post.poll.votes || {})[this.props.index + 1] || 0;
      const t2 = this.post.poll.getTotalVotes();

      return ((t1 / t2) * 100 || 0).toFixed(0);
    }

    if (this.props.isFake && this.props.index === 0) {
      return 60;
    }
    if (this.props.isFake && this.props.index === 1) {
      return 40;
    }
    if (this.props.isFake) {
      return 0;
    }
    return this.props.option.progress;
  }
  getVotes() {
    if (this.poll) {
      return (this.props.post.poll.votes || {})[this.props.index + 1] || 0;
    }
    if (this.props.isFake && this.props.index === 0) {
      return 1;
    }
    if (this.props.isFake && this.props.index === 1) {
      return 10;
    }
    if (this.props.isFake) {
      return 0;
    }
    return this.props.option.votes;
  }

  hasBeenVoted = () => {
    return this.post.user_poll > 0;
  };

  vote = id => {
		if(!this.poll.hasEnded() && !this.hasBeenVoted() && !this.isPreview ){
    	this.props.onVote(id);
		}
  };

  undoVote = id => {
		if(!this.poll.hasEnded() && this.hasBeenVoted() && !this.isPreview ){
			kbApp.modalAPI.confirm(this.$t("Are you sure you want to undo your vote?")
				,(val) => {
					if(val){
						this.props.onUndoVote(id);
					}
			}
		);
		}
  };

  onPollClick = () => {
    const vote = this.props.option;
    const voteID = this.props.post.poll.options.indexOf(vote) + 1 || null;

    if (this.hasBeenVoted()) return this.undoVote(voteID);

    this.vote(voteID);
  };

  isCheckedByUser() {
    if (this.poll) {
      return this.post.user_poll == this.props.index + 1;
    }
    if (this.props.isFake && this.props.index === 0) {
      return true;
    }
    if (this.props.isFake && this.props.index === 1) {
      return false;
    }
    if (this.props.isFake) {
      return false;
    }
    return this.props.option.userCheckedIt;
  }
  renderCheck() {
    if (this.isCheckedByUser()) {
      return <div className="icon klassicon-check"></div>;
    }
    return <div className="non-checked"></div>;
  }

  renderVoteResult = () => {
    return (
      <>
        {this.renderCheck()}
        <div
          className="poll-viewer-option_progress-container"
          onClick={this.onPollClick}
        >
          <div
            style={{ width: this.getProgress() + '%' }}
            className="poll-viewer-option_progress-value"
          ></div>
          <div className="poll-viewer-option_progress-title">
            {this.props.option}
          </div>
          <div className="poll-viewer-option_progress-number">
            {this.getProgress()}%
          </div>
        </div>
        <div className="poll-viewer-option_progress-votes">
          {this.$t('{{votes}} votes', { votes: this.getVotes() })}
        </div>
      </>
    );
  };

  renderVoteButton = () => {
    return (
      <Button
        className="poll-viewer-option__button"
        name={this.$t(this.props.option)}
        iconType="without-icon"
        iconSide="left"
        typeDesign="primary"
        onClick={this.onPollClick}
      />
    );
  };

  render() {
    return (
      <div className="poll-viewer-option">
        {(this.hasBeenVoted() || this.poll.hasEnded() || this.isPreview)
          ? this.renderVoteResult()
          : this.renderVoteButton()}
      </div>
    );
  }
}
PolViewerOptionComponent.propTypes = {
	option: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	index: PropTypes.number,
	isFake: PropTypes.bool,
}
export const PollViewerOption = withTranslation()(PolViewerOptionComponent)
