import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {Button, YearSelector} from "presentational";
import {ImportParentsSteps} from "../../../steps";
import {ParentsListPanel} from "../../../panels";
import {ListParents, ListAPI} from "../../../lists";
import {ParentsListLevel} from "../ParentsListLevel/ParentsListLevel";
import "./ParentsPageBlock.scss";
import {KRClient,KRUtils, KBEvent} from "@klassroom/klassroom-sdk-js";
import { DotLoader } from 'react-spinners';

class ParentsPageBlockComponent extends React.Component {
	static $t;
	static i18n;
	modalAPI = {}
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = new ListAPI(this);
		this.parents = [];
		this.data = [];
		this.page = 0;
		this.state = {
			selectedYear: null,
			loading: true,
			isFirstTime : true,
		};

		this.list.setRequests(
			{
				loadParents: (quiresURL, params) => {
					// now using pseudo request, please replace it to real.
					// ParentListData[params.page] it is page from mockupData
					// need return promise here
					return new Promise((resolve, reject) => {



							let parents = [];

							KRUtils.each(KRClient.getInstance().parents, (parentID,parent) => {
									parents.push(parent);
							});

							if(quiresURL.search){
								parents = parents.filter((parent) => {
										return parent.first_name.toLowerCase().includes(quiresURL.search.toLowerCase()) || parent.last_name.toLowerCase().includes(quiresURL.search.toLowerCase());
								});
							}
							if(quiresURL.class && quiresURL.class !== "all"){
								parents = parents.filter((parent) => {
										return parent.classrooms.includes(quiresURL.class);
								});
							}

							parents.sort((a,b)=>{
								let x = a.first_name.toLowerCase();
							  let y = b.first_name.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;

							})

							this.list.setCustomData({
								allLinkedParents: KRClient.getInstance().parents_klassroom_count,
								allParents: KRClient.getInstance().parents_count,
								filteredParents: parents.length
							});

							setTimeout(()=>{
								this.setState({
									loading:false
								});
							},0)
							resolve(parents.slice(params.page * 25, (params.page + 1) * 25));

					});
				},
				linkParentItem: (quiresURL, params, parentItem) => {
					// it is pseudo request
					// need return promise here
					return new Promise((resolve, reject) => {
						if(parentItem && parentItem.user && parentItem.user.id){
							let parents = deepClone(this.list.getList());
							parents = parents.map((_parent) => {
								let parent = deepClone(_parent);
								if(parent.user && parent.user.id == parentItem.user.id){
									parent.linked = true;
								}
								return parent;
							});
							resolve(parents);
						}
						resolve(null);
					})
				}
			}
		);

