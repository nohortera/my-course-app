function dateGenerator(dateString) {
	return new Date(
		dateString.split('/').reverse().join('-')
	).toLocaleDateString();
}

export default dateGenerator;
