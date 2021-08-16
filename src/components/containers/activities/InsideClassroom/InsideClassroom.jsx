import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	InsideClassPage,
	UsersInsideClass,
} from 'blocks';
import {withRouter} from 'react-router-dom';
import {ListAPI} from "lists";
import {ClassData} from "mockup-data";
import "./InsideClassroom.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

export class InsideClassroomComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

		this.classroomID = this.props.match.params.id;
		this.classroom = KRClient.getInstance().classrooms[this.classroomID];
	}

	componentDidMount(){
		this.refreshKlass();
	}

	refreshKlass = () => {
		this.classroom.refreshKlass().then(()=>{
			this.klass = this.classroom.klass;
			this.forceUpdate();
		}).catch((error)=>{
				ModalManager.getInstance().alert(this.$t("Error"), err.message);
		});
	}

	render() {
		return (
			<ThreeGridLayout
				className="inside-classroom__layout"
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuBlock pageType="school"/>}
				centerJSX={<InsideClassPage  klass={this.klass} />}
				rightJSX={<UsersInsideClass  klass={this.klass}/>}
			/>
		);
	}
}
const TranslatedComponent = withTranslation()(InsideClassroomComponent);
export const InsideClassroom = withRouter(props => <TranslatedComponent {...props}/>)
