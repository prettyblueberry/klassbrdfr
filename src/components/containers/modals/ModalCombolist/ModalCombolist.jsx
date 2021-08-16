import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal} from "react-bootstrap";
import {
  Button,
  HeaderIcon,
  SearchInput,
  Actions
} from "../../../presentational";
import {ListItems} from "../../lists";
import {deepClone} from "../../../../lib/Utils";
import PropTypes from 'prop-types';
import { ModalContext } from '..';
import "./ModalCombolist.scss";

class ModalCombolistComponent extends React.Component {
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
      checkedItems: this.props.checkedItems || [],
      items: this.props.items || [],
    };
  }
  onSubmit = () => {
    const data = {
      checkedItems: this.state.checkedItems
    }
    this.props.callbackSubmit(data);
  }
  onSearch = (value) => {
    this.setState({
      searchValue: value,
      items: this.props.items.filter((item) => {
          return item.title.toLowerCase().includes(value.toLowerCase());
      })
    });
  }
  onCheck = (item) => {
    const checkedItems = [...this.state.checkedItems, item.id];
    this.setState({
      checkedItems,
    });
  }
  onUncheck(item) {
    const checkedItems = this.state.checkedItems.filter((_item) => {
      return item.id !== _item;
    });
    this.setState({
      checkedItems,
    });
  }
  unCheckAll = () => {
    this.setState({
      checkedItems: [],
    });
  }
  checkAll = () => {
    this.setState({
      checkedItems: this.state.items.map((item)=> item.id),
    });
  }
  isChecked = (item) => {
    let isChecked = false;
    this.state.checkedItems.some((_item) => {
      if(item.id === _item){
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
            <HeaderIcon icon="dashboard" text={this.props.title}/>
            <span className="modal-members__header-count">{this.state.items.length}</span>
            </div>
        </div>

        <div className="modal-members__body-container">
          <div className="modal-members__panels">
            <div className="modal-members__search">
                <SearchInput autofocus={true} placeholder={this.$t("Search...")} value={this.state.searchValue} onChange={this.onSearch}/>

            </div>
            <div className="modal-members__panel">
                <div className="modal-members__select-deselect">
                  <span onClick={this.checkAll}>{this.$t("Select all")}</span>・<span onClick={this.unCheckAll}>{this.$t("Deselect all")}</span>
                </div>
            </div>
          </div>
          <ListItems parentAPI={this}/>
        </div>

        <div className="modal-members__footer-container">
          <Button className="modal-members__submit" onClick={this.onSubmit} typeDesign="primary" name={this.$t("Select {{count}} items", {count: this.state.checkedItems.length})}/>
        </div>

      </div>
    )
  }
}
ModalCombolistComponent.propTypes = {
  callbackSubmit: PropTypes.func.isRequired,
  callbackCancel: PropTypes.func.isRequired,
}
export const ModalCombolist = withTranslation()(ModalCombolistComponent)
