export type ObjectLiteral = { [key: string]: any };

export const snakeToCamelCase = (string: string): string =>
	string.replace(/([_][a-z])/g, (match) =>
		match.toUpperCase().replace("_", "")
	);

export const camelToSnakeCase = (string: string): string =>
	string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const camelToKebabCase = (string: string): string =>
	string.replace(/([a-z0-9])([A-Z0-9])/g, "$1-$2").toLowerCase();

export const kebabToCamelCase = (string: string): string =>
	string.replace(/-./g, (word) => word[1].toUpperCase());

function transformValueKeys(
	value: any,
	mutation: (str: string) => string
): any {
	if (!value) {
		return value;
	}
	if (Array.isArray(value)) {
		return value.map((n) => transformValueKeys(n, mutation));
	}
	if (typeof value === "object") {
		return transformKeys(value, mutation);
	}
	return value;
}

const transformKeys = (
	object: ObjectLiteral,
	mutation: (str: string) => string
): ObjectLiteral =>
	Object.entries(object).reduce(
		(transformedObject, [key, value]) => ({
			...transformedObject,
			[mutation(key)]: transformValueKeys(value, mutation),
		}),
		{}
	);

export const camelCaseKeys = (object: ObjectLiteral): ObjectLiteral =>
	transformKeys(object, snakeToCamelCase);
export const snakeCaseKeys = (object: ObjectLiteral): ObjectLiteral =>
	transformKeys(object, camelToSnakeCase);

export const objectPath = (path: string[], object: ObjectLiteral): any =>
	path.reduce(
		(reducedObject, pathname) => reducedObject?.[pathname],
		object || ""
	);

function splitCamelCase(string: string): string {
	return string.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function capitalizeFirstLetter(string: string): string {
	const newString = splitCamelCase(string);
	return newString.charAt(0).toUpperCase() + newString.slice(1);
}

export function camelCaseToTitleCase(string: string): string {
	return splitCamelCase(string)
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export const VARIABLE_STRING_REGEX = /<%= (.*?) %>/g;
export const EMPHASIS_STRING_REGEX = /<%- (.*?) %>/g;
export const PLURAL_REPLACEMENT_REGEX = /%s/g;

export const templateString = (
	string: string,
	variables: ObjectLiteral
): string =>
	string.replace(
		VARIABLE_STRING_REGEX,
		(match) => variables[match.replace(/<%= /g, "").replace(/ %>/g, "")]
	);

export const paramsToUrl = (params: string[]): string => `/${params.join("/")}`;

export const normalize = (string: string): string =>
	string.replaceAll(" ", "").replaceAll("'", "").toLowerCase();
