import {
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const updateCourses = (courses) => ({
	type: UPDATE_COURSES,
	payload: courses,
});

export const addCourse = (course) => ({
	type: ADD_COURSE,
	payload: course,
});

export const deleteCourse = (id) => ({
	type: DELETE_COURSE,
	payload: id,
});

export const updateCourse = (course) => ({
	type: UPDATE_COURSE,
	payload: course,
});
