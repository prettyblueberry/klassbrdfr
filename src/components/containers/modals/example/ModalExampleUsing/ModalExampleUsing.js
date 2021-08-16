import * as React from "react";
import { ModalSystem } from '../..';
import "./ModalExampleUsing.scss";

export class ModalExampleUsing extends React.Component {
  modalAPI;
  constructor(props){
    super(props);
  }
  showModal(modalId, callback = () => {}, submitCallback = () => {}) {
    this.modalAPI.showModal(modalId, callback, submitCallback);
  }
  render() {
    return (<ModalSystem>
       {({modalAPI}) => {

         return (
        <div className="modal-example">
           <button onClick={() => {
             modalAPI.showModal("chooseAvatar",{
                callback:(data) => {
                    
                }
             });
           }}>Open chooseAvatar</button>

           <button onClick={() => {
               modalAPI.alert('error', 'tes', () => alert( 'error'));
           }}>Open alert modal</button>
         </div>
         )}

      }
    </ModalSystem>)
  }
}
