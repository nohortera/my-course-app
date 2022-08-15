import {
	ALL_COURSES,
	CREATE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSES,
} from './actionTypes';

export const getAllCourses = () => ({
	type: ALL_COURSES,
});

export const updateCourses = (courses) => ({
	type: UPDATE_COURSES,
	payload: courses,
});

export const createCourse = (course) => ({
	type: CREATE_COURSE,
	payload: course,
});

export const deleteCourse = (id) => ({
	type: DELETE_COURSE,
	payload: id,
});
