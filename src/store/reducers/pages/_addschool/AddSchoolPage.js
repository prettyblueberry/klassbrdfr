import { deepClone } from "../../../../lib/Utils";
// Initial state of storage
export const initialState = {
	photo: null
};

export const AddSchoolPage = (state = initialState, action) => {
	const newState = deepClone(state);
	if (action.hasOwnProperty("data")) {
		const data = action.data;
		switch (action.type) {
			case "ADD_SCHOOL_PAGE.CHANGE_PHOTO":
				newState.photo = data.photo;
				break;
		}
		return newState;
	} else {
		// if action not found, return previous state of storage
		return state;
	}
};
