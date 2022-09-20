import { addCourse, deleteCourse, updateCourse } from './actionCreators';
import { addCourseReq, deleteCourseReq, updateCourseReq } from '../services';

export const thunkAddCourse = (course) => async (dispatch, getState) => {
	const state = getState();
	const token = state.user.token;
	let response;

	try {
		response = await addCourseReq(course, token);
	} catch (e) {
		console.log(e);
	}

	dispatch(addCourse(response.data.result));
};

export const thunkDeleteCourse = (id) => async (dispatch, getState) => {
	const state = getState();
	const token = state.user.token;

	try {
		await deleteCourseReq(id, token);
	} catch (e) {
		console.log(e);
	}

	dispatch(deleteCourse(id));
};

export const thunkUpdateCourse = (id, course) => async (dispatch, getState) => {
	const state = getState();
	const token = state.user.token;
	let response;

	try {
		response = await updateCourseReq(id, course, token);
	} catch (e) {
		console.log(e);
	}

	dispatch(updateCourse(response.data.result));
};
