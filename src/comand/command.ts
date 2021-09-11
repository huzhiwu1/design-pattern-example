interface ICommand {
	execute(): void;
	undo(): void;
}

class Calculator {
	private value: number = 0;

	add(num: number) {
		this.value += num;
	}
	minus(num: number) {
		this.value -= num;
	}
	multiply(num: number) {
		this.value *= num;
	}
	divide(num: number) {
		this.value /= num;
	}
	getValue() {
		return this.value;
	}
}

class AddCommand implements ICommand {
	private receiver: Calculator;
	private addNum: number;
	constructor(receiver: Calculator, addNum: number) {
		this.receiver = receiver;
		this.addNum = addNum;
	}
	execute(): void {
		this.receiver.add(this.addNum);
	}
	undo(): void {
		this.receiver.minus(this.addNum);
	}
}

class MinusCommand implements ICommand {
	private receiver: Calculator;
	private minusNum: number;
	constructor(receiver: Calculator, minusNum: number) {
		this.receiver = receiver;
		this.minusNum = minusNum;
	}
	execute(): void {
		this.receiver.minus(this.minusNum);
	}
	undo(): void {
		this.receiver.add(this.minusNum);
	}
}

class MultiplyCommand implements ICommand {
	private receiver: Calculator;
	private multiplyNum: number;
	constructor(receiver: Calculator, multiplyNum: number) {
		this.receiver = receiver;
		this.multiplyNum = multiplyNum;
	}
	execute(): void {
		this.receiver.multiply(this.multiplyNum);
	}
	undo(): void {
		this.receiver.divide(this.multiplyNum);
	}
}

class DivideCommand implements ICommand {
	private receiver: Calculator;
	private divideNum: number;
	constructor(receiver: Calculator, divideNum: number) {
		this.receiver = receiver;
		this.divideNum = divideNum;
	}
	execute(): void {
		this.receiver.divide(this.divideNum);
	}
	undo(): void {
		this.receiver.multiply(this.divideNum);
	}
}

class Invoker {
	static history: ICommand[] = [];
	static commands: Map<string, ICommand> = new Map();

	static setCommand(key: string, command: ICommand) {
		this.commands.set(key, command);
	}

	static executeCommand(key: string) {
		const command = this.commands.get(key);
		if (command) {
			this.history.push(command);
			command.execute();
		}
	}

	static undoCommand() {
		const command = this.history.pop();
		if (command) {
			command.undo();
		}
	}
}
export function client() {
	const calculator = new Calculator();
	const addCommand = new AddCommand(calculator, 3);
	const multiplyCommand = new MultiplyCommand(calculator, 3);
	Invoker.setCommand('+', addCommand);
	Invoker.setCommand('*', multiplyCommand);
	Invoker.executeCommand('+');
	console.log(calculator.getValue());
	Invoker.executeCommand('*');
	console.log(calculator.getValue());
	Invoker.undoCommand();
	console.log(calculator.getValue());
}
client();
