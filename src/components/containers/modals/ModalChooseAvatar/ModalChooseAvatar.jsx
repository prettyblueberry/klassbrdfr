import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal} from "react-bootstrap";
import {Button} from "../../../presentational";
import PropTypes from 'prop-types';
import {KRUser} from "@klassroom/klassroom-sdk-js";
import {ModalChooseAvatarTabs} from "./_components/ModalChooseAvatarTabs/ModalChooseAvatarTabs";
import { ModalContext } from '..';
import "./ModalChooseAvatar.scss";

class ModalChooseAvatarComponent extends React.Component {
  static $t;
  static i18n;
  modalAPI;

  constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
    this.state = {
      avatars: [],
      selectedAvatar: null,
      selectedTabId: null
    };
  }
  componentDidMount() {
    this.loadAvatarsFromServer();
  }

  async loadAvatarsFromServer() {
    const avatars = await KRUser.avatars();
    this.setState({avatars:avatars,selectedTabId: 0, selectedAvatar:avatars[0].list[0]});
  }
  resetAvatar() {
    this.setState({
      selectedAvatar: null
    });
  }

  onTabChange = (tabId) => {
    this.setState({
      selectedTabId: tabId
    });
  }

  onSelectAvatar = (val) => {

    this.setState({
      selectedAvatar: val
    });

  }

  onCancel = () => {
    this.modalAPI.hideModal(() => {

    });
  }

  onSubmit = () => {

    this.modalAPI.hideModal(() => {
      if(typeof this.props.opts.callback == "function") {
        this.props.opts.callback(this.state.selectedAvatar);
      }
    });
  }
  renderTabs() {
    return  <ModalChooseAvatarTabs onChange={this.onTabChange}  onSelectAvatar={this.onSelectAvatar} selectedTabId={this.state.selectedTabId} avatars={this.state.avatars} />;
  }
  render() {
    return (
      <ModalContext.Consumer>
        {({show, modalAPI, hideModal}) => {
          // 'Cause context system it is wrapper, we get link to modal API from this wrapper.
         // read documentation: https://reactjs.org/docs/context.html
         // Dont use single context system
         this.modalAPI = modalAPI;
          return (<Modal show={show} onHide={hideModal} dialogClassName="modal-choose-avatar">
            <Modal.Body>
              <div className="k-popup user-avatar-popup">
                    <div className="avatar-list" style={{overflow:"hidden"}}>
                      <p className="modal-choose-avatar__header" dangerouslySetInnerHTML={{__html: this.$t("Select your <b>avatar</b>")}}></p>
                      {this.renderTabs()}
                    </div>
                    <div className="avatar-validation">
                      <div className="current-avatar">
                        <img src={this.state.selectedAvatar}/>
                      </div>
                        <Button className="modal_cancel" onClick={this.onCancel} iconSide="none" typeDesign="only-text" typeDesign="only-text" name={this.$t("Cancel")}/>
                        <Button className="modal_submit" onClick={this.onSubmit} iconType="primary-without-icon" typeDesign="primary" name={this.$t("Save")}/>
                    </div>
                  </div>
            </Modal.Body>
          </Modal>
          )}
        }
       </ModalContext.Consumer>
    )
  }
}
ModalChooseAvatarComponent.propTypes = {
	opts: PropTypes.object.isRequired
}
export const ModalChooseAvatar = withTranslation()(ModalChooseAvatarComponent)