		this.handleEvent = (ev, opts)=>{
				switch(ev){
						case KBEvent.parents_updated:
							this.forceUpdate();
							break;
				}
		}
		KRClient.getInstance().addListener(this,this.handleEvent);

		}

		componentWillUnmount(){
			KRClient.getInstance().removeListener(this);
		}


		componentDidMount() {
			this.addEventsListeners();

		}
		componentWillUnmount() {
			this.removeEventsListeners();
		}
	addEventsListeners(){
		if(window.appBrowser == "safari" || window.appBrowser == "edge"){
			const el = document.querySelector(".three-grid-layout__center");
			el.addEventListener("scroll", this.onScrollBottomSafari);
		} else {
			window.addEventListener("scrollBottom", this.onScrollBottom);
		}
	}
	removeEventsListeners(){
		if(window.appBrowser == "safari" || window.appBrowser == "edge"){
			const el = document.querySelector(".three-grid-layout__center");
			el.removeEventListener("scroll", this.onScrollBottomSafari);
		} else {
			window.removeEventListener("scrollBottom", this.onScrollBottom);
		}
	}
	onScrollBottom = () => {
		this.list.sendRequest("loadParents");
	}
	onScrollBottomSafari = (e) => {
		const el = e.target;
		if(el.scrollTop === (el.scrollHeight - el.offsetHeight)) {
            this.list.sendRequest("loadParents");
        }
	}

	refreshData = () => {
		KRClient.getInstance().loadParents().then(()=>{
			this.setState({
				isFirstTime: false,
				loading:true
			},()=>{
				this.list.sendRequest("loadParents");
			});
		});
	}

	reloadData = () => {

	}


	onFilter = (value) =>{
		this.setState({
			loading:true
		},()=>{
			this.list.changeQueryURL(
				value,
				this.props.history,
				"loadParents"
			);
		});
	}

	getSelectedYear() {
		return KRClient.getInstance().getPeriod();
	}
	onSelectYear = (year) => {
		KRClient.getInstance().setPeriod(year)
		showLoader(this.$t("Loading school year {{year1}}-{{year2}}",{year1:year,year2:(year+1)}))
		KRClient.getInstance().connect()
      .then(()=> {
				this.setState({
					selectedYear: year,
					isFirstTime: true,
				});
      })
      .catch((error) => {
          if(error.code == 500){
              alert(error.message);
          }
      })
			.finally(()=>hideLoader());
	}
	importParent = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "import-parent__modal",
			title: this.$t("Import parent"),
			closeButton: true
		});
		this.modalAPI.message = <ImportParentsSteps modalAPI={this.modalAPI}/>;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.location.search != nextProps.location.search){
			this.setState({
				loading: true,
			})
			return false;
		}
		return true;
	}

	renderLoader() {

		return (
		<div >
		<br/><br/>
		<DotLoader
				sizeUnit={"px"}
				size={50}
				color={'#1f9aff'}
				loading={true}
				css={{"display":"inline-block"}}
			/>
		</div>
		);


	}

	renderHeader() {
		return (
			<div className="parents-block__header">

				<div className="parents-block__header-left">
					<div className="icon klassicon-parents"></div>
					<span className="parents-block__header-title">{this.$t("Parents")}</span>
				</div>

				<div className="parents-block__header-right">
					<Button
						name={this.$t("Import Parents")}
						iconType="add-white"
						iconSide="left"
						typeDesign="primary"
						onClick={this.importParent}
					/>
				</div>

			</div>
		)
	}
	renderEmptyParents() {
		return (
			<>
				<div className="parents-block__epmty">
					<img className="parents-block__epmty-img" src="/public/k-img/icons/dashboard-empty.svg"/>
					<p className="parents-block__epmty-title" dangerouslySetInnerHTML={{__html: this.$t("You haven't imported any parents!!")}}></p>
					<p className="parents-block__epmty-desc">{this.$t("It's empty! It seems like you have not added any parents this year.")}</p>
				</div>
				<Button
					name={this.$t("Import Parents")}
					iconType="add-white"
					iconSide="left"
					typeDesign="primary"
					onClick={this.importParent}
				/>
			</>
		)
	}
	renderParents() {
		return (
			<>
				<ParentsListLevel listAPI={this.list}/>
				<ParentsListPanel listAPI={this.list} onFilter={this.onFilter}/>
				{this.renderListParents()}
			</>
		)
	}

	renderListParents() {

		if(this.state.loading){
			return this.renderLoader();
		}else{
			return (
				<ListParents listAPI={this.list} items={this.list.getList()}/>
			)
		}

	}

  renderBody(){

		if(this.state.isFirstTime){
			this.refreshData()
			return this.renderLoader();
		}else{
				return (
						<>
						{KRClient.getInstance().parents_count == 0 && this.renderEmptyParents()}
						{KRClient.getInstance().parents_count !== 0 && this.renderParents()}

						</>


				)
		}
	}

	render() {


			return (
				<div className="parents-block">
					{this.renderHeader()}
					<YearSelector
						selectedYear={this.getSelectedYear()}
						callbackSelectYear={this.onSelectYear}
					/>
					{this.renderBody()}
				</div>
			);



	}



}
ParentsPageBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(ParentsPageBlockComponent);
export const ParentsPageBlock = withRouter(props => <TranslatedComponent {...props}/>)
