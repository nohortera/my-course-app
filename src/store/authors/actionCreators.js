import { CREATE_AUTHOR, UPDATE_AUTHORS } from './actionTypes';

export const createAuthor = (author) => ({
	type: CREATE_AUTHOR,
	payload: author,
});

export const updateAuthors = (authors) => ({
	type: UPDATE_AUTHORS,
	payload: authors,
});
