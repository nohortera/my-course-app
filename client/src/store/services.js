import axios from 'axios';
import { updateCourses } from './courses/actionCreators';
import { store } from './index';
import { updateAuthors } from './authors/actionCreators';

export const fetchCourses = async () => {
	const response = await axios('/courses/all');
	store.dispatch(updateCourses(await response.data.result));
};

export const fetchAuthors = async () => {
	const response = await axios('/authors/all');
	store.dispatch(updateAuthors(await response.data.result));
};

export const fetchData = async () => {
	await fetchAuthors();
	await fetchCourses();
};

// ----USER----
export const loginReq = async (credentials) => {
	return await axios.post('/login', credentials);
};

export const registrationReq = async (name, email, password) => {
	return await axios.post('/register', {
		name,
		email,
		password,
	});
};

export const logoutReq = async (token) => {
	return await axios.delete('/logout', {
		headers: {
			Authorization: token,
		},
	});
};

export const checkAuthReq = async (token) => {
	return await axios.get('/users/me', {
		headers: {
			Authorization: token,
		},
	});
};

// ----COURSES----
export const addCourseReq = async (course, token) => {
	return axios({
		method: 'post',
		url: '/courses/add',
		headers: {
			Authorization: token,
		},
		data: course,
	});
};

export const deleteCourseReq = async (id, token) => {
	return axios({
		method: 'delete',
		url: `/courses/${id}`,
		headers: {
			Authorization: token,
		},
	});
};

export const updateCourseReq = async (id, course, token) => {
	return axios({
		method: 'put',
		url: `/courses/${id}`,
		headers: {
			Authorization: token,
		},
		data: course,
	});
};

// ----AUTHORS----
export const addAuthorReq = async (author, token) => {
	return axios({
		method: 'post',
		url: '/authors/add',
		headers: {
			Authorization: token,
		},
		data: author,
	});
};

export const deleteAuthorReq = async (id, token) => {
	return axios({
		method: 'delete',
		url: `/authors/${id}`,
		headers: {
			Authorization: token,
		},
	});
};
