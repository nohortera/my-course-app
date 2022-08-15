import {
	ALL_COURSES,
	CREATE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSES,
} from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case UPDATE_COURSES:
			return [...action.payload];
		case CREATE_COURSE:
			return [...state, { ...action.payload }];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};
