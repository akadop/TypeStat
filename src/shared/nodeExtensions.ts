import ts from "typescript";

import { FileMutationsRequest } from "./fileMutator.js";
import { getTypeAtLocationIfNotError } from "./types.js";

export const getBaseClassDeclaration = (
	request: FileMutationsRequest,
	extension: ts.ExpressionWithTypeArguments,
): ts.ClassLikeDeclaration | undefined => {
	// First try retrieving the base class from the extension itself
	let extensionSymbol = getTypeAtLocationIfNotError(
		request,
		extension,
	)?.getSymbol();

	// If that didn't work, it might be from a type error due to missing type parameters
	// Try the base constructor of the child class instead
	// This is an internal member, but ah well...
	if (extensionSymbol === undefined) {
		const { resolvedBaseConstructorType } = getTypeAtLocationIfNotError(
			request,
			extension.parent.parent,
		) as ts.Type & {
			resolvedBaseConstructorType: ts.Type | undefined;
		};

		if (resolvedBaseConstructorType !== undefined) {
			extensionSymbol = resolvedBaseConstructorType.symbol;
		}
	}

	if (extensionSymbol === undefined) {
		return undefined;
	}

	const { valueDeclaration } = extensionSymbol;
	if (!valueDeclaration || !ts.isClassLike(valueDeclaration)) {
		return undefined;
	}

	return valueDeclaration;
};
