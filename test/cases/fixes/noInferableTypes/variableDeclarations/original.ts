(function () {
	class Parent {
		parent = true;
	}
	class Child extends Parent {
		child = true;
	}

	// Inferable const literals
	const constInferableBoolean: boolean = false;
	const constInferableNull: null = null;
	const constInferableNumber: number = 0;
	const constInferableRegExp: RegExp = /./;
	const constInferableString: string = "";
	const constInferableUndefined: undefined = undefined;

	// Inferable let literals
	let letInferableBoolean: boolean = false;
	let letInferableNull: null = null;
	let letInferableNumber: number = 0;
	let letInferableRegExp: RegExp = /./;
	let letInferableString: string = "";
	let letInferableUndefined: undefined = undefined;

	// Inferable const arrays
	const constInferableBooleans: boolean[] = [false];
	const constInferableNulls: null[] = [null];
	const constInferableNumbers: number[] = [0];
	const constInferableRegExps: RegExp[] = [/./];
	const constInferableStrings: string[] = [""];
	const constInferableUndefineds: undefined[] = [undefined];

	// Inferable let arrays
	let letInferableBooleans: boolean[] = [false];
	let letInferableNulls: null[] = [null];
	let letInferableNumbers: number[] = [0];
	let letInferableRegExps: RegExp[] = [/./];
	let letInferableStrings: string[] = [""];
	let letInferableUndefineds: undefined[] = [undefined];

	// Inferable const multi-type arrays
	const constInferableNullOrStrings: (null | string)[] = [null, ""];
	const constInferableNumberOrRegExps: (number | RegExp)[] = [0, /./];

	// Inferable let multi-type arrays
	let letInferableNullOrStrings: (null | string)[] = [null, ""];
	let letInferableNumberOrRegExps: (number | RegExp)[] = [0, /./];

	// Non-inferable const arrays
	const constNonInferableStringArray: string[] = [];

	// Non-inferable const multi-type arrays
	const constNonInferableNullOrStrings: (null | string)[] = [null];
	const constNonInferableNumberOrRegExps: (number | RegExp)[] = [0];

	// Non-inferable let multi-type arrays
	let letNonInferableNullOrStrings: (null | string)[] = [null];
	let letNonInferableNumberOrRegExps: (number | RegExp)[] = [0];

	// Class instances

	// Inferable const direct class instances
	const constTakesParent: Parent = new Parent();
	const constTakesChild: Child = new Child();

	// Inferable let direct class instances
	let letTakesParent: Parent = new Parent();
	let letTakesChild: Child = new Child();

	// Non-inferable const direct class instances
	const constTakesParentAsChild: Parent = new Child();

	// Non-inferable let direct class instances
	let letTakesParentAsChild: Parent = new Child();

	// Non-inferable const union class instances
	const constTakesParentOrChildAsParent: Parent | Child = new Parent();
	const constTakesParentOrChildAsChild: Parent | Child = new Child();
	const constTakesParentOrUndefinedAsParent: Parent | undefined = new Parent();
	const constTakesParentOrUndefinedAsChild: Parent | undefined = new Child();
	const constTakesChildOrUndefinedAsChild: Child | undefined = new Child();

	// Non-inferable let union class instances
	let letTakesParentOrChildAsParent: Parent | Child = new Parent();
	let letTakesParentOrChildAsChild: Parent | Child = new Child();
	let letTakesParentOrUndefinedAsParent: Parent | undefined = new Parent();
	let letTakesParentOrUndefinedAsChild: Parent | undefined = new Child();
	let letTakesChildOrUndefinedAsChild: Child | undefined = new Child();

	// should keep their types
	// map
	type TypeSummariesPerNodeByName = Map<string, number>;
	const incompleteTypes: TypeSummariesPerNodeByName = new Map();
	const mapWithoutRightSide: Map<string, string> = new Map();
	const stringSet: Set<string> = new Set();
	const stringReadonlySet: ReadonlySet<string> = new Set();
	const stringSetWithInitialValue: Set<string> = new Set([""]);
	const stringSetWithInitialValueAndTypes: Set<string> = new Set<string>([""]);
	const stringOrNumberSet: Set<string | number> = new Set();
	const stringOrNumberSet2: Set<string | number> = new Set<number>();
	const copySet: ReadonlySet<Parent> = new Set<Parent>();
	let letStringMapTyped: Map<string, string | number> = new Map<
		string,
		number
	>();
	// array
	interface Mutation {
		readonly range: number;
		readonly type: string;
	}
	const mutations: Mutation[] = [];
	// function
	type FileMutationsRequest = Record<string, unknown>;
	type FileMutator = (
		request: FileMutationsRequest,
	) => readonly Mutation[] | undefined;
	const fixIncompleteImplicitClassGenerics: FileMutator = (
		request: FileMutationsRequest,
	) => undefined;
	class MyMap<K, V> {
		//
	}

	// should lose their types
	const incompleteTypes2: TypeSummariesPerNodeByName = new Map<
		string,
		number
	>();
	const stringMapTyped: Map<string, number> = new Map<string, number>();
	const anyMap: Map<any, any> = new Map();
	const anySet: Set<any> = new Set();
	const anyArray: any[] = [];
})();
