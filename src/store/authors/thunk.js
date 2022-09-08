import { addAuthorReq, deleteAuthorReq } from '../services';
import { addAuthor, deleteAuthor } from './actionCreators';

export const thunkAddAuthor = (author) => async (dispatch, getState) => {
	const state = getState();
	const token = state.user.token;
	let response;

	try {
		response = await addAuthorReq(author, token);
	} catch (e) {
		console.log(e);
	}

	dispatch(addAuthor(response.data.result));
};

export const thunkDeleteAuthor = (id) => async (dispatch, getState) => {
	const state = getState();
	const token = state.user.token;

	try {
		await deleteAuthorReq(id, token);
	} catch (e) {
		console.log(e);
	}

	dispatch(deleteAuthor(id));
};
