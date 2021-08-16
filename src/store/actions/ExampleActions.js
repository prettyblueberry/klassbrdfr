export const ExampleActions = {
	addItem: function (data) {
		return {
			data,
			type: "EXAMPLE.ADD_ITEM"
		}
	}
}