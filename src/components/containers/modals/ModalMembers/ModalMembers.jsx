import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal} from "react-bootstrap";
import {
  Button,
  HeaderIcon,
  SearchInput,
  Actions
} from "../../../presentational";
import {ListMembers} from "../../lists";
import {deepClone} from "../../../../lib/Utils";
import PropTypes from 'prop-types';
import { ModalContext } from '..';
import "./ModalMembers.scss";

class ModalMembersComponent extends React.Component {
  static $t;
  static i18n;
  modalAPI = {};
  timeoutSearch = null;
  constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
    this.modalAPI = this.props.modalAPI;
    this.state = {
      searchValue: "",
      checkedMembers: [],
      members: [],
    };
  }
  onSubmit = () => {
    const data = {
      checkedMembers: this.state.checkedMembers
    }
    this.props.callbackSubmit(data);
  }
  onSearch = (value) => {
    this.setState({
      searchValue: value,
    }, () => {
      // this timeout for performance
      // dont delete it
      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        // replace  code here to real result of response server
        this.setState({
          checkedMembers: [],
          members: [
              {
                id: 1,
                firstName: "Thomas",
                lastName: "Alfort",
                role: "Member"
              },
              {
                id: 2,
                firstName: "Jeremy",
                lastName: "Astrada",
                role: "Member"
              },
              {
                id: 3,
                firstName: "Christian",
                lastName: "Bowman",
                role: "Administrator"
              },
              {
                id: 4,
                firstName: "Thomas",
                lastName: "Alfort",
                role: "Member"
              },
              {
                id: 5,
                firstName: "Jeremy",
                lastName: "Astrada",
                role: "Member"
              },
              {
                id: 6,
                firstName: "Christian",
                lastName: "Bowman",
                role: "Administrator"
              },
              {
                id: 7,
                firstName: "Thomas",
                lastName: "Alfort",
                role: "Member"
              },
              {
                id: 8,
                firstName: "Jeremy",
                lastName: "Astrada",
                role: "Member"
              },
              {
                id: 9,
                firstName: "Christian",
                lastName: "Bowman",
                role: "Administrator"
              }
            ]
          });
      }, 800);
    });
  }
  onCheck = (member) => {
    const checkedMembers = [...this.state.checkedMembers, member];
    this.setState({
      checkedMembers,
    });
  }
  onUncheck(member) {
    const checkedMembers = this.state.checkedMembers.filter((_member) => {
      return member.id !== _member.id;
    });
    this.setState({
      checkedMembers,
    });
  }
  unCheckAll = () => {
    this.setState({
      checkedMembers: [],
    });
  }
  checkAll = () => {
    this.setState({
      checkedMembers: this.state.members,
    });
  }
  isChecked = (member) => {
    let isChecked = false;
    this.state.checkedMembers.some((_member) => {
      if(member.id === _member.id){
        isChecked = true;
        return true;
      }
      return false;
    });
    return isChecked;
  }
  hideModal = () => {
    this.props.callbackCancel();
  }
  render() {
    return (
      <div className="modal-members">

        <div className="modal-members__header_container">
          <div className="modal-members__header">
            <HeaderIcon icon="dashboard" text={this.$t("Members")}/>
            <span className="modal-members__header-count">{this.state.members.length}</span>
            </div>
        </div>

        <div className="modal-members__body-container">
          <div className="modal-members__panels">
            <div className="modal-members__search">
                <SearchInput autofocus={true} placeholder={this.$t("Search...")} value={this.state.searchValue} onChange={this.onSearch}/>
                <Actions label={this.$t("Display")}/>
            </div>
            <div className="modal-members__panel">
               <div className="modal-members__panel-label">CP <span className="modal-members__panel-count">{this.state.checkedMembers.length}</span></div>
                <div className="modal-members__select-deselect">
                  <span onClick={this.checkAll}>{this.$t("Select all")}</span>・<span onClick={this.unCheckAll}>{this.$t("Deselect all")}</span>
                </div>
            </div>
          </div>
          <ListMembers parentAPI={this}/>
        </div>

        <div className="modal-members__footer-container">
          <Button className="modal-members__submit" onClick={this.onSubmit} typeDesign="primary" name={this.$t("Import {{count}} members", {count: this.state.checkedMembers.length})}/>
        </div>

      </div>
    )
  }
}
ModalMembersComponent.propTypes = {
  callbackSubmit: PropTypes.func.isRequired,
  callbackCancel: PropTypes.func.isRequired,
}
export const ModalMembers = withTranslation()(ModalMembersComponent)