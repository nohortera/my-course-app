import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHORS } from './actionTypes';

export const addAuthor = (author) => ({
	type: ADD_AUTHOR,
	payload: author,
});

export const updateAuthors = (authors) => ({
	type: UPDATE_AUTHORS,
	payload: authors,
});

export const deleteAuthor = (id) => ({
	type: DELETE_AUTHOR,
	payload: id,
});
