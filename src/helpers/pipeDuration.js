function preformattedDuration(total) {
	let hours = Math.trunc(total / 60);
	let minutes = total % 60;
	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	return `${hours}:${minutes}`;
}

export default preformattedDuration;
