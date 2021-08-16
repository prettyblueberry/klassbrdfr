import {queryStringToObject, objectToQueryString, deepEqual} from "utils";

export class ListAPI {
	list = null;
	items = [];
	constructor(list) {
		this.list = list;
		this.settings = {
			requests: {},
			params: {
				page: 0,
				loading: false,
			},
			shownMenu: {
				/**
				 * menuItems e.g. [
						{text: this.$t("link parent"), callback: this.linkParent, visible: this.props.parent.userID == null},
					 ]
				*/
				menuItems: [],
				/**
				 * data of item
				 */
				item: null,
			},
			customData: {

			}
		}
	}
	changeQueryURL = (newQueries, historyAPI, requestName, data) => {
		const {pathname} = historyAPI.location;
		let queries = queryStringToObject();
		Object.keys(newQueries).forEach((keyQuery) => {
			queries[keyQuery] = newQueries[keyQuery];
		});
		historyAPI.replace({
			pathname: pathname,
			search: encodeURI(`?${objectToQueryString(queries)}`)
		});
		this.clearList();
		this.sendRequest(requestName, data);
		//this.renderList();
	}
	clearList () {
		this.items = [];
		this.resetPage();
	}
	resetPage() {
		this.settings.params.page = 0;
	}
	getList() {
		return this.items;
	}
	setRequests = (requests) => {
		this.settings.requests = requests;
	}
	getRequests = () => {
		return this.settings.requests;
	}
	setCustomData = (customData) => {
		this.settings.customData = customData;
	}
	getCustomData = () => {
		return this.settings.customData;
	}
	showMenu = (item, menuItems) => {
		this.settings.shownMenu.item = item;
		this.settings.shownMenu.menuItems = menuItems;
		this.renderList();
	}
	checkMenuIsShown = (item) => {
		return (deepEqual(this.settings.shownMenu.item, item) && this.settings.shownMenu.menuItems.length > 0);
	}
	getMenuItems = () => {
		return this.settings.shownMenu.menuItems;
	}
	hideMenu = () => {
		this.settings.shownMenu.item = null;
		this.settings.shownMenu.menuItems = [];
		this.renderList();
	}
	renderList () {
		this.list.forceUpdate();
	}
	pushToList = (item) => {
		this.items.push(item);
		this.renderList();
	}
	replaceItems = (items) => {
		this.items = items;
		this.renderList();
	}
	isLoading = () => {
		return this.settings.params.loading;
	}
	setLoading = () => {
		this.settings.params.loading = true;
	}
	unsetLoading = () => {
		this.settings.params.loading = false;
	}
	/* will concat chunk of items or replace items and update list, if null do nothing*/
	sendRequest = (requestName, data = null, replaceItems = false) => {
		if(this.settings && this.getRequests() && typeof this.getRequests()[requestName] == "function"){
			this.setLoading();
			let queries = queryStringToObject();
			const promise = this.getRequests()[requestName](queries, this.settings.params, data);
			promise.then((items) => {
				if(items){
					if(replaceItems){
						this.items = items;
					} else {
						this.items = this.items.concat(items);
						this.settings.params.page++;
					}
					this.unsetLoading();
					this.renderList();
				}
			});
		}
	}
}
