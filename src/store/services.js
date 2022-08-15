import axios from 'axios';
import { updateCourses } from './courses/actionCreators';
import { store } from './index';
import { updateAuthors } from './authors/actionCreators';

// export const fetchCourses = async () => {
// 	const response = await axios.get('http://localhost:4000/courses/all');
// 	console.log(response.data.result);
// 	return response.data.result;
// };9

export const fetchCourses = async () => {
	const response = await axios('http://localhost:4000/courses/all');
	store.dispatch(updateCourses(await response.data.result));
	// console.log('services/courses');
};

export const fetchAuthors = async () => {
	const response = await axios('http://localhost:4000/authors/all');
	store.dispatch(updateAuthors(await response.data.result));
	// console.log('services/authors');
};

export const fetchData = async () => {
	await fetchAuthors();
	await fetchCourses();
};

export const loginReq = async (email, password) => {
	const response = await axios.post('http://localhost:4000/login', {
		email,
		password,
	});
	return response;
};

export const registrationReq = async (name, email, password) => {
	const response = await axios.post('http://localhost:4000/register', {
		name,
		email,
		password,
	});
	return response;
};
