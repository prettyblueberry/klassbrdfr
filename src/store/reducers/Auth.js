import { deepClone } from "../../lib/Utils";
// Initial state of storage
export const initialState = {
	authUser: null,
	klassboard_token: null
};

export const Auth = (state = initialState, action) => {
	const newState = deepClone(state);
	switch (action.type) {
		// Login
		case "AUTH.USER_LOGIN":
		if (action.hasOwnProperty("user") && action.hasOwnProperty("klassboard_token")) {
			newState.authUser = action.user;
			newState.klassboard_token = action.klassboard_token;
			break;
		}
		// Logout
		case "AUTH.USER_LOGOUT":
		newState.authUser = null;
		newState.klassboard_token = null;
		break;
	}
	return newState;
};
