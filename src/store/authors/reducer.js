import { ADD_AUTHOR, UPDATE_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case ADD_AUTHOR:
			return [...state, { ...action.payload }];
		case UPDATE_AUTHORS:
			return [...action.payload];
		default:
			return state;
	}
};
