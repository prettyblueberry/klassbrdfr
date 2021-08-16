import * as React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import "./LeftMenuItem.scss";

class LeftMenuItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
  }
  renderCount() {
    if(typeof this.props.count != 'undefined' && this.props.count !== "") {
      return (
        <span style={{background: `rgba(${this.props.countColor}, 0.2)`, color: `rgba(${this.props.countColor}, 1)`}} className="left-menu-item__count">{this.props.count}</span>
      )
    }
    return null;
  }
  getClassIcon() {
    let classes = {
      "icon": true,
			"left-menu-item__icon": true,
    }
    classes[`klassicon-${this.props.icon}`] = true;
    return classnames(classes);
  }
  renderIcon() {
    return <div className={this.getClassIcon()}></div>
  }
	getClasses = () => {
		let classes = {
			"left-menu-item": true
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		if(this.props.action){
			return (
				<div
					className="left-menu-item"
					onClick={this.props.action}
					className={this.getClasses()}
				>
					{this.renderIcon()} <span className="left-menu-item__name">{this.props.name}</span>
					{this.props.count != 0 && this.renderCount()}
				</div>
			)
		}
    return (
      <NavLink
				className={this.getClasses()}
        activeClassName="active"
        to={this.props.to}
        exact={true}
      >
        {this.renderIcon()} <span className="left-menu-item__name">{this.props.name}</span>
        {this.props.count != 0 && this.renderCount()}
      </NavLink>
    )
  }
}
LeftMenuItemComponent.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string.isRequired,
  callback: PropTypes.func,
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  countColor: PropTypes.string,
  icon: PropTypes.string,
  iconActive: PropTypes.string,
  active: PropTypes.bool,
	action: PropTypes.func,
}

export const LeftMenuItem = withTranslation()(LeftMenuItemComponent);
