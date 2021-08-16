import { deepClone } from "../../lib/Utils";
// Initial state of storage
export const initialState = {
	items: [
		{
			id: 1,
			title: "Apple"
		},
		{
			id: 2,
			title: "Pineapple"
		},
		{
			id: 3,
			title: "Orange"
		}
	],
};

export const ExampleReducer = (state = initialState, action) => {
	const newState = deepClone(state);
	if (action.hasOwnProperty("data")) {
		const data = action.data;
		switch (action.type) {
			// Add new item to example storage
			case "EXAMPLE.ADD_ITEM":
				newState.items.push(data);
				break;
		}
		return newState;
	} else {
		// if action not found, return previous state of storage
		return state;
	}
};
