import {
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case UPDATE_COURSES:
			return [...action.payload];
		case ADD_COURSE:
			return [...state, Object.assign({}, action.payload)];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case UPDATE_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);
		default:
			return state;
	}
};
