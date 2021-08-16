import { combineReducers } from "redux";
import {ExampleReducer} from "./ExampleReducer";
import {Auth} from "./Auth";
import {LoaderReducer} from "./LoaderReducer";
import {AddSchoolPage} from "./pages/_addschool/AddSchoolPage";


export default combineReducers({
	ExampleReducer,
	Auth,
	LoaderReducer,
	AddSchoolPage
});
