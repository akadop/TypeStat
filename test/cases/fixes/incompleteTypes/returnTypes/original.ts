(function () {
	function functionReturnsString(): string {
		return "";
	}

	function functionReturnsUndefined(): string {
		return undefined;
	}

	function functionReturnsNull(): string {
		return null;
	}

	function functionGivenNullReturnsUndefined(): string | null {
		return undefined;
	}

	function functionGivenUndefinedReturnsNull(): string | undefined {
		return null;
	}

	function functionReturnsUndefinedAsExpression(): string {
		return undefined as undefined;
	}

	function functionReturnsUndefinedBinaryExpression(): string {
		return true && undefined;
	}

	function functionReturnsUndefinedExpression(): string {
		return true ? "" : undefined;
	}

	function functionReturnsUndefinedVariable(): string {
		const text: string | undefined = undefined;

		return text;
	}

	function functionReturnsVoidExpression(): string {
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

	const lambdaReturnsUndefined = (): string => {
		return undefined;
	};

	const lambdaReturnsNull = (): string => {
		return null;
	};

	const lambdaGivenNullReturnsUndefined = (): string | null => {
		return undefined;
	};

	const lambdaGivenUndefinedReturnsNull = (): string | undefined => {
		return null;
	};

	const lambdaIgnoresInnerMethods = (): string => {
		(function (): string | undefined {
			return undefined;
		})();

		((): string | undefined => undefined)();

		return "";
	};

	async function navigateTo(): Promise<boolean> {
		return await new Promise(() => "");
	}

	function navigateByUrl(url: string): Promise<boolean>;

	async function navigateTo3(): Promise<boolean> {
		return await navigateByUrl("");
	}

	async function navigateTo2(): Promise<boolean> {
		const navigated = await navigateByUrl("");
		return navigated;
	}

	async function returnSame(): Promise<boolean> {
		return navigateByUrl("");
	}

	async function returnPromise(): Promise<string> {
		return Promise.resolve("");
	}

	const returnsBigInt = (): string => {
		return BigInt("123");
	};

	const returnsBigintOrNumber = (): number => {
		return 123n;
	};

	const returnsNumberAndBigint = (): bigint => {
		return 123;
	};
})();
