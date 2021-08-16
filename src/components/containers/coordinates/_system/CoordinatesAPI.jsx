import * as React from "react";
import {Ghost} from "../Ghost/Ghost";
 
/**
 * Enum typeHandler values.
 * @enum {string}
 */
export const typeHandlerEnum = {
  'mousemove': 'mousemove',
  'click': 'click',
  'mousedown': 'mousedown',
  'mouseup': 'mouseup',
};
/**
 * Enum cursorName for CSS.
 * @enum {string}
*/
export const cursorNameEnum = {
  'row-resize': 'row-resize',
  'col-resize': 'col-resize',
  'nwse-resize': 'nwse-resize',
  'nesw-resize': 'nesw-resize',
}

export const CoordinatesContext = React.createContext(
  {
    coordinatesAPI: null,
  }
);
export const CoordinatesSystem = CoordinatesContext.Consumer;

export class CoordinatesProvider extends React.Component {
  handlers = [];
  /*
    ghostData: {
      component: JSX or React Class;
      data: any;
      typeRecipient: string;
    }
  */
  ghostData;
  constructor(props) {
    super(props);
    this.subscribeEvents();
  }
  subscribeEvents() {
    window.addEventListener('mousedown', this.onMousedown);
    window.addEventListener('mouseup', this.onMouseup);
    window.addEventListener('mousemove', this.onMousemove);
  }
  /** Subscribe to coordinate events 
   * @param {MouseEvent} event a mouse event.
  */
  onMousedown = (event) => {
    this.fire({typeHanler: 'mousedown', event});
  }
  /** Subscribe to coordinate events 
   * @param {MouseEvent} event a event of mouse.
  */
  onMousemove = (event) => {
    this.fire({typeHandler: 'mousemove', event});
  }
  /** Subscribe to coordinate events 
   * @param {MouseEvent} event a event of mouse.
  */
  onMouseup = (event) => {
    this.fire({
      typeHandler: 'mouseup',
      event
    });
    this.unsetGhost();
  }
  /** Subscribe to coordinate events 
   * @param {typeHandlerEnum} typeHandler type of handler mouse event.
   * @param {Void} handler (event: MouseEvent) => void. A handler of mouse event.
  */
  on = (typeHandler, handler) => {
    this.handlers.push({handler, typeHandler});
  }
  /** Unsubscribe to coordinate events 
   * @param {Void} handler (event: MouseEvent) => void. A handler of mouse event.
  */
  off = (handler) => {
    this.handlers = this.handlers.filter(
        (handlerItem) => handlerItem.handler !== handler
    );
  }
  /** Fire event to handlers 
   * @param {Object} parameters {typeHandler: typeHandlerEnum, data?: any | null, event: MouseEvent}
  */
  fire = (parameters) => {
      this.handlers.forEach((handlerItem) => {
        if (parameters.typeHandler === handlerItem.typeHandler) {
          const response = {
            event: parameters.event
          };
          if (parameters.data) {
            response.data = parameters.data;
          }
          handlerItem.handler.call(handlerItem.handler, response);
        }
      });
  }
  /** Get position of Element 
   * @param {HTMLElement} element DOM element.
   * @param {HTMLElement} parentElement DOM element.
  */
  getPositionElement(element, parentElement) {
    return {
        top: element.getBoundingClientRect().top - parentElement.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left - parentElement.getBoundingClientRect().left
    };
  }
  /** Get position of mouse 
   * @param {MouseEvent} event a event of mouse.
  */
  getPositionOfMouse(event) {
    return {
      top: event.pageY,
      left: event.pageX
    };
  }
  enableSelection() {
    document.body.style.userSelect = 'auto';
    document.body.style.webkitUserSelect = 'auto';
  }
  disableSelection() {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  }
  /** Set cursor by globaly
   * @param {cursorNameEnum} cursorName for setting cursor by globaly.
  */
  setCursor(cursorName) {
    document.body.style.cursor = cursorName;
  }
  /** Reset cursor by globaly to default
  */
  resetCursor() {
    document.body.style.cursor = 'initial';
  }
  /** Set ghost for Drag and Drop with data 
    @param {Object} ghostData ghostData: ghostData 
  */
  setGhost(ghostData) {
    this.disableSelection();
    this.ghostData = ghostData;
    this.forceUpdate();
  }
  /** Destroy child component of ghost */
  unsetGhost() {
    this.enableSelection();
    this.ghostData = null;
    this.forceUpdate();
  }
  /** Get DnD data */
  getDataForReceiver() {
    if(this.ghostData){
      return this.ghostData;
    }
    return null;
  }
  renderGhost() {
    if(this.ghostData){
      return <Ghost ghostData={this.ghostData}/>;
    }
    return null;
  }
  render() {
    return (
      <CoordinatesContext.Provider
        value={{
          coordinatesAPI: this,
        }}
      >
        {this.props.children}
        {this.renderGhost()}
      </CoordinatesContext.Provider>
    )
  }
}