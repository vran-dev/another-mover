export function predicateTypeAndConvert(value: string) {
	// is boolean?
	if (value == "true") {
		return true;
	} else if (value == "false") {
		return false;
	}

	// is number?
	try {
		const parsedValue = parseInt(value);
		if (!isNaN(parsedValue)) {
			return parsedValue;
		}
	} catch (e) {
		// ignore
	}

	// return raw string
	return value;
}
