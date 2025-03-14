import ts from "typescript";

import { isTypeFlagSetRecursively } from "../mutations/collecting/flags.js";
import { FileMutationsRequest } from "./fileMutator.js";
import { getTypeAtLocationIfNotError } from "./types.js";

export type NodeSelector<TNode extends ts.Node> = (
	node: ts.Node,
) => node is TNode;

/**
 * Any node type that may optionally contain a type annotation.
 */
export type NodeWithOptionalType = ts.Node & {
	type?: ts.TypeNode;
};

/**
 * Any node type that contains a type annotation.
 */
export type NodeWithIdentifierName = ts.Node & {
	name: ts.Identifier;
};

export type NodeWithType = ts.Node & {
	type: ts.TypeNode;
};

export type ParameterDeclarationWithType = NodeWithType &
	ts.ParameterDeclaration;

export type PropertySignatureWithType = NodeWithType & ts.PropertySignature;

/**
 * Node types TypeStat may attempt to create a type declaration on.
 */
export type NodeWithCreatableType =
	| ts.ParameterDeclaration
	| ts.PropertyDeclaration
	| ts.VariableDeclaration;

/**
 * Node types TypeStat may attempt to add to an existing type declaration on.
 */
export type NodeWithAddableType = NodeWithType &
	(
		| ts.FunctionLikeDeclaration
		| ts.ParameterDeclaration
		| ts.PropertyDeclaration
		| ts.VariableDeclaration
	);

/**
 * Any function-like declaration that has an explicit type.
 */
export type FunctionLikeDeclarationWithType = NodeWithType &
	ts.FunctionLikeDeclaration;

// TODO: make this a more specific type
// Will have to deal with instantiations (new Container<T>() { ... }) and declarations (class Container<T>() { ... }))
export type NodeWithDefinedTypeArguments = ts.Node & {
	typeArguments?: ts.NodeArray<ts.TypeNode>;
};

// TODO: make this a more specific type
// Will have to deal with instantiations (new Container<T>() { ... }) and declarations (class Container<T>() { ... }))
export type NodeWithTypeParameters = ts.Node & {
	typeParameters: ts.NodeArray<ts.TypeNode> | undefined;
};

export const isNodeWithType = (
	node: NodeWithOptionalType,
): node is NodeWithType => node.type !== undefined;

export const isNodeWithIdentifierName = (
	node: ts.Node,
): node is NodeWithIdentifierName => {
	return "name" in node && !!(node as NodeWithIdentifierName).name;
};

export const isNodeWithDefinedTypeArguments = (
	node: ts.Node,
): node is NodeWithDefinedTypeArguments => {
	return "typeArguments" in node;
};

export const isNodeWithTypeParameters = (
	node: ts.Node,
): node is NodeWithTypeParameters => {
	return "typeParameters" in node;
};

export type PropertySignatureWithStaticName = NodeWithIdentifierName &
	ts.PropertySignature;

export const isPropertySignatureWithStaticName = (
	node: ts.Node,
): node is PropertySignatureWithStaticName => {
	return ts.isPropertySignature(node) && isNodeWithIdentifierName(node);
};

export const getValueDeclarationOfType = (
	request: FileMutationsRequest,
	node: ts.Node,
): ts.Node | undefined => {
	// Try getting the symbol at the location, which sometimes only works in the latter form
	const nodeType = getTypeAtLocationIfNotError(request, node);
	const symbol =
		nodeType?.getSymbol() ??
		request.services.program.getTypeChecker().getSymbolAtLocation(node);

	if (symbol === undefined) {
		return undefined;
	}

	// Despite the type definition, valueDeclaration itself is sometimes undefined
	const valueDeclaration: ts.Declaration | undefined = symbol.valueDeclaration;
	if (valueDeclaration !== undefined) {
		return valueDeclaration;
	}

	// Since the real .valueDeclaration is undefined, use the first one we know of
	return symbol.declarations?.length ? symbol.declarations[0] : undefined;
};

/**
 * @returns Whether a type is missing in a passed type compared to its declared type.
 */
export const isTypeMissingBetween = (
	typeFlag: ts.TypeFlags,
	passedType: ts.Type,
	declaredType: ts.Type,
) =>
	isTypeFlagSetRecursively(passedType, typeFlag) &&
	!isTypeFlagSetRecursively(declaredType, typeFlag);

// If either null or undefined is missing in the argument, we'll need a ! mutation

/**
 * @returns Whether null or undefined is missing in a passed type compared to its declared type.
 */
export const isNullOrUndefinedMissingBetween = (
	passedType: ts.Type,
	declaredType: ts.Type,
) =>
	isTypeMissingBetween(ts.TypeFlags.Null, passedType, declaredType) ||
	isTypeMissingBetween(ts.TypeFlags.Undefined, passedType, declaredType);

export const getIdentifyingTypeLiteralParent = (node: ts.TypeLiteralNode) => {
	const { parent } = node;
	if (ts.isTypeAliasDeclaration(parent)) {
		return parent.name;
	}

	// ???
	return node;
};

// Todo: eventually, these should expand to object, Object, etc...
// Those are stored as intrinsicNames on types, and were showing up without missing flags for some reason
const knownGlobalBaseTypeNames = new Set<string | undefined>(["Function"]);

/**
 * @returns Whether the type is a known base type such as Function.
 */
export const isKnownGlobalBaseType = (type: ts.Type) => {
	return knownGlobalBaseTypeNames.has(type.getSymbol()?.escapedName.toString());
};

const neverAndOrUnknown = [
	ts.TypeFlags.Never,
	ts.TypeFlags.Unknown,
	ts.TypeFlags.Never & ts.TypeFlags.Unknown,
	ts.TypeFlags.Never | ts.TypeFlags.Unknown,
];

export const isNeverAndOrUnknownType = (type: ts.Type) => {
	return neverAndOrUnknown.includes(type.flags);
};
