import { addAuthorReq } from '../services';
import { addAuthor } from './actionCreators';

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
