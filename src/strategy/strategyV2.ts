/**
 * 表单验证
 */

interface IValidateStrategy {
	validate(): string | void;
}

class IsNonEmpty implements IValidateStrategy {
	constructor(private input: any, private errorMsg: string) {}
	validate(): string | void {
		if (!this.input) {
			return this.errorMsg;
		}
		return;
	}
}

class MinLength implements IValidateStrategy {
	constructor(
		private input: string,
		private minLength: number,
		private errorMsg: string
	) {}
	validate(): string | void {
		if (this.input.length < this.minLength) {
			return this.errorMsg;
		}
		return;
	}
}

class isMobile implements IValidateStrategy {
	private reg: RegExp = /^1[3-9]\d{9}$/;
	constructor(private input: string, private errorMsg: string) {}
	validate(): string | void {
		if (!this.reg.test(this.input)) {
			return this.errorMsg;
		}
		return;
	}
}

class Validator {
	private strategies: IValidateStrategy[];
	constructor() {
		this.strategies = [];
	}
	addStrategy(e: IValidateStrategy) {
		this.strategies.push(e);
	}
	validate() {
		const errorMsgs = [];
		for (let validator of this.strategies) {
			const result = validator.validate();
			if (result) {
				errorMsgs.push(result);
			}
		}
		return errorMsgs;
	}
}

function client() {
	const validator = new Validator();
	validator.addStrategy(new IsNonEmpty('', '用户名不能为空'));
	validator.addStrategy(new isMobile('122345436', '请输入正确的手机号'));
	validator.addStrategy(new MinLength('12345678', 6, '密码最少时6位'));
	const result = validator.validate();
	console.log(result.toString());
}
client();
