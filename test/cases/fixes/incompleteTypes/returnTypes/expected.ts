(function () {
	function functionReturnsString(): string {
		return "";
	}

	function functionReturnsUndefined(): string | undefined {
		return undefined;
	}

	function functionReturnsNull(): string | null {
		return null;
	}

	function functionGivenNullReturnsUndefined(): string | null | undefined {
		return undefined;
	}

	function functionGivenUndefinedReturnsNull(): string | undefined | null {
		return null;
	}

	function functionReturnsUndefinedAsExpression(): string | undefined {
		return undefined as undefined;
	}

	function functionReturnsUndefinedBinaryExpression(): string | undefined {
		return true && undefined;
	}

	function functionReturnsUndefinedExpression(): string | undefined {
		return true ? "" : undefined;
	}

	function functionReturnsUndefinedVariable(): string | undefined {
		const text: string | undefined = undefined;

		return text;
	}

	function functionReturnsVoidExpression(): string | undefined {
		return void 0;
	}

	function functionIgnoresInnerMethods(): string {
		(function (): string | undefined {
			return undefined;
		})();

		((): string | undefined => undefined)();

		return "";
	}

	function functionReturnsNullAsAny(): any {
		return null;
	}

	function functionReturnsUndefinedAsAny(): any {
		return undefined;
	}

	const lambdaReturnsUndefined = (): string | undefined => {
		return undefined;
	};

	const lambdaReturnsNull = (): string | null => {
		return null;
	};

	const lambdaGivenNullReturnsUndefined = (): string | null | undefined => {
		return undefined;
	};

	const lambdaGivenUndefinedReturnsNull = (): string | undefined | null => {
		return null;
	};

	const lambdaIgnoresInnerMethods = (): string => {
		(function (): string | undefined {
			return undefined;
		})();

		((): string | undefined => undefined)();

		return "";
	};

// @ts-expect-error -- TODO: Type 'boolean | Promise<boolean>' is not a valid async function return type in ES5 because it does not refer to a Promise-compatible constructor value.
	async function navigateTo(): Promise<boolean> | boolean {
		return await new Promise(() => "");
	}

	function navigateByUrl(url: string): Promise<boolean>;

// @ts-expect-error -- TODO: Function implementation name must be 'navigateByUrl'. Type 'boolean | Promise<boolean>' is not a valid async function return type in ES5 because it does not refer to a Promise-compatible constructor value.
	async function navigateTo3(): Promise<boolean> | boolean {
		return await navigateByUrl("");
	}

// @ts-expect-error -- TODO: Type 'boolean | Promise<boolean>' is not a valid async function return type in ES5 because it does not refer to a Promise-compatible constructor value.
	async function navigateTo2(): Promise<boolean> | boolean {
		const navigated = await navigateByUrl("");
		return navigated;
	}

	async function returnSame(): Promise<boolean> {
		return navigateByUrl("");
	}

	async function returnPromise(): Promise<string> {
		return Promise.resolve("");
	}

	const returnsBigInt = (): string | bigint => {
		return BigInt("123");
	};

	const returnsBigintOrNumber = (): number | bigint => {
// @ts-expect-error -- TODO: BigInt literals are not available when targeting lower than ES2020.
		return 123n;
	};

	const returnsNumberAndBigint = (): bigint | number => {
		return 123;
	};
})();
