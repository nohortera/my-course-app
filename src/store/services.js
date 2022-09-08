import axios from 'axios';
import { updateCourses } from './courses/actionCreators';
import { store } from './index';
import { updateAuthors } from './authors/actionCreators';

export const fetchCourses = async () => {
	const response = await axios('http://localhost:4000/courses/all');
	store.dispatch(updateCourses(await response.data.result));
};

export const fetchAuthors = async () => {
	const response = await axios('http://localhost:4000/authors/all');
	store.dispatch(updateAuthors(await response.data.result));
};

export const fetchData = async () => {
	await fetchAuthors();
	await fetchCourses();
};

// ----USER----
export const loginReq = async (credentials) => {
	return await axios.post('http://localhost:4000/login', credentials);
};

export const registrationReq = async (name, email, password) => {
	return await axios.post('http://localhost:4000/register', {
		name,
		email,
		password,
	});
};

export const logoutReq = async (token) => {
	return await axios.delete('http://localhost:4000/logout', {
		headers: {
			Authorization: token,
		},
	});
};

export const checkAuthReq = async (token) => {
	return await axios.get('http://localhost:4000/users/me', {
		headers: {
			Authorization: token,
		},
	});
};

// ----COURSES----
export const addCourseReq = async (course, token) => {
	return axios({
		method: 'post',
		url: 'http://localhost:4000/courses/add',
		headers: {
			Authorization: token,
		},
		data: course,
	});
};

export const deleteCourseReq = async (id, token) => {
	return axios({
		method: 'delete',
		url: `http://localhost:4000/courses/${id}`,
		headers: {
			Authorization: token,
		},
	});
};

export const updateCourseReq = async (id, course, token) => {
	return axios({
		method: 'put',
		url: `http://localhost:4000/courses/${id}`,
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
		url: 'http://localhost:4000/authors/add',
		headers: {
			Authorization: token,
		},
		data: author,
	});
};

export const deleteAuthorReq = async (id, token) => {
	return axios({
		method: 'delete',
		url: `http://localhost:4000/authors/${id}`,
		headers: {
			Authorization: token,
		},
	});
};
