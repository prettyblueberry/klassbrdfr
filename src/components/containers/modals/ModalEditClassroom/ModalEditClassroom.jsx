import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal} from "react-bootstrap";
import {EditClassRoom} from "../../forms";
import PropTypes from 'prop-types';
import { ModalContext } from '..';
import "./ModalEditClassroom.scss";

class ModalEditClassroomComponent extends React.Component {
  static $t;
  static i18n;
  constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
		this.state = {
			errorText: ""
		};
  }
  clearError = () => {
		this.setState({
			errorText: ""
		});
	}
  onSubmit = (formData) => {
		this.modalAPI.hideModal(() => {
			if(typeof this.props.opts.onSubmit == "function") {
				this.props.opts.onSubmit(formData);
			}
		});
	}

  onCancel = () => {
    this.modalAPI.hideModal(() => {

    });
	}
	getClassData() {
		const classRoom = this.props.opts.classRoom;
		//todo: check that all data right
		return {
			internName: classRoom.name,
			principalTeacher: classRoom.teacher,
			studentNumber: classRoom.students_count,
			internID: classRoom.externalID
		};
	}
  render() {
    return (
      <ModalContext.Consumer>
        {({show, modalAPI, hideModal}) => {
          // 'Cause context system it is wrapper, we get link to modal API from this wrapper.
         // read documentation: https://reactjs.org/docs/context.html
         // Dont use single context system
         this.modalAPI = modalAPI;
          return (
          <Modal show={show} onHide={hideModal} dialogClassName="modal-choose-avatar">
            <Modal.Header>
              {this.$t("Edit classroom")}
            </Modal.Header>
            <Modal.Body>
              <EditClassRoom
								initFormValue={this.getClassData()}
								callbackSubmit={this.onSubmit}
								callbackCancel={this.onCancel}
								errorText={this.state.errorText}
								callbackClearError={this.clearError}
							/>
            </Modal.Body>
          </Modal>
          )}
        }
       </ModalContext.Consumer>
    )
  }
}
ModalEditClassroomComponent.propTypes = {
	opts: PropTypes.object.isRequired
}
export const ModalEditClassroom = withTranslation()(ModalEditClassroomComponent)
