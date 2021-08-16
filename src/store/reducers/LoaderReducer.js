import { deepClone } from "../../lib/Utils";
// Initial state of storage
export const initialState = {
	isShowing: false,
	msg: null
};

export const LoaderReducer = (state = initialState, action) => {
	const newState = deepClone(state);
	switch (action.type) {
		// Login
		case "LOADER.SHOW":
		if (action.hasOwnProperty("msg")) {
			newState.isShowing = true;
			newState.msg = action.msg;
			break;
		}
		// Logout
		case "LOADER.HIDE":
		newState.isShowing = false;
		newState.msg = null;
		break;
	}
	return newState;
};
