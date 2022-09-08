import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case ADD_AUTHOR:
			return [...state, { ...action.payload }];
		case UPDATE_AUTHORS:
			return [...action.payload];
		case DELETE_AUTHOR:
			return state.filter((author) => author.id !== action.payload);
		default:
			return state;
	}
};
